import { COLOR, FONTS, SIZE } from "@utils/Constant";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const { width } = Dimensions.get("window");

const CARD_GAP = 12;

// base width for 3-column layout
const BASE_CARD_WIDTH = (width - CARD_GAP * 4) / 3;

// cumulative reductions
const CARD_WIDTH = BASE_CARD_WIDTH * 0.9408;   // 4% + 2%
const CARD_HEIGHT = BASE_CARD_WIDTH * 0.7534;  // 14% + 6%

const data = [
  { id: "1", title: "Subscription", icon: "file-check-outline" },
  { id: "2", title: "Free PDFs", icon: "file-pdf-box" },
  { id: "3", title: "Test Series", icon: "clipboard-text-outline" },
  { id: "4", title: "Combo", icon: "layers-outline" },
  { id: "5", title: "Smart Quiz", icon: "lightbulb-on-outline" },
  { id: "6", title: "E-books", icon: "book-open-page-variant" },
  { id: "7", title: "PDF Course", icon: "file-document-outline" },
  { id: "8", title: "Video Course", icon: "play-circle-outline" },
  { id: "9", title: "Test Series", icon: "check-decagram-outline" },
];

const ServicesGrid = () => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.card}>
      <Icon name={item.icon} size={26} color={COLOR.primary} />
      <Text style={styles.text}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>


      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={{ gap: CARD_GAP + 4 }}
        contentContainerStyle={{ gap: CARD_GAP }}
        scrollEnabled={false}
      />
    </View>
  );
};

export default ServicesGrid;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff", maxHeight: 340,
  },



  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  text: {
    marginTop: 6,
    fontSize: SIZE.moderateScale(10),
    color: "#374151",
    fontFamily: FONTS.parkinsansMedium,
    textAlign: "center",
  },
});
