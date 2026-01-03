import React, { ReactNode, RefObject } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
import { useFocusEffect } from '@react-navigation/native';
import { COLOR, SIZE } from '@utils/Constant';

interface ScrollContainerProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  scrollStyle?: StyleProp<ViewStyle>;
  scrollRef?: RefObject<ScrollView>;
  onScrolling?: () => void;
  refreshControl?: any;
  keyboardShouldPersistTaps?: 'always' | 'handled' | 'never';
  isNoBottomSpace?: boolean;
  isEdgeValue?: string;
}
type Edge = 'top' | 'right' | 'bottom' | 'left';
export const ScrollContainer = ({
  children,
  header,
  footer,
  scrollStyle,
  scrollRef,
  onScrolling,
  refreshControl,
  keyboardShouldPersistTaps = 'always',
  isNoBottomSpace = false,
  isEdgeValue,
}: ScrollContainerProps) => {
  const insets = useSafeAreaInsets();

  const paddingBottom = isNoBottomSpace
    ? 0
    : Math.min(insets.bottom, Platform.OS === 'ios' ? 60 : 80);




  return (
    <SafeAreaView
      style={[styles.mainContainer, { paddingBottom }]}
      edges={
        isEdgeValue
          ? [isEdgeValue as 'top' | 'right' | 'bottom' | 'left']
          : ['top']
      }>


      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.flex}>
          {header}
          <ScrollView
            ref={scrollRef}
            refreshControl={refreshControl}
            contentContainerStyle={[styles.scrollContent, scrollStyle]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={keyboardShouldPersistTaps}
            scrollEventThrottle={16}
            onScroll={onScrolling}
            bounces={false}
            nestedScrollEnabled
            style={styles.flex}>
            {children}
          </ScrollView>
          {footer}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: COLOR.white,
    flex: 1,
    paddingBottom: SIZE.moderateScale(10),
    paddingHorizontal: SIZE.moderateScale(0),
  },
  scrollContent: {
    flexGrow: 1,
  },
});
