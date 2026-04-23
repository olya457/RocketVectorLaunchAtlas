import React from 'react';
import {
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import ScreenHeader from '../components/ScreenHeader';
import { getPlaceById } from '../data/places';
import { RootStackParamList } from '../types/navigation';
import { colors } from '../theme/colors';
import { useSaved } from '../context/SavedContext';

type Nav = NativeStackNavigationProp<RootStackParamList, 'PlaceDetail'>;
type Rt = RouteProp<RootStackParamList, 'PlaceDetail'>;

const PlaceDetailScreen = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const place = getPlaceById(route.params.placeId);
  const { isSaved, toggle } = useSaved();

  if (!place) {
    return (
      <BackgroundWrapper>
        <SafePadding>
          <ScreenHeader onBack={() => navigation.goBack()} title="Top 7 Places" />
          <Text style={styles.missing}>Place not found</Text>
        </SafePadding>
      </BackgroundWrapper>
    );
  }

  const saved = isSaved('place', place.id);

  const share = async () => {
    try {
      await Share.share({
        message: `${place.name} \u2014 Coordinates: ${place.latitude}, ${place.longitude}\n\n${place.description}`,
      });
    } catch {}
  };

  return (
    <BackgroundWrapper>
      <SafePadding>
        <ScreenHeader onBack={() => navigation.goBack()} title="Top 7 Places" />
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.heroCard}>
            <Image source={place.image} style={styles.heroImage} resizeMode="cover" />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.85)']}
              style={styles.heroOverlay}
            />
            <Text style={styles.heroTitle}>{place.name}</Text>
          </View>

          <View style={styles.coordsCard}>
            <Text style={styles.coordsIcon}>{'\u2195'}</Text>
            <Text style={styles.coordsText}>
              Coordinates: {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
            </Text>
          </View>

          <Text style={styles.description}>{place.description}</Text>

          <View style={styles.actionRow}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={share}
              style={styles.shareBtn}>
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => toggle('place', place.id)}
              style={[styles.bookmarkBtn, saved && styles.bookmarkBtnActive]}>
              <Text style={[styles.bookmarkIcon, saved && styles.bookmarkIconActive]}>
                {'\uD83D\uDD16'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafePadding>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  heroCard: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.card,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  heroTitle: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 16,
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  coordsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  coordsIcon: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '700',
    marginRight: 10,
  },
  coordsText: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 18,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 22,
    alignItems: 'center',
  },
  shareBtn: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  shareText: {
    color: colors.textDark,
    fontSize: 15,
    fontWeight: '700',
  },
  bookmarkBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkBtnActive: {
    backgroundColor: colors.accent,
  },
  bookmarkIcon: {
    fontSize: 18,
  },
  bookmarkIconActive: {},
  missing: {
    color: colors.text,
    textAlign: 'center',
    padding: 24,
  },
});

export default PlaceDetailScreen;
