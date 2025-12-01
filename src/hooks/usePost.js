import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPost } from "../api/fetchPost";
import { addCommentRequest } from "../api/addCommentRequest";
import { getComments } from "../api/getComments";
import { hypePost } from "../api/hypePost";
import { UnhypePost } from "../api/UnhypePost";

export const usePost = (token) => {
  const query = useQuery({
    queryKey: ["post"],
    queryFn: () => fetchPost(token),
    enabled: !!token,
    staleTime: 60_000,
    refetchInterval: 100_000, // auto refetch every 10 seconds
    refetchOnReconnect: true,
  });

  return {
    ...query,
    refetchPost: query.refetch,
  };
};

export const useComments = (post_id, token) => {
  return useInfiniteQuery({
    queryKey: ["comments", post_id, token],
    queryFn: ({ pageParam = "" }) =>
      getComments({ post_id, token, last_comment_post_id: pageParam }),
    enabled: !!post_id && !!token,
    getNextPageParam: (lastPage) =>
      lastPage.comments.length > 0 ? lastPage.nextCursor : undefined,
    staleTime: 20_000,
    cacheTime: 5 * 60_000,
  });
};

export const useAddComment = (post_id, token) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCommentRequest,
    onMutate: async ({ comment }) => {
      await queryClient.cancelQueries(["comments", post_id, token]);
      const previous = queryClient.getQueryData(["comments", post_id, token]);

      const optimisticComment = {
        id: `temp-${Date.now()}`,
        username: "You",
        comment,
        image_link: "https://via.placeholder.com/40",
        isSkeleton: true,
        created_at: new Date().toISOString(),
      };

      queryClient.setQueryData(["comments", post_id, token], (old) => {
        if (!old) return { pages: [{ comments: [optimisticComment], nextCursor: null }], pageParams: [undefined] };
        const firstPage = old.pages[0] || { comments: [], nextCursor: null };
        return {
          ...old,
          pages: [
            { ...firstPage, comments: [...firstPage.comments, optimisticComment] },
            ...old.pages.slice(1),
          ],
        };
      });

      return { previous };
    },
    onError: (_, __, context) => {
      if (context?.previous) queryClient.setQueryData(["comments", post_id, token], context.previous);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", post_id, token]);
      queryClient.invalidateQueries(["post"]);
    },
  });
};

// ---------------- HYPE / UNHYPE ----------------

export const useHypePost = (post_id, token, username) => {
const queryClient = useQueryClient();

const hypeMutation = useMutation({
mutationFn: hypePost,
onMutate: async (variables) => {
  await queryClient.cancelQueries(["post"]);
  const previous = queryClient.getQueryData(["post"]);

  queryClient.setQueryData(["post"], (old) => ({
    ...old,
    number_of_hype: (old?.number_of_hype || 0) + 1, // increment
    hyped_by: [...(old?.hyped_by || []), { hype_post_id: `temp-${Date.now()}`, hyped_by_username: username }],
  }));

  return { previous };
},
onError: (_, __, context) => {
  if (context?.previous) queryClient.setQueryData(["post"], context.previous);
},
onSuccess: (data) => {
  queryClient.setQueryData(["post"], (old) => ({
    ...old,
    hyped_by: [
      ...old.hyped_by.filter((h) => !h.hype_post_id.toString().startsWith("temp")),
      ...data,
    ],
  }));
},

});

const unhypeMutation = useMutation({
mutationFn: UnhypePost,
onMutate: async () => {
  await queryClient.cancelQueries(["post"]);
  const previous = queryClient.getQueryData(["post"]);

  queryClient.setQueryData(["post"], (old) => ({
    ...old,
    number_of_hype: Math.max((old?.number_of_hype || 1) - 1, 0), // decrement
    hyped_by: (old?.hyped_by || []).filter((h) => h.hyped_by_username !== username),
  }));

  return { previous };
},
onError: (_, __, context) => {
  if (context?.previous) queryClient.setQueryData(["post"], context.previous);
},
onSuccess: () => {
  queryClient.invalidateQueries(["post"]);
},


});

return { hypeMutation, unhypeMutation };
};
