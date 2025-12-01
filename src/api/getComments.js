import axios from "axios";
export const getComments = async ({ post_id, token, last_comment_post_id = "" }) => {
    const endpoint = "https://pk9blqxffi.execute-api.us-east-1.amazonaws.com/xdeal/GetComments"
    const parameter = { version_number: "2.2.6", token, post_id, last_comment_post_id, user_type: "Member" }

    console.log(post_id)
  const { data } = await axios.post(
    endpoint,
    parameter
  );
  const comments = Array.isArray(data) ? data : [];
  const nextCursor = comments.length > 0 ? comments[comments.length - 1].comment_post_id : undefined;

  return { comments, nextCursor };
};