import axios from "axios";

const URL = "http://localhost:3000/";

export const singInUser = async (endpoint, data) => {
  const inUser = await axios.post(`${URL}${endpoint}`, data);
  return inUser;
};

export const loginUser = async (endpoint, data) => {
  const login = await axios.post(`${URL}${endpoint}`, data);
  return login;
};