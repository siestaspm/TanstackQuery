import axios from "axios";
export const fetchPost = async (token) => {
  const endpoint = "https://pk9blqxffi.execute-api.us-east-1.amazonaws.com/xdeal/GetPostDetails"
  const parameter = { token, post_id: 211, version_number: "2.2.6", user_type: "Member" }
  console.log(endpoint)
  console.log(parameter)
  const { data } = await axios.post(endpoint, parameter);
  return data[0];
};