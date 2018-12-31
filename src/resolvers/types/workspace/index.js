export function users() {
  return [];
}

export function groups() {
  return [];
}

export function deploymentCount(parent) {
  return parent.deployments ? parent.deployments.length : 0;
}

export default { users, groups, deploymentCount };
