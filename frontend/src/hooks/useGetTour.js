import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { toast } from "react-toastify";

export function useGetTour(tourId) {
  const { isPending, data: tour } = useQuery({
    queryKey: ["tour", tourId],
    queryFn: async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/tours/${tourId}`, {
          withCredentials: true,
        });

        return data;
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        throw error;
      }
    },
  });
  return { isPending, tour };
}
