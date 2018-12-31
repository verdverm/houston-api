import { size } from "lodash";

export function users() {
  return [];
}

export function groups() {
  return [];
}

export function deploymentCount(parent) {
  return size(parent.deployments);
}

export default { users, groups, deploymentCount };
