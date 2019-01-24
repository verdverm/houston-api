import log from "logger";
import Mailchimp from "mailchimp-api-v3";
import config from "config";

const { enabled, apiKey, listId } = config.get("mailchimp");

export async function addMember(email) {
  if (!enabled) {
    return log.info("Mailchimp disabled, skipping email campaign.");
  }

  try {
    const mailchimp = new Mailchimp(apiKey);
    await mailchimp.post(`/lists/${listId}/members`, {
      email_address: email,
      status: "subscribed"
    });
  } catch (err) {
    log.error(err.message);
  }
}
