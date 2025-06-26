import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

type Reframe = {
  id: string;
  text: string;
  selected: boolean;
};

export default function ReframeScreen() {
  const router = useRouter();
  const { thoughts } = useLocalSearchParams<{ thoughts?: string }>();
  const [reframes, setReframes] = useState<Reframe[]>([
    { 
      id: '1', 
      text: 'I\'m prepared and will do my best, just like I have before.', 
      selected: false 
    },
    { 
      id: '2', 
      text: 'Most people are focused on themselves, not judging me.', 
      selected: false 
    },
    { 
      id: '3', 
      text: 'I can handle this challenge one step at a time.', 
      selected: false 
    },
  ]);
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleReframe = (id: string) => {
    setReframes(reframes.map(reframe => 
      reframe.id === id 
        ? { ...reframe, selected: !reframe.selected } 
        : { ...reframe, selected: false }
    ));
  };

  const handleChooseResponse = () => {
    const selectedReframe = reframes.find(r => r.selected);
    if (selectedReframe) {
      setShowSuccess(true);
      setTimeout(() => {
        router.push('/breathing');
      }, 2000);
    }
  };

  if (showSuccess) {
    return (
      <ThemedView style={styles.successContainer}>
        <View style={styles.successContent}>
          <View style={styles.checkmarkCircle}>
            <FontAwesome5 name="check" size={50} color="#4CAF50" />
          </View>
          <ThemedText style={styles.successText}>Great job reframing your thoughts!</ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Reframe Your Thoughts
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Choose a more balanced perspective:
          </ThemedText>
        </View>

        <View style={styles.reframesContainer}>
          {reframes.map((reframe) => (
            <TouchableOpacity
              key={reframe.id}
              style={[
                styles.reframeButton,
                reframe.selected && styles.reframeButtonSelected
              ]}
              onPress={() => toggleReframe(reframe.id)}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.reframeText}>
                {reframe.text}
              </ThemedText>
              {reframe.selected && (
                <View style={styles.selectedIndicator}>
                  <FontAwesome5 name="check" size={16} color="white" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.button,
            !reframes.some(r => r.selected) && styles.buttonDisabled
          ]} 
          onPress={handleChooseResponse}
          disabled={!reframes.some(r => r.selected)}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.buttonText}>Choose Response</ThemedText>
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
  reframesContainer: {
    marginTop: 20,
    gap: 15,
  },
  reframeButton: {
    backgroundColor: 'rgba(100, 181, 246, 0.15)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reframeButtonSelected: {
    backgroundColor: 'rgba(74, 144, 226, 0.2)',
    borderColor: '#4A90E2',
  },
  reframeText: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  selectedIndicator: {
    backgroundColor: '#4A90E2',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successContent: {
    alignItems: 'center',
  },
  checkmarkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
  },
});
