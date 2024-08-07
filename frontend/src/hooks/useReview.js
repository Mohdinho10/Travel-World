import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/config";

export function useReview(id) {
  const queryClient = useQueryClient();
  const { mutate: createReview, isPending } = useMutation({
    queryKey: ["reviews", id],
    mutationFn: async ({ reviewId, reviewData }) => {
      try {
        const res = await axios.post(
          `${BASE_URL}/api/reviews/${reviewId}`,
          reviewData,
          {
            withCredentials: true,
          }
        );
        // console.log(id);
        console.log(res);
        toast.success("Review submitted");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { createReview, isPending };
}
