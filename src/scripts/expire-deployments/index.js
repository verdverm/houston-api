/*
 * Script to soft delete expired deployments
 */
import "dotenv/config";
import log from "logger";
import { prisma } from "generated/client";

/*
 * Soft deletion of expired deployments
 */
async function expireDeployments() {
  log.info("Starting soft deletion of expired deployments");

  const expireDate = new Date();

  // Find all suspended deployments.
  const deployments = await prisma
    .deployments({ where: { workspace: { trialEndsAt_lte: expireDate } } })
    .$fragment(`{ id releaseName workspace { id trialEndsAt } }`);

  // Return early if we have no deployments.
  if (deployments.length === 0) {
    log.info("There are no deployments to delete :(");
    return;
  }

  for (const deployment of deployments) {
    // Pull out some deployment fields.
    const { releaseName, id } = deployment;

    log.info(`Updating expired deployment ${releaseName}`);

    // Update the database.
    await prisma.updateDeployment({
      where: { id: id },
      data: { deletedAt: new Date() }
    });
  }

  log.info("Soft deletion of expired deployments has been finished!");
}

// When a file is run directly from Node, require.main is set to its module.
if (require.main === module) {
  expireDeployments().catch(err => {
    log.error(err);
  });
}
