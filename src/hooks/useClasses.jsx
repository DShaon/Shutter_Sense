import { useQuery } from "react-query";
// import useAxiosSecure from "./useAxiosSecure";

const useClasses = () => {
  // from chatgpt
  //   const [axiosSecure] = useAxiosSecure();

  //   const fetchClasses = async () => {
  //     try {
  //       const response = await axiosSecure.get("/classes");
  //       return response.data;
  //     } catch (error) {
  //       throw new Error("Failed to fetch classes");
  //     }
  //   };

  //   const { data: classes, isLoading, error, refetch } = useQuery("classes", fetchClasses);

  //   return { classes, isLoading, error, refetch };

  const {
    refetch,
    data: classes = [],
    isLoading: loading,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/classes");
      return res.json();
    },
  });
  return [classes, loading, refetch];
};

export default useClasses;
