import queries from "./queries";
import log from "logger";
import createPoller from "pubsub/poller";
import config from "config";
import request from "request-promise-native";

// Build the Prometheus request URL
export function buildURI(query) {
  const host = config.get("prometheus.host");
  const port = config.get("prometheus.port");
  return `http://${host}:${port}/api/v1/${query}`;
}

// Start the subscription to poll PromQL metrics
export async function subscribe(parent, args, { db, pubsub }) {
  log.info("Starting metric subscription");

  // Get the release name of the current deployment
  let { releaseName } = await db.query.deployment(
    { where: { id: args.deploymentUuid } },
    `{ releaseName }`
  );

  // To test on localhost uncomment this line
  // releaseName = "dynamical-revolution-1971";

  // Poll interval
  const interval = config.get("prometheus.pollInterval");

  // Return a wrapped asyncIterator, killing the subscription after 20 minutes.
  return createPoller(
    async publish => {
      // Get promises for all the metric endpoints
      const getQueries = queries(releaseName, args.since, args.step);
      const promises = getQueries.map(async ql => {
        const response = await request({
          method: "GET",
          json: true,
          uri: buildURI(ql.query)
        }).catch(err => log.debug(err));

        return {
          label: ql.name,
          result: response.data ? response.data.result : [],
          uri: buildURI(ql.query)
        };
      });

      // Capture all the promise results
      const results = await Promise.all(promises);

      publish({ metrics: results });
      log.info(`${promises.length} metrics for ${releaseName} sent.`);
    },
    pubsub,
    interval,
    1200000
  );
}

export default { subscribe };
