import React from 'react';
import {
  FlatList,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import { places } from '../data/places';
import { facts } from '../data/facts';
import { notes } from '../data/notes';
import { RootStackParamList } from '../types/navigation';
import { colors } from '../theme/colors';
import { useSaved } from '../context/SavedContext';

type Nav = NativeStackNavigationProp<RootStackParamList>;

type SavedEntry =
  | { kind: 'place'; id: string; name: string; image: any }
  | { kind: 'fact'; id: string; text: string }
  | { kind: 'note'; id: string; emoji: string; title: string; text: string };

const SavedScreen = () => {
  const navigation = useNavigation<Nav>();
  const { savedPlaces, savedFacts, savedNotes, toggle } = useSaved();

  const entries: SavedEntry[] = [
    ...places
      .filter(p => savedPlaces.includes(p.id))
      .map<SavedEntry>(p => ({ kind: 'place', id: p.id, name: p.name, image: p.image })),
    ...facts
      .filter(f => savedFacts.includes(f.id))
      .map<SavedEntry>(f => ({ kind: 'fact', id: f.id, text: f.text })),
    ...notes
      .filter(n => savedNotes.includes(n.id))
      .map<SavedEntry>(n => ({
        kind: 'note',
        id: n.id,
        emoji: n.emoji,
        title: n.title,
        text: n.text,
      })),
  ];

  const renderItem = ({ item }: { item: SavedEntry }) => {
    if (item.kind === 'place') {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('PlaceDetail', { placeId: item.id })}
          style={styles.placeCard}>
          <Image source={item.image} style={styles.placeImage} resizeMode="cover" />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.85)']}
            style={styles.placeOverlay}
          />
          <Text style={styles.placeTitle}>{item.name}</Text>
          <TouchableOpacity
            onPress={() => toggle('place', item.id)}
            style={styles.removeBtn}
            activeOpacity={0.8}>
            <Text style={styles.removeText}>{'\u2715'}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      );
    }

    if (item.kind === 'fact') {
      return (
        <View style={styles.card}>
          <Text style={styles.cardText}>{item.text}</Text>
          <View style={styles.cardActions}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => Share.share({ message: item.text }).catch(() => {})}
              style={styles.shareBtn}>
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => toggle('fact', item.id)}
              style={[styles.bookmarkBtn, styles.bookmarkBtnActive]}>
              <Text style={styles.bookmarkIcon}>{'\uD83D\uDD16'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.noteCard}>
        <View style={styles.noteHeader}>
          <View style={styles.noteEmojiWrap}>
            <Text style={styles.noteEmoji}>{item.emoji}</Text>
          </View>
          <Text style={styles.noteTitle}>{item.title}</Text>
        </View>
        <Text style={styles.noteText}>{item.text}</Text>
        <View style={styles.cardActions}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              Share.share({ message: `${item.title}\n\n${item.text}` }).catch(() => {})
            }
            style={styles.shareBtn}>
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => toggle('note', item.id)}
            style={[styles.bookmarkBtn, styles.bookmarkBtnActive]}>
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
          <Text style={styles.title}>Saved</Text>
        </View>

        {entries.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>{'\uD83D\uDD16'}</Text>
            <Text style={styles.emptyTitle}>Nothing saved yet</Text>
            <Text style={styles.emptyText}>
              Tap the bookmark icon on places, facts or notes to keep them here.
            </Text>
          </View>
        ) : (
          <FlatList
            data={entries}
            keyExtractor={i => `${i.kind}-${i.id}`}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        )}
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
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingBottom: 120,
  },
  emptyEmoji: {
    fontSize: 44,
    marginBottom: 14,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  placeCard: {
    height: 180,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: colors.card,
    marginBottom: 14,
  },
  placeImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  placeOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  placeTitle: {
    position: 'absolute',
    left: 16,
    right: 60,
    bottom: 14,
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  removeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    marginBottom: 14,
  },
  cardText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
  },
  cardActions: {
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
  noteCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    marginBottom: 14,
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  noteEmojiWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  noteEmoji: {
    fontSize: 22,
  },
  noteTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    flex: 1,
  },
  noteText: {
    color: colors.textMuted,
    fontSize: 13.5,
    lineHeight: 20,
  },
});

export default SavedScreen;
