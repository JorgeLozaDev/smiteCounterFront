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
export const allGods = async (endpoint, token) => {
  const headers = {
    Authorization: "Bearer " + token.credentials,
  };
  const allGods = await axios.get(`${URL}${endpoint}`, { headers });
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

export const addGod = async (endpoint, token, data) => {
  const headers = {
    Authorization: "Bearer " + token.credentials,
  };
  const addGod = await axios.post(`${URL}${endpoint}`, data, { headers });
  return addGod;
};

export const DeleteGodLogic = async (endpoint, token, data) => {
  const headers = {
    Authorization: "Bearer " + token.credentials,
  };
  const dat = {
    isActive: data,
  };
  const god = await axios.put(`${URL}${endpoint}`, dat, { headers });
  return god;
};
export const UpdateGod = async (endpoint, token, data) => {
  const headers = {
    Authorization: "Bearer " + token.credentials,
  };

  const god = await axios.put(`${URL}${endpoint}`, data, { headers });
  return god;
};

export const getAllListCounters = async (endpoint, token) => {
  const headers = {
    Authorization: "Bearer " + token.credentials,
  };
  const allLists = await axios.get(`${URL}${endpoint}`, { headers });
  return allLists;
};

export const saveListCounters = async (endpoint, token, data) => {
  const headers = {
    Authorization: "Bearer " + token.credentials,
  };

  const saveList = await axios.post(`${URL}${endpoint}`, data, { headers });
  return saveList;
};

export const deleteListCounters = async (endpoint, token) => {
  const headers = {
    Authorization: "Bearer " + token.credentials,
  };

  const deleteList = await axios.delete(`${URL}${endpoint}`, { headers });
  return deleteList;
};

export const getListCounterById = async (endpoint, token) => {
  const headers = {
    Authorization: "Bearer " + token.credentials,
  };
  const allLists = await axios.get(`${URL}${endpoint}`, { headers });
  return allLists;
};

export const deleteCountersGod = async (endpoint, token, godId) => {
  const headers = {
    Authorization: "Bearer " + token.credentials,
  };
  const data = {
    godId: godId,
  };
  console.log(godId);
  const deleteList = await axios.delete(`${URL}${endpoint}`, { headers, data });
  return deleteList;
};
