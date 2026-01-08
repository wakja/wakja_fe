import { getPosts } from "@/features/post";
import { useQuery } from "@tanstack/react-query";

export const useGetPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });
};
