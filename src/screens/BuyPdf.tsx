import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,

} from "react-native";
import { ScrollContainer } from "@components/common/ScrollContainer";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLOR, FONTS, FONT_SIZE, SIZE } from "@utils/Constant";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from '@styles/GlobalCss';

const AppointmentScreen = () => {
    const navigation = useNavigation();

    return (
        <ScrollContainer
            header={
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                        <Feather name="arrow-left" size={24} color={COLOR.dark} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Business Details</Text>
                    <TouchableOpacity style={styles.iconButton}>
                        <Feather name="share-2" size={22} color={COLOR.dark} />
                    </TouchableOpacity>
                </View>
            }
            footer={
                <View style={styles.footer}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceLabel}>Total Price</Text>
                        <Text style={styles.priceValue}>$49.99</Text>
                    </View>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.button, styles.previewButton]}>
                            <Feather name="eye" size={20} color={COLOR.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buyButton]}>
                            <Feather name="shopping-bag" size={18} color={COLOR.white} />
                            <Text style={styles.buyButtonText}>Buy Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            scrollStyle={styles.content}
        >
            {/* DOCUMENT PREVIEW CARD */}
            <View style={styles.documentCard}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="file-pdf-box" size={50} color="#F40F02" />
                </View>
                <View style={styles.docInfo}>
                    <Text style={styles.docTitle}>Global Market Research 2025</Text>
                    <Text style={styles.docSubtitle}>Comprehensive Analysis</Text>
                    <View style={styles.ratingContainer}>
                        <FontAwesome name="star" size={14} color="#F59E0B" />
                        <Text style={styles.ratingText}> 4.8 <Text style={styles.reviewText}>(128 Reviews)</Text></Text>
                    </View>
                </View>
            </View>

            {/* META INFO CONTAINER */}
            <View style={styles.sectionContainer}>
                <Text style={styles.containerTitle}>File Details</Text>
                <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                        <Text style={styles.metaLabel}>Format</Text>
                        <Text style={styles.metaValue}>PDF</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.metaItem}>
                        <Text style={styles.metaLabel}>Size</Text>
                        <Text style={styles.metaValue}>2.4 MB</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.metaItem}>
                        <Text style={styles.metaLabel}>Pages</Text>
                        <Text style={styles.metaValue}>48</Text>
                    </View>
                </View>
                <View style={styles.horizontalDivider} />
                <View style={styles.updateRow}>
                    <Text style={styles.metaLabel}>Last Updated</Text>
                    <Text style={styles.metaValue}>Jan 03, 2026</Text>
                </View>
            </View>

            {/* DESCRIPTION CONTAINER */}
            <View style={styles.sectionContainer}>
                <Text style={styles.containerTitle}>Description</Text>
                <Text style={styles.descriptionText}>
                    This document provides an in-depth analysis of global market trends for the upcoming fiscal year. It includes data on consumer behavior, emerging technologies, and competitive landscapes.
                </Text>
            </View>

            {/* FEATURES CONTAINER */}
            <View style={styles.sectionContainer}>
                <Text style={styles.containerTitle}>What's Inside</Text>
                <View style={styles.featureItem}>
                    <Feather name="check-circle" size={18} color={COLOR.primary} />
                    <Text style={styles.featureText}>Market Size & Growth Projections</Text>
                </View>
                <View style={styles.featureItem}>
                    <Feather name="check-circle" size={18} color={COLOR.primary} />
                    <Text style={styles.featureText}>Competitor Analysis Matrix</Text>
                </View>
                <View style={styles.featureItem}>
                    <Feather name="check-circle" size={18} color={COLOR.primary} />
                    <Text style={styles.featureText}>Consumer Demographics</Text>
                </View>
            </View>

            {/* PRICE SUMMARY CONTAINER */}
            <View style={styles.sectionContainer}>
                <Text style={styles.containerTitle}>Price Summary</Text>
                <View style={styles.priceRow}>
                    <Text style={styles.priceRowLabel}>Subtotal</Text>
                    <Text style={styles.priceRowValue}>$45.00</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.priceRowLabel}>Tax (Estimated)</Text>
                    <Text style={styles.priceRowValue}>$4.99</Text>
                </View>
                <View style={styles.horizontalDivider} />
                <View style={styles.priceRow}>
                    <Text style={styles.totalLabel}>Total Amount</Text>
                    <Text style={styles.totalValue}>$49.99</Text>
                </View>
            </View>

        </ScrollContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.white,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: SIZE.moderateScale(20),
        paddingVertical: SIZE.moderateScale(16),
        borderBottomWidth: 1,
        borderBottomColor: COLOR.grayLight,
    },
    headerTitle: {
        ...GlobalStyles.textSemiBold18,
        color: COLOR.dark,
    },
    iconButton: {
        padding: SIZE.moderateScale(4),
    },
    content: {
        padding: SIZE.moderateScale(20),
        paddingVertical: SIZE.moderateScale(20), // Added top/bottom padding
        paddingBottom: SIZE.moderateScale(100),
        backgroundColor: COLOR.white,
    },
    // Common Section Container Style
    sectionContainer: {
        backgroundColor: "#F9FAFB",
        borderRadius: SIZE.moderateScale(16),
        padding: SIZE.moderateScale(16),
        marginBottom: SIZE.moderateScale(16),
        borderWidth: 1,
        borderColor: COLOR.grayLight,
    },
    containerTitle: {
        ...GlobalStyles.textSemiBold15,
        color: COLOR.dark,
        marginBottom: SIZE.moderateScale(12),
    },
    documentCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9FAFB",
        borderRadius: SIZE.moderateScale(16),
        padding: SIZE.moderateScale(16),
        marginBottom: SIZE.moderateScale(16),
        borderWidth: 1,
        borderColor: COLOR.grayLight,
    },
    iconContainer: {
        width: SIZE.moderateScale(70),
        height: SIZE.moderateScale(70),
        backgroundColor: "#FEE2E2", // Light red bg for PDF
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZE.moderateScale(12),
    },
    docInfo: {
        flex: 1,
        marginLeft: SIZE.moderateScale(16),
    },
    docTitle: {
        ...GlobalStyles.textSemiBold15,
        color: COLOR.dark,
        marginBottom: SIZE.moderateScale(4),
    },
    docSubtitle: {
        ...GlobalStyles.textMedium12,
        color: COLOR.darkGrey,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: SIZE.moderateScale(8),
    },
    ratingText: {
        ...GlobalStyles.textSemiBold12,
        color: COLOR.dark,
        marginLeft: SIZE.moderateScale(4),
    },
    reviewText: {
        ...GlobalStyles.textRegular12,
        color: COLOR.darkGrey,
    },
    metaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    metaItem: {
        alignItems: "center",
        flex: 1,
    },
    metaLabel: {
        ...GlobalStyles.textRegular11,
        color: COLOR.darkGrey,
        marginBottom: SIZE.moderateScale(4),
    },
    metaValue: {
        ...GlobalStyles.textSemiBold13,
        color: COLOR.dark,
    },
    divider: {
        width: 1,
        backgroundColor: COLOR.grayLight,
        height: SIZE.moderateScale(24),
    },
    horizontalDivider: {
        height: 1,
        backgroundColor: COLOR.grayLight,
        marginVertical: SIZE.moderateScale(12),
        width: "100%",
    },
    updateRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    descriptionText: {
        ...GlobalStyles.textRegular13,
        color: COLOR.darkGrey,
        lineHeight: SIZE.moderateScale(20),
    },
    featureItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: SIZE.moderateScale(12),
    },
    featureText: {
        ...GlobalStyles.textMedium13,
        color: COLOR.dark,
        marginLeft: SIZE.moderateScale(12),
    },
    // Price Summary Styles
    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: SIZE.moderateScale(8),
    },
    priceRowLabel: {
        ...GlobalStyles.textRegular13,
        color: COLOR.darkGrey,
    },
    priceRowValue: {
        ...GlobalStyles.textMedium14,
        color: COLOR.dark,
    },
    totalLabel: {
        ...GlobalStyles.textSemiBold16,
        color: COLOR.dark,
    },
    totalValue: {
        ...GlobalStyles.textBold16,
        color: COLOR.primary,
    },

    footer: {
        backgroundColor: COLOR.white,
        paddingHorizontal: SIZE.moderateScale(20),
        paddingVertical: SIZE.moderateScale(16),
        borderTopWidth: 1,
        borderTopColor: COLOR.grayLight,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    priceContainer: {
        // No flex: 1 here to keep it tight
    },
    priceLabel: {
        ...GlobalStyles.textRegular12,
        color: COLOR.darkGrey,
    },
    priceValue: {
        ...GlobalStyles.textBold18,
        color: COLOR.dark,
    },
    buttonRow: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1, // Take remaining space
        justifyContent: "flex-end", // Push to right
        gap: SIZE.moderateScale(12),
        marginLeft: SIZE.moderateScale(20), // Spacing from price
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: SIZE.moderateScale(12),
        borderRadius: SIZE.moderateScale(50),
    },
    previewButton: {
        backgroundColor: "#EFF6FF", // Light blue
        width: SIZE.moderateScale(48),
        height: SIZE.moderateScale(48),
        paddingVertical: 0, // Reset for circle/square
        paddingHorizontal: 0,
    },
    buyButton: {
        backgroundColor: COLOR.primary,
        paddingHorizontal: SIZE.moderateScale(20),
        gap: SIZE.moderateScale(8),
        flex: 1, // Only if you want it to stretch, otherwise remove
        maxWidth: SIZE.moderateScale(200),
    },
    buyButtonText: {
        ...GlobalStyles.textSemiBold14,
        color: COLOR.white,
    },
});

export default AppointmentScreen;
