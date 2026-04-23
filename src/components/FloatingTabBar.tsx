import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

const emojiMap: Record<string, string> = {
  Places: '\uD83D\uDE80',
  Map: '\uD83D\uDCCD',
  Quiz: '\u2753',
  Facts: '\uD83D\uDCD6',
  Notes: '\uD83D\uDCDD',
  Saved: '\uD83D\uDD16',
};

const FloatingTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const bottomOffset = Platform.OS === 'ios' ? insets.bottom + 20 : 30;

  return (
    <View style={[styles.wrap, { bottom: bottomOffset }]} pointerEvents="box-none">
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name as never);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.85}
              onPress={onPress}
              style={styles.item}>
              <View style={[styles.iconWrap, isFocused && styles.iconWrapActive]}>
                <Text style={[styles.icon, isFocused && styles.iconActive]}>
                  {emojiMap[route.name] || '\u2022'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(20,20,20,0.95)',
    borderRadius: 28,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    shadowColor: '#000',
    shadowOpacity: 0.45,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 12,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  iconWrap: {
    width: 40,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  iconWrapActive: {
    backgroundColor: colors.tabActiveBg,
  },
  icon: {
    fontSize: 18,
    opacity: 0.55,
  },
  iconActive: {
    opacity: 1,
  },
});

export default FloatingTabBar;
