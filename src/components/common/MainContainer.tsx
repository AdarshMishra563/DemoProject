import { GlobalStyles } from '@styles/GlobalCss';
import { COLOR, SIZE } from '@utils/Constant';
import React, { ReactNode } from 'react';
import {
  Platform,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

interface MainContainerProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  isPrimaryStatusColor?: boolean;
  isNoBottomSpace?: boolean;
  isEdgeValue?: String;
}

export const MainContainer = ({
  children,
  style,
  isPrimaryStatusColor,
  isEdgeValue,
  isNoBottomSpace,
}: MainContainerProps) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[
        styles.mainContainer,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          paddingBottom: isNoBottomSpace
            ? 0
            : Math.min(insets.bottom, Platform.OS === 'ios' ? 60 : 80),
        },
      ]}
      edges={isEdgeValue ? [isEdgeValue as 'top' | 'right' | 'bottom' | 'left'] : []}>

      <View
        style={[
          styles.container,
          style,
          {
            // paddingTop: insets.top,
          },
        ]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    flex: 1,
    overflow: 'hidden',
  },
  mainContainer: {
    backgroundColor: COLOR.white,
    flex: 1,
    paddingHorizontal: SIZE.moderateScale(20),
  },
});
