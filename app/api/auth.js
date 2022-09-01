import client from "./client";

const jwtCreate = "auth/jwt/create/";
const meEndpoint = "auth/users/me/";
const attendanceEndpoint = "core/attendances/";

const login = (username, password) =>
  client.post(jwtCreate, { username, password });

const getMe = () => {
  // return client.get(meEndpoint, {}, { headers: { Authorization: header } });
  return client.get(meEndpoint);
};

const getMyAttendance = () => {
  return client.get(attendanceEndpoint);
};

export default {
  login,
  getMe,
  getMyAttendance,
};
