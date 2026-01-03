import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    StatusBar,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLOR, FONTS, FONT_SIZE, SIZE } from "@utils/Constant";
import { useNavigation, useRoute } from "@react-navigation/native";

// Mock Data combining Subscriptions and Surveys
const orderData = [
    {
        id: "1",
        type: "Subscription",
        title: "Premium Plan",
        date: "Jan 12, 2024",
        status: "Active",
        price: "$19.99/mo",
        icon: "crown",
        iconColor: "#F59E0B",
    },
    {
        id: "2",
        type: "Survey",
        title: "Customer Experience Survey",
        date: "Jan 10, 2024",
        status: "Completed",
        reward: "+50 pts",
        icon: "clipboard-text",
        iconColor: "#3B82F6",
    },
    {
        id: "3",
        type: "Subscription",
        title: "Basic Plan",
        date: "Dec 15, 2023",
        status: "Expired",
        price: "$9.99/mo",
        icon: "shield-outline",
        iconColor: "#6B7280",
    },
    {
        id: "4",
        type: "Survey",
        title: "Product Feedback",
        date: "Dec 05, 2023",
        status: "Completed",
        reward: "+100 pts",
        icon: "star-outline",
        iconColor: "#10B981",
    },
    {
        id: "5",
        type: "Subscription",
        title: "Data Analytics Add-on",
        date: "Nov 20, 2023",
        status: "Active",
        price: "$5.00/mo",
        icon: "chart-bar",
        iconColor: "#8B5CF6",
    },
];

const OrderScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [filter, setFilter] = useState("All"); // All, Subscription, Survey

    const filteredData = filter === "All"
        ? orderData
        : orderData.filter(item => item.type === filter);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "#10B981";
            case "Completed": return "#3B82F6";
            case "Expired": return "#EF4444";
            default: return COLOR.darkGrey;
        }
    };

    const getStatusBg = (status: string) => {
        switch (status) {
            case "Active": return "#ECFDF5";
            case "Completed": return "#EFF6FF";
            case "Expired": return "#FEF2F2";
            default: return "#F3F4F6";
        }
    };

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            <View style={styles.cardHeader}>
                <View style={styles.typeContainer}>
                    <View style={[styles.iconBox, { backgroundColor: item.iconColor + "10" }]}>
                        <MaterialCommunityIcons name={item.icon} size={20} color={item.iconColor} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.cardDate}>{item.date}</Text>
                    </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusBg(item.status) }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.cardFooter}>
                <Text style={styles.typeText}>{item.type}</Text>
                <Text style={styles.priceText}>{item.price || item.reward}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>


            {/* HEADER */}
            <View style={styles.header}>
                {route.name !== 'Order' && (
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Feather name="arrow-left" size={24} color={COLOR.dark} />
                    </TouchableOpacity>
                )}
                {route.name === 'Order' && <View style={{ width: 28 }} />}
                <Text style={styles.headerTitle}>My Orders</Text>
                <View style={{ width: 28 }} />
            </View>

            {/* FILTER TABS */}
            <View style={styles.filterContainer}>
                {["All", "Subscription", "Survey"].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.filterTab, filter === tab && styles.activeFilterTab]}
                        onPress={() => setFilter(tab)}
                    >
                        <Text style={[styles.filterText, filter === tab && styles.activeFilterText]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ height: SIZE.moderateScale(12) }} />}
            />
        </SafeAreaView>
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
    backButton: {
        padding: SIZE.moderateScale(4),
    },
    headerTitle: {
        fontSize: FONT_SIZE.font18,
        fontFamily: FONTS.parkinsansSemiBold,
        color: COLOR.dark,
    },
    filterContainer: {
        flexDirection: "row",
        paddingHorizontal: SIZE.moderateScale(20),
        paddingVertical: SIZE.moderateScale(12),
        gap: SIZE.moderateScale(12),
    },
    filterTab: {
        paddingVertical: SIZE.moderateScale(6),
        paddingHorizontal: SIZE.moderateScale(16),
        borderRadius: SIZE.moderateScale(20),
        borderWidth: 1,
        borderColor: COLOR.grayLight,
        backgroundColor: COLOR.white,
    },
    activeFilterTab: {
        backgroundColor: COLOR.primary,
        borderColor: COLOR.primary,
    },
    filterText: {
        fontSize: FONT_SIZE.font13,
        fontFamily: FONTS.parkinsansMedium,
        color: COLOR.darkGrey,
    },
    activeFilterText: {
        color: COLOR.white,
    },
    listContent: {
        padding: SIZE.moderateScale(20),
    },
    card: {
        backgroundColor: COLOR.white,
        borderRadius: SIZE.moderateScale(12),
        borderWidth: 1,
        borderColor: COLOR.grayLight,
        padding: SIZE.moderateScale(12),
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    typeContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        marginRight: SIZE.moderateScale(8),
    },
    iconBox: {
        width: SIZE.moderateScale(40),
        height: SIZE.moderateScale(40),
        borderRadius: SIZE.moderateScale(8),
        justifyContent: "center",
        alignItems: "center",
        marginRight: SIZE.moderateScale(12),
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: FONT_SIZE.font14,
        fontFamily: FONTS.parkinsansSemiBold,
        color: COLOR.dark,
        marginBottom: SIZE.moderateScale(2),
    },
    cardDate: {
        fontSize: FONT_SIZE.font12,
        fontFamily: FONTS.parkinsansRegular,
        color: COLOR.darkGrey,
    },
    statusBadge: {
        paddingHorizontal: SIZE.moderateScale(8),
        paddingVertical: SIZE.moderateScale(2),
        borderRadius: SIZE.moderateScale(4),
    },
    statusText: {
        fontSize: FONT_SIZE.font10,
        fontFamily: FONTS.parkinsansMedium,
    },
    divider: {
        height: 1,
        backgroundColor: COLOR.grayLight,
        marginVertical: SIZE.moderateScale(10),
    },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    typeText: {
        fontSize: FONT_SIZE.font12,
        fontFamily: FONTS.parkinsansMedium,
        color: COLOR.darkGrey,
    },
    priceText: {
        fontSize: FONT_SIZE.font13,
        fontFamily: FONTS.parkinsansSemiBold,
        color: COLOR.dark,
    },
});

export default OrderScreen;
