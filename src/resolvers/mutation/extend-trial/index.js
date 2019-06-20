export default async function extendTrial(parent, args, ctx) {
  const workspace = await ctx.db.mutation.updateWorkspace({
    data: {
      trialEndsAt: args.trialEndsAt
    },
    where: {
      id: args.workspaceUuid
    }
  });

  return workspace;
}
