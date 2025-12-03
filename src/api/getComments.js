import axios from "axios";
import {Config} from "react-native-config";
export const getComments = async ({ post_id, token, last_comment_post_id = "" }) => {
    const endpoint = `${Config.SL_API_BASE_URL}/xdeal/GetComments`
    const parameter = { version_number: Config.VERSION_NUMBER, token, post_id, last_comment_post_id, user_type: "Member" }

    console.log(post_id)
  const { data } = await axios.post(
    endpoint,
    parameter
  );
  const comments = Array.isArray(data) ? data : [];
  const nextCursor = comments.length > 0 ? comments[comments.length - 1].comment_post_id : undefined;

  return { comments, nextCursor };
};