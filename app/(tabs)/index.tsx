import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  const startDrill = () => {
    // Navigate to the scenario screen
    router.push('/scenario');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            MindGym
          </ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>
            Your daily mental workout
          </ThemedText>
        </View>

        <View style={styles.card}>
          <ThemedText style={styles.cardTitle}>Daily Mental Workout</ThemedText>
          <ThemedText style={styles.cardText}>
            Face real-world anxiety triggers, reframe your thoughts, and build calm confidence — in under 5 minutes a day.
          </ThemedText>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={startDrill}
            activeOpacity={0.8}
          >
            <FontAwesome5 name="brain" size={20} color="white" style={styles.buttonIcon} />
            <ThemedText style={styles.buttonText}>Start Today's Drill</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <ThemedText type="title" style={styles.statNumber}>0</ThemedText>
            <ThemedText style={styles.statLabel}>Day Streak</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText type="title" style={styles.statNumber}>0</ThemedText>
            <ThemedText style={styles.statLabel}>Total Drills</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText type="title" style={styles.statNumber}>0</ThemedText>
            <ThemedText style={styles.statLabel}>Minutes</ThemedText>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    opacity: 0.8,
  },
  card: {
    backgroundColor: 'rgba(100, 181, 246, 0.15)',
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 25,
    opacity: 0.9,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4A90E2',
    borderRadius: 30,
    paddingVertical: 18,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonIcon: {
    marginRight: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
});
