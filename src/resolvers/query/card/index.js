import { getStripeCard } from "stripe";
/*
 * Get associated credit card information from Stripe.
 * @param {Object} parent The result of the parent resolver.
 * @param {Object} args The graphql arguments.
 * @return Card type.
 */
export default async function card(parent, args) {
  const { stripeCustomerId } = args;
  const response = await getStripeCard(stripeCustomerId);

  const customerInfo = response;
  const cardInfo = response.sources.data[0] || {};

  const card = {
    expMonth: cardInfo.exp_month,
    expYear: cardInfo.exp_year,
    last4: cardInfo.last4,
    name: cardInfo.name,
    brand: cardInfo.brand,
    billingEmail: customerInfo.email,
    company: customerInfo.metadata.company
  };

  return card;
}
