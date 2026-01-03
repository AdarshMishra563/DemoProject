import React from "react";
import { COLOR, FONTS, SIZE, FONT_SIZE } from '@utils/Constant';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");

const CARD_WIDTH = (width - 14 * 3) / 2; // 2 cards + spacing
const CARD_HEIGHT = 270;
const SPACING = 14;

const blogsData = [
  {
    id: "1",
    title: "Customer Satisfaction Survey",
    subtitle:
      "Analyze user experience & feedback to improve product quality and customer retention rates.",
    date: "12 Dec 2025",
    author: "Author",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
  },
  {
    id: "2",
    title: "Market Research Report",
    subtitle:
      "Understand market demand and competitive landscape through comprehensive data analysis.",
    date: "08 Dec 2025",
    author: "Author",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  },
  {
    id: "3",
    title: "Employee Feedback Study",
    subtitle:
      "Workplace improvement data collection focusing on employee satisfaction and engagement.",
    date: "05 Dec 2025",
    author: "Admin",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
  },
  {
    id: "4",
    title: "Product Usage Insights",
    subtitle:
      "Understand feature engagement and user interaction patterns to enhance product development.",
    date: "02 Dec 2025",
    author: "Admin",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
  },
  {
    id: "5",
    title: "Customer Retention Trends",
    subtitle:
      "Analyze loyalty behavior, churn rates, and retention strategies to improve customer value.",
    date: "30 Nov 2025",
    author: "Admin",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
  },
  {
    id: "6",
    title: "Business Growth Metrics",
    subtitle:
      "Track KPIs & performance indicators across departments to measure growth and opportunities.",
    date: "27 Nov 2025",
    author: "Admin",
    image: "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?w=800",
  },
  {
    id: "7",
    title: "User Behavior Analysis",
    subtitle:
      "Understand navigation patterns, feature usage, and user journeys to improve product design.",
    date: "24 Nov 2025",
    author: "Admin",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
  },
  {
    id: "8",
    title: "Survey Design Best Practices",
    subtitle:
      "Improve response quality and data reliability through effective survey design strategies.",
    date: "20 Nov 2025",
    author: "Admin",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
  },
];

const BlogsScreen = ({ navigation }: any) => {
  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("BlogDetails", { blog: item })}
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
                  <MaterialIcons name="person" size={14} color="#6B7280" />
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
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={22} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Blogs</Text>

        <View style={{ width: 22 }} />
      </View>

      {/* HEADER DIVIDER */}
      <View style={styles.divider} />

      {/* LIST */}
      <FlatList
        data={blogsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SPACING,
          paddingTop: SPACING,
          paddingBottom: 20,
        }}
      />
    </SafeAreaView>
  );
};

export default BlogsScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLOR.white,
  },

  /* HEADER */
  header: {
    height: SIZE.moderateScale(52),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SIZE.moderateScale(16),
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: FONT_SIZE.font18,
    fontFamily: FONTS.parkinsansSemiBold,
    color: COLOR.dark,
  },

  divider: {
    height: 1,
    width: "100%",
    backgroundColor: COLOR.walletGray,
  },

  /* CARD */
  card: {
    width: CARD_WIDTH,
    height: SIZE.moderateScale(265),
    backgroundColor: COLOR.white,
    borderRadius: SIZE.moderateScale(6),
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLOR.walletGray,
    marginBottom: SIZE.moderateScale(SPACING),
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
    color: COLOR.walletHistoryGrey,
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