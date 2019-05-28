import { createStripeCustomer } from "stripe";

/*
 * Add payment information to a workspace. Create a customer for the user and a subscription for the Workspace in Stripe.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @param {Object} ctx The graphql context.
 * @return {Card} The card information for the customer added.
 */
export default async function addCard(parent, args, ctx) {
  const response = await createStripeCustomer(
    args.company,
    args.billingEmail,
    args.token,
    args.workspaceUuid
  );
  const stripeCustomerId = response.id || {};

  const cardInfo = response.sources.data[0] || {};

  await ctx.db.mutation.updateWorkspace({
    data: {
      stripeCustomerId: stripeCustomerId
    },
    where: {
      id: args.workspaceUuid
    }
  });

  const card = {
    expMonth: cardInfo.exp_month,
    expYear: cardInfo.exp_year,
    last4: cardInfo.last4,
    name: cardInfo.name,
    brand: cardInfo.brand,
    billingEmail: cardInfo.email,
    company: cardInfo.metadata.company
  };

  return card;
}
