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
import { GlobalStyles } from '@styles/GlobalCss';
import { CategoryDetailCard } from '@components/CategoryDetailCard';

const surveyNews = [
  {
    id: "1",
    title:
      "Customer Satisfaction Survey Reveals Key Growth Areas Across Multiple Service Touchpoints",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
    time: "18:24",
    duration: "10 min read",
    sectionTitle: "Growth",
    sectionCount: "12",
  },
  {
    id: "2",
    title:
      "Employee Feedback Survey Highlights Critical Workplace Gaps and Productivity Challenges",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
    time: "17:10",
    duration: "8 min read", sectionTitle: "Workplace",
  },
  {
    id: "3",
    title:
      "Market Research Survey Predicts Major Shifts in Consumer Behavior and Purchase Decisions",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    time: "16:05",
    duration: "6 min read", sectionTitle: "Workplace",
  },
  {
    id: "4",
    title:
      "Product Feedback Survey Drives Smarter Feature Prioritization and Roadmap Planning",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    time: "14:42",
    duration: "7 min read",
    sectionTitle: "Product",
    sectionCount: "5",
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
    sectionTitle: "Workplace",
    sectionCount: "8",
  },
  {
    id: "7",
    title:
      "Employee Feedback Survey Highlights Critical Workplace Gaps and Productivity Challenges",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800",
    time: "17:10",
    duration: "8 min read",
    sectionTitle: "Growth",
    sectionCount: "12",
  },
];

const SurveyListScreen = ({ navigation }: any) => {


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
        {surveyNews.map((item: any, index: number) => (
          <View key={item.id}>
            <CategoryDetailCard
              item={item}
              sectionTitle={item.sectionTitle || "Business"}
              sectionCount={item.sectionCount || "5"}
              onPress={() => {
                if (index % 2 === 0) {
                  navigation.navigate('Checkout2');
                } else {
                  navigation.navigate('CheckoutSummary2');
                }
              }}
            />
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
    ...GlobalStyles.textSemiBold18,
  },



  divider: {
    height: 1,
    backgroundColor: COLOR.grayLight,
    marginLeft: SIZE.moderateScale(16),
  },


});