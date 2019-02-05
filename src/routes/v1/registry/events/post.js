import { generateHelmValues } from "deployments/config";
import { prisma } from "generated/client";
import isValidTaggedDeployment from "deployments/validate/docker-tag";
import log from "logger";
import commander from "commander";
import { merge } from "lodash";
import { DEPLOYMENT_AIRFLOW } from "constants";

/*
 * Handle webhooks from the docker registry.
 * @param {Object} req The request.
 * @param {Object} res The response.
 */
export default async function(req, res) {
  const { events = [] } = req.body;

  await Promise.all(
    events.map(async ev => {
      // Exit early if we don't care about this event or tag.
      if (!isValidTaggedDeployment(ev)) return;

      // Decompose the repository name.
      const [releaseName] = ev.target.repository.split("/");
      const repository = `${ev.request.host}/${ev.target.repository}`;
      const tag = ev.target.tag;
      log.info(
        `Received docker registry webhook for ${releaseName}, deploying new tag ${tag}.`
      );

      // Get the existing config for this deployment.
      const config = await prisma.deployment({ releaseName }).config();

      // Merge the new image tag in.
      const updatedConfig = merge({}, config, {
        images: { airflow: { repository, tag } }
      });

      // Update the deployment.
      const updatedDeployment = await prisma.updateDeployment({
        where: { releaseName },
        data: { config: updatedConfig }
      });

      // Fire the helm upgrade to commander.
      await commander.request("updateDeployment", {
        releaseName: updatedDeployment.releaseName,
        chart: {
          name: DEPLOYMENT_AIRFLOW,
          version: updatedDeployment.version
        },
        rawConfig: JSON.stringify(generateHelmValues(updatedDeployment))
      });
    })
  );

  res.sendStatus(200);
}
