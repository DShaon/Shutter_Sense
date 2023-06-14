import React, { useContext, useEffect, useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import useTeacher from "../../hooks/useTeacher";
import { AuthContext } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Classes = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isTeacher] = useTeacher();
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  console.log(isAdmin);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/classes/approved");
        // Replace with your API endpoint
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchData();
  }, []);

  //   TODO add swal instead of alert
  const handleSelectedClass = (classItem) => {
    console.log(classItem);
    if (user) {
      const { _id, ...classItemWithoutId } = classItem; // Exclude _id field

      classItemWithoutId.userEmail = user.email;

      fetch("http://localhost:5000/classcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classItemWithoutId), // Send classItem without _id field
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else if (res.status === 400) {
            throw new Error("Class item already exists"); // Throw error for duplication
          } else {
            throw new Error("Failed to add class item");
          }
        })
        .then((data) => {
          if (data.insertedId) {
            alert("Class item added");
          }
        })
        .catch((error) => {
          console.error("Error adding class item:", error);
          if (error.message === "Class item already exists") {
            alert("Class item already exists"); // Display duplication message
          } else {
            alert("Failed to add class item");
          }
        });
    } else {
      alert("Please login to select the class");
      navigate("/login");
    }
  };
  console.log(classes)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Approved Classes</h1>
      <div className="grid grid-cols-3 gap-4">
        {classes.map((classItem) => (
          <div
            key={classItem._id}
            className="p-4 border rounded-lg shadow-lg bg-opacity-50 backdrop-blur-md"
          >
            <img
              src={classItem.image}
              alt={classItem.name}
              className="w-full h-80 object-cover mb-2 rounded-lg"
            />
            <p className="font-bold">{classItem.name}</p>
            <p className="text-gray-600">
              Instructor: {classItem.instructorName}
            </p>
            <p className="text-gray-600">
              Available Seats: {classItem.availableSeats}
            </p>
            <p className="text-gray-600">Price: {classItem.price}</p>
            <button
              onClick={() => handleSelectedClass(classItem)}
              className="px-4 py-2 bg-blue-500 text-white font-bold rounded disabled:bg-gray-400"
              disabled={
                classItem.availableSeats === 0 ||
                isAdmin == true ||
                isTeacher == true
              }
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
