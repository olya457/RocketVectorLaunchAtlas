import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
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
import { Place, RootStackParamList } from '../types/navigation';
import { colors } from '../theme/colors';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');
const GAP = 14;
const CARD_W = (width - 40 - GAP) / 2;

const PlacesScreen = () => {
  const navigation = useNavigation<Nav>();

  const renderItem = ({ item, index }: { item: Place; index: number }) => {
    const isLeft = index % 2 === 0;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('PlaceDetail', { placeId: item.id })}
        style={[styles.card, isLeft ? { marginRight: GAP / 2 } : { marginLeft: GAP / 2 }]}>
        <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.85)']}
          style={styles.cardOverlay}
        />
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <BackgroundWrapper>
      <SafePadding>
        <View style={styles.header}>
          <Text style={styles.title}>Top 7 Places</Text>
        </View>
        <FlatList
          data={places}
          keyExtractor={p => p.id}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      </SafePadding>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 16,
    alignItems: 'center',
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
  row: {
    justifyContent: 'space-between',
    marginBottom: GAP,
  },
  card: {
    width: CARD_W,
    height: CARD_W * 1.15,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: colors.card,
  },
  cardImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
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
    left: 14,
    right: 14,
    bottom: 14,
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
});

export default PlacesScreen;
