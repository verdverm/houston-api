import sampleLogs from "./sample";
import log from "logger";
import config from "config";
import elasticsearch from "elasticsearch";
import { clone, random, range } from "lodash";
import casual from "casual";

/*
 * This is a singleton instance of a log generator. It
 * infinately iterates over sample logs.
 */
export const generateLogMessage = (function* generateLogs() {
  const max = sampleLogs.length;
  let counter = 0;
  while (true) {
    yield sampleLogs[++counter];
    if (counter == max) counter = 0;
  }
})();

/*
 * Generate full sample elasticsearch log records, using
 * the log message generator, for a given release, component.
 * @param {String} release A release name.
 * @param {String} component A deployment component.
 * @return {[]Object} A randomly sized array of log records.
 */
export function generateLogRecords(release, component) {
  return {
    hits: {
      hits: range(random(5)).map(() => ({
        _id: casual.uuid,
        _source: {
          release,
          component,
          message: generateLogMessage.next().value,
          "@timestamp": new Date()
        }
      }))
    }
  };
}

/*
 * Return an elasticsearch search query for the given args.
 * @param {String} something Something.
 * @return {Object} An elasticsearch query.
 */
export function createLogQuery(release, component, gt, searchPhrase) {
  const query = {
    index: `fluentd.${release}.*`,
    sort: "@timestamp:asc",
    size: 1000, // XXX: Change to scroll query.
    body: {
      query: {
        bool: {
          must: [
            {
              match: {
                component: component
              }
            },
            {
              match: {
                release: release
              }
            }
          ],
          filter: {
            range: {
              "@timestamp": {
                gt
              }
            }
          }
        }
      }
    }
  };

  if (searchPhrase) {
    query.body.query.bool.must.push({
      match_phrase: {
        log: searchPhrase
      }
    });
  }

  return query;
}

/*
 * Execute a search query aginst elasticsearch.
 * This is a wrapper around the function above to skip
 * if elasticsearch is disabled.
 */
export async function search(...args) {
  const { enabled, client } = config.get("elasticsearch");

  if (enabled) {
    const es = elasticsearch.Client(clone(client));
    const query = createLogQuery(...args);
    return await es.search(query);
  }

  log.info(`Elasticsearch disabled, returning sample logs`);
  return generateLogRecords(args[0], args[1]);
}

/*
 * Map an Elasticsearch log document to the format expected on the client.
 * @param {Object} document An elasticsearch result document.
 * @return {Object} The properly formatted object.
 */
export function formatLogDocument({ _id: id, _source: src }) {
  // Deconstruct and rename some variables from the log object.
  const { component, release, "@timestamp": timestamp, message } = src;

  // Return the fields in the expected format.
  return { id, component, release, timestamp, message };
}
