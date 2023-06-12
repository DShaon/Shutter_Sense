import React from "react";
import useClasses from "../../hooks/useClasses";

const ManageClasses = () => {
  const [classes, loading, refetch] = useClasses();

  const handleApprove = (id) => {
    // Send a request to the server to update the class status to "approved"
    fetch(`http://localhost:5000/classes/approve/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Refetch the classes data to update the UI
        refetch();
      })
      .catch((error) => {
        console.log(error);
        // Handle any errors that occur during the request
      });
  };

  const handleDeny = (id) => {
    // Send a request to the server to update the class status to "denied"
    fetch(`http://localhost:5000/classes/deny/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Refetch the classes data to update the UI
        refetch();
      })
      .catch((error) => {
        console.log(error);
        // Handle any errors that occur during the request
      });
  };

  return (
    <div>
      <h1>Manage Classes ({classes.length})</h1>

      {loading ? (
        <p>Loading classes...</p>
      ) : (
        <table className="table table-compact w-2/3">
          <thead>
            <tr>
              <th>Class Image</th>
              <th>Class Name</th>
              <th>Instructor Name</th>
              <th>Instructor Email</th>
              <th>Available Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem) => (
              <tr key={classItem._id}>
                <td>
                  <img src={classItem.image} alt={classItem.name} />
                </td>
                <td>{classItem.name}</td>
                <td>{classItem.instructorName}</td>
                <td>{classItem.instructorEmail}</td>
                <td>{classItem.availableSeats}</td>
                <td>{classItem.price}</td>
                <td>{classItem.status}</td>
                <td>
                  <button
                    className={`btn btn-primary ${
                      classItem.status === "approved" ? "disabled" : ""
                    }`}
                    disabled={classItem.status === "approved"}
                    onClick={() => handleApprove(classItem._id)}
                  >
                    Approve
                  </button>
                  <button
                    className={`btn btn-secondary ${
                      classItem.status === "denied" ? "disabled" : ""
                    }`}
                    disabled={classItem.status === "denied"}
                    onClick={() => handleDeny(classItem._id)}
                  >
                    Deny
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageClasses;
