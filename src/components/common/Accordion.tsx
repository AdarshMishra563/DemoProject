import { COLOR, FONT_SIZE, FONTS, SIZE } from '@utils/Constant';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Accordion = (props: any) => {
  const { title, description } = props;
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.accordionContainer}
          onPress={() => {
            setExpanded(!expanded);
          }}>
          <Text style={styles.titleStyle}>{title}</Text>
          <FeatherIcon
            name={!expanded ? 'chevron-down' : 'chevron-up'}
            size={24}
            color={COLOR.dark}
          />
        </TouchableOpacity>
        {expanded && (
          <View
            style={{
              paddingBottom: SIZE.moderateScale(20),
            }}>
            <Text style={styles.subTitleStyle}>{description}</Text>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  accordionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SIZE.moderateScale(15),
  },
  container: {
    backgroundColor: COLOR.offWhite,
    borderRadius: SIZE.moderateScale(10),
    marginTop: SIZE.moderateScale(15),
    paddingHorizontal: SIZE.moderateScale(20),
  },
  subTitleStyle: {
    color: COLOR.darkGrey,
    fontFamily: FONTS.parkinsansRegular,
    fontSize: FONT_SIZE.font14,
    lineHeight: SIZE.moderateScale(18),
  },
  titleStyle: {
    color: COLOR.dark,
    fontFamily: FONTS.parkinsansSemiBold,
    fontSize: FONT_SIZE.font14,
    lineHeight: SIZE.moderateScale(16),
  },
});
