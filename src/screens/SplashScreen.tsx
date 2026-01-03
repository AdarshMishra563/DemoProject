import React, { useEffect } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, shallowEqual } from 'react-redux';
import { authSelector } from '@redux/slice/authSlice';
import { resetAndNavigate } from '@utils/NavigationUtil';
import { COLOR, SIZE } from '@utils/Constant';
import { useFocusEffect } from '@react-navigation/native';

const SplashScreen = () => {
  const { isUserLogin } = useSelector(authSelector, shallowEqual);

  const handleNavigation = () => {
    resetAndNavigate(isUserLogin ? 'Tab' : 'Welcome');
  }
  useFocusEffect(
    React.useCallback(() => {


      return () => {
        StatusBar.setBarStyle("light-content");
        StatusBar.setBackgroundColor(COLOR.primary);
      };
    }, [])
  );

  useEffect(() => {
    const timer = setTimeout(handleNavigation, 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          source={require('../assets/images/BE.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <ActivityIndicator size="large" color={COLOR.white} style={styles.loader} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: SIZE.moderateScale(150),
    height: SIZE.moderateScale(150),
    marginBottom: SIZE.moderateScale(20), borderRadius: SIZE.moderateScale(10),
  },
  loader: {
    marginTop: SIZE.moderateScale(20),
  },
});

export default SplashScreen;
