import axios from "axios";
import {Config} from 'react-native-config'

export const addCommentRequest = async ({ token, comment, username, post_id }) => {
  const endpoint = `${Config.SL_API_BASE_URL}/xdeal/AddComment`
const parameter =  {
      token,
      username,
      referrence_id: post_id,
      post_id,
      referrence_type: "Member",
      comment,
      user_type: "Member",
      version_number: Config.VERSION_NUMBER,
    }
    console.log(endpoint)
    console.log(parameter)
  const { data } = await axios.post(endpoint, parameter );
  return data;
};