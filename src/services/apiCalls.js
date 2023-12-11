import axios from "axios";

const URL = "http://localhost:3000/";

export const insertUser = async (endpoint, data) => {
  const inUser = await axios.post(`${URL}${endpoint}`, data);
  return inUser;
};
