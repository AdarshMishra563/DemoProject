import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as ElementButton } from '@rneui/themed';
import { COLOR, FONT_SIZE, FONTS, SIZE } from '@utils/Constant';

interface ButtonProps {
  btnContainerStyle?: object;
  btnStyle?: object;
  titleTxStyle?: object;
  title: string;
  onPress: () => void;
  [key: string]: any;
}

export const Button: React.FC<ButtonProps> = ({
  btnContainerStyle,
  btnStyle,
  titleTxStyle,
  ...props
}) => {
  return (
    <ElementButton
      containerStyle={[styles.containerStyle, btnContainerStyle]}
      buttonStyle={[styles.buttonStyle, btnStyle]}
      titleStyle={[styles.titleStyle, titleTxStyle]}
      disabledStyle={styles.btnDisable}
      disabledTitleStyle={styles.disableText}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  btnDisable: {
    backgroundColor: COLOR.primary100,
  },
  buttonStyle: {
    backgroundColor: COLOR.primary,
    paddingVertical: SIZE.moderateScale(12),
  },
  containerStyle: {
    alignSelf: 'center',
    borderRadius: SIZE.moderateScale(10),
    width: '100%',
  },
  disableText: {
    color: COLOR.white,
  },
  titleStyle: {
    color: COLOR.white,
    fontFamily: FONTS.parkinsansMedium,
    fontSize: FONT_SIZE.font16,
    lineHeight: SIZE.moderateScale(20),
  },
});
