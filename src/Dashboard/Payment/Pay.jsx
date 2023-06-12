import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import useClassCart from "../../hooks/useClassCart";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Pay = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const { classItem } = useClassCart();
  const [price, setPrice] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Fetch the class item based on the ID
    const selectedItem = classItem.find((item) => item._id == id);

    if (selectedItem) {
      setPrice(selectedItem.price);
      setSelectedItem(selectedItem);
    }
  }, [id, classItem]);
  console.log(id, price);

  return (
    <div className="w-full">
      <h2 className="text-3xl mb-10">Payment page</h2>
      {price && (
        <Elements stripe={stripePromise}>
          <CheckOutForm price={price} selectedItem={selectedItem} />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
