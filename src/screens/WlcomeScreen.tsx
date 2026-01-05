import React, { FC } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import { COLOR, FONT_SIZE, FONTS, SIZE } from '@utils/Constant';
import { navigate } from '@utils/NavigationUtil';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalStyles } from '@styles/GlobalCss';

const WELCOME_IMAGE = require('@assets/images/welcome.png');

const { width, height } = Dimensions.get('window');

interface WelcomeScreenProps { }

const WelcomeScreen: FC<WelcomeScreenProps> = () => {
  const handleGetStarted = () => {
    navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>


      <Image
        source={WELCOME_IMAGE}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />

      <View style={styles.contentContainer}>
        <View style={styles.topTextContainer}>
          <Text style={styles.topTitle}>Welcome to</Text>
          <View style={styles.logoContainer}>
            <Text style={[styles.logoPart, { color: COLOR.primary }]}>Blink</Text>
            <Text style={[styles.logoPart, { color: '#FFA500' }]}>Exam</Text>
          </View>
        </View>

        <View style={styles.middleTextContainer}>
          <Text style={styles.middleTitle}>Ace Your Exams</Text>
          <Text style={styles.middleSubtitle}>
            Prepare with interactive quizzes,{'\n'}
            track progress, and excel!
          </Text>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: SIZE.moderateScale(24),
    paddingTop: SIZE.moderateScale(40),
    paddingBottom: SIZE.moderateScale(60),
  },
  topTextContainer: {
    alignItems: 'center',
    marginTop: SIZE.moderateScale(40),
  },
  topTitle: {
    ...GlobalStyles.textMedium20,
    color: COLOR.dark,
    marginBottom: SIZE.moderateScale(8),
  },
  logoContainer: {
    flexDirection: 'row',
  },
  logoPart: {
    ...GlobalStyles.textBold22,
    fontSize: FONT_SIZE.font22 * 1.1,
  },
  middleTextContainer: {
    alignItems: 'center',
    marginTop: SIZE.moderateScale(320),
  },
  middleTitle: {
    color: COLOR.dark,
    ...GlobalStyles.textBold20,
    textAlign: 'center',
    marginBottom: SIZE.moderateScale(16),
    lineHeight: SIZE.moderateScale(42),
  },
  middleSubtitle: {
    color: COLOR.dark,
    ...GlobalStyles.textRegular16,
    textAlign: 'center',
    lineHeight: SIZE.moderateScale(24),
  },
  bottomContainer: {
    alignItems: 'center', top: 14
  },
  getStartedButton: {
    backgroundColor: COLOR.primary,
    width: '100%',
    height: SIZE.moderateScale(52),
    borderRadius: SIZE.moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLOR.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: COLOR.white,
    ...GlobalStyles.textSemiBold18,
  },
});

export default WelcomeScreen;