import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import { COLOR, FONTS, FONT_SIZE, SIZE } from "@utils/Constant";
import { navigate } from "@utils/NavigationUtil";
import { ScrollContainer } from "@components/common/ScrollContainer";

const CheckoutSummaryScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState("Cat 1");

  return (
    <ScrollContainer
      header={
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={22} color={COLOR.dark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout Summary</Text>
          <View style={{ width: 22 }} />
        </View>
      }
      scrollStyle={styles.container}
    >
      {/* TOP INFO */}
      <View style={styles.topInfo}>
        <View style={styles.leftInfo}>
          <View style={styles.infoRow}>
            <Feather name="credit-card" size={16} color="#6B7280" />
            <Text style={styles.infoText}>₹499 Amount</Text>
          </View>

          <View style={styles.infoRow}>
            <Feather name="shopping-bag" size={16} color="#6B7280" />
            <Text style={styles.infoText}>3 Items Included</Text>
          </View>
        </View>

        {/* IMAGE SECTION */}
        <View style={styles.rightInfo}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800" }}
            style={styles.imageCircle}
          />
        </View>
      </View>

      {/* CHECKOUT BUTTON */}
      <TouchableOpacity onPress={() => { navigate('Checkout') }} style={styles.primaryBtn}>
        <Feather name="lock" size={16} color="#374151" />
        <Text style={styles.primaryBtnText}>Button1</Text>
      </TouchableOpacity>

      {/* DISCOUNT BUTTON */}
      <TouchableOpacity style={styles.discountBtn}>
        <Text style={styles.discountBtnText}>Button2</Text>
      </TouchableOpacity>

      {/* HORIZONTAL SCROLLABLE TABS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {["Cat 1", "Cat 2", "Cat 3", "Cat 4", "Cat 5", "Cat 6", "Cat 7"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tabItem, activeTab === tab && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* SECTION 1 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Section 1</Text>
        <Text style={styles.sectionDesc}>
          Premium survey bundle including consumer behavior and brand
          insights products.
        </Text>

        {/* 4 COLUMN STATS ROW - INSIDE SECTION */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Row1</Text>
            <Text style={[styles.statNumber, styles.statRed]}>45</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Row2</Text>
            <Text style={[styles.statNumber, styles.statGreen]}>120</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Row3</Text>
            <Text style={[styles.statNumber, styles.statGray]}>78</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Row4</Text>
            <Text style={[styles.statNumber, styles.statGreen]}>256</Text>
          </View>
        </View>

        {/* DETAILS BUTTON */}
        <TouchableOpacity style={styles.detailsBtn}>
          <Text style={styles.detailsText}>Details</Text>
          <Feather name="chevron-down" size={14} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* SECTION 2 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Section 2</Text>
        <Text style={styles.sectionDesc}>
          Lifestyle analytics and shopping preference data package.
        </Text>

        {/* 4 COLUMN STATS ROW - INSIDE SECTION */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Row1</Text>
            <Text style={[styles.statNumber, styles.statRed]}>32</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Row2</Text>
            <Text style={[styles.statNumber, styles.statGreen]}>89</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Row3</Text>
            <Text style={[styles.statNumber, styles.statGray]}>54</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Row4</Text>
            <Text style={[styles.statNumber, styles.statGreen]}>187</Text>
          </View>
        </View>

        {/* DETAILS BUTTON */}
        <TouchableOpacity style={styles.detailsBtn}>
          <Text style={styles.detailsText}>Details</Text>
          <Feather name="chevron-down" size={14} color="#374151" />
        </TouchableOpacity>
      </View>
    </ScrollContainer>
  );
};

export default CheckoutSummaryScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLOR.white,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZE.moderateScale(20),
    paddingVertical: SIZE.moderateScale(16),
    backgroundColor: COLOR.white,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.grayLight,
    marginBottom: SIZE.moderateScale(10)
  },

  headerTitle: {
    fontSize: FONT_SIZE.font18,
    fontFamily: FONTS.parkinsansSemiBold,
    color: COLOR.dark,
  },

  container: {
    paddingHorizontal: SIZE.moderateScale(24),
    paddingBottom: SIZE.moderateScale(20),
  },

  topInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SIZE.moderateScale(20),
  },

  leftInfo: {
    gap: SIZE.moderateScale(8),
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoText: {
    marginLeft: SIZE.moderateScale(8),
    fontSize: FONT_SIZE.font13, // 15 -> 13
    fontFamily: FONTS.parkinsansRegular,
    color: COLOR.darkGrey,
  },

  rightInfo: {
    alignItems: "center",
  },

  imageCircle: {
    width: SIZE.moderateScale(60),
    height: SIZE.moderateScale(60),
    borderRadius: SIZE.moderateScale(30),
    backgroundColor: '#f0f0f0',
  },

  primaryBtn: {
    flexDirection: "row",
    backgroundColor: "#E5E7EB",
    borderRadius: SIZE.moderateScale(12),
    height: SIZE.moderateScale(48),
    alignItems: "center",
    justifyContent: "center",
    gap: SIZE.moderateScale(10),
    marginVertical: SIZE.moderateScale(10),
    paddingHorizontal: SIZE.moderateScale(16),
  },

  primaryBtnText: {
    color: "#374151",
    fontSize: FONT_SIZE.font13, // 15 -> 13
    fontFamily: FONTS.parkinsansSemiBold,
  },

  discountBtn: {
    backgroundColor: "#E5E7EB",
    paddingVertical: SIZE.moderateScale(14),
    borderRadius: SIZE.moderateScale(12),
    marginVertical: SIZE.moderateScale(10),
    alignItems: "center",
  },

  discountBtnText: {
    fontSize: FONT_SIZE.font13, // 15 -> 13
    fontFamily: FONTS.parkinsansSemiBold,
    color: "#374151",
  },

  tabsContainer: {
    paddingHorizontal: SIZE.moderateScale(4),
    marginVertical: SIZE.moderateScale(20),
  },

  tabItem: {
    paddingHorizontal: SIZE.moderateScale(16),
    paddingVertical: SIZE.moderateScale(8),
    marginRight: SIZE.moderateScale(12),
  },

  activeTab: {
    borderBottomWidth: 2,
    borderColor: "#7C3AED",
  },

  tabText: {
    fontSize: FONT_SIZE.font13, // 15 -> 13
    fontFamily: FONTS.parkinsansMedium,
    color: "#9CA3AF",
  },

  activeTabText: {
    color: COLOR.dark,
    fontFamily: FONTS.parkinsansSemiBold,
  },

  section: {
    marginBottom: SIZE.moderateScale(24),
    backgroundColor: "#F9FAFB",
    borderRadius: SIZE.moderateScale(12),
    paddingHorizontal: SIZE.moderateScale(20),
    paddingVertical: SIZE.moderateScale(16),
  },

  sectionTitle: {
    fontSize: FONT_SIZE.font16,
    fontFamily: FONTS.parkinsansSemiBold,
    color: COLOR.dark,
  },

  sectionDesc: {
    marginTop: SIZE.moderateScale(8),
    fontSize: FONT_SIZE.font12, // 13 -> 12
    fontFamily: FONTS.parkinsansRegular,
    color: COLOR.darkGrey,
    lineHeight: SIZE.moderateScale(18), // 22 -> 18
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SIZE.moderateScale(16),
    paddingHorizontal: SIZE.moderateScale(4),
  },

  statItem: {
    alignItems: "center",
  },

  statLabel: {
    fontSize: FONT_SIZE.font11, // 12 -> 11
    fontFamily: FONTS.parkinsansMedium,
    color: "#374151",
    marginBottom: SIZE.moderateScale(4),
  },

  statNumber: {
    fontSize: FONT_SIZE.font13, // 14 -> 13
    fontFamily: FONTS.parkinsansSemiBold,
  },

  statRed: {
    color: "#EF4444",
  },

  statGreen: {
    color: "#10B981",
  },

  statGray: {
    color: COLOR.darkGrey,
  },

  detailsBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SIZE.moderateScale(16),
    gap: SIZE.moderateScale(6),
    backgroundColor: "#E5E7EB",
    paddingVertical: SIZE.moderateScale(12),
    paddingHorizontal: SIZE.moderateScale(16),
    borderRadius: SIZE.moderateScale(12),
    justifyContent: "center",
  },

  detailsText: {
    fontSize: FONT_SIZE.font13, // 15 -> 13
    fontFamily: FONTS.parkinsansSemiBold,
    color: "#374151",
  },
});