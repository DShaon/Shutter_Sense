import React from "react";
import useClassCart from "../../hooks/useClassCart";
import { Link, useNavigate } from "react-router-dom";

const SelectedClass = () => {
  const { classItem, isLoading, refetch } = useClassCart();
  const navigate = useNavigate();

  console.log(classItem);

  const handleDelete = (item) => {
    fetch(`http://localhost:5000/classcart/${item._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.deletedCount);
        if (data.deletedCount > 0) {
          refetch();
        }
      })
      .catch((error) => {
        console.error("Error deleting class item:", error);
      });
  };

  // const handlePay = (item) => {
  //   const queryString = `price=${item.price}&classItem=${JSON.stringify(item)}`;
  //   navigate(`/dashboard/pay?${queryString}`);
  // };
  const handlePay = (item) => {
    navigate(`/dashboard/pay?id=${item._id}`);
  };
  

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">
            Selected Class ({classItem.length})
          </h1>
          <div className="grid grid-cols-3 gap-5">
            {classItem.map((item) => (
              <div
                key={item._id}
                className="p-4 border border-blue-500 rounded-lg mb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover mb-2 rounded-lg"
                />
                <p className="font-bold mb-2">{item.name}</p>
                <p className="text-gray-600">
                  Instructor: {item.instructorName}
                </p>
                <p className="text-gray-600">
                  Available Seats: {item.availableSeats}
                </p>
                <button
                  onClick={() => handlePay(item)}
                  className="px-4 py-2 bg-blue-500 text-white font-bold rounded mr-2"
                >
                  Pay
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="px-4 py-2 bg-red-500 text-white font-bold rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedClass;
