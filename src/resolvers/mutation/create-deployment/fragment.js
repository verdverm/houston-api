export default `fragment EnsureFields on Deployment {
  id,
  config,
  releaseName,
  properties { key, value }
}`;
