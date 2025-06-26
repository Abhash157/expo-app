import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

type Thought = {
  id: string;
  text: string;
  selected: boolean;
};

export default function ThoughtUnpackingScreen() {
  const router = useRouter();
  const [thoughts, setThoughts] = useState<Thought[]>([
    { id: '1', text: 'I\'m going to fail', selected: false },
    { id: '2', text: 'Everyone is judging me', selected: false },
    { id: '3', text: 'I can\'t do this', selected: false },
  ]);

  const toggleThought = (id: string) => {
    setThoughts(thoughts.map(thought => 
      thought.id === id 
        ? { ...thought, selected: !thought.selected } 
        : thought
    ));
  };

  const handleContinue = () => {
    const selectedThoughts = thoughts.filter(t => t.selected);
    router.push({
      pathname: '/reframe',
      params: { thoughts: JSON.stringify(selectedThoughts) }
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Your Thoughts
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Which of these thoughts are you having?
          </ThemedText>
        </View>

        <View style={styles.thoughtsContainer}>
          {thoughts.map((thought) => (
            <TouchableOpacity
              key={thought.id}
              style={[
                styles.thoughtButton,
                thought.selected && styles.thoughtButtonSelected
              ]}
              onPress={() => toggleThought(thought.id)}
              activeOpacity={0.7}
            >
              <ThemedText style={[
                styles.thoughtText,
                thought.selected && styles.thoughtTextSelected
              ]}>
                {thought.text}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.button,
            !thoughts.some(t => t.selected) && styles.buttonDisabled
          ]} 
          onPress={handleContinue}
          disabled={!thoughts.some(t => t.selected)}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.buttonText}>Continue</ThemedText>
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
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
    marginTop: 8,
  },
  thoughtsContainer: {
    marginTop: 20,
    gap: 12,
  },
  thoughtButton: {
    backgroundColor: 'rgba(100, 181, 246, 0.15)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  thoughtButtonSelected: {
    backgroundColor: '#4A90E2',
    borderColor: '#3a7bc8',
  },
  thoughtText: {
    fontSize: 16,
    textAlign: 'center',
  },
  thoughtTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#4A90E2',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
});
