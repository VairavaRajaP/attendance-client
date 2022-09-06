import * as Location from "expo-location";

export const getLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    // setErrorMsg("Permission to access location was denied");
    console.log("Permission to access location was denied");
    return;
  }

  let {
    coords: { latitude, longitude },
  } = await Location.getCurrentPositionAsync({});
  return { latitude, longitude };
};
