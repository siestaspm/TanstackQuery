import axios from "axios";
export const addCommentRequest = async ({ token, comment, username, post_id }) => {
const endpoint = "https://pk9blqxffi.execute-api.us-east-1.amazonaws.com/xdeal/AddComment"
const parameter =  {
      token,
      username,
      referrence_id: post_id,
      post_id,
      referrence_type: "Member",
      comment,
      user_type: "Member",
      version_number: "2.2.6",
    }
    console.log(endpoint)
    console.log(parameter)
  const { data } = await axios.post(endpoint, parameter );
  return data;
};