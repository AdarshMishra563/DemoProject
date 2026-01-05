import React, { useRef, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  ImageBackground,
  FlatList,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { COLOR, FONT_SIZE, FONTS, SIZE } from "@utils/Constant";
import BusinessCardsScreen from "./ScaledScroll";
import ServicesGrid from "@components/CategoryComponent";
import CategoryCard from "../components/CategoryCard";
import { CategoryDetailCard } from "@components/CategoryDetailCard";
import { GlobalStyles } from '@styles/GlobalCss';

const { width } = Dimensions.get("window");

interface RootState {
  auth: {
    user: {
      full_name?: string;
      avatar?: string;
    } | null;
  };
}

// Category data matching the layered icon design
const categories = [
  {
    id: 1,
    name: "Driving Licence Card",
    type: 'driving' as const,
    icon: "card-account-details-outline",
    badgeIcon: "car",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "MaterialCommunityIcons" as const,
    badgeColor: "#2563EB",
  },
  {
    id: 2,
    name: "New Business Licence",
    type: 'business' as const,
    icon: "business-center",
    badgeIcon: "verified",
    iconType: "MaterialIcons" as const,
    badgeIconType: "MaterialIcons" as const,
    badgeColor: "#2563EB",
  },
  {
    id: 3,
    name: "Commercial Trade Licence",
    type: 'commercial' as const,
    icon: "office-building-outline",
    badgeIcon: "store",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "MaterialCommunityIcons" as const,
    badgeColor: "#2563EB",
  },
  {
    id: 4,
    name: "Agricultural Farm Licence",
    type: 'agricultural' as const,
    icon: "sprout-outline",
    badgeIcon: "leaf",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "MaterialCommunityIcons" as const,
    badgeColor: "#2563EB",
  },
  {
    id: 5,
    name: "Medical Practice Licence",
    type: 'medical' as const,
    icon: "clipboard-text-outline",
    badgeIcon: "heartbeat",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "FontAwesome5" as const,
    badgeColor: "#2563EB",
  },
  {
    id: 6,
    name: "Educational Institute Licence",
    type: 'educational' as const,
    icon: "school-outline",
    badgeIcon: "checkmark-circle",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "Ionicons" as const,
    badgeColor: "#2563EB",
  },
  {
    id: 7,
    name: "Food Safety Licence",
    type: 'food' as const,
    icon: "file-document-outline",
    badgeIcon: "food",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "MaterialCommunityIcons" as const,
    badgeColor: "#2563EB",
  },
  {
    id: 8,
    name: "Digital Media Licence",
    type: 'media' as const,
    icon: "newspaper-variant-outline",
    badgeIcon: "play-circle",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "Ionicons" as const,
    badgeColor: "#2563EB",
  },
];

// Courses data - matching the same structure as categories
const courses = [
  {
    id: 1,
    name: "Food Courses",
    type: 'food_courses' as const,
    icon: "food-outline",
    badgeIcon: "chef-hat",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "MaterialCommunityIcons" as const,
    badgeColor: "#2563EB", // Blue color for all badges
  },
  {
    id: 2,
    name: "Business Courses",
    type: 'business_courses' as const,
    icon: "chart-line",
    badgeIcon: "trending-up",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "MaterialCommunityIcons" as const,
    badgeColor: "#2563EB", // Blue color for all badges
  },
  {
    id: 3,
    name: "Driving Courses",
    type: 'driving_courses' as const,
    icon: "steering",
    badgeIcon: "car-sport",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "Ionicons" as const,
    badgeColor: "#2563EB", // Blue color for all badges
  },
  {
    id: 4,
    name: "Medical Courses",
    type: 'medical_courses' as const,
    icon: "medical-bag",
    badgeIcon: "stethoscope",
    iconType: "MaterialCommunityIcons" as const,
    badgeIconType: "MaterialCommunityIcons" as const,
    badgeColor: "#2563EB", // Blue color for all badges
  },
];

// Banner Images Data for horizontal FlatList
const bannerImages = [
  {
    id: 1,
    title: "Explore Licences",
    subtitle: "Easy & Fast Process",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Quick Services",
    subtitle: "Get Your Documents Fast",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Online Applications",
    subtitle: "Apply From Anywhere",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Expert Guidance",
    subtitle: "Professional Support",
    image: "https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?w=800&auto=format&fit=crop",
  },
];

// Top Stories Data
const topStories = [
  {
    id: 1,
    title: "Powerful Hurricane Melissa strengthens significantly as it heads slowly towards the densely populated Florida coast this weekend",
    time: "3min ago",
    views: "585K views",
    source: "Post Publishing",
    image: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=400&auto=format&fit=crop",
    duration: "2:30",
  },
  {
    id: 2,
    title: "Pakistan and South Africa begin their highly anticipated build-up to the T20 World Cup with this crucial series opener",
    time: "45min ago",
    views: "385K views",
    source: "Post Publishing",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&auto=format&fit=crop",
    duration: "3:15",
  },
  {
    id: 3,
    title: "Trump prepares to host a major summit of Central Asian leaders at his Mar-a-Lago resort early next month",
    time: "45min ago",
    views: "245K views",
    source: "Post Publishing",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&auto=format&fit=crop",
    duration: "4:20",
  },
  {
    id: 4,
    title: "Gold prices finally stabilize after hitting a new record high, while top analysts predict a further rally soon",
    time: "3hr ago",
    views: "325K views",
    source: "Financial Times",
    image: "https://images.unsplash.com/photo-1552422535-c45813c61732?w=400&auto=format&fit=crop",
    duration: "5:45",
  },
];

// Trending dummy data
const trendingData = [
  {
    id: 1,
    title: "Business Survey 2024",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&auto=format&fit=crop",
    category: "Business Analysis",
  },
  {
    id: 2,
    title: "Market Trends Report",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w-400&auto=format&fit=crop",
    category: "Finance",
  },
  {
    id: 3,
    title: "Tech Innovations",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&auto=format&fit=crop",
    category: "Technology",
  },
  {
    id: 4,
    title: "Health & Wellness",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop",
    category: "Healthcare",
  },
  {
    id: 5,
    title: "Educational Reforms",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&auto=format&fit=crop",
    category: "Education",
  },
  {
    id: 6,
    title: "Real Estate Insights",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&auto=format&fit=crop",
    category: "Real Estate",
  },
];

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoScrollDirection, setAutoScrollDirection] = useState<'forward' | 'backward'>('forward');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Get user from Redux
  const user = useSelector((state: RootState) => state.auth.user);
  const isNavigation = useNavigation()
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content");
      StatusBar.setBackgroundColor(COLOR.primary);

      return () => {
        StatusBar.setBarStyle("dark-content");
        StatusBar.setBackgroundColor("default");
      };
    }, [])
  );

  // Auto scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoScrollDirection === 'forward') {
        if (currentIndex < bannerImages.length - 1) {
          const nextIndex = currentIndex + 1;
          setCurrentIndex(nextIndex);
          flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
        } else {
          // Last item reached, change direction to backward
          setAutoScrollDirection('backward');
          const prevIndex = currentIndex - 1;
          setCurrentIndex(prevIndex);
          flatListRef.current?.scrollToIndex({
            index: prevIndex,
            animated: true,
          });
        }
      } else {
        if (currentIndex > 0) {
          const prevIndex = currentIndex - 1;
          setCurrentIndex(prevIndex);
          flatListRef.current?.scrollToIndex({
            index: prevIndex,
            animated: true,
          });
        } else {
          // First item reached, change direction to forward
          setAutoScrollDirection('forward');
          const nextIndex = currentIndex + 1;
          setCurrentIndex(nextIndex);
          flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
        }
      }
    }, 3000); // 2 second interval

    return () => clearInterval(interval);
  }, [currentIndex, autoScrollDirection]);



  // Trending Card Component (formerly local CategoryCard)
  const TrendingCard = ({ title, image }: { title: string; image: string }) => {
    return (
      <View style={categoryStyles.outerContainer}>
        {/* Image Container */}
        <View style={categoryStyles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={categoryStyles.image}
            resizeMode="stretch"
          />
        </View>

        {/* Title */}
        <Text style={categoryStyles.title} numberOfLines={2}>
          {title}
        </Text>
      </View>
    );
  };

  // Render Banner Item
  // Force status bar style on focus
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBackgroundColor(COLOR.primary);
      StatusBar.setBarStyle('light-content');
    }, [])
  );

  const renderBannerItem = ({ item }: { item: typeof bannerImages[0] }) => (
    <View style={styles.bannerContainer}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.bannerImage}
        imageStyle={styles.bannerImageStyle}
      >
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>{item.title}</Text>
          <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
        </View>
      </ImageBackground>
    </View>
  );




  return (
    <View style={styles.container}>

      <View style={[styles.stickyHeader, { paddingTop: insets.top + 9 }]}>
        <View style={styles.headerLeft}>
          <View style={styles.headerContent}>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.userName}>
              {user?.full_name || "User"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Icon name='bell' size={23} color={COLOR.white} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Sticky Placeholder */}
        <View style={styles.stickyHeaderPlaceholder} />

        {/* Search Input */}
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={() => navigation.navigate('SearchPage')}
          activeOpacity={1}
        >
          <Icon
            name="search"
            size={20}
            color={COLOR.darkGrey}
            style={styles.searchIcon}
          />
          <Text style={styles.searchPlaceholder}>Search pages...</Text>
        </TouchableOpacity>

        {/* Banner Image Horizontal FlatList */}
        <View style={styles.bannerFlatListContainer}>
          <FlatList
            ref={flatListRef}
            data={bannerImages}
            renderItem={renderBannerItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const contentOffset = event.nativeEvent.contentOffset;
              const viewSize = event.nativeEvent.layoutMeasurement;
              const pageNum = Math.floor(contentOffset.x / viewSize.width);
              setCurrentIndex(pageNum);
            }}
            onScrollToIndexFailed={() => {
              // Fallback in case scroll fails
              setTimeout(() => {
                flatListRef.current?.scrollToIndex({
                  index: currentIndex,
                  animated: true,
                });
              }, 100);
            }}
          />

          {/* Dots indicator */}
          <View style={styles.dotsContainer}>
            {bannerImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentIndex ? styles.activeDot : styles.inactiveDot
                ]}
              />
            ))}
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Category')}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {/* Categories Grid - 4 items per row without horizontal spacing */}
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() => navigation.navigate('CategoryDetails', { category: category.type })}
                isHome={true}
                containerStyle={{
                  width: "33.33%",
                  marginBottom: SIZE.moderateScale(20),
                }}
              />
            ))}
          </View>
        </View>

        {/* Trending Section - Added below Categories */}
        <View style={styles.trendingSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Survey</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {/* Horizontal ScrollView for Trending Cards */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingScrollContent}
          >
            {trendingData.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.trendingCardWrapper}
                onPress={() => navigation.navigate('SurveyDetails', { item })}
              >
                <TrendingCard title={item.title} image={item.image} />

              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Top Stories Section */}
        <View style={styles.storiesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Latest ({topStories.length})
            </Text>
          </View>

          {/* Stories List using CategoryDetailCard */}
          <View style={styles.storiesList}>
            {topStories.map((story, index) => (
              <CategoryDetailCard
                key={story.id}
                item={{
                  id: story.id.toString(),
                  title: story.title,
                  image: story.image,
                  time: story.time,
                  duration: story.duration,
                }}
                sectionTitle="News" // You can make this dynamic if needed
                sectionCount="12"   // You can make this dynamic if needed
                onPress={() => {
                  if (index % 2 === 0) {
                    navigation.navigate('Checkout2');
                  } else {
                    navigation.navigate('CheckoutSummary2');
                  }
                }}
              />
            ))}
          </View>
        </View>
        <View style={[styles.section, { marginTop: 18 }]}>
          <View style={[styles.sectionHeader, { marginBottom: -18 }]}>
            <Text style={styles.sectionTitle}>Category2</Text>
          </View>

        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ServicesGrid />
        </View>
        {/* Blogs Section */}
        <View style={styles.section2}>
          <View style={[styles.sectionHeader, { paddingHorizontal: 20, marginTop: 10, marginBottom: 10 }]}>
            <Text style={styles.sectionTitle}>Blogs</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Blogs')}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {/* Business Cards Screen with theme prop */}
          <BusinessCardsScreen />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 30,
  },
  stickyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZE.moderateScale(20),
    paddingBottom: SIZE.moderateScale(12),
    backgroundColor: COLOR.primary,
    zIndex: 100,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerContent: {
    flex: 1,
  },
  welcomeText: {
    ...GlobalStyles.textBold18,
    color: COLOR.white,
    marginBottom: SIZE.moderateScale(2),
  },
  userName: {
    ...GlobalStyles.textMedium12,
    color: COLOR.white,
  },
  stickyHeaderPlaceholder: {
    height: 0,
  },
  notificationButton: {
    marginLeft: SIZE.moderateScale(15),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOR.white,
    borderRadius: SIZE.moderateScale(12),
    marginHorizontal: SIZE.moderateScale(20),
    marginVertical: SIZE.moderateScale(15),
    paddingHorizontal: SIZE.moderateScale(15),
    height: SIZE.moderateScale(48),
    borderWidth: 1,
    borderColor: COLOR.lightGray,
  },
  searchIcon: {
    marginRight: SIZE.moderateScale(10),
  },
  searchPlaceholder: {
    flex: 1,
    ...GlobalStyles.textRegular13,
    color: COLOR.darkGrey,
  },
  bannerFlatListContainer: {
    marginBottom: SIZE.moderateScale(25),
    position: 'relative',
  },
  bannerContainer: {
    width: width - SIZE.moderateScale(40), // Full width minus horizontal padding
    marginHorizontal: SIZE.moderateScale(20),
  },
  bannerImage: {
    width: "100%",
    height: SIZE.moderateScale(174),
    justifyContent: "center",
  },
  bannerImageStyle: {
    borderRadius: SIZE.moderateScale(16),
  },
  bannerOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: SIZE.moderateScale(20),
    borderRadius: SIZE.moderateScale(16),
    height: "100%",
    justifyContent: "center",
  },
  bannerTitle: {
    ...GlobalStyles.textBold18,
    color: COLOR.white,
    top: SIZE.moderateScale(36),
    marginBottom: SIZE.moderateScale(4),
  },
  bannerSubtitle: {
    ...GlobalStyles.textRegular12,
    top: SIZE.moderateScale(36),
    color: COLOR.white,
    opacity: 0.9,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: SIZE.moderateScale(15),
    left: 0,
    right: 0,
  },
  dot: {
    width: SIZE.moderateScale(8),
    height: SIZE.moderateScale(8),
    borderRadius: SIZE.moderateScale(4),
    marginHorizontal: SIZE.moderateScale(4),
  },
  activeDot: {
    backgroundColor: COLOR.white,
  },
  inactiveDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  section: {
    paddingHorizontal: SIZE.moderateScale(12),
    marginBottom: SIZE.moderateScale(20),
  },
  trendingSection: {
    paddingHorizontal: SIZE.moderateScale(12),
    marginBottom: SIZE.moderateScale(25),
  },
  trendingScrollContent: {
    paddingLeft: SIZE.moderateScale(8),
    paddingRight: SIZE.moderateScale(20),
  },
  trendingCardWrapper: {
    marginRight: SIZE.moderateScale(15),
    alignItems: 'center',
  },
  trendingCategoryText: {
    ...GlobalStyles.textMedium9,
    color: COLOR.walletHistoryGrey,
    marginTop: SIZE.moderateScale(4),
    textAlign: 'center',
  },
  section2: {
    paddingHorizontal: 0,
    marginBottom: SIZE.moderateScale(20),
  },
  storiesSection: {
    paddingHorizontal: SIZE.moderateScale(12),
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZE.moderateScale(15),
    paddingHorizontal: SIZE.moderateScale(8),
  },
  sectionTitle: {
    ...GlobalStyles.textBold18,
    color: COLOR.dark,
  },
  seeAllText: {
    ...GlobalStyles.textSemiBold12,
    color: COLOR.primary,
  },
  themeToggleText: {
    ...GlobalStyles.textSemiBold12,
    color: COLOR.primary,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginHorizontal: -SIZE.moderateScale(12),
  },

  // Top Stories Styles - Updated to match image exactly
  storiesList: {
    marginHorizontal: - SIZE.moderateScale(9), marginTop: -12

  },
  storyItem: {
    flexDirection: "row",
    backgroundColor: "transparent",
    borderRadius: 0,
    overflow: "visible",
    height: SIZE.moderateScale(88), // 92 -> 88 (or 90)
    marginBottom: SIZE.moderateScale(4),
  },
  imageContainer: {
    width: SIZE.moderateScale(130), // 135 -> 130
    height: SIZE.moderateScale(88), // 92 -> 88
    overflow: "hidden",
  },
  storyImage: {
    width: "100%",
    height: "100%",
  },
  storyImageStyle: {
    // No border radius
  },
  playIconContainer: {
    position: "absolute",
    bottom: SIZE.moderateScale(8),
    right: SIZE.moderateScale(8),
    flexDirection: "row",
    alignItems: "center",
    // No background container
  },
  durationText: {
    ...GlobalStyles.textMedium9,
    color: COLOR.white,
    marginLeft: SIZE.moderateScale(4),
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  storyContent: {
    flex: 1,
    marginLeft: SIZE.moderateScale(12),
    justifyContent: "space-between",
    height: SIZE.moderateScale(88),
    paddingVertical: 0,
  },
  storyTitle: {
    ...GlobalStyles.textSemiBold12,
    color: COLOR.dark,
    lineHeight: SIZE.moderateScale(17),

    marginTop: 0,
  },
  timeViewsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SIZE.moderateScale(6), // Moved just below title
    marginBottom: 'auto', // Push publisher row to bottom
  },
  timeText: {
    ...GlobalStyles.textMedium10,
    color: COLOR.walletHistoryGrey,
  },
  dotSeparator: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: COLOR.walletHistoryGrey,
    marginHorizontal: SIZE.moderateScale(6),
  },
  viewsText: {
    ...GlobalStyles.textMedium10,
    color: COLOR.walletHistoryGrey,
  },
  publisherActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  publisherContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  sourceText: {
    ...GlobalStyles.textSemiBold9,
    color: COLOR.dark,
    marginRight: SIZE.moderateScale(4),
  },
  verifiedIcon: {
    marginLeft: SIZE.moderateScale(2),
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZE.moderateScale(8),
  },
  actionButton: {
    padding: SIZE.moderateScale(4),
    paddingLeft: 0,
  },
});


const categoryStyles = StyleSheet.create({
  /* OUTER CARD */
  outerContainer: {
    width: SIZE.moderateScale(105), // 110 -> 105
    backgroundColor: "#f7f7f7f8", // very very light gray
    borderRadius: SIZE.moderateScale(10),
    padding: SIZE.moderateScale(6),
    alignItems: "center", minHeight: SIZE.moderateScale(135)
  },

  /* IMAGE BOX */
  imageContainer: {
    width: "100%",
    height: SIZE.moderateScale(75),
    backgroundColor: "#EFEFEF", // slightly darker light gray
    borderRadius: SIZE.moderateScale(8),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZE.moderateScale(8),
  },

  image: {
    width: "100%",
    height: "100%", borderRadius: SIZE.moderateScale(12),
  },

  /* TITLE */
  title: {
    ...GlobalStyles.textMedium11,
    color: COLOR.dark, // black-ish
    textAlign: "center",
    lineHeight: SIZE.moderateScale(15),
  },
});

export default HomeScreen;