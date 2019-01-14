import {
  PublicSignupsDisabledError,
  InviteTokenNotFoundError,
  InviteTokenEmailError
} from "errors";
import { getProvider } from "oauth/config";
import { prisma } from "generated/client";
import config from "config";

/*
 * Create a new user.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {AuthToken} The auth token.
 */
export default async function(req, res) {
  // Grab params out of the request body.
  const { id_token: idToken, expires_in: expiration, state } = req.body;

  // Get the provider module.
  const provider = getProvider(state.provider);

  // Create a token.
  const data = {
    encodedJWT: idToken,
    expires: provider.expires(expiration)
  };

  // Validate the token.
  const jwt = await provider.validate(data);

  // Grab user data
  const userData = provider.userData(jwt);

  // Search for user in our system using email address.
  const user = await prisma.users({
    where: { emails_some: { address: userData.profile.email } }
  });

  if (!user) {
    // Check to see if this is the first signup.
    const count = await prisma
      .usersConnection({})
      .aggregate()
      .count();

    const isFirst = count === 0;

    // Check to see if we are allowing public signups.
    const publicSignups = config.get("publicSignups");

    // If it's not the first signup and we're not allowing public signups, check for invite.
    if (!isFirst && !publicSignups && !state.inviteToken) {
      throw new PublicSignupsDisabledError();
    }

    // Validate our invite token if exists.
    // const inviteToken = validateInviteToken(args, ctx);
  }

  res.status(200).send({});
}

/*
 * Validates that an invite token is valid, throws otherwise.
 * @param {GraphQLArguments} args The graphql arguments.
 * @param {GraphQLContext} ctx The graphql context.
 * @return {InviteToken} The invite token.
 */
export function validateInviteToken(query) {
  // Return early if no token found.
  if (!query.inviteToken) return;

  // Grab the invite token.
  const token = prisma.inviteTokensConnection(
    { where: { token: query.token } },
    `{ workspace { id }, email }`
  );

  // Throw error if token not found.
  if (!token) throw new InviteTokenNotFoundError();

  // Throw error if email does not match.
  if (token.email !== query.email) throw new InviteTokenEmailError();

  // Return validated token.
  return token;
}
