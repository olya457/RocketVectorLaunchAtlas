import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

const BackgroundWrapper = ({ children, style }: Props) => {
  return <View style={[styles.root, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default BackgroundWrapper;
