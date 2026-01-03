import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ScrollContainer } from '@components/common/ScrollContainer';
import Feather from "react-native-vector-icons/Feather";
import { COLOR, FONTS, FONT_SIZE, SIZE } from "@utils/Constant";

const surveyNews = [
  {
    id: "1",
    title:
      "Customer Satisfaction Survey Reveals Key Growth Areas Across Multiple Service Touchpoints",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
    time: "18:24",
    duration: "10 min read",
  },
  {
    id: "2",
    title:
      "Employee Feedback Survey Highlights Critical Workplace Gaps and Productivity Challenges",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
    time: "17:10",
    duration: "8 min read",
  },
  {
    id: "3",
    title:
      "Market Research Survey Predicts Major Shifts in Consumer Behavior and Purchase Decisions",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    time: "16:05",
    duration: "6 min read",
  },
  {
    id: "4",
    title:
      "Product Feedback Survey Drives Smarter Feature Prioritization and Roadmap Planning",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    time: "14:42",
    duration: "7 min read",
  }, {
    id: "5",
    title:
      "Market Research Survey Predicts Major Shifts in Consumer Behavior and Purchase Decisions",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    time: "16:05",
    duration: "6 min read",
  }, {
    id: "6",
    title:
      "Employee Feedback Survey Highlights Critical Workplace Gaps and Productivity Challenges",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
    time: "17:10",
    duration: "8 min read",
  },
  {
    id: "7",
    title:
      "Employee Feedback Survey Highlights Critical Workplace Gaps and Productivity Challenges",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
    time: "17:10",
    duration: "8 min read",
  },
];

const SurveyListScreen = ({ navigation }: any) => {
  const renderItem = ({ item }: any) => {
    return (
      <View>
        <View style={styles.card}>
          {/* IMAGE */}
          <Image source={{ uri: item.image }} style={styles.image} />

          {/* CONTENT */}
          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={3}>
              {item.title}
            </Text>

            {/* META - Changed to left alignment */}
            <View style={styles.metaRow}>
              <Text style={styles.metaText}>{item.time}</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaText}>{item.duration}</Text>
            </View>
          </View>
        </View>

        {/* DIVIDER */}
        <View style={styles.divider} />
      </View>
    );
  };

  return (
    <ScrollContainer
      header={
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Feather name="arrow-left" size={22} color={COLOR.dark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Surveys</Text>
          <View style={{ width: 22 }} />
        </View>
      }
    >
      <View style={{ flex: 1 }}>
        {surveyNews.map((item) => (
          <View key={item.id}>
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.content}>
                <Text style={styles.title} numberOfLines={3}>
                  {item.title}
                </Text>
                <View style={styles.metaRow}>
                  <Text style={styles.metaText}>{item.time}</Text>
                  <Text style={styles.metaDot}>•</Text>
                  <Text style={styles.metaText}>{item.duration}</Text>
                </View>
              </View>
            </View>
            <View style={styles.divider} />
          </View>
        ))}
      </View>
    </ScrollContainer>
  );
};

export default SurveyListScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLOR.white,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZE.moderateScale(20),
    paddingVertical: SIZE.moderateScale(16),
    backgroundColor: COLOR.white,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.grayLight,
  },

  headerTitle: {
    fontSize: FONT_SIZE.font18,
    fontFamily: FONTS.parkinsansSemiBold,
    color: COLOR.dark,
  },



  /* CARD */
  card: {
    flexDirection: "row",
    padding: SIZE.moderateScale(16),
  },

  image: {
    width: SIZE.moderateScale(82),
    height: SIZE.moderateScale(82),
    borderRadius: SIZE.moderateScale(9),
  },

  content: {
    flex: 1,
    marginLeft: SIZE.moderateScale(14),
    justifyContent: "space-between",
  },

  title: {
    fontSize: FONT_SIZE.font12,
    fontFamily: FONTS.parkinsansSemiBold,
    color: COLOR.dark,
    lineHeight: SIZE.moderateScale(17),
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    // Changed from justifyContent: "flex-end" to align left
    justifyContent: "flex-start",
  },

  metaText: {
    fontSize: FONT_SIZE.font11,
    fontFamily: FONTS.parkinsansRegular,
    color: COLOR.darkGrey,
  },

  metaDot: {
    marginHorizontal: SIZE.moderateScale(6),
    color: COLOR.darkGrey,
    fontSize: FONT_SIZE.font12,
  },

  divider: {
    height: 1,
    backgroundColor: COLOR.grayLight,
    marginLeft: SIZE.moderateScale(16),
  },
});