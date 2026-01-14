import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,

  Switch,
  Modal,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLOR, FONT_SIZE, FONTS, SIZE } from "@utils/Constant";
import { useDispatch } from "react-redux";
import { ScrollContainer } from "@components/common/ScrollContainer";
import { useNavigation } from "@react-navigation/native";
import { navigate, resetAndNavigate } from "@utils/NavigationUtil";
import { logout } from "@redux/slice/authSlice";
import { GlobalStyles } from '@styles/GlobalCss';

const { width } = Dimensions.get("window");

// Mock logout action - replace with your actual logout action import


const ProfileScreen: React.FC = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState("English");
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);

  interface MenuItem {
    id: number;
    title: string;
    icon: React.ReactNode;
    onPress: () => void;
    rightComponent?: React.ReactNode;
    textColor?: string;
  }

  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const firstGroup: MenuItem[] = [
    {
      id: 1,
      title: "Profile",
      icon: <Icon name="user" size={22} color="#374151" />,
      onPress: () => navigate("Account"),
    },
    {
      id: 2,
      title: "Payment Method",
      icon: <Icon name="credit-card" size={22} color="#374151" />,
      onPress: () => navigate("PaymentMethod"),
    },
  ];

  const secondGroup: MenuItem[] = [
    {
      id: 2.5,
      title: "Prev Surveys",
      icon: <Ionicons name="document-text-outline" size={22} color="#374151" />,
      onPress: () => navigate('SurveyDetails'),
    },
    {
      id: 3,
      title: "Start Survey",  // Link to new Survey Screen
      icon: <Ionicons name="play-circle-outline" size={22} color="#374151" />,
      onPress: () => navigate('SurveyScreen'),
    },
    {
      id: 3.5,
      title: "Orders",  // Changed from "Language" to "Prev Surveys"
      icon: <Ionicons name="cube-outline" size={22} color="#374151" />,  // Changed icon to document/text icon
      onPress: () => navigate("OrderScreen"),

    },
    {
      id: 3.8,
      title: "Buy Pdf",
      icon: <Icon name="shopping-bag" size={22} color="#374151" />,
      onPress: () => navigate("AppointmentScreen"),
    },
    {
      id: 4,
      title: "Notification",  // Changed from "Push Notifications" to "Notification"
      icon: <MaterialIcons name="notifications-none" size={22} color="#374151" />,
      onPress: () => navigate("Notifications"),  // Added onPress action
      rightComponent: (
        <Icon name="chevron-right" size={18} color="#9CA3AF" />  // Removed Switch, added chevron
      ),
    },
  ];

  const thirdGroup: MenuItem[] = [
    {
      id: 5,
      title: "Help Center",
      icon: <Icon name="help-circle" size={22} color="#374151" />,
      onPress: () => navigate("HelpCentre"),
    },
    {
      id: 6,
      title: "Privacy Policy",
      icon: <MaterialCommunityIcons name="shield-check-outline" size={22} color="#374151" />,
      onPress: () => navigate('PrivacyPolicy'),
    },
    {
      id: 7,
      title: "Terms and Conditions",
      icon: <MaterialCommunityIcons name="file-document-outline" size={22} color="#374151" />,
      onPress: () => navigate('TermsConditions'),
    },
    {
      id: 8,
      title: "Logout",
      icon: <Icon name="log-out" size={22} color="#EF4444" />,
      onPress: () => setShowLogoutModal(true),
      textColor: "#EF4444",
    },
  ];

  const languages = [
    { id: 1, name: "English", code: "en" },
    { id: 2, name: "العربية", code: "ar" },
    { id: 3, name: "Français", code: "fr" },
    { id: 4, name: "Español", code: "es" },
  ];

  const handleLanguageSelect = (lang: string) => {
    setLanguage(lang);
    setShowLanguageModal(false);
  };

  /** Handle Logout - exactly like your previous code */
  const handleLogout = async () => {
    try {
      setShowLogoutModal(false);
      setLoading(true);
      await dispatch(logout()); // Dispatch logout action
      // Navigate to Login - adjust based on your navigation structure
      resetAndNavigate('Login')
    } catch (error) {
      // Handle error if needed
      dispatch(logout()); // Still dispatch logout on error
      resetAndNavigate('Login')
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollContainer
      isEdgeValue="top"
      isNoBottomSpace={true}
      header={
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Account</Text>
        </View>
      }
      scrollStyle={styles.scrollView}
    >
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop" }}
            style={styles.profileImage}
          />
        </View>

        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>johndoe@gmail</Text>
      </View>

      {/* First Group - Profile & Payment Method */}
      <View style={styles.fullWidthGroup}>
        {firstGroup.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.fullWidthMenuItem,
              index !== firstGroup.length - 1 && styles.menuItemBorder
            ]}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.fullWidthMenuLeft}>
              <View style={styles.fullWidthMenuIcon}>
                {item.icon}
              </View>
              <Text style={[styles.fullWidthMenuText, item.textColor && { color: item.textColor }]}>
                {item.title}
              </Text>
            </View>

            {item.rightComponent ? (
              item.rightComponent
            ) : (
              <Icon name="chevron-right" size={18} color="#9CA3AF" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Space between groups - shows white background */}
      <View style={styles.groupSpace} />

      {/* Second Group - Prev Surveys & Notification */}
      <View style={styles.fullWidthGroup}>
        {secondGroup.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.fullWidthMenuItem,
              index !== secondGroup.length - 1 && styles.menuItemBorder
            ]}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.fullWidthMenuLeft}>
              <View style={styles.fullWidthMenuIcon}>
                {item.icon}
              </View>
              <Text style={[styles.fullWidthMenuText, item.textColor && { color: item.textColor }]}>
                {item.title}
              </Text>
            </View>

            {item.rightComponent ? (
              item.rightComponent
            ) : (
              <Icon name="chevron-right" size={18} color="#9CA3AF" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Space between groups */}
      <View style={styles.groupSpace} />

      {/* Third Group - Help Center, Privacy Policy & Logout */}
      <View style={styles.fullWidthGroup}>
        {thirdGroup.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.fullWidthMenuItem,
              index !== thirdGroup.length - 1 && styles.menuItemBorder
            ]}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.fullWidthMenuLeft}>
              <View style={styles.fullWidthMenuIcon}>
                {item.icon}
              </View>
              <Text style={[styles.fullWidthMenuText, item.textColor && { color: item.textColor }]}>
                {item.title}
              </Text>
            </View>

            {item.rightComponent ? (
              item.rightComponent
            ) : (
              <Icon name="chevron-right" size={18} color="#9CA3AF" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* App Version */}
      <Text style={styles.versionText}>Version 1.0.0</Text>

      {/* Language Selection Modal - Keeping this in case you still want it for other purposes */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Language</Text>
              <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
                <Icon name="x" size={24} color="#374151" />
              </TouchableOpacity>
            </View>

            <View style={styles.languageList}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.id}
                  style={styles.languageOption}
                  onPress={() => handleLanguageSelect(lang.name)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.languageOptionText}>{lang.name}</Text>
                  {language === lang.name && (
                    <Icon name="check" size={20} color="#2563EB" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmModal}>
            <View style={styles.confirmIcon}>
              <Icon name="log-out" size={32} color="#EF4444" />
            </View>
            <Text style={styles.confirmTitle}>Logout</Text>
            <Text style={styles.confirmMessage}>Are you sure you want to logout?</Text>

            <View style={styles.confirmButtons}>
              <TouchableOpacity
                style={[styles.confirmButton, styles.cancelButton]}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmButton, styles.logoutButton]}
                onPress={handleLogout}
                disabled={loading}
              >
                <Text style={styles.logoutButtonText}>
                  {loading ? "Processing..." : "Logout"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  header: {
    alignItems: "center",
    paddingVertical: SIZE.moderateScale(16),
    paddingHorizontal: SIZE.moderateScale(16),
    borderBottomWidth: 1,
    borderBottomColor: COLOR.grayLight,
  },
  headerTitle: {
    ...GlobalStyles.textSemiBold18,
    color: COLOR.dark,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: "#F9FAFB", // Very light gray background for the entire scroll area
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: SIZE.moderateScale(32),
    paddingHorizontal: SIZE.moderateScale(16),
    backgroundColor: COLOR.white,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: SIZE.moderateScale(16),
  },
  profileImage: {
    width: SIZE.moderateScale(80),
    height: SIZE.moderateScale(80),
    borderRadius: SIZE.moderateScale(40),
  },
  userName: {
    ...GlobalStyles.textSemiBold20,
    color: COLOR.dark,
    marginBottom: SIZE.moderateScale(4),
  },
  userEmail: {
    ...GlobalStyles.textRegular14,
    color: COLOR.darkGrey,

  },
  // Full width group styling
  fullWidthGroup: {
    backgroundColor: COLOR.white,
    width: width, // Full width from one end to another
  },
  fullWidthMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZE.moderateScale(16),
    paddingVertical: SIZE.moderateScale(18),
    width: "100%",
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.grayLight,
  },
  fullWidthMenuLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  fullWidthMenuIcon: {
    width: SIZE.moderateScale(40),
  },
  fullWidthMenuText: {
    ...GlobalStyles.textMedium16,
    color: COLOR.dark,
    flex: 1,
  },
  languageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  languageText: {
    ...GlobalStyles.textMedium14,
    color: COLOR.darkGrey,
    marginRight: SIZE.moderateScale(8),
  },
  // Space between groups
  groupSpace: {
    height: SIZE.moderateScale(16),
    backgroundColor: "#F9FAFB", // Light gray background for the space
  },
  versionText: {
    textAlign: "center",
    ...GlobalStyles.textRegular12,
    color: COLOR.darkGrey,
    marginTop: SIZE.moderateScale(32),
    marginBottom: SIZE.moderateScale(32),
    backgroundColor: "#F9FAFB",
    paddingVertical: SIZE.moderateScale(16),
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: COLOR.white,
    borderRadius: SIZE.moderateScale(16),
    width: "90%",
    maxWidth: SIZE.moderateScale(400),
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZE.moderateScale(20),
    paddingVertical: SIZE.moderateScale(16),
    borderBottomWidth: 1,
    borderBottomColor: COLOR.grayLight,
  },
  modalTitle: {
    ...GlobalStyles.textSemiBold18,
    color: COLOR.dark,
  },
  languageList: {
    maxHeight: SIZE.moderateScale(300),
  },
  languageOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZE.moderateScale(20),
    paddingVertical: SIZE.moderateScale(16),
    borderBottomWidth: 1,
    borderBottomColor: COLOR.grayLight,
  },
  languageOptionText: {
    ...GlobalStyles.textMedium16,
    color: COLOR.dark,
  },
  confirmModal: {
    backgroundColor: COLOR.white,
    borderRadius: SIZE.moderateScale(16),
    width: "85%",
    maxWidth: SIZE.moderateScale(350),
    padding: SIZE.moderateScale(24),
    alignItems: "center",
  },
  confirmIcon: {
    width: SIZE.moderateScale(64),
    height: SIZE.moderateScale(64),
    borderRadius: SIZE.moderateScale(32),
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZE.moderateScale(16),
  },
  confirmTitle: {
    ...GlobalStyles.textSemiBold20,
    color: COLOR.dark,
    marginBottom: SIZE.moderateScale(8),
  },
  confirmMessage: {
    ...GlobalStyles.textRegular14,
    color: COLOR.darkGrey,
    textAlign: "center",
    marginBottom: SIZE.moderateScale(24),
    lineHeight: SIZE.moderateScale(20),
  },
  confirmButtons: {
    flexDirection: "row",
    width: "100%",
    gap: SIZE.moderateScale(12),
  },
  confirmButton: {
    flex: 1,
    height: SIZE.moderateScale(48), // Match Global primaryButton height
    borderRadius: SIZE.moderateScale(12), // Match Global primaryButton radius
    alignItems: "center",
    justifyContent: "center", // Ensure text centering
  },
  cancelButton: {
    backgroundColor: COLOR.grayLight,
  },
  logoutButton: {
    backgroundColor: COLOR.error,
  },
  cancelButtonText: {
    ...GlobalStyles.textSemiBold14, // Match size
    color: COLOR.dark,
    fontFamily: FONTS.parkinsansSemiBold, // Ensure font matches
  },
  logoutButtonText: {
    ...GlobalStyles.textSemiBold14, // Match size
    color: COLOR.white,
    fontFamily: FONTS.parkinsansSemiBold, // Ensure font matches
  },
});

export default ProfileScreen;