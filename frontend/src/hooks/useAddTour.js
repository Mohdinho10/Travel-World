import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useAddTour() {
  const navigate = useNavigate();
  const { mutate: addTour, isPending: isAddTour } = useMutation({
    mutationFn: async (tourData) => {
      try {
        const { data } = await axios.post(`${BASE_URL}/api/tours`, tourData, {
          withCredentials: true,
        });
        console.log(data);
        navigate("/tours", { replace: true });
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        throw error;
      }
    },
  });

  return { addTour, isAddTour };
}
