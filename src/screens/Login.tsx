import React, { FC, useState } from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  ScrollView,
  Text,

  TouchableOpacity,
} from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import { AxiosError } from 'axios';
import { Toast } from 'toastify-react-native';
import { GlobalStyles } from '@styles/GlobalCss';
import {
  AxiosErrorMessage,
  COLOR,
  FONT_SIZE,
  FONTS,
  HTTP_METHOD,
  SIZE,
} from '@utils/Constant';
import { Loader } from '@components/common/Loader';
import { InputBox } from '@components/common/InputBox';
import { Button } from '@components/common/Button';
import { navigate, resetAndNavigate } from '@utils/NavigationUtil';
import { object, string } from 'yup';
import apiStaticClient from '@services/apiStaticClient';
import { useDispatch } from 'react-redux';
import { login } from '@redux/slice/authSlice';
import { MainContainer } from '@components/common/MainContainer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollContainer } from '@components/common/ScrollContainer';

interface LoginValues {
  phone: string;
  password: string;
}

const LoginScreen: FC = () => {
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [userType, setUserType] = useState<'child' | 'parent'>('child'); // Toggle state
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const schema = object({
    phone: string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    password: string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleFormSubmit = async (
    values: LoginValues,
    actions: FormikHelpers<LoginValues>,
  ) => {
    try {
      Keyboard.dismiss();
      setLoading(true);
      dispatch(login({
        isUserLogin: true,
        token: 'dummy_jwt_token_12345',
        user: {
          id: 'user_123',
          full_name: 'New User',
          email: 'new.user@example.com',
          contact_number: '9876543210',
          avatar: ''
        },
        message: 'Login successful'
      }));
      resetAndNavigate('Tab');

      const response = await apiStaticClient({
        url: '/salesman/login',
        method: HTTP_METHOD.POST,
        data: {
          email: values?.phone,
          password: values?.password,
        },
      });
      if (response.data?.status === 'success' && response?.data?.code === 200) {
        setLoading(false);
        actions.resetForm();

        dispatch(
          login({
            isUserLogin: true,
            user: response.data?.data,
            token: response?.data?.token,
          }),
        );
        Toast.info(response.data?.message);
        setLoading(false);
        resetAndNavigate('Tab');
      }
    } catch (error) {
      actions.resetForm();
      setLoading(false);
      const err = error as AxiosError<AxiosErrorMessage>;
      Toast.error(err.response?.data?.message ?? 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const handleUserTypeToggle = () => {
    setUserType(userType === 'child' ? 'parent' : 'child');
  };

  return (
    <ScrollContainer
      scrollStyle={{ flex: 1, backgroundColor: COLOR.white }}
      header={null} // Login usually doesn't have a sticky header like Home, but we can put the top header part if needed. Here we keep layout structure.
      footer={
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By Continuing, you agree to our{' '}
            <Text
              style={styles.linkText}
              onPress={() => navigate('TermsAndConditions')}>
              Terms & Conditions
            </Text>{' '}
            &{' '}
            <Text
              style={styles.linkText}
              onPress={() => navigate('PrivacyPolicy')}>
              Privacy Policy
            </Text>
          </Text>
        </View>
      }
    >
      <MainContainer  >
        {loading && <Loader />}

        {/* Header with Back Button and BlinkExam */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigate('Welcome')}>
            <Icon name="arrow-back" size={24} color={COLOR.dark} />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>
              <Text style={[styles.logoPart, { color: COLOR.primary }]}>Blink</Text>
              <Text style={[styles.logoPart, { color: '#FFA500' }]}>Exam</Text>
            </Text>
          </View>

          {/* Empty view for spacing */}
          <View style={{ width: SIZE.moderateScale(40) }} />
        </View>

        <View style={styles.contentContainer}>

          {/* Login Header */}
          <View style={styles.loginHeader}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>
              Login to Continue
            </Text>
          </View>

          {/* User Type Toggle Button */}

          <Formik
            initialValues={{ phone: '', password: '' }}
            onSubmit={handleFormSubmit}
            validationSchema={schema}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <View style={styles.inputWrapper}>
                  <InputBox
                    iconName="phone"
                    isTitle
                    title={'Phone Number'}
                    placeholder="Enter Phone Number"
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    keyboardType="phone-pad"
                  />
                  {touched.phone && errors.phone && (
                    <Text style={styles.errorMessage}>{errors.phone}</Text>
                  )}
                </View>

                <View style={styles.inputWrapper}>
                  <InputBox
                    iconName="lock"
                    isTitle
                    title={'Password'}
                    placeholder="Enter Password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    isPassword

                  />
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>
                      {errors.password}
                    </Text>
                  )}
                </View>

                {/* Remember me and Forgot Password row */}
                <View style={styles.rememberForgotRow}>
                  <TouchableOpacity
                    style={styles.rememberMeContainer}
                    onPress={() => setRememberMe(!rememberMe)}>
                    <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                      {rememberMe && (
                        <Icon name="checkmark" size={14} color={COLOR.white} />
                      )}
                    </View>
                    <Text style={styles.rememberMeText}>Remember me</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigate('ForgotPassword')}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>


                <Button
                  title="Login"
                  titleStyle={
                    {
                      color: COLOR.white,
                      fontFamily: FONTS.parkinsansSemiBold,
                      fontSize: FONT_SIZE.font15,
                      lineHeight: SIZE.moderateScale(16),
                    }
                  }
                  btnContainerStyle={styles.loginButton}
                  onPress={handleSubmit}
                />

                {/* Sign Up Link */}
                <View style={styles.signupContainer}>
                  <Text style={styles.signupText}>
                    Not registered yet?{' '}
                    <Text
                      style={styles.signupLink}
                      onPress={() => navigate('Signup')}>
                      Create an account
                    </Text>
                  </Text>
                </View>
              </>
            )}
          </Formik>
        </View>

        {/* Fixed Footer */}

      </MainContainer>
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZE.moderateScale(0),
    paddingTop: SIZE.moderateScale(10),
    paddingBottom: SIZE.moderateScale(20),
  },
  backButton: {
    padding: SIZE.moderateScale(8),
    paddingLeft: 0
  },
  contentContainer: {
    paddingHorizontal: SIZE.moderateScale(0),
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: SIZE.moderateScale(10),
    paddingTop: SIZE.moderateScale(20),
  },
  footerText: {
    color: COLOR.dark,
    fontFamily: FONTS.parkinsansMedium,
    fontSize: FONT_SIZE.font12,
    lineHeight: SIZE.moderateScale(18),
    textAlign: 'center',
  },
  rememberForgotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SIZE.moderateScale(8),
    marginBottom: SIZE.moderateScale(20),
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: SIZE.moderateScale(16),
    height: SIZE.moderateScale(16),
    borderWidth: 1,
    borderColor: COLOR.grey,
    borderRadius: SIZE.moderateScale(3),
    marginRight: SIZE.moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLOR.primary,
    borderColor: COLOR.primary,
  },
  rememberMeText: {
    color: COLOR.dark,
    fontFamily: FONTS.parkinsansMedium,
    fontSize: FONT_SIZE.font12,
  },
  forgotPasswordText: {
    color: COLOR.primary,
    fontFamily: FONTS.parkinsansMedium,
    fontSize: FONT_SIZE.font12,
    textDecorationLine: 'underline',
  },
  loginHeader: {
    alignItems: 'flex-start',
    marginBottom: SIZE.moderateScale(25),
    marginTop: SIZE.moderateScale(18)
  },
  linkText: {
    color: COLOR.primary,
    fontFamily: FONTS.parkinsansBold,
    textDecorationLine: 'underline',
  },
  loginButton: {
    marginTop: SIZE.moderateScale(15),
    height: SIZE.moderateScale(42) // Reduced by 10% from typical 50px
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: FONT_SIZE.font22 * 1.02,
    fontFamily: FONTS.parkinsansBold,
    letterSpacing: 1,
  },
  logoPart: {
    fontFamily: FONTS.parkinsansBold,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: SIZE.moderateScale(60),
  },
  signupContainer: {
    alignItems: 'center',
    marginTop: SIZE.moderateScale(30),
  },
  signupText: {
    color: COLOR.dark,
    fontFamily: FONTS.parkinsansMedium,
    fontSize: FONT_SIZE.font14,
  },
  signupLink: {
    color: COLOR.primary,
    fontFamily: FONTS.parkinsansBold,
    textDecorationLine: 'underline',
  },
  subtitle: {
    color: COLOR.darkGrey,
    fontFamily: FONTS.parkinsansRegular,
    fontSize: FONT_SIZE.font13,
    lineHeight: SIZE.moderateScale(22),
    marginTop: SIZE.moderateScale(2),
  },
  title: {
    color: COLOR.dark,
    fontFamily: FONTS.parkinsansSemiBold,
    fontSize: FONT_SIZE.font22 * 1.04,
    lineHeight: SIZE.moderateScale(32),
    marginBottom: SIZE.moderateScale(3),
  },
  inputWrapper: {
    marginBottom: SIZE.moderateScale(4),
    marginHorizontal: -2
  },
  errorMessage: {
    color: COLOR.error,
    fontFamily: FONTS.parkinsansMedium,
    fontSize: FONT_SIZE.font11,
    height: SIZE.moderateScale(36),
    marginTop: -SIZE.moderateScale(13),
    marginLeft: SIZE.moderateScale(5),
  },
  // Toggle Button Styles
  toggleButton: {
    width: '100%',
    height: SIZE.moderateScale(40), // Less height than login button
    marginBottom: SIZE.moderateScale(18),
  },
  toggleContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLOR.grayLight,
    borderRadius: SIZE.moderateScale(8), // Low border radius
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLOR.lightGray,
  },
  toggleOption: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SIZE.moderateScale(8),
  },
  toggleOptionActive: {
    backgroundColor: COLOR.primary, borderRadius: 6.5
  },
  toggleText: {
    fontFamily: FONTS.parkinsansMedium,
    fontSize: FONT_SIZE.font14,
    color: COLOR.dark,
  },
  toggleTextActive: {
    color: COLOR.white,
    fontFamily: FONTS.parkinsansBold,
  },
});

export default LoginScreen;