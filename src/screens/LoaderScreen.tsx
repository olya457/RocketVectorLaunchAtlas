import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackgroundWrapper from '../components/BackgroundWrapper';
import { RootStackParamList } from '../types/navigation';
import { useSaved } from '../context/SavedContext';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Loader'>;

const loaderHtml = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: 100%;
    height: 100%;
    background: transparent;
    overflow: hidden;
  }
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  }
  .sky {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 70%);
  }
  .stars {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }
  .star {
    position: absolute;
    width: 2px; height: 2px;
    background: #facc15;
    border-radius: 50%;
    opacity: 0.8;
    animation: twinkle 2s ease-in-out infinite;
  }
  @keyframes twinkle {
    0%, 100% { opacity: 0.2; transform: scale(1); }
    50%      { opacity: 1; transform: scale(1.4); }
  }
  .stage {
    position: relative;
    width: 260px;
    height: 340px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 2;
  }
  .launchpad {
    position: absolute;
    bottom: 0;
    width: 200px;
    height: 10px;
    background: linear-gradient(90deg, transparent, #facc15, transparent);
    filter: blur(3px);
  }
  .rocket {
    position: relative;
    width: 90px;
    height: 230px;
    animation: launch 3s ease-in-out infinite;
  }
  @keyframes launch {
    0%   { transform: translateY(0); }
    50%  { transform: translateY(-30px); }
    100% { transform: translateY(0); }
  }
  .nose {
    width: 0;
    height: 0;
    margin: 0 auto;
    border-left: 45px solid transparent;
    border-right: 45px solid transparent;
    border-bottom: 70px solid #facc15;
  }
  .body {
    width: 72px;
    margin: 0 auto;
    height: 120px;
    background: linear-gradient(180deg, #facc15 0%, #eab308 100%);
    border-radius: 6px;
    position: relative;
  }
  .window {
    position: absolute;
    top: 22px;
    left: 50%;
    width: 26px;
    height: 26px;
    margin-left: -13px;
    background: #0a0a0a;
    border-radius: 50%;
    border: 4px solid #eab308;
  }
  .fin-left, .fin-right {
    position: absolute;
    bottom: -20px;
    width: 0; height: 0;
    border-top: 40px solid transparent;
    border-bottom: 0 solid transparent;
  }
  .fin-left {
    left: -28px;
    border-right: 30px solid #eab308;
  }
  .fin-right {
    right: -28px;
    border-left: 30px solid #eab308;
  }
  .flame {
    position: absolute;
    bottom: -55px;
    left: 50%;
    margin-left: -16px;
    width: 32px;
    height: 55px;
    background: radial-gradient(ellipse at top, #facc15, #f97316 60%, transparent 100%);
    border-radius: 50% 50% 40% 40%;
    animation: flame 0.15s infinite alternate;
    filter: blur(2px);
  }
  @keyframes flame {
    from { transform: scale(0.9); opacity: 0.9; }
    to   { transform: scale(1.15); opacity: 1; }
  }
</style>
</head>
<body>
  <div class="sky"></div>
  <div class="stars" id="stars"></div>
  <div class="stage">
    <div class="launchpad"></div>
    <div class="rocket">
      <div class="nose"></div>
      <div class="body">
        <div class="window"></div>
        <div class="fin-left"></div>
        <div class="fin-right"></div>
      </div>
      <div class="flame"></div>
    </div>
  </div>
  <script>
    var stars = document.getElementById('stars');
    for (var i = 0; i < 40; i++) {
      var s = document.createElement('div');
      s.className = 'star';
      s.style.left = (Math.random() * 100) + '%';
      s.style.top = (Math.random() * 100) + '%';
      s.style.animationDelay = (Math.random() * 2) + 's';
      stars.appendChild(s);
    }
  </script>
</body>
</html>
`;

const LoaderScreen = () => {
  const navigation = useNavigation<Nav>();
  const { hasOnboarded, isLoaded } = useSaved();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    const t = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: hasOnboarded ? 'Tabs' : 'Onboarding' }],
      });
    }, 5000);
    return () => clearTimeout(t);
  }, [isLoaded, hasOnboarded, navigation]);

  return (
    <BackgroundWrapper>
      <View style={styles.root}>
        <WebView
          originWhitelist={['*']}
          source={{ html: loaderHtml }}
          style={styles.webview}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          androidLayerType="hardware"
          javaScriptEnabled
          domStorageEnabled
          containerStyle={styles.webview}
        />
      </View>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webview: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
});

export default LoaderScreen;
