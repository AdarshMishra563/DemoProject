import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import { COLOR, FONTS, FONT_SIZE, SIZE } from "@utils/Constant";
import { ScrollContainer } from "@components/common/ScrollContainer";

const surveyGroups = [
  {
    id: "A",
    title: "Group A",
    questions: 8,
    duration: "20 min",
  },
  {
    id: "B",
    title: "Group B",
    questions: 10,
    duration: "25 min",
  },
  {
    id: "C",
    title: "Group C",
    questions: 12,
    duration: "30 min",
  },
  {
    id: "D",
    title: "Group D",
    questions: 6,
    duration: "15 min",
  },
];

const SurveyDetailsScreen = ({ navigation }: any) => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  return (
    <ScrollContainer
      header={
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={22} color={COLOR.dark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Survey Details</Text>
          <View style={{ width: 22 }} />
        </View>
      }
      scrollStyle={styles.container}
      footer={
        <View style={[styles.bottomBtnWrapper, { bottom: insets.bottom + 5 }]}>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.nextBtn,
                !selectedGroup && styles.nextBtnDisabled,
              ]}
              disabled={!selectedGroup}
            >
              <Text style={styles.nextBtnText}>Next</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.submitBtn,
                !selectedGroup && styles.submitBtnDisabled,
              ]}
              disabled={!selectedGroup}
            >
              <Text style={styles.submitBtnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    >
      {/* SURVEY INFO (LEFT ALIGNED) */}
      <View style={styles.surveyInfoLeft}>
        <Text style={styles.surveyTitle}>
          Customer Experience Survey
        </Text>

        <Text style={styles.surveyDesc}>
          Help us understand customer preferences and satisfaction levels.
          Your responses will remain anonymous.
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Feather name="clock" size={14} color="#6B7280" />
            <Text style={styles.metaText}>30 min</Text>
          </View>

          <View style={styles.metaItem}>
            <Feather name="file-text" size={14} color="#6B7280" />
            <Text style={styles.metaText}>30 Questions</Text>
          </View>

          <View style={styles.metaTag}>
            <Text style={styles.metaTagText}>Survey</Text>
          </View>
        </View>
      </View>

      {/* SELECT GROUP */}
      <Text style={styles.sectionTitle}>Select Survey Group</Text>

      {surveyGroups.map((group) => {
        const isSelected = selectedGroup === group.id;

        return (
          <TouchableOpacity
            key={group.id}
            style={[
              styles.groupCard,
              isSelected && styles.groupCardActive,
            ]}
            onPress={() => setSelectedGroup(group.id)}
            activeOpacity={0.8}
          >
            <View>
              <Text style={styles.groupTitle}>{group.title}</Text>

              <View style={styles.groupMeta}>
                <Text style={styles.groupMetaText}>
                  {group.questions} Questions
                </Text>
                <Text style={styles.groupMetaText}>
                  • {group.duration}
                </Text>
              </View>
            </View>

            {isSelected && (
              <Feather
                name="check-circle"
                size={20}
                color="#7C3AED"
              />
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollContainer>
  );
};

export default SurveyDetailsScreen;

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
    fontSize: FONT_SIZE.font18,
    fontFamily: FONTS.parkinsansSemiBold,
    color: COLOR.dark,
  },

  container: {
    paddingHorizontal: SIZE.moderateScale(20),
    paddingBottom: SIZE.moderateScale(120),
  },

  surveyInfoLeft: {
    marginTop: SIZE.moderateScale(20),
  },

  surveyTitle: {
    fontSize: FONT_SIZE.font16,
    fontFamily: FONTS.parkinsansSemiBold,
    color: COLOR.dark,
    textAlign: "left",
  },

  surveyDesc: {
    marginTop: SIZE.moderateScale(8),
    fontSize: FONT_SIZE.font12,
    fontFamily: FONTS.parkinsansRegular,
    color: COLOR.darkGrey,
    lineHeight: SIZE.moderateScale(20),
    textAlign: "left",
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SIZE.moderateScale(12),
    gap: SIZE.moderateScale(12),
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZE.moderateScale(6),
  },

  metaText: {
    fontSize: FONT_SIZE.font12,
    fontFamily: FONTS.parkinsansRegular,
    color: COLOR.darkGrey,
  },

  metaTag: {
    backgroundColor: "#EDE9FE",
    paddingHorizontal: SIZE.moderateScale(10),
    paddingVertical: SIZE.moderateScale(4),
    borderRadius: SIZE.moderateScale(8),
  },

  metaTagText: {
    fontSize: FONT_SIZE.font11,
    fontFamily: FONTS.parkinsansMedium,
    color: "#7C3AED",
  },

  sectionTitle: {
    marginTop: SIZE.moderateScale(28),
    marginBottom: SIZE.moderateScale(12),
    fontSize: FONT_SIZE.font15,
    fontFamily: FONTS.parkinsansSemiBold,
    color: COLOR.dark,
  },

  groupCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: SIZE.moderateScale(12),
    padding: SIZE.moderateScale(16),
    marginBottom: SIZE.moderateScale(12),
    borderWidth: 1,
    borderColor: COLOR.walletGray,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  groupCardActive: {
    borderColor: "#7C3AED",
    backgroundColor: "#F5F3FF",
  },

  groupTitle: {
    fontSize: FONT_SIZE.font14,
    fontFamily: FONTS.parkinsansSemiBold,
    color: COLOR.dark,
  },

  groupMeta: {
    flexDirection: "row",
    marginTop: SIZE.moderateScale(6),
    gap: SIZE.moderateScale(6),
  },

  groupMetaText: {
    fontSize: FONT_SIZE.font12,
    fontFamily: FONTS.parkinsansRegular,
    color: COLOR.darkGrey,
  },

  bottomBtnWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZE.moderateScale(20),
    backgroundColor: COLOR.white,
    borderTopWidth: 1,
    borderTopColor: COLOR.grayLight,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SIZE.moderateScale(12),
  },

  nextBtn: {
    backgroundColor: COLOR.primary,
    height: SIZE.moderateScale(50),
    borderRadius: SIZE.moderateScale(12),
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  nextBtnDisabled: {
    backgroundColor: COLOR.walletGray,
  },

  nextBtnText: {
    fontSize: FONT_SIZE.font14,
    fontFamily: FONTS.parkinsansSemiBold,
    color: COLOR.white,
  },

  submitBtn: {
    backgroundColor: COLOR.primary,
    height: SIZE.moderateScale(50),
    borderRadius: SIZE.moderateScale(12),
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  submitBtnDisabled: {
    backgroundColor: COLOR.walletGray,
  },

  submitBtnText: {
    fontSize: FONT_SIZE.font14,
    fontFamily: FONTS.parkinsansSemiBold,
    color: COLOR.white,
  },
});