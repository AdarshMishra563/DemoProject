import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLOR, FONTS, FONT_SIZE, SIZE } from "@utils/Constant";
import { useNavigation } from "@react-navigation/native";
import { ScrollContainer } from "@components/common/ScrollContainer";

const { width } = Dimensions.get("window");

const PaymentMethodScreen = () => {
    const navigation = useNavigation();

    // Mock Banner Data
    const bannerData = [
        { id: 1, image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop" },
        { id: 2, image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop" },
        { id: 3, image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop" },
    ];

    // Mock Payment Methods
    const paymentMethods = [
        {
            id: 1,
            type: "MasterCard",
            number: "**** **** **** 1234",
            icon: "cc-mastercard",
            color: "#EB001B",
            isDefault: true,
        },
        {
            id: 2,
            type: "Visa",
            number: "**** **** **** 5678",
            icon: "cc-visa",
            color: "#1A1F71",
            isDefault: false,
        },
    ];

    // Mock UPI Methods
    const upiMethods = [
        { id: 1, name: "Google Pay", icon: "google", color: "#34A853" },
        { id: 2, name: "Apple Pay", icon: "apple", color: "#000000" },
        { id: 3, name: "Amazon Pay", icon: "amazon", color: "#FF9900" },
    ];

    const renderBannerItem = ({ item }: any) => (
        <View style={styles.bannerContainer}>
            <Image source={{ uri: item.image }} style={styles.bannerImage} resizeMode="cover" />
        </View>
    );

    const renderPaymentCard = (item: any) => (
        <TouchableOpacity
            key={item.id}
            style={[
                styles.card,
                item.isDefault && styles.defaultCard
            ]}
            activeOpacity={0.8}
        >
            <View style={styles.cardContent}>
                <View style={styles.cardLeft}>
                    <View style={styles.iconContainer}>
                        <FontAwesome name={item.icon} size={24} color={item.color} />
                    </View>
                    <View>
                        <Text style={styles.cardType}>{item.type}</Text>
                        <Text style={styles.cardNumber}>{item.number}</Text>
                    </View>
                </View>

                {item.isDefault ? (
                    <View style={styles.defaultBadge}>
                        <Feather name="check" size={12} color={COLOR.white} style={{ marginRight: 4 }} />
                        <Text style={styles.defaultText}>Default</Text>
                    </View>
                ) : (
                    <TouchableOpacity style={styles.radioButton} />
                )}
            </View>
        </TouchableOpacity>
    );

    const renderUpiItem = (item: any) => (
        <TouchableOpacity key={item.id} style={styles.upiItem} activeOpacity={0.7}>
            <View style={[styles.upiIconContainer, { backgroundColor: item.color + '10' }]}>
                <FontAwesome name={item.icon} size={20} color={item.color} />
            </View>
            <Text style={styles.upiText}>{item.name}</Text>
            <Feather name="chevron-right" size={18} color={COLOR.grayLight} />
        </TouchableOpacity>
    );

    return (
        <ScrollContainer
            header={
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Feather name="arrow-left" size={24} color={COLOR.dark} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Payment Methods</Text>
                    <TouchableOpacity style={styles.addButton}>
                        <Feather name="plus" size={24} color={COLOR.primary} />
                    </TouchableOpacity>
                </View>
            }
        >
            {/* PROMO BANNER */}
            <View style={styles.bannerSection}>
                <FlatList
                    data={bannerData}
                    renderItem={renderBannerItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.bannerList}
                />
            </View>

            {/* CARDS SECTION */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Credit & Debit Cards</Text>
                {paymentMethods.map(renderPaymentCard)}
                <TouchableOpacity style={styles.addNewButton}>
                    <Feather name="plus-circle" size={18} color={COLOR.primary} style={{ marginRight: 8 }} />
                    <Text style={styles.addNewText}>Add New Card</Text>
                </TouchableOpacity>
            </View>

            {/* UPI SECTION */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>UPI & Wallets</Text>
                <View style={styles.upiContainer}>
                    {upiMethods.map(renderUpiItem)}
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
        backgroundColor: COLOR.white,
        borderBottomWidth: 1,
        borderBottomColor: COLOR.grayLight,
        zIndex: 10,
    },
    backButton: {
        padding: SIZE.moderateScale(4),
    },
    addButton: {
        padding: SIZE.moderateScale(4),
    },
    headerTitle: {
        fontSize: FONT_SIZE.font18,
        fontFamily: FONTS.parkinsansSemiBold,
        color: COLOR.dark,
    },
    scrollContent: {
        paddingBottom: SIZE.moderateScale(40),
    },
    bannerSection: {
        marginTop: SIZE.moderateScale(16),
        marginBottom: SIZE.moderateScale(8),
    },
    bannerList: {
        paddingHorizontal: SIZE.moderateScale(20),
        gap: SIZE.moderateScale(12),
    },
    bannerContainer: {
        width: width - SIZE.moderateScale(40),
        height: SIZE.moderateScale(140),
        borderRadius: SIZE.moderateScale(16),
        overflow: "hidden",
        marginRight: SIZE.moderateScale(12),
        backgroundColor: COLOR.grayLight,
    },
    bannerImage: {
        width: "100%",
        height: "100%",
    },
    section: {
        paddingHorizontal: SIZE.moderateScale(20),
        marginTop: SIZE.moderateScale(20),
    },
    sectionTitle: {
        fontSize: FONT_SIZE.font16,
        fontFamily: FONTS.parkinsansBold,
        color: COLOR.dark,
        marginBottom: SIZE.moderateScale(12),
        letterSpacing: 0.3,
    },
    card: {
        backgroundColor: COLOR.white,
        borderRadius: SIZE.moderateScale(16),
        padding: SIZE.moderateScale(16),
        marginBottom: SIZE.moderateScale(12),
        borderWidth: 1,

        borderColor: COLOR.grayLight,
    },
    defaultCard: {
        borderColor: COLOR.primary,
        backgroundColor: "#F0F9FF",
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: SIZE.moderateScale(48),
        height: SIZE.moderateScale(32),
        backgroundColor: COLOR.grayLight,
        borderRadius: SIZE.moderateScale(6),
        justifyContent: "center",
        alignItems: "center",
        marginRight: SIZE.moderateScale(14),
    },
    cardType: {
        fontSize: FONT_SIZE.font14,
        fontFamily: FONTS.parkinsansSemiBold,
        color: COLOR.dark,
        marginBottom: SIZE.moderateScale(2),
    },
    cardNumber: {
        fontSize: FONT_SIZE.font13,
        fontFamily: FONTS.parkinsansMedium,
        color: COLOR.darkGrey,
    },
    defaultBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLOR.primary,
        paddingHorizontal: SIZE.moderateScale(10),
        paddingVertical: SIZE.moderateScale(4),
        borderRadius: SIZE.moderateScale(20),
    },
    defaultText: {
        fontSize: FONT_SIZE.font10,
        fontFamily: FONTS.parkinsansSemiBold,
        color: COLOR.white,
    },
    radioButton: {
        width: SIZE.moderateScale(20),
        height: SIZE.moderateScale(20),
        borderRadius: SIZE.moderateScale(10),
        borderWidth: 2,
        borderColor: COLOR.grayLight,
    },
    addNewButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: SIZE.moderateScale(14),
        borderWidth: 1,
        borderColor: COLOR.primary,
        borderStyle: 'dashed',
        borderRadius: SIZE.moderateScale(12),
        backgroundColor: COLOR.white,
        marginTop: SIZE.moderateScale(4),
    },
    addNewText: {
        fontSize: FONT_SIZE.font14,
        fontFamily: FONTS.parkinsansMedium,
        color: COLOR.primary,
    },
    upiContainer: {
        backgroundColor: COLOR.white,
        borderRadius: SIZE.moderateScale(16),
        padding: SIZE.moderateScale(8),
        borderWidth: 1,
        borderColor: COLOR.grayLight,
    },
    upiItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: SIZE.moderateScale(12),
        paddingHorizontal: SIZE.moderateScale(12),
        borderBottomWidth: 1,
        borderBottomColor: COLOR.grayLight,
    },
    upiIconContainer: {
        width: SIZE.moderateScale(36),
        height: SIZE.moderateScale(36),
        borderRadius: SIZE.moderateScale(10),
        justifyContent: "center",
        alignItems: "center",
        marginRight: SIZE.moderateScale(14),
    },
    upiText: {
        flex: 1,
        fontSize: FONT_SIZE.font15,
        fontFamily: FONTS.parkinsansMedium,
        color: COLOR.dark,
    }
});

export default PaymentMethodScreen;
