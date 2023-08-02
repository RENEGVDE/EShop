import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  "pk_test_51L3lnpLMdfQvARVFzI1Wc5ifOnCLstLIT0dtSGbi6gQpldYXwFsALex9JSPc8DD2BKCWPF2YCIaMDwSHekZEPX2000BjyabhnM"
  // `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
  //   `${secrets.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
);
