import { COLOR, FONT_SIZE, FONTS, SIZE } from '@utils/Constant';
import { Platform, StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
  bigLine: {
    backgroundColor: COLOR.grayLight,
    height: SIZE.moderateScale(8),
  },
  cardContainer: {
    backgroundColor: COLOR.white,
    gap: SIZE.moderateScale(10),
    paddingHorizontal: SIZE.moderateScale(15),
    paddingVertical: SIZE.moderateScale(15),
  },
  categoryBtnText: {
    color: COLOR.primary,
    fontFamily: FONTS.parkinsansMedium,
    fontSize: FONT_SIZE.font11,
    lineHeight: SIZE.moderateScale(16),
    textTransform: 'capitalize',
  },
  categoryContainer: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLOR.primaryLight,
    borderRadius: SIZE.moderateScale(30),
    paddingHorizontal: SIZE.moderateScale(12),
    paddingVertical: SIZE.moderateScale(3),
  },
  container: {
    backgroundColor: COLOR.white,
    flex: 1,
    paddingHorizontal: SIZE.moderateScale(15),
  },
  containerMain: {
    backgroundColor: COLOR.white,
    flex: 1,
    paddingHorizontal: SIZE.moderateScale(10),
  },
  containerNoScroll: {
    backgroundColor: COLOR.white,
    flex: 1,
  },
  containerNoSpace: {
    backgroundColor: COLOR.white,
    flexGrow: 1,
  },
  descTitleTx: {
    color: COLOR.darkGrey,
    fontFamily: FONTS.parkinsansRegular,
    fontSize: FONT_SIZE.font14,
    lineHeight: SIZE.moderateScale(22),
    textAlign: 'justify',
  },
  errorMessage: {
    color: COLOR.error,
    fontSize: 14,
    marginBottom: SIZE.moderateScale(18),
    marginTop: SIZE.moderateScale(-18),
    paddingHorizontal: SIZE.moderateScale(10),
    textAlign: 'left',
  },
  infoTitle: {
    color: COLOR.lightDark,
    fontFamily: FONTS.parkinsansRegular,
    fontSize: FONT_SIZE.font11,
    lineHeight: SIZE.moderateScale(13),
  },
  lightText: {
    color: COLOR.dark,
    fontFamily: FONTS.parkinsansMedium,
    fontSize: FONT_SIZE.font13,
    lineHeight: SIZE.moderateScale(16),
    textTransform: 'capitalize',
  },
  line: {
    backgroundColor: COLOR.grayLight,
    height: SIZE.moderateScale(1),
  },
  mainContainer: {
    backgroundColor: COLOR.white,
    flex: 1,
  },
  row: {
    // alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: SIZE.moderateScale(5),
  },
  rowLine: { alignItems: 'center', flexDirection: 'row' },
  scrollContainer: {
    flex: 1,
    paddingHorizontal:
      Platform.OS === 'ios' ? SIZE.moderateScale(20) : SIZE.moderateScale(0),
  },
  subContainer: {
    backgroundColor: COLOR.white,
    borderColor: COLOR.grayLight,
    borderRadius: SIZE.moderateScale(15),
    borderWidth: SIZE.moderateScale(1.5),
    gap: SIZE.moderateScale(10),
    marginBottom: SIZE.moderateScale(8),
    marginVertical: SIZE.moderateScale(5),
    paddingHorizontal: SIZE.moderateScale(15),
    paddingVertical: SIZE.moderateScale(15),
  },
  subTitleBoldTx: {
    color: COLOR.darkGrey,
    fontFamily: FONTS.parkinsansSemiBold,
    fontSize: FONT_SIZE.font12,
    lineHeight: SIZE.moderateScale(16),
  },
  subTitleTx: {
    color: COLOR.darkGrey,
    fontFamily: FONTS.parkinsansRegular,
    fontSize: FONT_SIZE.font13,
    lineHeight: SIZE.moderateScale(16),
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginHorizontal: SIZE.moderateScale(10),
  },
  titleInfo: {
    color: COLOR.dark,
    fontFamily: FONTS.parkinsansSemiBold,
    fontSize: FONT_SIZE.font17,
    lineHeight: SIZE.moderateScale(20),
  },
  titleTx: {
    color: COLOR.dark,
    fontFamily: FONTS.parkinsansSemiBold,
    fontSize: FONT_SIZE.font14,
    lineHeight: SIZE.moderateScale(16),
    textTransform: 'capitalize',
  },
});
