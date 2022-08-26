import { useContext } from "react";
import authApi from "../api/auth";
import AuthContext from "./context";
import authStorage from "./storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = async (authToken) => {
    await authStorage.storeToken(authToken);
    const { data: user } = await authApi.getMe("JWT " + authToken.access);
    const userStr = JSON.stringify(user);
    setUser(userStr);
    authStorage.storeUser(userStr);
  };

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
    authStorage.removeUser();
  };

  return { user, logIn, logOut, setUser };
};
