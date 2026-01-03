import { useFocusEffect } from '@react-navigation/native';
import { COLOR, FONTS, SIZE } from '@utils/Constant';
import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import CustomToggleSwitch from './CustomToggleSwitch';

interface RowProps {
  icon?: React.ReactNode;
  title: string;
  iconColor: string;
  description?: string;
  index: number;
  onPress?: () => void;
  onTogglePress?: () => void;
  onWhatsAppPress?: () => void;
  onPhonePress?: () => void;
  isDelete?: boolean;
  isHideArrow?: boolean;
  isBoldDivider?: boolean;
  isRed?: boolean;
  isToggle?: boolean;
  toggleValue?: boolean;
  isRightIcons?: boolean;
  setting?: boolean;
}

const SettingMenu: React.FC<RowProps> = ({
  icon,
  title,
  iconColor,
  index,
  onPress,
  onTogglePress,
  onWhatsAppPress,
  onPhonePress,
  isDelete = false,
  isHideArrow = false,
  isBoldDivider = false,
  isToggle = false,
  toggleValue = false,
  isRed = false,
  isRightIcons = false,
  setting = false,
}) => {
  const [key, setKey] = useState<number>(0);

  // comment this if you don't want to animate every time you open this screen
  useFocusEffect(
    useCallback(() => {
      setKey(prevKey => prevKey + 1);
    }, []),
  );

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View
        style={[styles.row, setting && styles.settingRow]}
        key={`${key}-${index}`}>
        
        {/* Icon without background */}
        {icon && (
          <View style={styles.iconContainer}>
            {icon}
          </View>
        )}

        {/* Title */}
        <View style={[
          styles.titleContainer,
          icon != null && styles.titleIconStyle,
        ]}>
          <Text style={[
            styles.rowText,
            isRed && { color: COLOR.error }
          ]}>
            {title}
          </Text>
        </View>

        {/* Right side components */}
        <View style={styles.rightContainer}>
          {isRightIcons && (
            <View style={styles.iconsRow}>
              <TouchableOpacity onPress={onPhonePress} style={styles.iconTouchable}>
                <IoniconsIcon name="call" size={SIZE.moderateScale(18)} color={COLOR.primary} />
              </TouchableOpacity>
              
              <TouchableOpacity onPress={onWhatsAppPress} style={styles.iconTouchable}>
                <IoniconsIcon name="logo-whatsapp" size={SIZE.moderateScale(18)} color={COLOR.success} />
              </TouchableOpacity>
            </View>
          )}

          {isToggle && (
            <CustomToggleSwitch
              value={toggleValue}
              onValueChange={onTogglePress}
            />
          )}

          {!isHideArrow && !isToggle && !isRightIcons && (
            <FeatherIcon
              name={'chevron-right'}
              size={SIZE.moderateScale(18)}
              color={isDelete ? COLOR.error : COLOR.dark}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SIZE.moderateScale(24),
    height: SIZE.moderateScale(24),
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: SIZE.moderateScale(11),
    paddingHorizontal: SIZE.moderateScale(10),
    borderWidth: SIZE.moderateScale(2),
    borderColor: COLOR.lightGray,
    borderRadius: SIZE.moderateScale(11),
    
    marginBottom: SIZE.moderateScale(10),
    backgroundColor: COLOR.white,
    minHeight: SIZE.moderateScale(50),
  },
  settingRow: {
    borderWidth: 0,
    borderBottomWidth: 2,
    borderRadius: 0,
    marginBottom: SIZE.moderateScale(4),
    marginHorizontal: 0,
    paddingHorizontal: SIZE.moderateScale(15),
    minHeight: SIZE.moderateScale(48),
  },
  rowText: {
    flex: 1,
    fontFamily: FONTS.parkinsansMedium,
    fontSize: SIZE.moderateScale(14),
    color: COLOR.dark,
    lineHeight: SIZE.moderateScale(20),
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: SIZE.moderateScale(2),
  },
  titleIconStyle: {
    marginLeft: SIZE.moderateScale(5),
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZE.moderateScale(10),
  },
  iconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZE.moderateScale(10),
  },
  iconTouchable: {
    padding: SIZE.moderateScale(4),
  },
});

export default SettingMenu;