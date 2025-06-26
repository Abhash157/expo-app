import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';

type ExerciseStep = {
  id: string;
  type: 'instruction' | 'timer' | 'reflection';
  content: string;
  duration?: number; // in seconds
};

const exerciseSteps: Record<string, ExerciseStep[]> = {
  // Social Confidence - Day 1 - Mirror Practice
  'sc-1-1': [
    {
      id: '1',
      type: 'instruction',
      content: 'Find a quiet space with a mirror where you can stand comfortably.',
    },
    {
      id: '2',
      type: 'instruction',
      content: 'Stand about an arm\'s length away from the mirror.',
    },
    {
      id: '3',
      type: 'timer',
      content: 'Look into your own eyes for 2 minutes',
      duration: 120, // 2 minutes in seconds
    },
    {
      id: '4',
      type: 'reflection',
      content: 'How did it feel to maintain eye contact with yourself?',
    },
  ],
  // Add more exercises as needed
};

export default function ExerciseScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  const steps = exerciseSteps[id || ''] || [];
  const currentStep = steps[currentStepIndex];
  const progress = steps.length > 0 ? (currentStepIndex / steps.length) * 100 : 0;

  // Sound effect function
  // const playCompletionSound = async () => {
  //   try {
  //     if (soundRef.current) {
  //       await soundRef.current.replayAsync();
  //     } else {
  //       const { sound } = await Audio.Sound.createAsync(
  //         require('@/assets/sounds/complete.mp3')
  //       );
  //       soundRef.current = sound;
  //       await sound.playAsync();
  //     }
  //   } catch (error) {
  //     console.error('Error playing sound', error);
  //   }
  // };

  // Timer logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      // Reset timer for the next step if it's a timer step
      const nextStep = steps[currentStepIndex + 1];
      if (nextStep?.type === 'timer') {
        setTimeLeft(nextStep.duration || 0);
      }
    } else {
      // Exercise completed
      router.back();
      // Here you would typically update the user's progress
    }
  };

  const handleStartTimer = () => {
    if (currentStep.type === 'timer' && timeLeft > 0) {
      setIsRunning(true);
    } else {
      handleNext();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentStep) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Exercise not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View 
          style={[
            styles.progressBarFill, 
            { width: `${progress}%` },
          ]} 
        />
      </View>

      <ScrollView 
        contentContainerStyle={[
          styles.content,
          { minHeight: '100%' }
        ]}
      >
        <View style={styles.stepIndicator}>
          <ThemedText style={styles.stepText}>
            Step {currentStepIndex + 1} of {steps.length}
          </ThemedText>
        </View>

        <View style={styles.stepContent}>
          {currentStep.type === 'timer' && (
            <View style={styles.timerContainer}>
              <ThemedText style={styles.timerText}>
                {formatTime(timeLeft)}
              </ThemedText>
              <ThemedText style={styles.timerLabel}>
                {currentStep.content}
              </ThemedText>
            </View>
          )}

          {currentStep.type === 'instruction' && (
            <View style={styles.instructionContainer}>
              <FontAwesome5 
                name="info-circle" 
                size={32} 
                color="#4A90E2" 
                style={styles.icon}
              />
              <ThemedText style={styles.instructionText}>
                {currentStep.content}
              </ThemedText>
            </View>
          )}

          {currentStep.type === 'reflection' && (
            <View style={styles.reflectionContainer}>
              <FontAwesome5 
                name="lightbulb" 
                size={32} 
                color="#FFC107" 
                style={styles.icon}
              />
              <ThemedText style={styles.reflectionPrompt}>
                {currentStep.content}
              </ThemedText>
              <TextInput 
                style={styles.reflectionInput}
                placeholder="Type your thoughts here..."
                placeholderTextColor="#999"
                multiline
                textAlignVertical="top"
              />
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.button,
              isRunning ? styles.pauseButton : styles.nextButton,
              { width: width - 32 } // Full width minus padding
            ]}
            onPress={handleStartTimer}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.buttonText}>
              {isRunning 
                ? 'Pause' 
                : currentStep.type === 'timer' && timeLeft === (currentStep.duration || 0)
                  ? 'Start Timer'
                  : timeLeft > 0
                    ? 'Resume'
                    : 'Continue'}
            </ThemedText>
            {!isRunning && currentStep.type === 'timer' && timeLeft > 0 && (
              <FontAwesome5 
                name="play" 
                size={16} 
                color="white" 
                style={styles.buttonIcon}
              />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#f0f0f0',
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
  },
  content: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  stepIndicator: {
    alignItems: 'center',
    marginBottom: 24,
  },
  stepText: {
    fontSize: 14,
    opacity: 0.7,
  },
  stepContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  timerContainer: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  timerLabel: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.8,
  },
  instructionContainer: {
    alignItems: 'center',
    padding: 16,
  },
  instructionText: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 28,
    marginTop: 16,
  },
  reflectionContainer: {
    width: '100%',
    alignItems: 'center',
  },
  reflectionPrompt: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 26,
  },
  reflectionInput: {
    width: '100%',
    minHeight: 120,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  icon: {
    marginBottom: 16,
  },
  footer: {
    paddingBottom: 32,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
  },
  nextButton: {
    backgroundColor: '#4A90E2',
  },
  pauseButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonIcon: {
    marginLeft: 8,
  },
});
