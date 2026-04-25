import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import { RootStackParamList } from '../types/navigation';
import { colors } from '../theme/colors';
import { useSaved } from '../context/SavedContext';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

type Slide = {
  image: any;
  title: string;
  subtitle: string;
  button: string;
};

const { width, height } = Dimensions.get('window');
const isSmall = height < 700;

const slides: Slide[] = [
  {
    image: require('../assets/onb_rocket.png'),
    title: 'Going Beyond The Earth',
    subtitle:
      'I will show you the places where space begins. These are not just points on the map \u2014 these are launch pads from which humanity takes further steps. Ready to see where it all begins?',
    button: 'Okay',
  },
  {
    image: require('../assets/logo.png'),
    title: 'Launch Points',
    subtitle:
      'The map contains spaceports from different parts of the world. Tap on any point \u2014 and detailed information will open: coordinates, history and features of each place. Each location has its own role here.',
    button: 'Good',
  },
  {
    image: require('../assets/onb_growth.png'),
    title: 'Space Is Closer Than It Seems',
    subtitle:
      'I have collected facts about rockets and space for you. Some explain how everything works, others simply break the usual idea. From brief observations to deeper details \u2014 choose what you want to discover.',
    button: 'Next',
  },
  {
    image: require('../assets/onb_target.png'),
    title: 'Your Orbit Level',
    subtitle:
      'Here you can see how well you understand the topic. Choose options, see explanations, and track your approach to answers. No grades \u2014 just a way to understand yourself a little better.',
    button: 'Start',
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation<Nav>();
  const [index, setIndex] = useState(0);
  const { completeOnboarding } = useSaved();

  const finish = async () => {
    await completeOnboarding();
    navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
  };

  const go = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      finish();
    }
  };

  const current = slides[index];

  return (
    <BackgroundWrapper>
      <SafePadding style={styles.root}>
        <View style={styles.progressRow}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[styles.progressDash, i <= index && styles.progressDashActive]}
            />
          ))}
        </View>

        <View style={styles.imageBox}>
          <Image source={current.image} style={styles.image} resizeMode="contain" />
        </View>

        <View style={styles.textBox}>
          <Text style={styles.title}>{current.title}</Text>
          <Text style={styles.subtitle}>{current.subtitle}</Text>
        </View>

        <TouchableOpacity onPress={go} activeOpacity={0.9} style={styles.button}>
          <Text style={styles.buttonText}>{current.button}</Text>
        </TouchableOpacity>
      </SafePadding>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 28,
    paddingTop: 20,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? 20 : 0,
    marginBottom: 8,
  },
  progressDash: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(250,204,21,0.25)',
    marginHorizontal: 4,
  },
  progressDashActive: {
    backgroundColor: colors.accent,
  },
  imageBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.6,
    height: isSmall ? height * 0.28 : height * 0.34,
  },
  textBox: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    color: colors.text,
    fontSize: isSmall ? 22 : 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 14,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  button: {
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: colors.textDark,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default OnboardingScreen;
