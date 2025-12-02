import axios from "axios";
import {Config} from 'react-native-config'
export const UnhypePost = async ({ token, username, post_id, post }) => {
const endpoint = `${Config.API_BASE_URL}/xdeal/Unhype`
const parameter =  {
      token,
      username,
      post_id,
      hype_post_id: post.hyped_by.find(item => item.hyped_by_username === username).hype_post_id,
      user_type: "Member",
      version_number: Config.VERSION_NUMBER
    }
    console.log(endpoint)
    console.log(parameter)
  const { data } = await axios.post(endpoint, parameter );
  return data;
};