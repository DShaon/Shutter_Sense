import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "react-query";

const useStudent = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: isStudent = false, isLoading: isStudentLoading } = useQuery(
    ["isStudent", user?.email],
    async () => {
      if (!user) {
        return false; // User is not logged in, return default value
      }

      try {
        const res = await axiosSecure.get(`/users/student/${user.email}`);
        console.log("is student:", res);

        return res.data.student;
      } catch (error) {
        console.error("Error checking student status:", error);
        return false; // Failed to check student status, return default value
      }
    }
  );

  return [isStudent, isStudentLoading];
};

export default useStudent;
