import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ScrollContainer } from '@components/common/ScrollContainer';
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { COLOR, FONTS, FONT_SIZE, SIZE } from "@utils/Constant"; // Import FONTS and COLOR
import { GlobalStyles } from '@styles/GlobalCss';

const DATA = [
  {
    id: "1",
    section: "Section 1",
    reward: "Earn ₹150",
    description: "Brand preference paid survey experience",
    payout: "Wallet payout",
  },
  {
    id: "2",
    section: "Section 2",
    reward: "Earn ₹200",
    description: "Online shopping behavior insights survey",
    payout: "UPI payout",
  },
  {
    id: "3",
    section: "Section 3",
    reward: "Earn ₹120",
    description: "Lifestyle and habits paid feedback survey",
    payout: "Wallet payout",
  },
];

const CheckoutScreen = ({ navigation }: any) => {
  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.card}>
        {/* TOP ROW */}
        <View style={styles.topRow}>
          <View style={styles.leftRow}>
            <MaterialIcons name="description" size={20} color="#6B7280" />
            <Text style={styles.sectionText}>{item.section}</Text>
          </View>

          {/* LOCK BADGE */}
          <View style={styles.lockBadge}>
            <Feather name="lock" size={14} color="#9CA3AF" />
            <Text style={styles.lockText}>Locked</Text>
          </View>
        </View>

        {/* DETAILS */}
        <Text style={styles.rewardText}>{item.reward}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
        <Text style={styles.payoutText}>{item.payout}</Text>

        {/* REVIEW BUTTON */}
        <TouchableOpacity activeOpacity={0.85} style={styles.reviewWrapper}>
          <Text style={styles.reviewText}>Review</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollContainer
      header={
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={22} color={COLOR.dark} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Checkout</Text>
            <View style={{ width: 22 }} />
          </View>
          <View style={styles.divider} />
        </>
      }
      scrollStyle={styles.listContent}
    >
      {DATA.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.topRow}>
            <View style={styles.leftRow}>
              <MaterialIcons name="description" size={20} color="#6B7280" />
              <Text style={styles.sectionText}>{item.section}</Text>
            </View>
            <View style={styles.lockBadge}>
              <Feather name="lock" size={14} color="#9CA3AF" />
              <Text style={styles.lockText}>Locked</Text>
            </View>
          </View>
          <Text style={styles.rewardText}>{item.reward}</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
          <Text style={styles.payoutText}>{item.payout}</Text>
          <TouchableOpacity activeOpacity={0.85} style={styles.reviewWrapper}>
            <Text style={styles.reviewText}>Review</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollContainer>
  );
};

export default CheckoutScreen;

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
  },

  headerTitle: {
    ...GlobalStyles.textSemiBold18,
    color: COLOR.dark,
  },

  divider: {
    height: 1,
    width: "100%",
    backgroundColor: COLOR.grayLight,
  },

  listContent: {
    padding: SIZE.moderateScale(16),
  },

  card: {
    backgroundColor: "#F9FAFB",
    borderRadius: SIZE.moderateScale(14),
    padding: SIZE.moderateScale(14),
    marginBottom: SIZE.moderateScale(14),
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  sectionText: {
    marginLeft: SIZE.moderateScale(8),
    ...GlobalStyles.textSemiBold14,
    color: COLOR.dark,
  },

  lockBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOR.grayLight,
    paddingHorizontal: SIZE.moderateScale(8),
    paddingVertical: SIZE.moderateScale(4),
    borderRadius: SIZE.moderateScale(8),
  },

  lockText: {
    marginLeft: SIZE.moderateScale(4),
    ...GlobalStyles.textMedium12,
    color: COLOR.darkGrey,
  },

  rewardText: {
    marginTop: SIZE.moderateScale(10),
    ...GlobalStyles.textBold15,
    color: COLOR.dark,
  },

  descriptionText: {
    marginTop: SIZE.moderateScale(4),
    ...GlobalStyles.textRegular13,
    color: COLOR.darkGrey,
  },

  payoutText: {
    marginTop: SIZE.moderateScale(4),
    ...GlobalStyles.textRegular12,
    color: "#9CA3AF",
  },

  reviewWrapper: {
    marginTop: SIZE.moderateScale(14),
    ...GlobalStyles.primaryButton,
    width: '100%', // Ensure full width if needed, or remove if flex
  },

  reviewText: {
    ...GlobalStyles.primaryButtonText,
  },
});