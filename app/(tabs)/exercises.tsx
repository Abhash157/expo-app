import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { exercisePacks } from '@/data/exercises';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ExercisesTab() {
  const router = useRouter();

  const handlePackPress = (packId: string) => {
    router.push(`/pack/${packId}`);
  };

  const DifficultyBadge = ({ level }: { level: string }) => (
    <View style={[
      styles.difficultyBadge,
      {
        backgroundColor: 
          level === 'Beginner' ? '#4CAF50' :
          level === 'Intermediate' ? '#FFC107' :
          '#F44336',
      },
    ]}>
      <ThemedText style={styles.difficultyText}>{level}</ThemedText>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Exercises
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Choose an exercise to start your mental fitness journey
          </ThemedText>
        </View>

        <View style={styles.packsContainer}>
          {exercisePacks.map((pack) => (
            <TouchableOpacity
              key={pack.id}
              style={[styles.packCard, { backgroundColor: `${pack.color}15` }]}
              onPress={() => handlePackPress(pack.id)}
              activeOpacity={0.8}
            >
              <View style={styles.packHeader}>
                <View style={[styles.iconContainer, { backgroundColor: pack.color }]}>
                  <FontAwesome5 name={pack.icon as any} size={24} color="white" />
                </View>
                <View style={styles.packInfo}>
                  <ThemedText style={styles.packTitle}>{pack.title}</ThemedText>
                  <ThemedText style={styles.packDuration}>
                    {pack.duration} • <DifficultyBadge level={pack.difficulty} />
                  </ThemedText>
                </View>
                <FontAwesome5 name="chevron-right" size={16} color="#666" />
              </View>
              <ThemedText style={styles.packDescription}>
                {pack.description}
              </ThemedText>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: '0%', // Will be dynamic based on progress
                        backgroundColor: pack.color,
                      }
                    ]} 
                  />
                </View>
                <ThemedText style={styles.progressText}>0% Complete</ThemedText>
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
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  packsContainer: {
    gap: 16,
  },
  packCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  packHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  packInfo: {
    flex: 1,
  },
  packTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  packDuration: {
    fontSize: 14,
    opacity: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  packDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 3,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'right',
  },
  difficultyBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 6,
  },
  difficultyText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
});
