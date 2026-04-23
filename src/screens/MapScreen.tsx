import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { places } from '../data/places';
import { Place, RootStackParamList } from '../types/navigation';
import { colors } from '../theme/colors';
import { usePersistentAndroidInsets } from '../hooks/usePersistentInsets';
import { useSaved } from '../context/SavedContext';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const MapScreen = () => {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const android = usePersistentAndroidInsets();
  const mapRef = useRef<MapView | null>(null);
  const [selected, setSelected] = useState<Place | null>(null);
  const [tracks, setTracks] = useState(true);
  const { isSaved, toggle } = useSaved();

  const topOffset = Platform.OS === 'android' ? android.top : insets.top;

  useEffect(() => {
    const t = setTimeout(() => setTracks(false), 1500);
    return () => clearTimeout(t);
  }, []);

  const onMapReady = () => {
    setTimeout(() => {
      mapRef.current?.fitToCoordinates(
        places.map(p => ({ latitude: p.latitude, longitude: p.longitude })),
        {
          edgePadding: { top: 140, right: 60, bottom: 260, left: 60 },
          animated: true,
        },
      );
    }, 300);
  };

  const goDetails = () => {
    if (!selected) {
      return;
    }
    const id = selected.id;
    setSelected(null);
    navigation.navigate('PlaceDetail', { placeId: id });
  };

  const share = async () => {
    if (!selected) {
      return;
    }
    try {
      await Share.share({
        message: `${selected.name} \u2014 Coordinates: ${selected.latitude}, ${selected.longitude}`,
      });
    } catch {}
  };

  const savedNow = selected ? isSaved('place', selected.id) : false;

  return (
    <View style={styles.root}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
        initialRegion={{
          latitude: 30,
          longitude: 20,
          latitudeDelta: 100,
          longitudeDelta: 100,
        }}
        onMapReady={onMapReady}>
        {places.map(p => (
          <Marker
            key={p.id}
            identifier={p.id}
            coordinate={{ latitude: p.latitude, longitude: p.longitude }}
            title={p.name}
            pinColor={colors.accent}
            tracksViewChanges={tracks}
            onPress={() => setSelected(p)}
          />
        ))}
      </MapView>

      <View style={[styles.topBar, { paddingTop: topOffset + 6 }]} pointerEvents="none">
        <View style={styles.titleRow}>
          <Text style={styles.titleIcon}>{'\uD83D\uDCCD'}</Text>
          <Text style={styles.title}>Interactive Map</Text>
        </View>
      </View>

      {selected ? (
        <View style={styles.cardWrap} pointerEvents="box-none">
          <View style={styles.card}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelected(null)}
              style={styles.closeBtn}>
              <Text style={styles.closeText}>{'\u2715'}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} onPress={goDetails}>
              <Image source={selected.image} style={styles.cardImage} resizeMode="cover" />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.85)']}
                style={styles.cardOverlay}
              />
              <Text style={styles.cardTitle}>{selected.name}</Text>
            </TouchableOpacity>
            <View style={styles.cardActions}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={share}
                style={styles.cardBtnShare}>
                <Text style={styles.cardBtnShareText}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => toggle('place', selected.id)}
                style={[styles.cardBtnBookmark, savedNow && styles.cardBtnBookmarkActive]}>
                <Text style={styles.cardBtnBookmarkIcon}>{'\uD83D\uDD16'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(10,10,10,0.8)',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  titleIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  cardWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: colors.card,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  cardImage: {
    width: '100%',
    height: 190,
  },
  cardOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '55%',
  },
  cardTitle: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 14,
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 3,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  cardActions: {
    flexDirection: 'row',
    padding: 14,
  },
  cardBtnShare: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  cardBtnShareText: {
    color: colors.textDark,
    fontSize: 14,
    fontWeight: '700',
  },
  cardBtnBookmark: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBtnBookmarkActive: {
    backgroundColor: colors.accent,
  },
  cardBtnBookmarkIcon: {
    fontSize: 16,
  },
});

export default MapScreen;
