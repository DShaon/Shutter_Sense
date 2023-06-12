import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "react-query";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: isAdmin = false, isLoading: isAdminLoading } = useQuery(
    ["isAdmin", user?.email],
    async () => {
      if (!user) {
        return false; // User is not logged in, return default value
      }

      try {
        const res = await axiosSecure.get(`/users/admin/${user.email}`);
        console.log("is admin:", res);

        return res.data.admin;
      } catch (error) {
        console.error("Error checking admin status:", error);
        return false; // Failed to check admin status, return default value
      }
    }
  );

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
