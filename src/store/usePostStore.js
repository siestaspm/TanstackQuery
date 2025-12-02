import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePostStore = create(
  persist(
    (set, get) => ({
      uploadQueue: [], // { caption, username, images, progress, status }
      
      addPost: (post) =>
        set((state) => ({
          uploadQueue: [...state.uploadQueue, { ...post, progress: 0, status: "pending" }],
        })),

      updateProgress: (index, progress) =>
        set((state) => {
          const queue = [...state.uploadQueue];
          queue[index].progress = progress;
          return { uploadQueue: queue };
        }),

      updateStatus: (index, status) =>
        set((state) => {
          const queue = [...state.uploadQueue];
          queue[index].status = status;
          return { uploadQueue: queue };
        }),

      removePost: (index) =>
        set((state) => {
          const queue = [...state.uploadQueue];
          queue.splice(index, 1);
          return { uploadQueue: queue };
        }),

      retryPending: () => {
        const queue = get().uploadQueue;
        queue.forEach((post, i) => {
          if (post.status === "failed" || post.status === "pending") {
            post.status = "pending";
          }
        });
        set({ uploadQueue: [...queue] });
      },
    }),
    { name: "post-storage" }
  )
);
