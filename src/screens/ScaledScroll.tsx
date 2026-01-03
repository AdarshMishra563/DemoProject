import { navigate } from "@utils/NavigationUtil";
import { SIZE, COLOR, FONTS, FONT_SIZE } from "@utils/Constant";
import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width * 0.46;
const CARD_HEIGHT = 270;
const SPACING = 14;
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
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigate("BlogDetails", { blog: item })}
      >
        <View style={styles.card}>
          {/* IMAGE */}
          <Image source={{ uri: item.image }} style={styles.image} />

          {/* CONTENT */}
          <View style={styles.content}>
            {/* TOP CONTENT */}
            <View style={styles.contentTop}>
              {/* AUTHOR + DATE */}
              <View style={styles.authorDateRow}>
                <View style={styles.authorRow}>
                  <Icon name="person" size={14} color="#6B7280" />
                  <Text style={styles.authorText}>{item.author}</Text>
                </View>
                <Text style={styles.date}>{item.date}</Text>
              </View>

              {/* TITLE */}
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>

              {/* DESCRIPTION */}
              <Text style={styles.subtitle} numberOfLines={2}>
                {item.subtitle}
              </Text>
            </View>

            {/* BOTTOM CONTENT */}
            <View style={styles.contentBottom}>
              <TouchableOpacity style={styles.readMoreButton}>
                <Text style={styles.readMoreText}>Read more</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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

  card: {
    width: CARD_WIDTH,
    height: SIZE.moderateScale(265),
    backgroundColor: COLOR.white,
    borderRadius: SIZE.moderateScale(6),
    marginRight: SIZE.moderateScale(SPACING),
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLOR.walletGray,
  },

  image: {
    width: "100%",
    height: SIZE.moderateScale(120),
  },

  content: {
    flex: 1,
    padding: SIZE.moderateScale(10),
    justifyContent: "space-between",
  },

  contentTop: {},

  contentBottom: {
    marginTop: SIZE.moderateScale(4),
  },

  authorDateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZE.moderateScale(6),
  },

  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZE.moderateScale(4),
  },

  authorText: {
    fontSize: FONT_SIZE.font10 * .93,
    color: COLOR.walletHistoryGrey,
    fontFamily: FONTS.parkinsansMedium,
  },

  date: {
    fontSize: FONT_SIZE.font10 * .95,
    color: COLOR.grey,
  },

  title: {
    fontSize: FONT_SIZE.font13 * 0.95,
    fontFamily: FONTS.parkinsansSemiBold,
    color: COLOR.dark,
    marginBottom: SIZE.moderateScale(6),
  },

  subtitle: {
    fontSize: FONT_SIZE.font11 * 0.85,
    color: COLOR.walletHistoryGrey, // Fixed invisible text
    lineHeight: SIZE.moderateScale(15),
    fontFamily: FONTS.parkinsansRegular,
  },

  readMoreButton: {
    borderWidth: 1,
    borderColor: COLOR.lightGray,
    borderRadius: SIZE.moderateScale(6),
    paddingHorizontal: SIZE.moderateScale(10),
    paddingVertical: SIZE.moderateScale(4),
    alignSelf: "flex-start",
  },

  readMoreText: {
    fontSize: FONT_SIZE.font10,
    color: COLOR.darkGrey,
    fontFamily: FONTS.parkinsansMedium,
  },
});
