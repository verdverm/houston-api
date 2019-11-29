/*
 * Script checks for upgrade availability and then checks deployment / customer maintenance windows and
 * issues the calls to commander to upgrade the deployment
 */
import "dotenv/config";
import log from "logger";
import { prisma } from "generated/client";
import commander from "commander";
import { generateHelmValues } from "deployments/config";
import yargs from "yargs";
import { DEPLOYMENT_AIRFLOW } from "constants";

/*
 * Upgrade deployments
 */
async function deploymentUpgrade() {
  log.info("Starting automatic deployment upgrade");
  const deployments = await prisma.deployments({}, `{ releaseName, version }`);
  if (deployments.length === 0) {
    log.info("There is no deployments to delete :(");
    return;
  }

  for (const deployment of deployments) {
    if (deployment.version !== argv["airflowChartVersion"]) {
      const updatedDeployment = await prisma.mutation.updateDeployment(
        {
          where: { id: deployment.deploymentUuid },
          data: { version: argv["airflowChartVersion"] }
        },
        `{ releaseNam, version }`
      );

      await commander.request("updateDeployment", {
        releaseName: updatedDeployment.releaseName,
        chart: {
          name: DEPLOYMENT_AIRFLOW,
          version: updatedDeployment.version
        },
        rawConfig: JSON.stringify(generateHelmValues(updatedDeployment))
      });
    }
  }
}

const argv = yargs
  .option("airflow-chart-version", {
    alias: "v",
    required: true,
    description: "Latest airflow chart version",
    type: "string"
  })
  .help()
  .alias("help", "h").argv;

// When a file is run directly from Node, require.main is set to its module.
if (require.main === module) {
  deploymentUpgrade().catch(err => {
    log.error(err);
  });
}
