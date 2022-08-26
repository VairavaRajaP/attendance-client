import * as SecureStore from "expo-secure-store";
import useAuth from "../auth/useAuth";

const access = "authToken";
const refresh = "authRefresh";
const userToken = "user";

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(access, authToken.access);
    await SecureStore.setItemAsync(refresh, authToken.refresh);
  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};

const storeUser = async (user) => {
  try {
    await SecureStore.setItemAsync(userToken, user);
  } catch (error) {
    console.log("Error storing the user object", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(access);
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};

const getUser = async () => {
  try {
    const userFetch = await SecureStore.getItemAsync(userToken);
    if (userFetch) {
      return userFetch;
    }
    const token = await getToken();

    if (!token) return null;
    useAuth().logIn(token);
  } catch (error) {
    console.log("Error getting the user object", error);
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(access);
    await SecureStore.deleteItemAsync(refresh);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};

const removeUser = async () => {
  try {
    await SecureStore.deleteItemAsync(userToken);
  } catch (error) {
    console.log("Error removing the user object", error);
  }
};

export default {
  getToken,
  getUser,
  removeToken,
  removeUser,
  storeToken,
  storeUser,
};
