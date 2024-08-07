import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { toast } from "react-toastify";

export function useSearchBar() {
  const { isPending, data } = useQuery({
    queryKey: ["tours"],
    queryFn: async (data) => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/tours/search?city=${data.location}&distance=${data.distance}&maxGroupSize=${data.maxGroupSize}`,
          {
            withCredentials: true,
          }
        );
        console.log(res);
        return res;
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        throw error;
      }
    },
  });
  return { isPending, data };
}
