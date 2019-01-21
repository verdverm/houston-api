import { prisma } from "generated/client";
import { sendEmail } from "emails";
import log from "logger";

/*
 * Handle alert notifications from AlertManager.
 * @param {Object} req The request.
 * @param {Object} res The response.
 */
export default async function(req, res) {
  const { alerts = [] } = req.body;

  await Promise.all(
    alerts.map(async alert => {
      const releaseName = alert.labels.deployment;
      log.info(`Sending email alerts for ${releaseName}`);

      const emails = await prisma
        .deployment({ where: { releaseName } })
        .alertEmails();

      await Promise.all(emails.map(email => sendEmail(email, "alert", alert)));
    })
  );

  res.sendStatus(200);
}
