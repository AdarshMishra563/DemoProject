import React, { useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,

} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { COLOR, FONT_SIZE, FONTS, SIZE } from "@utils/Constant";
import { ScrollContainer } from "@components/common/ScrollContainer";

const { width } = Dimensions.get("window");

// Original categories from HomeScreen
const originalCategories = [
  {
    id: 1,
    name: "Driving Licence",
    type: 'driving' as const,
    icon: "card-account-details-outline",
    badgeIcon: "car",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "MaterialCommunityIcons" as const,
    badgeColor: "#2563EB",
  },
  {
    id: 2,
    name: "Business Licence",
    type: 'business' as const,
    icon: "business-center",
    badgeIcon: "verified",
    iconType: "MaterialIcons" as const,
    badgeIconType: "MaterialIcons" as const,
    badgeColor: "#2563EB",
  },
  {
    id: 3,
    name: "Commercial Licence",
    type: 'commercial' as const,
    icon: "office-building-outline",
    badgeIcon: "store",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "MaterialCommunityIcons" as const,
    badgeColor: "#2563EB",
  },
  {
    id: 4,
    name: "Agricultural Licence",
    type: 'agricultural' as const,
    icon: "sprout-outline",
    badgeIcon: "leaf",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "MaterialCommunityIcons" as const,
    badgeColor: "#2563EB",
  },
  {
    id: 5,
    name: "Medical Licence",
    type: 'medical' as const,
    icon: "clipboard-text-outline",
    badgeIcon: "heartbeat",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "FontAwesome5" as const,
    badgeColor: "#2563EB",
  },
  {
    id: 6,
    name: "Educational Licence",
    type: 'educational' as const,
    icon: "school-outline",
    badgeIcon: "checkmark-circle",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "Ionicons" as const,
    badgeColor: "#2563EB",
  },
  {
    id: 7,
    name: "Food Licence",
    type: 'food' as const,
    icon: "file-document-outline",
    badgeIcon: "food",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "MaterialCommunityIcons" as const,
    badgeColor: "#2563EB",
  },
  {
    id: 8,
    name: "Media Licence",
    type: 'media' as const,
    icon: "newspaper-variant-outline",
    badgeIcon: "play-circle",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "Ionicons" as const,
    badgeColor: "#2563EB",
  },
];

// 8 Additional categories
const additionalCategories = [
  {
    id: 9,
    name: "Construction Licence",
    type: 'construction' as const,
    icon: "hammer-wrench",
    badgeIcon: "building",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "FontAwesome5" as const,
    badgeColor: "#2563EB",
  },
  {
    id: 10,
    name: "Transport Licence",
    type: 'transport' as const,
    icon: "truck-outline",
    badgeIcon: "shipping-fast",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "FontAwesome5" as const,
    badgeColor: "#2563EB",
  },
  {
    id: 11,
    name: "Technology Licence",
    type: 'technology' as const,
    icon: "laptop",
    badgeIcon: "code",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "FontAwesome5" as const,
    badgeColor: "#2563EB",
  },
  {
    id: 12,
    name: "Entertainment Licence",
    type: 'entertainment' as const,
    icon: "theater",
    badgeIcon: "music",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "FontAwesome5" as const,
    badgeColor: "#2563EB",
  },
  {
    id: 13,
    name: "Real Estate Licence",
    type: 'real_estate' as const,
    icon: "home-city-outline",
    badgeIcon: "key",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "MaterialCommunityIcons" as const,
    badgeColor: "#2563EB",
  },
  {
    id: 14,
    name: "Legal Licence",
    type: 'legal' as const,
    icon: "scale-balance",
    badgeIcon: "gavel",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "FontAwesome5" as const,
    badgeColor: "#2563EB",
  },
  {
    id: 15,
    name: "Finance Licence",
    type: 'finance' as const,
    icon: "chart-box-outline",
    badgeIcon: "chart-line",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "MaterialCommunityIcons" as const,
    badgeColor: "#2563EB",
  },
  {
    id: 16,
    name: "Tourism Licence",
    type: 'tourism' as const,
    icon: "airplane",
    badgeIcon: "umbrella-beach",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "FontAwesome5" as const,
    badgeColor: "#2563EB",
  },
];

// Combine all categories
const allCategories = [...originalCategories, ...additionalCategories];

const CategoriesScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  // Use useFocusEffect to set StatusBar when screen is focused
  useFocusEffect(
    useCallback(() => {
      // If you also want to set background color on Android:
      // StatusBar.setBackgroundColor("white"); // For Android

      return () => {
        // Optional: Reset when screen loses focus if needed
        // StatusBar.setBarStyle("dark-content");
      };
    }, [])
  );

  // Category Icon Component - Reusable for all categories
  const CategoryIcon = ({ category }: { category: typeof allCategories[0] }) => {
    const mainIconSize = SIZE.moderateScale(26);
    const containerSize = SIZE.moderateScale(58);

    const renderIcon = () => {
      const commonProps = {
        size: mainIconSize,
        color: COLOR.grey,
      };

      switch (category.iconType as string) {
        case "MaterialCommunityIcons":
          return <MaterialCommunityIcons name={category.icon} {...commonProps} />;
        case "MaterialIcons":
          return <MaterialIcons name={category.icon} {...commonProps} />;
        case "Ionicons":
          return <Ionicons name={category.icon} {...commonProps} />;
        default:
          return <MaterialCommunityIcons name={category.icon} {...commonProps} />;
      }
    };

    // Function to split category name into words
    const renderCategoryName = (name: string) => {
      const words = name.split(' ');

      if (words.length === 2) {
        return (
          <View style={styles.twoWordContainer}>
            <Text style={styles.categoryWord} numberOfLines={1}>
              {words[0]}
            </Text>
            <Text style={styles.categoryWord} numberOfLines={1}>
              {words[1]}
            </Text>
          </View>
        );
      }

      // For single word or more than 2 words, show normally
      return (
        <Text style={styles.categoryName} numberOfLines={2}>
          {name}
        </Text>
      );
    };

    return (
      <View style={styles.categoryIconContainer}>
        <View style={[styles.iconContainer, { width: containerSize, height: containerSize }]}>
          {renderIcon()}
        </View>
        {renderCategoryName(category.name)}
      </View>
    );
  };

  return (
    <ScrollContainer
      header={
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Categories</Text>
        </View>
      }
      scrollStyle={styles.scrollView}
    >
      <View style={styles.categoriesGrid}>
        {allCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => navigation.navigate('CategoryDetails', { category: category.type })}
          >
            <CategoryIcon category={category} />
          </TouchableOpacity>
        ))}
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
    backgroundColor: COLOR.white,
    paddingHorizontal: SIZE.moderateScale(20),
    paddingVertical: SIZE.moderateScale(16),
    borderBottomWidth: 1,
    borderBottomColor: COLOR.grayLight,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: FONT_SIZE.font18,
    fontFamily: FONTS.parkinsansSemiBold,
    color: COLOR.dark,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: SIZE.moderateScale(100),
    marginTop: SIZE.moderateScale(10),
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginTop: SIZE.moderateScale(18),
  },
  categoryCard: {
    width: "25%",
    alignItems: "center",
    marginBottom: SIZE.moderateScale(24),
  },
  categoryIconContainer: {
    alignItems: "center",
    width: "100%",
  },
  iconContainer: {
    backgroundColor: "#F9FAFB", // light gray, consistent with others? use COLOR.grayLight if appropriate or stick to this hex
    borderRadius: SIZE.moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZE.moderateScale(8),
    borderWidth: 1,
    borderColor: COLOR.walletGray,
  },
  // Removed badgeContainer styles since we're not using badges anymore
  twoWordContainer: {
    alignItems: "center",
  },
  categoryWord: {
    fontSize: SIZE.moderateScale(11),
    fontFamily: FONTS.parkinsansMedium,
    color: COLOR.dark,
    textAlign: "center",
    lineHeight: SIZE.moderateScale(14),
  },
  categoryName: {
    fontSize: SIZE.moderateScale(11),
    fontFamily: FONTS.parkinsansMedium,
    color: COLOR.dark,
    textAlign: "center",
    lineHeight: SIZE.moderateScale(14),
  },
});

export default CategoriesScreen;