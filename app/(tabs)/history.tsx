import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontAwesome5 } from '@expo/vector-icons';
import { FlatList, StyleSheet, View } from 'react-native';

type ActivityItem = {
  id: string;
  title: string;
  type: 'exercise' | 'achievement' | 'challenge';
  date: Date;
  duration?: number; // in minutes
  details?: string;
};

// Mock data - in a real app, this would come from a database or state management
const activityData: ActivityItem[] = [
  {
    id: '1',
    title: 'Mirror Practice',
    type: 'exercise',
    date: new Date(2025, 5, 26),
    duration: 5,
    details: 'Social Confidence - Day 1'
  },
  {
    id: '2',
    title: '50/70 Rule',
    type: 'exercise',
    date: new Date(2025, 5, 25),
    duration: 10,
    details: 'Social Confidence - Day 1'
  },
  {
    id: '3',
    title: 'First Week Complete!',
    type: 'achievement',
    date: new Date(2025, 5, 24),
    details: 'Completed all exercises for the week'
  },
];

const getIconName = (type: string) => {
  switch (type) {
    case 'exercise':
      return 'dumbbell';
    case 'achievement':
      return 'trophy';
    case 'challenge':
      return 'flag';
    default:
      return 'circle';
  }
};

export default function HistoryScreen() {
  const renderItem = ({ item }: { item: ActivityItem }) => (
    <View style={styles.activityItem}>
      <View style={styles.iconContainer}>
        <FontAwesome5 
          name={getIconName(item.type)} 
          size={20} 
          color="#4A90E2" 
        />
      </View>
      <View style={styles.content}>
        <ThemedText style={styles.activityTitle}>{item.title}</ThemedText>
        {item.details && (
          <ThemedText style={styles.activityDetails}>{item.details}</ThemedText>
        )}
        <ThemedText style={styles.activityDate}>
          {item.date.toLocaleDateString()} • {item.duration ? `${item.duration} min` : ''}
        </ThemedText>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Activity History
      </ThemedText>
      
      <FlatList
        data={activityData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  activityItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'rgba(100, 181, 246, 0.15)',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: 'rgba(100, 181, 246, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  content: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  activityDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  activityDate: {
    fontSize: 12,
    color: '#999',
  },
});
