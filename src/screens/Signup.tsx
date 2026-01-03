import React, { FC, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  Text,
  TextInput,
  Platform,
  ScrollView,
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

interface SignupValues {
  name: string;
  password: string;
  address: string;
  phone: string;
  otp: string;
  acceptNewsletter: boolean;
  acceptWhatsapp: boolean;
  acceptTerms: boolean;
}

const SignupScreen: FC = () => {
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showPhoneVerificationError, setShowPhoneVerificationError] = useState(false);
  const [userType, setUserType] = useState<'candidate' | 'parent'>('candidate');
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const otpInputs = useRef<Array<TextInput | null>>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const schema = object({
    name: string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),
    password: string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    address: string()
      .min(5, 'Address must be at least 5 characters')
      .required('Address is required'),
    phone: string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
  });

  const handleSendOtp = async (phone: string) => {
    if (!phone || phone.length !== 10) {
      Toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      setSendingOtp(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setOtpSent(true);
      Toast.info('OTP sent successfully to your phone');
    } catch (error) {
      Toast.error('Failed to send OTP. Please try again.');
    } finally {
      setSendingOtp(false);
    }
  };

  const handleOtpChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text.charAt(0);
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 4) {
      otpInputs.current[index + 1]?.focus();
    }

    if (newOtp.every(digit => digit !== '') && index === 4) {
      handleVerifyOtp(newOtp.join(''));
    }
  };

  const handleOtpKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        otpInputs.current[index - 1]?.focus();
      } else if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleVerifyOtp = async (otpValue: string) => {
    if (otpValue.length !== 5) {
      Toast.error('Please enter 5-digit OTP');
      return;
    }

    try {
      setVerifyingOtp(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOtpVerified(true);
      setShowPhoneVerificationError(false);
      Toast.success('OTP verified successfully');
    } catch (error) {
      Toast.error('Invalid OTP. Please try again.');
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleFormSubmit = async (
    values: SignupValues,
    actions: FormikHelpers<SignupValues>,
  ) => {
    try {
      if (!values.acceptTerms) {
        Toast.error('Please accept Terms & Conditions');
        return;
      }

      if (!otpVerified) {
        Toast.error('Please verify your phone number first');
        setShowPhoneVerificationError(true);
        return;
      }

      Keyboard.dismiss();
      setLoading(true);

      const response = await apiStaticClient({
        url: '/user/signup',
        method: HTTP_METHOD.POST,
        data: {
          name: values.name,
          password: values.password,
          address: values.address,
          phone: values.phone,
          user_type: userType,
          accept_newsletter: values.acceptNewsletter,
          accept_whatsapp: values.acceptWhatsapp,
          otp: otp.join(''),
        },
      });

      if (response.data?.status === 'success' && response?.data?.code === 200) {
        Toast.success('Account created successfully!');

        dispatch(login({
          isUserLogin: true,
          token: response?.data?.token,
          user: response.data?.data,
        }));

        resetAndNavigate('Tab');
      }
    } catch (error) {
      const err = error as AxiosError<AxiosErrorMessage>;
      Toast.error(err.response?.data?.message ?? 'Something went wrong!');
    } finally {
      setLoading(false);
      actions.setSubmitting(false);
    }
  };

  const handleUserTypeToggle = () => {
    setUserType(userType === 'candidate' ? 'parent' : 'candidate');
  };

  const handleResendOtp = async (phone: string) => {
    if (!phone || phone.length !== 10) {
      Toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      setSendingOtp(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      Toast.info('OTP resent successfully');
    } catch (error) {
      Toast.error('Failed to resend OTP. Please try again.');
    } finally {
      setSendingOtp(false);
    }
  };

  const focusOnOtpInput = (index: number) => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: 300, animated: true });
    }, 100);
  };

  return (
    <ScrollContainer
      scrollRef={scrollViewRef as any}
      keyboardShouldPersistTaps="handled"
      header={null}
      scrollStyle={styles.scrollContainer}
    >
      <MainContainer>
        {loading && <Loader />}
        <View>
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigate('Login')}>
              <Icon name="arrow-back" size={24} color={COLOR.dark} />
            </TouchableOpacity>

            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>
                <Text style={[styles.logoPart, { color: COLOR.primary }]}>Blink</Text>
                <Text style={[styles.logoPart, { color: COLOR.secondary }]}>Exam</Text>
              </Text>
            </View>

            <View style={{ width: SIZE.moderateScale(40) }} />
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.signupHeader}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>
                Sign up to get started
              </Text>
            </View>


            <Formik
              initialValues={{
                name: '',
                password: '',
                address: '',
                phone: '',
                otp: '',
                acceptNewsletter: false,
                acceptWhatsapp: false,
                acceptTerms: false,
              }}
              onSubmit={handleFormSubmit}
              validationSchema={schema}>
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                <>
                  <View style={styles.inputWrapper}>
                    <InputBox
                      iconName="user"
                      isTitle
                      title={'Full Name'}
                      placeholder="Enter your full name"
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      onFocus={() => {
                        setTimeout(() => {
                          scrollViewRef.current?.scrollTo({ y: 0, animated: true });
                        }, 100);
                      }}
                    />
                    {touched.name && errors.name && (
                      <Text style={styles.errorMessage}>{errors.name}</Text>
                    )}
                  </View>

                  <View style={styles.inputWrapper}>
                    <InputBox
                      iconName="lock"
                      isTitle
                      title={'Password'}
                      placeholder="Enter your password"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      isPassword
                      onFocus={() => {
                        setTimeout(() => {
                          scrollViewRef.current?.scrollTo({ y: 80, animated: true });
                        }, 100);
                      }}
                    />
                    {touched.password && errors.password && (
                      <Text style={styles.errorMessage}>{errors.password}</Text>
                    )}
                  </View>

                  <View style={styles.inputWrapper}>
                    <InputBox
                      iconName="home"
                      isTitle
                      title={'Address'}
                      placeholder="Enter your address"
                      onChangeText={handleChange('address')}
                      onBlur={handleBlur('address')}
                      value={values.address}
                      onFocus={() => {
                        setTimeout(() => {
                          scrollViewRef.current?.scrollTo({ y: 160, animated: true });
                        }, 100);
                      }}
                    />
                    {touched.address && errors.address && (
                      <Text style={styles.errorMessage}>{errors.address}</Text>
                    )}
                  </View>

                  <View style={styles.inputWrapper}>
                    <InputBox
                      iconName="phone"
                      isTitle
                      title={'Phone Number'}
                      placeholder="Enter phone number"
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                      keyboardType="phone-pad"
                      editable={!otpVerified}
                      style={{ flex: 1 }}
                      onFocus={() => {
                        setTimeout(() => {
                          scrollViewRef.current?.scrollTo({ y: 240, animated: true });
                        }, 100);
                      }}
                    />

                    {touched.phone && errors.phone && (
                      <Text style={styles.errorMessage}>{errors.phone}</Text>
                    )}
                  </View>

                  {!otpVerified ? (
                    <TouchableOpacity
                      style={styles.sendOtpContainer}
                      onPress={() => otpSent ? handleResendOtp(values.phone) : handleSendOtp(values.phone)}
                      disabled={sendingOtp}>
                      <View style={styles.sendOtpContent}>
                        {sendingOtp ? (
                          <Text style={styles.sendingOtpText}>Sending...</Text>
                        ) : otpSent ? (
                          <View style={styles.resendContainer}>
                            <Text style={styles.otpSentText}>OTP Sent</Text>
                            <Text style={styles.resendText}> Resend?</Text>
                          </View>
                        ) : (
                          <Text style={styles.sendOtpText}>Send OTP</Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.verifiedContainer}>
                      <Icon name="checkmark-circle" size={18} color={COLOR.success} />
                      <Text style={styles.verifiedText}>Otp Succefully Verified</Text>
                    </View>
                  )}

                  {showPhoneVerificationError && !otpVerified && (
                    <View style={styles.verifyPhoneMessage}>
                      <Text style={styles.verifyPhoneText}>
                        Please verify your phone number first
                      </Text>
                    </View>
                  )}

                  {otpSent && !otpVerified && (
                    <View style={styles.otpContainer}>
                      <Text style={styles.otpTitle}>Enter OTP</Text>
                      <View style={styles.otpInputsContainer}>
                        {[0, 1, 2, 3, 4].map((index) => (
                          <TextInput
                            key={index}
                            ref={ref => otpInputs.current[index] = ref}
                            style={[
                              styles.otpInput,
                              otp[index] && styles.otpInputFilled,
                            ]}
                            value={otp[index]}
                            onChangeText={(text) => handleOtpChange(text, index)}
                            onKeyPress={(e) => handleOtpKeyPress(e, index)}
                            keyboardType="number-pad"
                            maxLength={1}
                            editable={!otpVerified}
                            selectTextOnFocus
                            onFocus={() => focusOnOtpInput(index)}
                          />
                        ))}
                      </View>

                      {!otpVerified && (
                        <TouchableOpacity
                          style={styles.verifyOtpButton}
                          onPress={() => handleVerifyOtp(otp.join(''))}
                          disabled={verifyingOtp || otp.some(digit => digit === '')}>
                          {verifyingOtp ? (
                            <Text style={styles.verifyOtpText}>Verifying...</Text>
                          ) : (
                            <Text style={styles.verifyOtpText}>Verify OTP</Text>
                          )}
                        </TouchableOpacity>
                      )}
                    </View>
                  )}

                  <View style={styles.termsContainer}>
                    <TouchableOpacity
                      style={styles.termRow}
                      onPress={() => setFieldValue('acceptTerms', !values.acceptTerms)}>
                      <View style={[styles.checkbox, values.acceptTerms && styles.checkboxChecked]}>
                        {values.acceptTerms && (
                          <Icon name="checkmark" size={14} color={COLOR.white} />
                        )}
                      </View>
                      <Text style={styles.termText}>
                        I accept the{' '}
                        <Text
                          style={styles.termLink}
                          onPress={() => navigate('TermsAndConditions')}>
                          Terms & Conditions
                        </Text>
                      </Text>
                    </TouchableOpacity>




                  </View>

                  <Button
                    title="Sign Up"
                    titleStyle={{
                      color: COLOR.white,
                      fontFamily: FONTS.parkinsansSemiBold,
                      fontSize: FONT_SIZE.font15,
                      lineHeight: SIZE.moderateScale(16),
                    }}
                    btnContainerStyle={styles.signupButton}
                    onPress={handleSubmit}
                  />

                  <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>
                      Already have an account?{' '}
                      <Text
                        style={styles.loginLink}
                        onPress={() => navigate('Login')}>
                        Login
                      </Text>
                    </Text>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </View>
      </MainContainer>
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingTop: SIZE.moderateScale(10),
    paddingBottom: SIZE.moderateScale(20),
  },
  backButton: {
    padding: SIZE.moderateScale(8),
    paddingLeft: 0
  },
  contentContainer: {
    paddingHorizontal: 0,
  },
  signupHeader: {
    alignItems: 'flex-start',
    marginBottom: SIZE.moderateScale(30),
    marginTop: SIZE.moderateScale(18)
  },
  title: {
    color: COLOR.dark,
    fontFamily: FONTS.parkinsansSemiBold,
    fontSize: FONT_SIZE.font22 * 1.04,
    lineHeight: SIZE.moderateScale(32),
    marginBottom: SIZE.moderateScale(3),
  },
  subtitle: {
    color: COLOR.darkGrey,
    fontFamily: FONTS.parkinsansRegular,
    fontSize: FONT_SIZE.font13,
    lineHeight: SIZE.moderateScale(22),
    marginTop: SIZE.moderateScale(2),
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
    paddingBottom: SIZE.moderateScale(20),
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
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendOtpContainer: {
    marginLeft: SIZE.moderateScale(8),
    marginTop: -SIZE.moderateScale(6),
    alignItems: 'flex-end',
    marginBottom: SIZE.moderateScale(14),
    minWidth: SIZE.moderateScale(70),
  },
  sendOtpContent: {
    alignItems: 'flex-end',
  },
  sendOtpText: {
    color: COLOR.primary,
    fontFamily: FONTS.parkinsansMedium,
    fontSize: FONT_SIZE.font12,
    textDecorationLine: 'underline',
  },
  sendingOtpText: {
    color: COLOR.darkGrey,
    fontFamily: FONTS.parkinsansMedium,
    fontSize: FONT_SIZE.font12,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  otpSentText: {
    color: COLOR.darkGrey,
    fontFamily: FONTS.parkinsansMedium,
    fontSize: FONT_SIZE.font12,
  },
  resendText: {
    color: COLOR.primary,
    fontFamily: FONTS.parkinsansMedium,
    fontSize: FONT_SIZE.font12,
    textDecorationLine: 'underline',
  },
  verifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SIZE.moderateScale(8),
    marginTop: -SIZE.moderateScale(6),
    marginBottom: SIZE.moderateScale(14),
    minWidth: SIZE.moderateScale(70),
    justifyContent: 'flex-end',
  },
  verifiedText: {
    color: COLOR.success,
    fontFamily: FONTS.parkinsansMedium,
    fontSize: FONT_SIZE.font12,
    marginLeft: SIZE.moderateScale(4),
  },
  phoneSuccessContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZE.moderateScale(5),
    marginLeft: SIZE.moderateScale(5),
  },
  phoneSuccessText: {
    color: COLOR.success,
    fontFamily: FONTS.parkinsansMedium,
    fontSize: FONT_SIZE.font12,
    marginLeft: SIZE.moderateScale(5),
  },
  toggleButton: {
    width: '100%',
    height: SIZE.moderateScale(40),
    marginBottom: SIZE.moderateScale(18),
  },
  toggleContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLOR.grayLight,
    borderRadius: SIZE.moderateScale(8),
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
    backgroundColor: COLOR.primary,
    borderRadius: 6.5
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
  otpContainer: {
    marginTop: SIZE.moderateScale(15),
    marginBottom: SIZE.moderateScale(20),
  },
  otpTitle: {
    color: COLOR.dark,
    fontFamily: FONTS.parkinsansMedium,
    fontSize: FONT_SIZE.font13,
    marginBottom: SIZE.moderateScale(10),
  },
  otpInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZE.moderateScale(15),
  },
  otpInput: {
    width: SIZE.moderateScale(39),
    height: SIZE.moderateScale(39),
    borderWidth: 2,
    borderColor: COLOR.lightGray,
    borderRadius: SIZE.moderateScale(8),
    textAlign: 'center',
    fontFamily: FONTS.parkinsansBold,
    fontSize: FONT_SIZE.font20 * 0.8,
    color: COLOR.dark,
    backgroundColor: COLOR.white,
    paddingTop: 0,
    paddingBottom: 0,
    textAlignVertical: 'center',
    lineHeight: FONT_SIZE.font20 * 0.8,
  },
  otpInputFilled: {
    borderColor: COLOR.primary,
    backgroundColor: COLOR.primaryLight,
  },
  verifyOtpButton: {
    backgroundColor: COLOR.primary,
    paddingVertical: SIZE.moderateScale(12),
    borderRadius: SIZE.moderateScale(8),
    alignItems: 'center',
    marginTop: SIZE.moderateScale(5),
    height: SIZE.moderateScale(42),
    justifyContent: 'center',
  },
  verifyOtpText: {
    color: COLOR.white,
    fontFamily: FONTS.parkinsansSemiBold,
    fontSize: FONT_SIZE.font14,
  },
  termsContainer: {
    marginTop: SIZE.moderateScale(10),
    marginBottom: SIZE.moderateScale(20),
  },
  termRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZE.moderateScale(12),
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
  termText: {
    color: COLOR.dark,
    fontFamily: FONTS.parkinsansMedium,
    fontSize: FONT_SIZE.font13,
    flex: 1,
  },
  termLink: {
    color: COLOR.primary,
    fontFamily: FONTS.parkinsansBold,
    textDecorationLine: 'underline',
  },
  signupButton: {
    marginTop: SIZE.moderateScale(10),
    height: SIZE.moderateScale(42)
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: SIZE.moderateScale(25),
    marginBottom: SIZE.moderateScale(10),
  },
  loginText: {
    color: COLOR.dark,
    fontFamily: FONTS.parkinsansMedium,
    fontSize: FONT_SIZE.font14,
  },
  loginLink: {
    color: COLOR.primary,
    fontFamily: FONTS.parkinsansBold,
    textDecorationLine: 'underline',
  },
  verifyPhoneMessage: {
    marginTop: SIZE.moderateScale(8),
    marginBottom: SIZE.moderateScale(10),
  },
  verifyPhoneText: {
    color: COLOR.error,
    fontFamily: FONTS.parkinsansMedium,
    fontSize: FONT_SIZE.font12,
    textAlign: 'center',
  },
});

export default SignupScreen;