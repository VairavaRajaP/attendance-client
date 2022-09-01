import { useContext } from "react";
import authApi from "../api/auth";
import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = async (authToken) => {
    await authStorage.storeToken(authToken);
    // const { data: user } = await authApi.getMe("JWT " + authToken.access);
    const { data: user } = await authApi.getMe();

    const userStr = JSON.stringify(user);
    setUser(userStr);
    authStorage.storeUser(userStr);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
    authStorage.removeUser();
  };

  const getAttendance = async () => {
    const { data: attendances } = await authApi.getMyAttendance();
    console.log(attendances);
  };

  return { user, logIn, logOut, getAttendance, setUser };
};
