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
import CategoryCard from "../components/CategoryCard";
import { GlobalStyles } from '@styles/GlobalCss';

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
          <CategoryCard
            key={category.id}
            category={category}
            onPress={() => navigation.navigate('CategoryDetails', { category: category.type })}
            containerStyle={{
              width: "25%",
              marginBottom: SIZE.moderateScale(24),
            }}
          />
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
    ...GlobalStyles.textSemiBold18,
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

});

export default CategoriesScreen;