import elasticsearch from "elasticsearch";

/*
 * Search for webserver/scheduler/worker logs for a deployment.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {[]DeploymentLog} A list of DeploymentLogs.
 */
export default async function logs(parent, args) {
  const config = config.get("elasticsearch");
  const es = elasticsearch.Client(config);
  const startTS = args.timestamp.get;
  const minutesToAdd = args.timestamp.since;
  console.log(es, startTS, minutesToAdd);
  return [];
}
