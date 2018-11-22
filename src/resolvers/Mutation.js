import log from "../logger";
import shortid from "shortid";

// Create a new user. This is the singnup mutation.
async function createUser(parent, args, ctx) {
  // Const first = await ctx.db.query.usersConnection(
  //   {},
  //   `{ aggregate { count } }`
  // );
  // log.debug(first.aggregate.count);

  const user = await ctx.db.mutation.createUser(
    {
      data: { username: args.username, fullName: args.fullName }
    },
    `{ username }`
  );

  log.debug(user.username);
}

async function createToken(parent, args, ctx) {}

export default { createUser, createToken };
