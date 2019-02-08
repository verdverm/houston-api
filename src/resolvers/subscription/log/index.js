import log from "logger";
import { PubSub } from "apollo-server";
import casual from "casual";
const pubsub = new PubSub();

const TOPIC = "deployment-logs";

setInterval(() => {
  pubsub.publish(TOPIC, {
    log: {
      id: casual.uuid,
      timestamp: casual.moment,
      message: casual.text,
      component: casual.word,
      level: casual.word,
      workspace: casual.uuid,
      release: casual.word
    }
  });
}, 1000);

export function subscribe() {
  log.info("Starting log subscription");
  return pubsub.asyncIterator([TOPIC]);
}

export default { subscribe };
