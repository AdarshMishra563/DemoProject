import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLOR, FONT_SIZE, SIZE } from '@utils/Constant';

interface IProps {
  title: string;
  height?: number;
  width?: number;
}

const HeaderAvatar: React.FC<IProps> = ({
  title,
  height = SIZE.moderateScale(50),
  width = SIZE.moderateScale(50),
}) => {
  return (
    <TouchableOpacity
      // onPress={() => navigate('SettingScreen')}
      style={[
        styles.cardContainer,
        { height, width, borderRadius: Math.min(height, width) / 2 },
      ]}>
      <Text style={styles.heading}>{title}</Text>
    </TouchableOpacity>
  );
};

export default HeaderAvatar;

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    backgroundColor: COLOR.lightPrimary,
    justifyContent: 'center',
  },
  heading: {
    color: COLOR.white,
    fontSize: FONT_SIZE.font20,
  },
});
