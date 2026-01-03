import React, { useState } from 'react';
import { StyleSheet, Keyboard, Text } from 'react-native';
import { Input } from '@rneui/themed';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLOR, FONT_SIZE, FONTS, SIZE } from '@utils/Constant';

export const InputBox = (props: any) => {
  const {
    iconName,
    isPassword = false,
    value,
    containerStyle,
    inputTxStyle,
    isTitle,
    titleTxStyle,
    title,
  } = props;
  const [focus, setFocus] = useState(false);
  const [hideTx, setHideTx] = useState(true);

  return (
    <>
      {isTitle && <Text style={[styles.titleTx, titleTxStyle]}>{title}</Text>}
      <Input
        placeholder="Enter text"
        inputContainerStyle={
          focus || (value && value.length !== 0)
            ? [styles.containerStyle, containerStyle]
            : [styles.inputContainer, containerStyle]
        }
        leftIcon={
          iconName && (
            <FeatherIcon
              name={iconName}
              size={18}
              color={
                focus || (value && value.length !== 0)
                  ? COLOR.primary
                  : COLOR.offGrey
              }
            />
          )
        }
        rightIcon={
          isPassword && (
            <FeatherIcon
              onPress={() => {
                Keyboard.dismiss();
                setHideTx(!hideTx);
              }}
              name={hideTx ? 'eye' : 'eye-off'}
              size={18}
              color={
                focus || (value && value.length !== 0)
                  ? COLOR.primary
                  : COLOR.offGrey
              }
            />
          )
        }
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        secureTextEntry={isPassword ? hideTx : false}
        inputStyle={[styles.titleStyle, inputTxStyle]}
        {...props}
        disabledInputStyle={styles.disableInput}
      />
    </>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    borderColor: COLOR.primary,
    borderRadius: SIZE.moderateScale(10),
    borderWidth: SIZE.moderateScale(1),
    height: 44,
    marginHorizontal: SIZE.moderateScale(-7),
    marginVertical: SIZE.moderateScale(-3),
    paddingHorizontal: SIZE.moderateScale(15),
  },
  disableInput: {
    alignSelf: 'flex-start',
    color: COLOR.dark,
    fontFamily: FONTS.parkinsansMedium,
    fontSize: FONT_SIZE.font13,
    textTransform: 'capitalize',
  },
  inputContainer: {
    borderColor: COLOR.lightGray,
    borderRadius: SIZE.moderateScale(10),
    borderWidth: SIZE.moderateScale(1),
    height: 44,
    marginHorizontal: SIZE.moderateScale(-7),
    marginVertical: SIZE.moderateScale(-2),
    paddingHorizontal: SIZE.moderateScale(15),
  },
  titleStyle: {
    color: COLOR.dark,
    fontFamily: FONTS.parkinsansRegular,
    fontSize: FONT_SIZE.font13,
    paddingHorizontal: SIZE.moderateScale(8),
  },
  titleTx: {
    alignSelf: 'flex-start',
    color: COLOR.dark,
    fontFamily: FONTS.parkinsansMedium,
    fontSize: FONT_SIZE.font13,
    marginBottom: SIZE.moderateScale(8),
    marginHorizontal: SIZE.moderateScale(8),
    marginTop: SIZE.moderateScale(-6),
    textTransform: 'capitalize',
  },
});
