import axios from "axios";
export const getDataUser = async () => {
  const response = await axios.post("/api/users/me");
  return response.data.data;
};
