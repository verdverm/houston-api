import { DEFAULT_NEXT_IMAGE_TAG } from "constants";

export function next(parent) {
  return parent.next || DEFAULT_NEXT_IMAGE_TAG;
}

export default { next };
