/*
 * This resolver is pretty much just for compatibility purposes.
 * It can be removed once orbit and the cli are up to date with the API.
 * @param {Object} parent The result of the parent resolver.
 * @return {[]Object} Array of key/value profile values.
 */
export function profile({ avatarUrl }) {
  const profile = [];
  avatarUrl && profile.push({ key: "avatarUrl", value: avatarUrl });
  return profile;
}

export async function userCapabilities(parent, args, ctx) {
  const trialStartDate = await ctx.db.query.user(
    {
      where: { id: args.userId }
    },
    `{ createdAt }`
  );

  const trialEndDate = new Date(trialStartDate + 12096e5);
  console.log(trialStartDate);
  console.log(trialEndDate);
  const isTrialing = Date.now() < trialEndDate ? true : false;

  return isTrialing;
}

export default { profile, userCapabilities };
