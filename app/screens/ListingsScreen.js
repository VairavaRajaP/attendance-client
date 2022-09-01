import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
// import Card from "../components/Card";
import ListCard from "../components/ListCard";
// import Text from "../components/Text";
import colors from "../config/colors";
// import listingsApi from "../api/listings";
import authApi from "../api/auth";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import Table from "../components/Table";

function ListingsScreen({ navigation }) {
  // const getListingsApi = useApi(listingsApi.getListings);
  const getListingsApi = useApi(authApi.getMyAttendance);

  useEffect(() => {
    getListingsApi.request();
  }, []);

  // console.log(getListingsApi.data.results[0]);

  const initial = {
    tableHead: ["Head", "Head2", "Head3", "Head4"],
    tableData: [
      ["1", "2", "3", "4"],
      ["a", "b", "c", "d"],
      ["1", "2", "3", "4"],
      ["a", "b", "c", "d"],
    ],
  };

  const table = ({ item }) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: 80 }}>
          <Text>{item.date}</Text>
        </View>
        <View style={{ width: 110 }}>
          <Text>{item.in_time}</Text>
        </View>
        <View style={{ width: 110 }}>
          <Text>{item.out_time}</Text>
        </View>
      </View>
    );
  };

  return (
    <Screen style={styles.screen}>
      {getListingsApi.error && (
        <>
          <AppText>Couldn't retrieve the listings.</AppText>
          <Button title="Retry" onPress={getListingsApi.request} />
        </>
      )}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator visible={getListingsApi.loading} />
        <ListCard
          title="       Date"
          subTitle1="      In time"
          subTitle2="    Out time"
          // imageUrl={item.images[0].url}
          // onPress={() =>
          //   navigation.navigate(routes.LISTING_DETAILS, item)
          // }
          // thumbnailUrl={item.images[0].thumbnailUrl}
        />
        {getListingsApi.data.count ? (
          <FlatList
            data={getListingsApi.data.results}
            keyExtractor={(listing) => listing.id.toString()}
            renderItem={({ item }) => (
              <ListCard
                title={item.date}
                subTitle1={item.in_time.slice(0, item.in_time.length - 7)}
                subTitle2={item.out_time.slice(0, item.in_time.length - 7)}
                // imageUrl={item.images[0].url}
                onPress={() =>
                  navigation.navigate(routes.LISTING_DETAILS, item)
                }
                // thumbnailUrl={item.images[0].thumbnailUrl}
              />
            )}
          />
        ) : null}
      </View>
      {/* <Table initial={getListingsApi.data.results} /> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
