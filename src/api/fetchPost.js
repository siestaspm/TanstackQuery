import axios from "axios";
import {Config} from "react-native-config";
export const fetchPost = async (token) => {
  const endpoint = `${Config.API_BASE_URL}/xdeal/GetPostDetails`
  const parameter = { token, post_id: 211, version_number: Config.VERSION_NUMBER, user_type: "Member" }
  console.log(endpoint)
  console.log(parameter)
  const { data } = await axios.post(endpoint, parameter);
  return data[0];
};