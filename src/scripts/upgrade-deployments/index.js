/*
 * Script checks for upgrade availability and then checks deployment / customer maintenance windows and
 * issues the calls to commander to upgrade the deployment
 */
import "dotenv/config";
import log from "logger";
import { prisma } from "generated/client";
import commander from "commander";
import { generateHelmValues } from "deployments/config";
import semver from "semver";
import config from "config";
import { DEPLOYMENT_AIRFLOW } from "constants";

/*
 * Upgrade deployments
 */
async function upgradeDeployments() {
  // This is our desired chart version
  const desiredVersion = config.get("deployments.chart.version");

  log.info(`Starting automatic deployment upgrade to ${desiredVersion}`);

  // Find all deployments.
  const deployments = await prisma
    .deployments({})
    .$fragment(`{ id releaseName version workspace { id } }`);

  // Return early if we have no deployments.
  if (deployments.length === 0) {
    log.info("There are no deployments to delete");
    return;
  }

  // Loop through and upgrade all deployments.
  for (const deployment of deployments) {
    // Pull out some deployment fields.
    const { version, releaseName } = deployment;

    // Skip upgrade if this deployment is greater than or equal to the desired version.
    if (semver.gte(version, desiredVersion)) {
      log.info(`Skipping upgrade to ${releaseName}, already on ${version}`);
      continue;
    }

    // Update the database.
    const updatedDeployment = await prisma
      .updateDeployment({
        where: { releaseName },
        data: { version: desiredVersion }
      })
      .$fragment(`{ id workspace { id } }`);

    log.info(
      `Updating deployment ${releaseName} from ${version} to ${desiredVersion}`
    );

    // Fire the update to commander.
    await commander.request("updateDeployment", {
      releaseName: updatedDeployment.releaseName,
      chart: {
        name: DEPLOYMENT_AIRFLOW,
        version: updatedDeployment.version
      },
      rawConfig: JSON.stringify(generateHelmValues(updatedDeployment))
    });
  }

  log.info("Automatic deployment upgrade has been finished!");
}

// When a file is run directly from Node, require.main is set to its module.
if (require.main === module) {
  upgradeDeployments().catch(err => {
    log.error(err);
  });
}
