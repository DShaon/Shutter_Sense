import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const CheckOutForm = ({ price, selectedItem }) => {
  console.log("CheckOutForm", price, selectedItem);
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [trxId, setTrxId] = useState("");

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "keo na",
            name: user?.displayName || "voot",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError);
    }
    console.log(paymentIntent);
    if (paymentIntent.status == "succeeded") {
      alert("Payment success");
      setTrxId(paymentIntent.id);
      const trxId = paymentIntent.id;
      // TODO: Next steps after successful payment, e.g., update server-side records
      console.log(trxId);

      // Send the selectedItem and trxId to the server to store in the database
      try {
        await axiosSecure.post("/enrolledclass", {
          selectedItem,
          trxId,
        });
        console.log("Selected item and trxId saved successfully");
        // Add any additional steps or UI updates here
      } catch (error) {
        console.error("Failed to save selected item and trxId:", error);
        // Handle error scenario
      }

      // Update enrollCount and availableSeats on the server-side
      try {
        await axiosSecure.patch(`/classesCart/${selectedItem._id}/success`);
        console.log("Class item updated successfully");
        // Add any additional steps or UI updates here
      } catch (error) {
        console.error("Failed to update class item:", error);
        // Handle error scenario
      }

      // delete item after succesfull paymenr
      fetch(`http://localhost:5000/classcart/${selectedItem._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.deletedCount);
          if (data.deletedCount > 0) {
            // TODO should add sweet alert
            alert("item delete succes payment");
          }
        })
        .catch((error) => {
          console.error("Error deleting class item:", error);
        });
    }
  };
  console.log(selectedItem._id);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-outline btn-accent mt-5 w-20"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-500"> {cardError}</p>}
      {trxId && <p className="text-green-600"> Payment Success</p>}
    </>
  );
};

export default CheckOutForm;
