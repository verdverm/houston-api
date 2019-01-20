import { prisma } from "generated/client";
import { sendEmail } from "emails";
import log from "logger";

/*
 * Handle alert notifications from AlertManager.
 * @param {Object} req The request.
 * @param {Object} res The response.
 */
export default async function(req, res) {
  const { alerts = [] } = res.body;

  await Promise.all(
    alerts.map(async alert => {
      const releaseName = alert.labels.deployment;
      log.info(`Sending email alerts for ${releaseName}`);

      const deployment = prisma.deployment({ where: { releaseName } });
      const emails = [];
    })
  );
}
