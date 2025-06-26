import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Animated, Easing } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

const BREATH_CYCLE_DURATION = 16000; // 16 seconds total (4s per phase)
const PHASE_DURATION = BREATH_CYCLE_DURATION / 4;

export default function BreathingScreen() {
  const router = useRouter();
  const [phase, setPhase] = useState('breathe in');
  const [count, setCount] = useState(4);
  const scale = useState(new Animated.Value(0.5))[0];
  const [animation] = useState(new Animated.Value(0));
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCount(prevCount => {
        if (prevCount <= 1) {
          // Cycle through the phases
          setPhase(currentPhase => {
            switch (currentPhase) {
              case 'breathe in':
                return 'hold';
              case 'hold':
                return 'breathe out';
              case 'breathe out':
                return 'rest';
              case 'rest':
                return 'breathe in';
              default:
                return 'breathe in';
            }
          });
          return 4; // Reset count
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  // Animation for the breathing circle
  useEffect(() => {
    if (!isActive) return;
    
    const breatheIn = Animated.timing(scale, {
      toValue: 1,
      duration: PHASE_DURATION,
      useNativeDriver: true,
    });

    const hold1 = Animated.timing(scale, {
      toValue: 1,
      duration: PHASE_DURATION,
      useNativeDriver: true,
    });

    const breatheOut = Animated.timing(scale, {
      toValue: 0.5,
      duration: PHASE_DURATION,
      useNativeDriver: true,
    });

    const hold2 = Animated.timing(scale, {
      toValue: 0.5,
      duration: PHASE_DURATION,
      useNativeDriver: true,
    });

    const loop = Animated.loop(
      Animated.sequence([breatheIn, hold1, breatheOut, hold2])
    );

    loop.start();
    return () => loop.stop();
  }, [isActive]);

  const handleComplete = () => {
    setIsActive(false);
    router.push('/');
  };

  const getEmoji = () => {
    switch (phase) {
      case 'breathe in':
        return '🌬️';
      case 'hold':
        return '⏸️';
      case 'breathe out':
        return '💨';
      case 'rest':
        return '😌';
      default:
        return '🌬️';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Box Breathing
        </ThemedText>
        
        <ThemedText style={styles.instructions}>
          Follow the breathing pattern to calm your mind
        </ThemedText>

        <View style={styles.animationContainer}>
          <Animated.View 
            style={[
              styles.circle,
              {
                transform: [{ scale }],
              },
            ]}
          >
            <ThemedText style={styles.emoji}>{getEmoji()}</ThemedText>
            <ThemedText style={styles.phaseText}>
              {phase.charAt(0).toUpperCase() + phase.slice(1)}
            </ThemedText>
            <ThemedText style={styles.countText}>{count}</ThemedText>
          </Animated.View>
          
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#4A90E2' }]} />
              <ThemedText style={styles.legendText}>Breathe In (4s)</ThemedText>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#3a7bc8' }]} />
              <ThemedText style={styles.legendText}>Hold (4s)</ThemedText>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#4A90E2' }]} />
              <ThemedText style={styles.legendText}>Breathe Out (4s)</ThemedText>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#3a7bc8' }]} />
              <ThemedText style={styles.legendText}>Rest (4s)</ThemedText>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.doneButton}
        onPress={handleComplete}
        activeOpacity={0.8}
      >
        <ThemedText style={styles.doneButtonText}>I'm Feeling Calmer</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  content: {
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 40,
  },
  animationContainer: {
    alignItems: 'center',
    width: '100%',
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(74, 144, 226, 0.2)',
    borderWidth: 2,
    borderColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  phaseText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  countText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  legend: {
    width: '100%',
    paddingHorizontal: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
  },
  doneButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
