import { COLOR, SIZE } from '@utils/Constant';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export const Loader = () => {
  return (
    <View style={styles.mainView}>
      <ActivityIndicator size={'small'} color={COLOR.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    height: SIZE.deviceHeight * 0.9,
    justifyContent: 'center',
    position: 'absolute',
    transform: [{ scale: 2 }],
    width: SIZE.deviceWidth,
    zIndex: 99999,
  },
});
