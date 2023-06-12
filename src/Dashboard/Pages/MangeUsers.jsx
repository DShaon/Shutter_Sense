import { useQuery } from "react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MangeUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  // make admin
  const handleMakeAdmin = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/users/admin/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          alert("MAke admin done"); // TODO swal add korbo
        }
      });
  };

  // make teacher
  const handleMakeTeacher = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/users/teacher/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          alert("Make teacher done"); // TODO swal add korbo
        }
      });
  };

  const handleUserDelete = () => {};
  return (
    <div className="w-full">
      <h1 className="text-center text-2xl font-bold mb-5 ">
        Total Users {users.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="flex flex-col text-xs gap-1">
                  <button
                    onClick={() => handleMakeAdmin(user._id)}
                    className="border rounded-md p-1"
                  >
                    Make Admin
                  </button>
                  <button
                    onClick={() => handleMakeTeacher(user._id)}
                    className="border rounded-md p-1"
                  >
                    Make Teacher
                  </button>
                  <button
                    onClick={handleUserDelete}
                    className="border rounded-md p-1"
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
            {/* row 1 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MangeUsers;
