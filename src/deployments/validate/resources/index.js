import { InvalidDeploymentError } from "errors";
import { get } from "lodash";

export function validateComponent(component, max) {
  const { cpu, memory } = get(component, "resources.limits");
  if (cpu > parseInt(max.cpu))
    throw new InvalidDeploymentError("Maximum CPU for pod exceeded");
  if (memory > parseInt(max.memory))
    throw new InvalidDeploymentError("Maximum Memory for pod exceeded");
}

// Validate component resources
export default function validateResources(resources = {}, max) {
  const { scheduler, webserver } = resources;
  if (scheduler) validateComponent(scheduler, max);
  if (webserver) validateComponent(webserver, max);
}
