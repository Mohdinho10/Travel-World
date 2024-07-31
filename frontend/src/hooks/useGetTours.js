import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { toast } from "react-toastify";

export function useGetTours(page) {
  const { isPending, data: tours } = useQuery({
    queryKey: ["tours", page],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/tours?page=${page}`, {
          withCredentials: true,
        });
        return data.tours;
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        throw error;
      }
    },
  });
  return { isPending, tours };
}
