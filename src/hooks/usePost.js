import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPost } from "../api/fetchPost";
import { addCommentRequest } from "../api/addCommentRequest";
import { getComments } from "../api/getComments";
import { hypePost } from "../api/hypePost";
import { UnhypePost } from "../api/UnhypePost";

// ---------------- POST ----------------
export const usePost = (token) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["post", token],
    queryFn: () => fetchPost(token),
    enabled: !!token,
    staleTime: 24 * 60 * 60 * 1000, // 24h
    cacheTime: 24 * 60 * 60 * 1000, // persist for 24h
    refetchOnReconnect: true,       // auto refetch when back online
    refetchOnWindowFocus: true,
  });

  return {
    ...query,
    refetchPost: query.refetch,
  };
};

// ---------------- COMMENTS ----------------
export const useComments = (post_id, token) => {
  return useInfiniteQuery({
    queryKey: ["comments", post_id, token],
    queryFn: ({ pageParam = "" }) =>
      getComments({ post_id, token, last_comment_post_id: pageParam }),
    enabled: !!post_id && !!token,
    getNextPageParam: (lastPage) =>
      lastPage.comments.length > 0 ? lastPage.nextCursor : undefined,
    staleTime: 24 * 60 * 60 * 1000,
    cacheTime: 24 * 60 * 60 * 1000,
  });
};

// ---------------- ADD COMMENT ----------------
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
        if (!old)
          return { pages: [{ comments: [optimisticComment], nextCursor: null }], pageParams: [undefined] };

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
      queryClient.invalidateQueries(["post", token]);
    },
  });
};

// ---------------- HYPE / UNHYPE ----------------
export const useHypePost = (post_id, token, username) => {
  const queryClient = useQueryClient();

  const hypeMutation = useMutation({
    mutationFn: hypePost,
    onMutate: async () => {
      await queryClient.cancelQueries(["post", token]);
      const previous = queryClient.getQueryData(["post", token]);

      queryClient.setQueryData(["post", token], (old) => ({
        ...old,
        number_of_hype: (old?.number_of_hype || 0) + 1,
        hyped_by: [...(old?.hyped_by || []), { hype_post_id: `temp-${Date.now()}`, hyped_by_username: username }],
      }));

      return { previous };
    },
    onError: (_, __, context) => {
      if (context?.previous) queryClient.setQueryData(["post", token], context.previous);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["post", token], (old) => ({
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
      await queryClient.cancelQueries(["post", token]);
      const previous = queryClient.getQueryData(["post", token]);

      queryClient.setQueryData(["post", token], (old) => ({
        ...old,
        number_of_hype: Math.max((old?.number_of_hype || 1) - 1, 0),
        hyped_by: (old?.hyped_by || []).filter((h) => h.hyped_by_username !== username),
      }));

      return { previous };
    },
    onError: (_, __, context) => {
      if (context?.previous) queryClient.setQueryData(["post", token], context.previous);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["post", token]);
    },
  });

  return { hypeMutation, unhypeMutation };
};
