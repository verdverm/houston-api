export const deploymentFragment = `fragment EnsureFields on Deployment {
  id
  config
  releaseName
  version
  extraAu
  airflowVersion
  alertEmails
}`;

export const workspaceFragment = `{
  stripeCustomerId
  isSuspended
  deployments {id}
}`;
