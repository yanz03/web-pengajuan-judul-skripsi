import axios from "axios";

export const getAllGelombang = async () => {
  const response = await axios.get("/api/gelombang");
  return response.data.data;
};
