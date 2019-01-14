import fragment from "./fragment";
import { addFragmentToInfo } from "graphql-binding";
import { size } from "lodash";

export function users(parent, args, ctx, info) {
  return ctx.db.query.users(
    {
      where: {
        roleBindings_some: {
          workspace: { id: parent.id }
        }
      }
    },
    info ? addFragmentToInfo(info, fragment) : info
  );
}

export function groups() {
  return [];
}

export function deploymentCount(parent) {
  return size(parent.deployments);
}

export default { users, groups, deploymentCount };
