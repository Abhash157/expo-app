import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, View, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  progress: number;
  total: number;
};

// Mock data for achievements
const achievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first exercise',
    icon: 'walking',
    color: '#4A90E2',
    unlocked: true,
    progress: 1,
    total: 1
  },
  {
    id: '2',
    title: 'Weekend Warrior',
    description: 'Complete exercises on 2 different days in a week',
    icon: 'calendar-week',
    color: '#9C27B0',
    unlocked: true,
    progress: 2,
    total: 2
  },
  {
    id: '3',
    title: 'Early Bird',
    description: 'Complete an exercise before 8 AM',
    icon: 'sun',
    color: '#FFC107',
    unlocked: false,
    progress: 0,
    total: 1
  },
  {
    id: '4',
    title: 'Social Butterfly',
    description: 'Complete all Social Confidence exercises',
    icon: 'users',
    color: '#E91E63',
    unlocked: false,
    progress: 1,
    total: 4
  },
  {
    id: '5',
    title: 'Mindfulness Master',
    description: 'Complete 10 minutes of mindfulness exercises',
    icon: 'brain',
    color: '#4CAF50',
    unlocked: false,
    progress: 7,
    total: 10
  },
];

export default function AchievementsScreen() {
  const AchievementCard = ({ achievement }: { achievement: Achievement }) => (
    <View style={[
      styles.achievementCard,
      { opacity: achievement.unlocked ? 1 : 0.6 }
    ]}>
      <View style={[
        styles.iconContainer,
        { backgroundColor: `${achievement.color}20` } // Add opacity to the color
      ]}>
        <FontAwesome5 
          name={achievement.icon} 
          size={24} 
          color={achievement.color} 
        />
      </View>
      <View style={styles.textContainer}>
        <ThemedText style={styles.achievementTitle}>
          {achievement.title}
        </ThemedText>
        <ThemedText style={styles.achievementDescription}>
          {achievement.description}
        </ThemedText>
        {achievement.progress < achievement.total && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${(achievement.progress / achievement.total) * 100}%`,
                    backgroundColor: achievement.color
                  }
                ]} 
              />
            </View>
            <ThemedText style={styles.progressText}>
              {achievement.progress}/{achievement.total}
            </ThemedText>
          </View>
        )}
      </View>
      {achievement.unlocked && (
        <View style={styles.badge}>
          <FontAwesome5 name="check" size={12} color="white" />
        </View>
      )}
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Achievements
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Complete exercises to unlock achievements
      </ThemedText>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {achievements.map((achievement) => (
          <AchievementCard 
            key={achievement.id} 
            achievement={achievement} 
          />
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginRight: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#999',
    minWidth: 30,
    textAlign: 'right',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
});
