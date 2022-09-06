import React, { useEffect, useState, useCallback } from "react";
import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import * as Location from "expo-location";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import ListCard from "../components/ListCard";
import colors from "../config/colors";
// import listingsApi from "../api/listings";
import authApi from "../api/auth";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import { getLocation } from "../hooks/useLocation";

function ListingsScreen({ navigation }) {
  // const getListingsApi = useApi(listingsApi.getListings);
  const getListingsApi = useApi(authApi.getMyAttendances);
  const postAttendanceApi = useApi(authApi.postMyAttendance);

  const [refreshing, setRefreshing] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    getListingsApi.request();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    let location = await getLocation();
    await postAttendanceApi.request(location);
    await getListingsApi.request();
    setRefreshing(false);
  }, []);

  return (
    <Screen style={styles.screen}>
      {getListingsApi.error && (
        <>
          <AppText>Couldn't retrieve the listings.</AppText>
          <Button title="Retry" onPress={getListingsApi.request} />
        </>
      )}
      {postAttendanceApi.data.error && (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <AppText
            style={{
              color: colors.danger,
              fontWeight: "bold",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              margin: 10,
            }}
          >
            {postAttendanceApi.data.error}.
          </AppText>
          {/* <Button title={postAttendanceApi.data.error} onPress={onRefresh} /> */}
        </View>
      )}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ListCard
          title="      Date"
          subTitle1="      In time"
          subTitle2="    Out time"
        />
        {getListingsApi.data.count ? (
          <FlatList
            data={getListingsApi.data.results}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            keyExtractor={(listing) => listing.id.toString()}
            renderItem={({ item }) => (
              <ListCard
                title={item.date === today ? "     Today     " : item.date}
                subTitle1={item.in_time.slice(0, item.in_time.length - 7)}
                subTitle2={item.out_time.slice(0, item.in_time.length - 7)}
                onPress={() =>
                  navigation.navigate(routes.LISTING_DETAILS, item)
                }
              />
            )}
          />
        ) : null}
        <ActivityIndicator visible={getListingsApi.loading} />
        {/* {location ? (
          <>
            <ListCard
              title=""
              subTitle1={"Latitude:" + location.latitude}
              subTitle2={"Longitude:" + location.longitude}
            />
          </>
        ) : null} */}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
