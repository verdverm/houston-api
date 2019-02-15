import log from "logger";
import config from "config";
import elasticsearch from "elasticsearch";
import { clone } from "lodash";

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

  log.info(`Elasticsearch disabled, returning empty result set`);
}

/*
 * Map an Elasticsearch log document to the format expected on the client.
 * @param {Object} document An elasticsearch result document.
 * @return {Object} The properly formatted object.
 */
export function formatLogDocument({ _id: id, _source: src }) {
  // Deconstruct and rename some variables from the log object.
  const { component, release, "@timestamp": timestamp, log: message } = src;

  // Return the fields in the expected format.
  return { id, component, release, timestamp, message };
}
