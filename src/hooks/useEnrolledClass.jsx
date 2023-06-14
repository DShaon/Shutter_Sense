import { useContext } from "react";

import { useQuery } from "react-query";
import { AuthContext } from "../Providers/AuthProvider";


const useEnrolledClass = () => {
  const { user, loading } = useContext(AuthContext);
  // const token = localStorage.getItem('access-token');

  const {
    refetch,
    data: enrolledClass = [],
    isLoading,
  } = useQuery({
    queryKey: ["enrolledClass", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/enrolledclass?email=${user.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  return {  enrolledClass, refetch, isLoading };
};
export default useEnrolledClass;
