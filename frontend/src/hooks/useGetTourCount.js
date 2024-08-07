import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { toast } from "react-toastify";

export function useGetTourCount() {
  const { isPending, data: tourCount } = useQuery({
    queryKey: ["tours"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/tours/count`, {
          withCredentials: true,
        });
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        throw error;
      }
    },
  });
  return { isPending, tourCount };
}
