import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FC } from "react";
import { useState, FormEvent } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { stripePayment } from "../../utils/firebase/firebase.utils";
import Button, { ButtonTypes } from "../button/button.component";
import { HttpsCallableResult } from "firebase/functions";

import "./payment-form.styles.scss";

interface IPaymentFormProps {
  amount: number;
  currentUser?: {
    displayName: string;
  };
}

const PaymentForm: FC<IPaymentFormProps> = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessingPayment(true);

    const response = await stripePayment({ amount: amount * 100 });
    const cardDetails = elements.getElement(CardElement);

    if (!cardDetails || !response) return;

    const clientSecret = (response.data as { body: { client_secret: any } })
      .body.client_secret;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser.name : "Guest",
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment succeeded");
      }
    }
  };

  return (
    <div className="payment-form-container">
      <form className="form-container" onSubmit={paymentHandler}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <div className="payment-button">
          <Button
            type="submit"
            buttonType={ButtonTypes.default}
            isDisabled={isProcessingPayment}
          >
            Pay now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
