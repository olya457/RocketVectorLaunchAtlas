import React from 'react';
import {
  FlatList,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import { facts } from '../data/facts';
import { Fact } from '../types/navigation';
import { colors } from '../theme/colors';
import { useSaved } from '../context/SavedContext';

const FactsScreen = () => {
  const { isSaved, toggle } = useSaved();

  const shareFact = (fact: Fact) => {
    Share.share({ message: fact.text }).catch(() => {});
  };

  const renderItem = ({ item }: { item: Fact }) => {
    const saved = isSaved('fact', item.id);
    return (
      <View style={styles.card}>
        <Text style={styles.text}>{item.text}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => shareFact(item)}
            style={styles.shareBtn}>
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => toggle('fact', item.id)}
            style={[styles.bookmarkBtn, saved && styles.bookmarkBtnActive]}>
            <Text style={styles.bookmarkIcon}>{'\uD83D\uDD16'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <BackgroundWrapper>
      <SafePadding>
        <View style={styles.header}>
          <Text style={styles.title}>Interesting Facts</Text>
        </View>
        <FlatList
          data={facts}
          keyExtractor={f => f.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </SafePadding>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    marginBottom: 14,
  },
  text: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 14,
    alignItems: 'center',
  },
  shareBtn: {
    width: 90,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  shareText: {
    color: colors.textDark,
    fontSize: 14,
    fontWeight: '700',
  },
  bookmarkBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkBtnActive: {
    backgroundColor: colors.accent,
  },
  bookmarkIcon: {
    fontSize: 14,
  },
});

export default FactsScreen;
