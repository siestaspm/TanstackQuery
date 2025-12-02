import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../api/createPost";
import { handleUploadImages } from "../../api/directUpload";
import { usePostStore } from "../../store/usePostStore";

export const useCreatePost = () => {
  const addPost = usePostStore((state) => state.addPost);
  const updateProgress = usePostStore((state) => state.updateProgress);
  const updateStatus = usePostStore((state) => state.updateStatus);

  return useMutation({
    mutationFn: async ({ caption, username, images, token }) => {
      // Add post to queue
      addPost({ caption, username, images });

      const index = usePostStore.getState().uploadQueue.length - 1;

      try {
        updateStatus(index, "uploading");

        // Upload images to S3
        const uploadedKeys = await handleUploadImages(images, "post", (prog) => {
          updateProgress(index, prog); // callback for per-image progress
        });

        if (uploadedKeys === "Failure") {
          updateStatus(index, "failed");
          throw new Error("Image upload failed");
        }

        // Call createPost API
        const picture = uploadedKeys.join(",");
        await createPost({ token, caption, username, picture });

        updateProgress(index, 1);
        updateStatus(index, "success");
      } catch (err) {
        updateStatus(index, "failed");
        throw err;
      }
    },
  });
};
