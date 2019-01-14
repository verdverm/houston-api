import { find, get } from "lodash";

export function fullName(parent) {
  const profile = get(parent, "profile");
  const fullName = find(profile, { key: "fullName" });
  return (fullName || {}).value;
}

export default { fullName };
