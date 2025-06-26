import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getPackById } from '@/data/exercises';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export default function DayScreen() {
  const router = useRouter();
  const { id, day } = useLocalSearchParams<{ id: string; day: string }>();
  const pack = getPackById(id || '');
  const dayNumber = parseInt(day || '1', 10);
  const dayData = pack?.days.find(d => d.day === dayNumber);

  if (!pack || !dayData) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Day not found</ThemedText>
      </ThemedView>
    );
  }

  const startExercise = (exerciseId: string) => {
    // Navigate to exercise screen
    console.log('Start exercise:', exerciseId);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <FontAwesome5 name="arrow-left" size={20} color="#4A90E2" />
          </TouchableOpacity>
          <View>
            <ThemedText style={styles.dayTitle}>Day {dayNumber}</ThemedText>
            <ThemedText style={styles.daySubtitle}>{dayData.title}</ThemedText>
          </View>
        </View>

        <ThemedText style={styles.description}>
          Complete the following exercises to complete today's challenge. Take your time and focus on the process.
        </ThemedText>

        <View style={styles.exercisesContainer}>
          {dayData.exercises.map((exercise, index) => (
            <View key={exercise.id} style={styles.exerciseCard}>
              <View style={styles.exerciseHeader}>
                <View style={[styles.exerciseNumber, { backgroundColor: pack.color }]}>
                  <ThemedText style={styles.exerciseNumberText}>{index + 1}</ThemedText>
                </View>
                <View style={styles.exerciseInfo}>
                  <ThemedText style={styles.exerciseTitle}>{exercise.title}</ThemedText>
                  <ThemedText style={styles.exerciseDuration}>
                    {exercise.duration} • {exercise.difficulty}
                  </ThemedText>
                </View>
              </View>
              
              <ThemedText style={styles.exerciseDescription}>
                {exercise.description}
              </ThemedText>
              
              <TouchableOpacity 
                style={[styles.startButton, { backgroundColor: pack.color }]}
                onPress={() => startExercise(exercise.id)}
                activeOpacity={0.8}
              >
                <ThemedText style={styles.startButtonText}>Start Exercise</ThemedText>
                <FontAwesome5 name="play" size={14} color="white" style={styles.playIcon} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginLeft: -8,
  },
  dayTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  daySubtitle: {
    fontSize: 16,
    opacity: 0.9,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    opacity: 0.9,
  },
  exercisesContainer: {
    gap: 16,
  },
  exerciseCard: {
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  exerciseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  exerciseNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  exerciseDuration: {
    fontSize: 13,
    opacity: 0.7,
  },
  exerciseDescription: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
    opacity: 0.9,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  startButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  playIcon: {
    marginLeft: 8,
  },
});
