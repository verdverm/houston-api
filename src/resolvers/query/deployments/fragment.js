export default `fragment EnsureFields on Deployment {
  id,
  workspace { id },
  properties { key, value }
}`;
