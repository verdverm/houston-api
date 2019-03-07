import { DuplicateEmailError } from "./errors";
import { includes, some } from "lodash";

/*
 * Take an error from prisma, and throw an error
 * that is compatible with orbit. This may be removed when
 * we refactor error handling.
 * @param {Object} error The prisma error.
 */
export function throwPrismaError(e) {
  if (duplicateEmailError(e)) throw new DuplicateEmailError();
}

/*
 * Check if error is a duplicate email.
 * @param {Object} error The error from prisma.
 * @return {Boolean} If a uplicate user error is found.
 */
export function duplicateEmailError(e) {
  return hasError(e, "A unique constraint would be violated on User");
}

/* Generic function to look for a message in an array
 * of errors from GraphQL.
 * @param {Object} error An error object from prisma (or any GraphQL server).
 * @param {String} msg A message to look for in the array.
 * @return {Boolean} If the message was found.
 */
export function hasError(e, msg) {
  return some(e.result.errors, e => includes(e.message, msg));
}
