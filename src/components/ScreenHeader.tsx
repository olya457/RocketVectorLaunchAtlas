import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  title?: string;
  onBack?: () => void;
};

const ScreenHeader = ({ title, onBack }: Props) => {
  return (
    <View style={styles.row}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={styles.backBtn}>
          <Text style={styles.backTxt}>{'\u2190'}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={styles.spacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backTxt: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '700',
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  spacer: {
    width: 40,
  },
});

export default ScreenHeader;
