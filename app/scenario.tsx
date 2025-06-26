import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

type Scenario = {
  id: string;
  title: string;
  description: string;
  example: string;
};

// Example scenario - in a real app, this would come from a database or API
const EXAMPLE_SCENARIO: Scenario = {
  id: '1',
  title: 'Public Speaking',
  description: 'You have to give a presentation in front of a large audience.',
  example: 'Imagine you\'re standing in front of 50 colleagues, about to present your quarterly report. Your palms are sweaty, your heart is racing, and you can feel everyone\'s eyes on you.'
};

export default function ScenarioScreen() {
  const router = useRouter();

  const handleNext = () => {
    // Navigate to the thought unpacking screen
    router.push('/thought-unpacking');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Today's Scenario
          </ThemedText>
          <ThemedText type="subtitle" style={styles.scenarioTitle}>
            {EXAMPLE_SCENARIO.title}
          </ThemedText>
        </View>

        <View style={styles.card}>
          <ThemedText style={styles.sectionTitle}>The Situation</ThemedText>
          <ThemedText style={styles.description}>
            {EXAMPLE_SCENARIO.description}
          </ThemedText>
          
          <ThemedText style={[styles.sectionTitle, { marginTop: 20 }]}>
            Imagine This
          </ThemedText>
          <ThemedText style={styles.exampleText}>
            {EXAMPLE_SCENARIO.example}
          </ThemedText>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.buttonText}>Next</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scenarioTitle: {
    fontSize: 22,
    color: '#4A90E2',
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'rgba(100, 181, 246, 0.15)',
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 25,
    opacity: 0.9,
  },
  exampleText: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
    opacity: 0.9,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  button: {
    backgroundColor: '#4A90E2',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 10,
  },
});
