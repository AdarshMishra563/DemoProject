import React from 'react';
import {StyleSheet} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { SIZE,COLOR } from './src/utils/Constant';
import MainNavigation from './src/navigation/MainNavigation';
import ToastManager from 'toastify-react-native';

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


// Auth Stack Navigator

// App Navigation
const AppNavigation = () => {
 const isLoggedIn=useSelector(state=>state.auth.isUserLogin);


  return (
   
     <MainNavigation/>
   
  );
};

// Main App Component with Providers
const App = () => {
  return (
    <SafeAreaProvider>
       <ToastManager
        position="bottom"
        showCloseIcon={false}
        showProgressBar={false}
        style={styles.errorContainer}
        width={Math.round(SIZE.deviceWidth - 100)}
        backdropOpacity={0}
        textStyle={styles.errorText}
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigation />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    backgroundColor:COLOR.bgColor,
    borderRadius: 20,
    shadowOpacity: 0,
  },
  errorText: {
    color: COLOR.white,
    fontSize: 12,
    shadowOpacity: 0,
  },
});

export default App;