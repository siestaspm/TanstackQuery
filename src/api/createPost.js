

import axios from "axios";
export const createPost = async ({ token, caption, username, picture }) => {
const endpoint = "https://pk9blqxffi.execute-api.us-east-1.amazonaws.com/xdeal/CreatePost"
const parameter =  {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkiLCJuYmYiOjE3NjQzMTk5MDksImV4cCI6MTc2NjkxMTkwOSwiaXNzIjoiWHVyMzRQMSIsImF1ZCI6Ilh1cjQ0UFAifQ.zSqZ5gIsy6Yy9dmU-6GmshUNKGrXQHeqIDKw-QqcLzI",
      user_code: "MC-1000002188",
      member_code: "MC-1000002188",
      user_type: "Member",
      username,
      item_tag: [],
      user_tag: [],
      city: "Mountain View",
      country: "United States",
      country_code: "PH",
      caption: caption,
      location: "",
      private: "false",
      picture: [picture],
      version_number: "2.2.6",
    }
    console.log(endpoint)
    console.log(parameter)
  const { data } = await axios.post(endpoint, parameter );
  console.log(data)
  return data;
};