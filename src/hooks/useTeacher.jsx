import { useContext } from "react";


import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Providers/AuthProvider";

const useTeacher = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: isTeacher, isLoading: isTeacherLoading } = useQuery({
    queryKey: ["isTeacher", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/teacher/${user?.email}`);
      console.log("is teacher res", res);

      return res.data.teacher;
    },
  });
  return [isTeacher, isTeacherLoading];
};

export default useTeacher;
