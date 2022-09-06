import client from "./client";
import useLocation from "../hooks/useLocation";

const jwtCreate = "auth/jwt/create/";
const meEndpoint = "auth/users/me/";
const attendanceEndpoint = "core/attendances/";
const postAttendance = "core/attendances/today/";

const login = (username, password) =>
  client.post(jwtCreate, { username, password });

const getMe = () => {
  // return client.get(meEndpoint, {}, { headers: { Authorization: header } });
  return client.get(meEndpoint);
};

const getMyAttendances = () => {
  return client.get(attendanceEndpoint);
};

const postMyAttendance = (location) => {
  return client.patch(postAttendance, location);
};

export default {
  login,
  getMe,
  getMyAttendances,
  postMyAttendance,
};
