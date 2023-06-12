import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from 'react-query';

const MyClasses = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [], refetch } = useQuery(["classes", user], async () => {
    const res = await axiosSecure.get(`/classes/${user?.email}`);
    return res.data;
  });

  console.log(classes)
  return (
    <div className='w-full'>
      <h1 className="text-2xl font-bold mb-4">My Classes</h1>
      {classes.length === 0 ? (
        <p>No classes added yet.</p>
      ) : (
        <ul className="space-y-4 grid grid-cols-2 gap-10">
          {classes.map((classItem) => (
            <li key={classItem._id} className="border p-4 ">
              <h2 className="text-xl font-semibold mb-2">{classItem.name}</h2>
              <p className="text-gray-500 mb-2">Status: {classItem.status}</p>
              <div className="flex justify-between">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Provide Feedback</button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Update Class</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyClasses;
