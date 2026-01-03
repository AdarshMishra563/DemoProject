import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { store, persistor } from '@redux/store';

// Screens
import SplashScreen from '@screens/SplashScreen';
import HomeScreen from '@screens/Home';

import ProfileScreen from '@screens/Profile';
import LoginScreen from '@screens/Login';
import SignUpScreen from '@screens/Signup';



import { navigate, navigationRef, resetAndNavigate } from '@utils/NavigationUtil';


import { COLOR, FONT_SIZE, FONTS } from '@utils/Constant';
import { StyleSheet } from 'react-native';
import NotificationScreen from '@screens/Notifications';


import SearchPage from '@screens/SearchPage';
import WelcomeScreen from '@screens/WlcomeScreen';

// Import the Category screen (you'll need to create this)
import AccountScreen from "@screens/Account";
import CategoryScreen from '@screens/Category'; // Make sure to create this screen
import SubscriptionScreen from '@screens/SubscriptionScreen';
import SurveyListScreen from '@screens/CategoryDetails';
import PaymentMethodScreen from '@screens/PaymentMethod';
import OrderScreen from '@screens/OrderScreen';
import AppointmentScreen from '@screens/BuyPdf';
import CheckoutScreen from '@screens/Checkout';
import CheckoutSummaryScreen from '@screens/Result';
import SurveyDetailsScreen from '@screens/SurveyDetail';
import BlogsScreen from '@screens/Blogs';
import BlogDetailsScreen from '@screens/BlogDetails';
import TermsAndConditionsScreen from '@screens/TermsAndConditions';
import PrivacyPolicyScreen2 from '@screens/PrivacyPolicy';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * Bottom Tabs (Main App Tabs)
 */
const MainTabs = () => {
  const insets = useSafeAreaInsets();



  // Force Home status bar style on initial mount

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Category':
              iconName = focused ? 'shape' : 'shape-outline'; // Using shape icon for category
              break;
            case 'Order': // Changed from Leaderboard to Order
              iconName = focused ? 'clipboard-list' : 'clipboard-list-outline'; // Using clipboard icon for order
              break;
            case 'Profile':
              iconName = focused ? 'account' : 'account-outline';
              break;
            default:
              iconName = 'help-circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLOR.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: insets.bottom + 2,
          height: 55 + insets.bottom,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 6,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Category"
        component={CategoryScreen}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Order" // Changed from Leaderboard to Order
        component={OrderScreen} // Still using LeaderboardScreen component
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

/**
 * Main App Stack (after login)
 */
const AppNavigation = () => {
  const isLoggedIn = useSelector((state: any) => state.auth.isUserLogin);
  const [initialized, setInitialized] = useState(false);



  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!initialized && <Stack.Screen name="Splash" component={SplashScreen} />}

        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />

            <Stack.Screen name="Signup" component={SignUpScreen} />

          </>
        ) : (
          <>
            <Stack.Screen name="Tab" component={MainTabs} />


            <Stack.Screen name="Notifications" component={NotificationScreen} />

            <Stack.Screen name="NewsDetail" component={SubscriptionScreen} />

            <Stack.Screen name="SurveyDetails" component={SurveyDetailsScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="Checkout2" component={CheckoutSummaryScreen} />
            <Stack.Screen name="CategoryDetails" component={SurveyListScreen} />
            <Stack.Screen name="SearchPage" component={SearchPage} />
            <Stack.Screen name="Blogs" component={BlogsScreen} />
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen name="BlogDetails" component={BlogDetailsScreen} />
            <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />
            <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />

            <Stack.Screen
              name="PrivacyPolicy"
              component={PrivacyPolicyScreen2}

            />

            <Stack.Screen
              name="TermsConditions"
              component={TermsAndConditionsScreen}

            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

/**
 * Common Screen Options
 */
const commonScreenOptions = {
  headerShown: true,
  headerTitleAlign: 'left' as const,
  headerTitleStyle: {
    fontFamily: FONTS.parkinsansSemiBold,
    color: COLOR.dark,
    fontSize: FONT_SIZE.font16,
  },
  headerShadowVisible: false,
  headerStyle: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLOR.grey,
  },
};

/**
 * Main App with Providers
 */
const AppNavigationn = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigation />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default AppNavigationn;