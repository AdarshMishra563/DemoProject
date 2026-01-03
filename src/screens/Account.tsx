import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,

} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLOR, FONTS, FONT_SIZE, SIZE } from "@utils/Constant";
import { useNavigation } from "@react-navigation/native";
import { ScrollContainer } from "@components/common/ScrollContainer";

const AccountScreen = () => {
    const navigation = useNavigation();

    // Mock User Data
    const userData = {
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "+1 234 567 8900",
        address: "123, Main Street, New York, USA",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop",
    };

    const renderDetailItem = (label: string, value: string, icon: string) => (
        <View style={styles.detailItem}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.valueContainer}>
                <Feather name={icon} size={18} color={COLOR.darkGrey} style={styles.icon} />
                <Text style={styles.value}>{value}</Text>
            </View>
        </View>
    );

    const Header = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Feather name="arrow-left" size={24} color={COLOR.dark} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Account</Text>
            <View style={{ width: 24 }} />
        </View>
    );

    return (
        <ScrollContainer header={<Header />}>

            {/* PROFILE IMAGE SECTION */}
            <View style={styles.imageSection}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: userData.image }} style={styles.profileImage} />
                    <TouchableOpacity style={styles.cameraButton} activeOpacity={0.8}>
                        <Ionicons name="camera" size={18} color={COLOR.white} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* DETAILS SECTION */}
            <View style={styles.detailsSection}>
                {renderDetailItem("Full Name", userData.name, "user")}
                <View style={styles.divider} />
                {renderDetailItem("Email Address", userData.email, "mail")}
                <View style={styles.divider} />
                {renderDetailItem("Phone Number", userData.phone, "phone")}
                <View style={styles.divider} />
                {renderDetailItem("Address", userData.address, "map-pin")}
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
        backgroundColor: COLOR.white,
    },
    backButton: {
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
    imageSection: {
        alignItems: "center",
        paddingVertical: SIZE.moderateScale(32),
    },
    imageContainer: {
        position: "relative",
    },
    profileImage: {
        width: SIZE.moderateScale(100),
        height: SIZE.moderateScale(100),
        borderRadius: SIZE.moderateScale(50),
        borderWidth: 2,
        borderColor: COLOR.grayLight,
    },
    cameraButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: COLOR.primary,
        width: SIZE.moderateScale(32),
        height: SIZE.moderateScale(32),
        borderRadius: SIZE.moderateScale(16),
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: COLOR.white,
    },
    detailsSection: {
        paddingHorizontal: SIZE.moderateScale(20),
    },
    detailItem: {
        paddingVertical: SIZE.moderateScale(16),
    },
    label: {
        fontSize: FONT_SIZE.font13,
        color: COLOR.darkGrey,
        fontFamily: FONTS.parkinsansMedium,
        marginBottom: SIZE.moderateScale(8),
    },
    valueContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        marginRight: SIZE.moderateScale(12),
    },
    value: {
        fontSize: FONT_SIZE.font15,
        color: COLOR.dark,
        fontFamily: FONTS.parkinsansMedium,
        flex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: COLOR.grayLight,
        width: "100%",
    },
});

export default AccountScreen;
