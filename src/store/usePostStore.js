import { create } from "zustand";
import { persist } from "zustand/middleware";
import {handleUploadImages} from '../api/directUpload'
import { createPost } from "../api/createPost";

export const usePostStore = create(
  persist(
    (set, get) => ({
      uploadQueue: [], // { caption, username, images, token, progress, status }

      /** Add a full job to queue */
      addPost: (post) =>
        set((state) => ({
          uploadQueue: [
            ...state.uploadQueue,
            {
              ...post,
              progress: 0,
              status: "pending",
            },
          ],
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

      /** 
       * 🔥 REAL RETRY SYSTEM
       * Runs the FULL upload again
       */
      retryPending: async () => {
        const queue = [...get().uploadQueue];

        for (let i = 0; i < queue.length; i++) {
          let post = queue[i];

          if (post.status !== "failed" && post.status !== "pending") {
            continue;
          }

          try {
            // Mark as retrying/uploading
            queue[i].status = "uploading";
            set({ uploadQueue: [...queue] });

            console.log('DITOOO?????????')
            // 🔥 Retry S3 upload again
            const uploadedKeys = await handleUploadImages(
              post.images,
              "post",
              (prog) => {
                queue[i].progress = prog;
                set({ uploadQueue: [...queue] });
              }
            );

            if (!uploadedKeys || uploadedKeys === "Failure") {
              queue[i].status = "failed";
              set({ uploadQueue: [...queue] });
              continue; 
            }

            // 🔥 Retry API call
            await createPost({
              token: post.token,
              caption: post.caption,
              username: post.username,
              picture: uploadedKeys.join(","),
            });

            // Success
            queue[i].progress = 1;
            queue[i].status = "success";
            set({ uploadQueue: [...queue] });

            // Remove after success
            queue.splice(i, 1);
            i--; // fix index after removal

            set({ uploadQueue: [...queue] });

          } catch (err) {
            console.log('HELLO SIRA', err)
            // Still failed — keep in queue
            queue[i].status = "failed";
            set({ uploadQueue: [...queue] });
          }
        }
      },
    }),
    { name: "post-storage" }
  )
);
