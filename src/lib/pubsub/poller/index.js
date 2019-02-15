import log from "logger";
import shortid from "shortid";
import { bind, curry, partial } from "lodash";
import { PubSub } from "apollo-server";

/*
 * Create a pubsub poller. This creates an object that looks
 * the same as a typical asyncIterator, but also takes care of
 * cancelling a poller.
 */
export default function createPoller(func, interval = 5000) {
  // Create a new PubSub for this subscription.
  const pubsub = new PubSub();

  // Gernate a random internal topic.
  const topic = shortid.generate();

  // Create an async iterator. This is what a subscription resolver
  // expects to be returned.
  const iterator = pubsub.asyncIterator(topic);

  // Wrap the publish function on the pubsub object, pre-populating the topic.
  const publish = bind(curry(pubsub.publish, 2)(topic), pubsub);

  // Set up a timer to call the passed function. This is the poller.
  const timer = setInterval(partial(func, publish), interval);

  // Return the typical async iterator, but overwrite the return function
  // and cancel the timer. The return function gets called by the apollo server
  // when a subscription is cancelled.
  return {
    ...iterator,
    return: () => {
      log.info("Disconnecting subscription");
      clearInterval(timer);
      return iterator.return();
    }
  };
}
