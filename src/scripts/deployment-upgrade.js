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
async function deploymentUpgrade() {
  log.info("Starting automatic deployment upgrade");
  const deployments = await prisma.deployments({}, `{ releaseName, version }`);
  if (deployments.length === 0) {
    log.info("There are no deployments to delete :(");
    return;
  }
  const airflowChartVersion = config.get("deployments.defaults.chart.version");
  for (const deployment of deployments) {
    if (semver.lt(deployment.version, airflowChartVersion)) {
      const updatedDeployment = await prisma.updateDeployment({
        where: { id: deployment.id },
        data: { version: airflowChartVersion }
      });

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

// When a file is run directly from Node, require.main is set to its module.
if (require.main === module) {
  deploymentUpgrade().catch(err => {
    log.error(err);
  });
}
