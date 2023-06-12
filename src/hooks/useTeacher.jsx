import { useContext } from "react";
import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Providers/AuthProvider";

const useTeacher = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: isTeacher = false, isLoading: isTeacherLoading } = useQuery({
    queryKey: ["isTeacher", user?.email],
    queryFn: async () => {
      if (!user) {
        return false; // User is not logged in, return default value
      }

      try {
        const res = await axiosSecure.get(`/users/teacher/${user.email}`);
        console.log("is teacher:", res);

        return res.data.teacher;
      } catch (error) {
        console.error("Error checking teacher status:", error);
        return false; // Failed to check teacher status, return default value
      }
    },
  });

  return [isTeacher, isTeacherLoading];
};

export default useTeacher;
