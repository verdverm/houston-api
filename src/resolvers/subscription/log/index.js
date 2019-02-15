import log from "logger";
import createPoller from "pubsub/poller";
import { formatLogDocument, search } from "deployments/logs";
import { get } from "lodash";
import moment from "moment";

export async function subscribe(parent, args, ctx) {
  log.info("Starting log subscription");

  const { releaseName } = await ctx.db.query.deployment(
    { where: { id: args.deploymentUuid } },
    `{ releaseName }`
  );

  const component = args.component;
  const searchPhrase = get(args, "search");
  const interval = get(args, "interval", 1000);

  // This variable gets reset to the timestamp of the latest record
  // that was previously published to the client. It will then be used
  // in the next iteration to get new records.
  let gt = moment();

  // Return a wrapped asyncIterator.
  return createPoller(publish => {
    search(releaseName, component, gt, searchPhrase).then(res => {
      // Pull out the result documents.
      const hits = get(res, "hits.hits", []);
      log.debug(`Got ${hits.length} hits in subscription query`);

      // Publish the records to the PubSub engine, and set the
      // most recent record timestamp.
      hits.forEach(log => {
        publish({ log: formatLogDocument(log) });
        gt = moment(log._source["@timestamp"]);
      });
    });
  }, interval);
}

export default { subscribe };
