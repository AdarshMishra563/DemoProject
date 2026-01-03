import { Dimensions, Platform } from 'react-native';


export const BASE_URL = 'https://www.k.com/api/v1';
export const BASE_URL_V2 =  'https://www.k.com/api/v1';
export const ATTACHMENT_URL =  'https://www.k.com/api/v1';

export interface AxiosErrorMessage {
  message: string;
}

export const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE',
};


const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scale = (size: number) =>
  (shortDimension / guidelineBaseWidth) * size;
export const verticalScale = (size: number) =>
  (longDimension / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

const isDeviceSize = (dim: any, sizes: number[]) => {
  return sizes.includes(dim.height) || sizes.includes(dim.width);
};

const isIphoneX = () => {
  const dim = Dimensions.get('window');
  return (
    Platform.OS === 'ios' && isDeviceSize(dim, [812, 896]) // iPhone X and XR sizes
  );
};

const isIpad = () => {
  const dim = Dimensions.get('window');
  return (
    Platform.OS === 'ios' && isDeviceSize(dim, [1024]) // iPad size
  );
};

export const SIZE = {
  moderateScale,
  moderateVerticalScale,
  deviceWidth: width,
  deviceHeight: height,
  isIphoneX,
  isIpad,
};

export const FONTS = {
  parkinsansExtraBold: 'Parkinsans-ExtraBold',
  parkinsansBold: 'Parkinsans-Bold',
  parkinsansLight: 'Parkinsans-Light',
  parkinsansMedium: 'Parkinsans-Medium',
  parkinsansRegular: 'Parkinsans-Regular',
  parkinsansSemiBold: 'Parkinsans-SemiBold',
};

export const FONT_SIZE = {
  font8: SIZE.moderateScale(8),
  font10: SIZE.moderateScale(10),
  font11: SIZE.moderateScale(11),
  font12: SIZE.moderateScale(12),
  font13: SIZE.moderateScale(13),
  font14: SIZE.moderateScale(14),
  font145: SIZE.moderateScale(14.5),
  font15: SIZE.moderateScale(15),
  font16: SIZE.moderateScale(16),
  font17: SIZE.moderateScale(17),
  font18: SIZE.moderateScale(18),
  font19: SIZE.moderateScale(19),
  font20: SIZE.moderateScale(20),
  font22: SIZE.moderateScale(22),
  font24: SIZE.moderateScale(24),
  font26: SIZE.moderateScale(26),
  font28: SIZE.moderateScale(28),
  font30: SIZE.moderateScale(30),
  font32: SIZE.moderateScale(32),
};

export const COLOR = {
  primary: "#086782",

  lightPrimary: '#0D9EBB', // A lighter variant of primary
  primaryLight: 'rgba(8, 103, 130, 0.2)', // 20% opacity of primary
  primaryLight100: 'rgba(8, 103, 130, 0.05)', // 5% opacity of primary
  primaryLight200: 'rgba(8, 103, 130, 0.05)', // 5% opacity of primary
  primary100: '#B3E0EB', // Very light tint of primary
  primary200: '#D9F0F5', // Extra light tint of primary
  secondary: '#0071DC',
  white: '#ffffff',
  offWhite: '#F5F5F5',
  grey: '#A6A6A6',
  lightGray: '#D3D3D3', // Light gray
  offGrey: '#D2D2D2',
  darkGrey: '#8D8D8D',
  grayLight: '#F2F2F2',
  walletBackgrund: '#d1d5db',
  walletGray: '#e5e7eb',
  walletLightGrey: '#a3a3a3',
  walletHistoryGrey: '#636a73',
  dark: '#14191C',
  lightDark: '#424D52',
  transparentDark: '#0000000d',
  transparent: 'transparent',
  warning: '#FF9800',
  lightWarning: '#FFD580',
  error: '#D60202',
  lightError: '#FFC6c6',
  success: '#006929',
  splashBgColor: '#227837',
  semiDark: '#d1d1d1',
  subscriptionSuccess: '#D4EDDA',
  subscriptionFailed: '#F8D7DA',
  bgColor: '#64748b',
  boxBgColor: '#1e293b',
  voilet: '#8b5cf6',
  bgIcon: '#f1f5f9',
};
