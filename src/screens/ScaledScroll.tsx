import { navigate } from "@utils/NavigationUtil";
import { SIZE, COLOR, FONTS, FONT_SIZE } from "@utils/Constant";
import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import BlogCard, { CARD_WIDTH } from "../components/BlogCard";


const { width } = Dimensions.get("window");

const SPACING = 10;
const SNAP_INTERVAL = CARD_WIDTH + SPACING;

const cards = [
  {
    id: "1",
    title: "Customer Satisfaction Survey",
    subtitle:
      "Analyze user experience & feedback to improve product quality and customer retention rates.",
    date: "12 Dec 2025",
    author: "Author",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
  },
  {
    id: "2",
    title: "Market Research Report",
    subtitle:
      "Understand market demand and competitive landscape through comprehensive data analysis.",
    date: "08 Dec 2025",
    author: "Author",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  },
  {
    id: "3",
    title: "Employee Feedback Study",
    subtitle:
      "Workplace improvement data collection focusing on employee satisfaction and engagement.",
    date: "05 Dec 2025",
    author: "Author",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
  },
];

const BusinessSurveyCards = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item }: any) => {
    return (
      <BlogCard
        item={item}
        onPress={() => navigate("BlogDetails", { blog: item })}
        containerStyle={{
          marginRight: SIZE.moderateScale(SPACING),
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP_INTERVAL}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 14 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
    </View>
  );
};

export default BusinessSurveyCards;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    paddingVertical: SIZE.moderateScale(10),
  },

});
