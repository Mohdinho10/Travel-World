import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/config";

export function useBookTour() {
  const navigate = useNavigate();

  const { mutate: book, isPending: isBook } = useMutation({
    mutationFn: async (bookingData) => {
      try {
        const { data } = await axios.post(
          `${BASE_URL}/api/booking`,
          bookingData,
          {
            withCredentials: true,
          }
        );
        navigate("/thank-you", { replace: true });
        console.log(data);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        throw error;
      }
    },
  });

  return { book, isBook };
}
