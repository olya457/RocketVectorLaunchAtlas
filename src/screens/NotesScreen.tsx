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
import { notes } from '../data/notes';
import { Note } from '../types/navigation';
import { colors } from '../theme/colors';
import { useSaved } from '../context/SavedContext';

const NotesScreen = () => {
  const { isSaved, toggle } = useSaved();

  const shareNote = (n: Note) => {
    Share.share({ message: `${n.emoji}  ${n.title}\n\n${n.text}` }).catch(() => {});
  };

  const renderItem = ({ item }: { item: Note }) => {
    const saved = isSaved('note', item.id);
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.emojiWrap}>
            <Text style={styles.emoji}>{item.emoji}</Text>
          </View>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
        <Text style={styles.cardText}>{item.text}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => shareNote(item)}
            style={styles.shareBtn}>
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => toggle('note', item.id)}
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
          <Text style={styles.title}>
            {'\uD83D\uDCDD '}Traveler\u2019s Notes
          </Text>
          <Text style={styles.subtitle}>
            Handy reminders before visiting any spaceport
          </Text>
        </View>
        <FlatList
          data={notes}
          keyExtractor={n => n.id}
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
    paddingTop: 6,
    paddingBottom: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 6,
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  emojiWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emoji: {
    fontSize: 22,
  },
  cardTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  cardText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
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

export default NotesScreen;
