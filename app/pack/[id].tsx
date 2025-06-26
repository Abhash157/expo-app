import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getPackById } from '@/data/exercises';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export default function PackScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const pack = getPackById(id || '');

  if (!pack) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Pack not found</ThemedText>
      </ThemedView>
    );
  }

  const startDay = (dayNumber: number) => {
    router.push(`/pack/${id}/day/${dayNumber}`);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <FontAwesome5 name="arrow-left" size={20} color="#4A90E2" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <View style={[styles.iconContainer, { backgroundColor: pack.color }]}>
              <FontAwesome5 name={pack.icon as any} size={24} color="white" />
            </View>
            <View>
              <ThemedText style={styles.title}>{pack.title}</ThemedText>
              <ThemedText style={styles.duration}>{pack.duration} • {pack.difficulty}</ThemedText>
            </View>
          </View>
        </View>

        <ThemedText style={styles.description}>{pack.description}</ThemedText>

        <View style={styles.daysContainer}>
          <ThemedText style={styles.sectionTitle}>Daily Challenges</ThemedText>
          
          {pack.days.map((day) => (
            <TouchableOpacity
              key={day.day}
              style={styles.dayCard}
              onPress={() => startDay(day.day)}
              activeOpacity={0.8}
            >
              <View style={styles.dayHeader}>
                <View style={styles.dayNumber}>
                  <ThemedText style={styles.dayNumberText}>Day {day.day}</ThemedText>
                </View>
                <ThemedText style={styles.dayTitle}>{day.title}</ThemedText>
                <FontAwesome5 name="chevron-right" size={16} color="#666" />
              </View>
              <View style={styles.exercisesContainer}>
                {day.exercises.map((exercise) => (
                  <View key={exercise.id} style={styles.exerciseItem}>
                    <View style={[styles.exerciseBullet, { backgroundColor: pack.color }]} />
                    <ThemedText style={styles.exerciseTitle}>
                      {exercise.title} • {exercise.duration}
                    </ThemedText>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
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
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -8,
    marginBottom: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  duration: {
    fontSize: 14,
    opacity: 0.8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  daysContainer: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  dayCard: {
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayNumber: {
    backgroundColor: '#f0f0f0',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dayNumberText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  dayTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  exercisesContainer: {
    paddingLeft: 8,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  exerciseTitle: {
    fontSize: 14,
    opacity: 0.9,
  },
});
