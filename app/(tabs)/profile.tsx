import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    // Handle logout logic here
    console.log('User logged out');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <FontAwesome5 name="user" size={48} color="#4A90E2" />
            </View>
            <ThemedText style={styles.userName}>User Name</ThemedText>
            <ThemedText style={styles.userEmail}>user@example.com</ThemedText>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <ThemedText style={styles.statValue}>7</ThemedText>
            <ThemedText style={styles.statLabel}>Day Streak</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statValue}>350</ThemedText>
            <ThemedText style={styles.statLabel}>XP</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statValue}>12</ThemedText>
            <ThemedText style={styles.statLabel}>Sessions</ThemedText>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome5 name="history" size={20} color="#4A90E2" style={styles.menuIcon} />
            <ThemedText style={styles.menuText}>Activity History</ThemedText>
            <FontAwesome5 name="chevron-right" size={16} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome5 name="trophy" size={20} color="#4A90E2" style={styles.menuIcon} />
            <ThemedText style={styles.menuText}>Achievements</ThemedText>
            <FontAwesome5 name="chevron-right" size={16} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome5 name="cog" size={20} color="#4A90E2" style={styles.menuIcon} />
            <ThemedText style={styles.menuText}>Settings</ThemedText>
            <FontAwesome5 name="chevron-right" size={16} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome5 name="question-circle" size={20} color="#4A90E2" style={styles.menuIcon} />
            <ThemedText style={styles.menuText}>Help & Support</ThemedText>
            <FontAwesome5 name="chevron-right" size={16} color="#666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <ThemedText style={styles.logoutText}>Log Out</ThemedText>
        </TouchableOpacity>
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
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  menuContainer: {
    marginBottom: 24,
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  menuIcon: {
    width: 24,
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FF3B30',
    fontWeight: '600',
    fontSize: 16,
  },
});
