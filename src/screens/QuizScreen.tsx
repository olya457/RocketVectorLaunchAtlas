import React, { useState } from 'react';
import {
  Dimensions,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import { quiz } from '../data/quiz';
import { colors } from '../theme/colors';

const { height } = Dimensions.get('window');
const isSmall = height < 700;

const letters = ['A', 'B', 'C', 'D'];

const QuizScreen = () => {
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  const current = quiz[index];

  const onAnswer = (i: number) => {
    const next = correct + (i === current.correctIndex ? 1 : 0);
    setCorrect(next);
    if (index + 1 >= quiz.length) {
      setDone(true);
    } else {
      setIndex(index + 1);
    }
  };

  const restart = () => {
    setIndex(0);
    setCorrect(0);
    setDone(false);
  };

  const share = async () => {
    try {
      await Share.share({
        message: `I completed the Rocket Vector Launch Atlas quiz! Score: ${correct}/${quiz.length}`,
      });
    } catch {}
  };

  return (
    <BackgroundWrapper>
      <SafePadding>
        <View style={styles.header}>
          <Text style={styles.title}>Quiz</Text>
          <Text style={styles.subtitle}>How Well Do You Know Rockets{'\n'}And Space?</Text>
        </View>

        {done ? (
          <View style={styles.content}>
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Quiz Completed!</Text>
              <Text style={styles.resultScore}>
                {correct} / {quiz.length}
              </Text>
              <Text style={styles.resultText}>
                You went through this block and saw how you responded to different questions about space and rockets. Some answers might match the facts, others might reveal something new.
              </Text>
              <Text style={styles.resultText}>
                It\u2019s not about being correct, it\u2019s about how you navigate the topic. You can go back to the facts or research launch sites to see things from a different perspective.
              </Text>
            </View>

            <TouchableOpacity activeOpacity={0.9} onPress={restart} style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>Restart Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.9} onPress={share} style={styles.outlineBtn}>
              <Text style={styles.outlineBtnText}>Share Result</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.content}>
            <View style={styles.questionCard}>
              <Text style={styles.questionText}>
                {index + 1}. {current.question}
              </Text>
            </View>

            <View style={styles.options}>
              {current.options.map((opt, i) => (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.85}
                  onPress={() => onAnswer(i)}
                  style={styles.optionBtn}>
                  <Text style={styles.optionText}>
                    {letters[i]}) {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.progressRow}>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${((index + 1) / quiz.length) * 100}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {index + 1}/{quiz.length}
              </Text>
            </View>
          </View>
        )}
      </SafePadding>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 12,
    paddingHorizontal: 20,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.accent,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 21,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 130,
  },
  questionCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingVertical: isSmall ? 18 : 26,
    paddingHorizontal: 22,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    marginTop: 10,
  },
  questionText: {
    color: colors.text,
    fontSize: isSmall ? 15 : 17,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 24,
  },
  options: {
    marginTop: 22,
  },
  optionBtn: {
    height: 54,
    borderRadius: 16,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  optionText: {
    color: colors.textDark,
    fontSize: 15,
    fontWeight: '700',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
  },
  progressText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 10,
  },
  resultCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    marginTop: 10,
  },
  resultTitle: {
    color: colors.accent,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  resultScore: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 8,
  },
  resultText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 14,
  },
  primaryBtn: {
    height: 54,
    borderRadius: 16,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  primaryBtnText: {
    color: colors.textDark,
    fontSize: 15,
    fontWeight: '700',
  },
  outlineBtn: {
    height: 54,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  outlineBtnText: {
    color: colors.accent,
    fontSize: 15,
    fontWeight: '700',
  },
});

export default QuizScreen;
