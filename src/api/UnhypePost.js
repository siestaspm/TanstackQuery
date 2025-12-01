import axios from "axios";
export const UnhypePost = async ({ token, username, post_id, post }) => {
const endpoint = "https://pk9blqxffi.execute-api.us-east-1.amazonaws.com/xdeal/Unhype"
const parameter =  {
      token,
      username,
      post_id,
      hype_post_id: post.hyped_by.find(item => item.hyped_by_username === username).hype_post_id,
      user_type: "Member",
      version_number: "2.2.6",
    }
    console.log(endpoint)
    console.log(parameter)
  const { data } = await axios.post(endpoint, parameter );
  return data;
};