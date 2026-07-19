import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axiosSecure from "../../utils/axiosSecure";

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      setLoading(true);

      // 1. Create Payment Intent
      const paymentIntentRes = await axiosSecure.post("/funding/create-payment-intent", {
        amount: Number(amount),
      });

      const clientSecret = paymentIntentRes.data.clientSecret;
      const card = elements.getElement(CardElement);

      if (!card) {
        setLoading(false);
        return;
      }

      // Confirm Payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
        },
      });

      if (result.error) {
        alert(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const user = JSON.parse(localStorage.getItem("user"));

        // 2. Save Funding Record
        await axiosSecure.post("/funding", {
          name: user?.name || user?.displayName || "Unknown User",
          email: user?.email || "unknown@email.com",
          amount: Number(amount),
          paymentIntentId: result.paymentIntent.id,
        });

        alert("Payment Successful & Funding Saved");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert("Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mt-4">
      <div className="border p-4 rounded-lg mb-4 bg-white">
        <CardElement
          options={{
            hidePostalCode: false,
          }}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!stripe || loading || !amount}
      >
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>
    </form>
  );
};

export default CheckoutForm;