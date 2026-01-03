import React from 'react';
import { Text, Image, StyleSheet, View } from 'react-native';
import { SIZE, COLOR, FONT_SIZE, FONTS } from '@utils/Constant';
import { IMAGES } from '@utils/Images';
import { MainContainer } from '@components/common/MainContainer';

const NoRecordFound = () => {
  return (
    <MainContainer>
      <View style={styles.container}>
        <Image
          source={IMAGES.emptyRecord}
          style={styles.imgStyle}
          resizeMode="contain"
        />
        <Text style={styles.titleText}>No Result Found</Text>
        <Text style={styles.messageText}>
          We couldn&apos;t find what you&apos;re looking for. Try searching with
          a different keyword or explore our categories.
        </Text>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  imgStyle: {
    height: SIZE.deviceHeight * 0.25,
    width: SIZE.deviceWidth * 0.8,
  },
  messageText: {
    color: COLOR.dark,
    fontFamily: FONTS.parkinsansRegular,
    fontSize: FONT_SIZE.font14,
    paddingHorizontal: 20,
    paddingVertical: 5,
    textAlign: 'center',
  },
  titleText: {
    color: COLOR.dark,
    fontFamily: FONTS.parkinsansBold,
    fontSize: FONT_SIZE.font18,
    paddingVertical: 10,
    textAlign: 'center',
  },
});

export default NoRecordFound;
