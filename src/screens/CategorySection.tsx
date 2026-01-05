import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { COLOR, SIZE } from "@utils/Constant";
import { ScrollContainer } from "@components/common/ScrollContainer";
import { GlobalStyles } from '@styles/GlobalCss';
import { useNavigation, useRoute } from "@react-navigation/native";

const CategorySectionScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const { title } = route.params || { title: "Details" };

    return (
        <ScrollContainer
            header={
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" size={22} color={COLOR.dark} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{title}</Text>
                    <View style={{ width: 22 }} />
                </View>
            }
            scrollStyle={styles.container}
        >
            {/* SECTION 1 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Section 1</Text>
                <Text style={styles.sectionDesc}>
                    Premium survey bundle including consumer behavior and brand
                    insights products.
                </Text>

                {/* 4 COLUMN STATS ROW */}
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
                    <Feather name="chevron-down" size={14} color={COLOR.white} />
                </TouchableOpacity>
            </View>

            {/* SECTION 2 */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Section 2</Text>
                <Text style={styles.sectionDesc}>
                    Lifestyle analytics and shopping preference data package.
                </Text>

                {/* 4 COLUMN STATS ROW */}
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
                    <Feather name="chevron-down" size={14} color={COLOR.white} />
                </TouchableOpacity>
            </View>
        </ScrollContainer>
    );
};

export default CategorySectionScreen;

const styles = StyleSheet.create({
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
    container: {
        padding: SIZE.moderateScale(20),
    },
    section: {
        marginBottom: SIZE.moderateScale(24),
        backgroundColor: "#F9FAFB",
        borderRadius: SIZE.moderateScale(12),
        paddingHorizontal: SIZE.moderateScale(20),
        paddingVertical: SIZE.moderateScale(16),
    },
    sectionTitle: {
        ...GlobalStyles.textSemiBold16,
        color: COLOR.dark,
    },
    sectionDesc: {
        marginTop: SIZE.moderateScale(8),
        ...GlobalStyles.textRegular12,
        color: COLOR.darkGrey,
        lineHeight: SIZE.moderateScale(18),
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
        ...GlobalStyles.textMedium11,
        color: "#374151",
        marginBottom: SIZE.moderateScale(4),
    },
    statNumber: {
        ...GlobalStyles.textSemiBold13,
    },
    statRed: { color: "#EF4444" },
    statGreen: { color: "#10B981" },
    statGray: { color: COLOR.darkGrey },
    detailsBtn: {
        ...GlobalStyles.primaryButton,
        flexDirection: "row",
        marginTop: SIZE.moderateScale(16),
        gap: SIZE.moderateScale(6),
        paddingHorizontal: SIZE.moderateScale(16),
    },
    detailsText: {
        ...GlobalStyles.primaryButtonText,
    },
});
