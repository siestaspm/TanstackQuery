import axios from "axios";

export const postSuggestedAccounts = async (memberData) => {
  if (!memberData?.token) {
    throw new Error("No member token available");
  }

  const endpoint =
    "https://pk9blqxffi.execute-api.us-east-1.amazonaws.com/xdeal/SuggestedAccounts";

  const parameter = {
    token: memberData.token,
    user_type: "Member",
    version_number: "2.2.6",
  };

  try {
    const response = await axios.post(endpoint, parameter);

    console.log("API response:", response.data); // debug log

    return response.data; // React Query will receive this
  } catch (error) {
    console.error("API error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || error.message || "Request failed"
    );
  }
};
