import React, { useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    Alert
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLOR, FONTS, FONT_SIZE, SIZE } from "@utils/Constant";
import { useNavigation } from "@react-navigation/native";
import { ScrollContainer } from "@components/common/ScrollContainer";
import { GlobalStyles } from '@styles/GlobalCss';
import { Button } from '@components/common/Button';

const AccountScreen = () => {
    const navigation = useNavigation();

    // User Data State
    const [userData, setUserData] = useState({
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "+1 234 567 8900",
        address: "123, Main Street, New York, USA",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop",
    });

    const [activeFields, setActiveFields] = useState<Record<string, boolean>>({});
    const inputRefs = useRef<Record<string, TextInput | null>>({});

    const handleEdit = (field: string) => {
        setActiveFields(prev => ({ ...prev, [field]: true }));
        // Focus the input after a short delay to allow rendering
        setTimeout(() => {
            inputRefs.current[field]?.focus();
        }, 50);
    };

    const handleChange = (field: string, value: string) => {
        setUserData(prev => ({ ...prev, [field]: value }));
    };

    const handleUpdate = () => {
        setActiveFields({});
        Alert.alert("Success", "Profile updated successfully", [
            { text: "OK", onPress: () => navigation.goBack() }
        ]);
    };

    const isAnyFieldActive = Object.values(activeFields).some(value => value);

    const renderDetailItem = (field: string, label: string, value: string, icon: string) => {
        const isEditing = !!activeFields[field];

        return (
            <View style={styles.detailItem}>
                <Text style={styles.label}>{label}</Text>
                <View style={styles.valueRow}>
                    <View style={styles.valueContainer}>
                        <Feather name={icon} size={18} color={COLOR.darkGrey} style={styles.icon} />
                        {isEditing ? (
                            <TextInput
                                ref={el => { inputRefs.current[field] = el; }}
                                value={value}
                                onChangeText={(text) => handleChange(field, text)}
                                style={styles.textInput}
                                selectionColor={COLOR.primary}
                            />
                        ) : (
                            <Text style={styles.value}>{value}</Text>
                        )}
                    </View>
                    <TouchableOpacity
                        style={styles.editIconWrapper}
                        onPress={() => handleEdit(field)}
                        disabled={isEditing}
                    >
                        {isEditing ? (
                            <Feather name="edit-2" size={14} color={COLOR.primary} />
                        ) : (
                            <Feather name="edit-2" size={14} color={COLOR.primary} />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

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
        <ScrollContainer
            header={<Header />}
            footer={
                isAnyFieldActive ? (
                    <View style={styles.footer}>
                        <Button
                            title="Update"
                            onPress={handleUpdate}
                            btnContainerStyle={styles.updateButton}
                        />
                    </View>
                ) : undefined
            }
        >

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
                {renderDetailItem("name", "Full Name", userData.name, "user")}
                <View style={styles.divider} />
                {renderDetailItem("email", "Email Address", userData.email, "mail")}
                <View style={styles.divider} />
                {renderDetailItem("phone", "Phone Number", userData.phone, "phone")}
                <View style={styles.divider} />
                {renderDetailItem("address", "Address", userData.address, "map-pin")}
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
        ...GlobalStyles.textSemiBold18,
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
        ...GlobalStyles.textMedium13,
        color: COLOR.darkGrey,
        marginBottom: SIZE.moderateScale(8),
    },
    valueRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: SIZE.moderateScale(24),
    },
    valueContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    icon: {
        marginRight: SIZE.moderateScale(12),
    },
    value: {
        ...GlobalStyles.textMedium15,
        color: COLOR.dark,
    },
    textInput: {
        ...GlobalStyles.textMedium15,
        color: COLOR.dark,
        flex: 1,
        padding: 0, // Remove default padding
        margin: 0,
        height: undefined, // Let text determine height
    },
    editIconWrapper: {
        padding: SIZE.moderateScale(8),
    },
    divider: {
        height: 1,
        backgroundColor: COLOR.grayLight,
        width: "100%",
    },
    footer: {
        padding: SIZE.moderateScale(20),
        backgroundColor: COLOR.white,
        borderTopWidth: 1,
        borderTopColor: COLOR.grayLight,
    },
    updateButton: {
        ...GlobalStyles.primaryButton,
        width: '100%',
    },
});

export default AccountScreen;
