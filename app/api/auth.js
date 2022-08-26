import client from "./client";

const jwtCreate = "auth/jwt/create/";
const meEndpoint = "auth/users/me/";

const login = (username, password) =>
  client.post(jwtCreate, { username, password });

const getMe = (header) => {
  return client.get(meEndpoint, {}, { headers: { Authorization: header } });
};

export default {
  login,
  getMe,
};
