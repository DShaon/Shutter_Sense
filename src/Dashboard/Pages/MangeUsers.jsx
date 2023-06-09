import { useQuery } from "react-query";

const MangeUsers = () => {
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await fetch("http://localhost:5000/users");
    return res.json();
  });

  const handleUserDelete = () => {};
  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-5 ">Total Users {users.length}</h1>
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
                <td>Student</td>
                <td className="flex flex-col text-xs gap-1">
                  <button className="border rounded-md p-1">Make Admin</button>
                  <button className="border rounded-md p-1">
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
