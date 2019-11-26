/*
 * Script checks for upgrade availability and then checks deployment / customer maintenance windows and
 * issues the calls to commander to upgrade the deployment
 */
import "dotenv/config";
import log from "logger";
import { prisma } from "generated/client";
import yargs from "yargs";

/*
 * Upgrade deployments
 */
async function deploymentUpgrade() {
  log.info("Starting registry cleanup");
  const deployments = await prisma.deployments({}, `{ releaseName, version }`);
  if (deployments.length === 0) {
    log.info("There is no deployments to delete :(");
    return;
  }
  for (const deployment of deployments) {
    if (deployment.version !== argv["airflowChartVersion"]) {
      await prisma.upgradeDeployment({
        deploymentUuid: deployment.deploymentUuid,
        version: argv["airflowChartVersion"]
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
