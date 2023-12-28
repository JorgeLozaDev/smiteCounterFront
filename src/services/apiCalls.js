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

export const profileUser = async (endpoint, token) => {
  const dataUser = await axios.get(`${URL}${endpoint}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return dataUser;
};

export const updateProfile = async (endpoint, token, data) => {
  const info = {
    email: data.email,
    username: data.username,
    birthday: data.birthday,
  };
  const headers = {
    Authorization: "Bearer " + token.credentials,
  };

  const updateUser = await axios.put(`${URL}${endpoint}`, info, { headers });
  return updateUser;
};

// ========== GODS ==========

export const allGodsActives = async (endpoint) => {
  const allGods = await axios.get(`${URL}${endpoint}`);
  return allGods;
};

export const filterGodsActives = async (endpoint, data) => {
  const filterGods = await axios.post(`${URL}${endpoint}`, data);

  return filterGods;
};

export const godsDetails = async (endpoint, id) => {
  const godDetails = await axios.get(`${URL}${endpoint}` + id);
  return godDetails;
};
