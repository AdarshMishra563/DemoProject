import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { COLOR, FONTS, SIZE } from "@utils/Constant";
import { ScrollContainer } from "@components/common/ScrollContainer";
import { GlobalStyles } from '@styles/GlobalCss';
import { useNavigation } from "@react-navigation/native";

const CheckoutSummaryScreen2 = () => {
    const navigation = useNavigation<any>();

    const categories = [
        { title: "Cat 1", subtitle: "Basic survey module" },
        { title: "Cat 2", subtitle: "Advanced analytics pack" },
        { title: "Cat 3", subtitle: "Customer feedback tools" },
        { title: "Cat 4", subtitle: "Market research data" },
        { title: "Cat 5", subtitle: "Employee engagement" },
        { title: "Cat 6", subtitle: "Product testing suite" },
        { title: "Cat 7", subtitle: "Brand awareness metrics" },
    ];

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
            <TouchableOpacity onPress={() => { navigation.navigate('NewsDetail') }} style={styles.primaryBtn}>
                <Feather name="unlock" size={16} color={COLOR.white} />
                <Text style={styles.primaryBtnText}>Unlocked</Text>
            </TouchableOpacity>

            {/* CATEGORY HEADER */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Categories</Text>
            </View>

            {/* VERTICAL CATEGORY LIST */}
            <View style={styles.listContainer}>
                {categories.map((cat, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.categoryCard}
                        onPress={() => navigation.navigate('CategorySection', { title: cat.title })}
                    >
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{cat.title}</Text>
                            <Text style={styles.cardSubtitle}>{cat.subtitle}</Text>
                        </View>
                        <Feather name="chevron-right" size={20} color={COLOR.darkGrey} />
                    </TouchableOpacity>
                ))}
            </View>

        </ScrollContainer>
    );
};

export default CheckoutSummaryScreen2;

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
        marginBottom: SIZE.moderateScale(10)
    },

    headerTitle: {
        ...GlobalStyles.textSemiBold18,
        color: COLOR.dark,
    },

    container: {
        paddingHorizontal: SIZE.moderateScale(20),
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
        ...GlobalStyles.textRegular13,
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
        ...GlobalStyles.primaryButton,
        flexDirection: "row",
        gap: SIZE.moderateScale(10),
        marginVertical: SIZE.moderateScale(10),
        paddingHorizontal: SIZE.moderateScale(16),
    },

    primaryBtnText: {
        ...GlobalStyles.primaryButtonText,
    },

    listContainer: {
        marginTop: SIZE.moderateScale(10),
        gap: SIZE.moderateScale(12),
    },

    categoryCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F9FAFB",
        padding: SIZE.moderateScale(16),
        borderRadius: SIZE.moderateScale(12),
        borderWidth: 1,
        borderColor: COLOR.grayLight,
    },

    cardContent: {
        flex: 1,
    },

    cardTitle: {
        ...GlobalStyles.textSemiBold14,
        color: COLOR.dark,
        marginBottom: SIZE.moderateScale(4),
    },

    cardSubtitle: {
        ...GlobalStyles.textRegular12,
        color: COLOR.darkGrey,
    },

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: SIZE.moderateScale(15),
        marginTop: SIZE.moderateScale(10),
        paddingHorizontal: SIZE.moderateScale(4),
    },

    sectionTitle: {
        ...GlobalStyles.textBold18,
        color: COLOR.dark,
    },
});
