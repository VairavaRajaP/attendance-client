import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";

import Text from "./Text";
import colors from "../config/colors";

function Card({
  title,
  subTitle1,
  subTitle2,
  imageUrl,
  onPress,
  thumbnailUrl,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            {subTitle1}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            {subTitle2}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 5,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
    flexDirection: "row",
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    marginLeft: 5,
    marginRight: 5,
  },
  title: {
    marginRight: 20,
  },
});

export default Card;
