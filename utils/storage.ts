import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  LAST_COMPLETED_DATE: '@MindGym:lastCompletedDate',
  STREAK_COUNT: '@MindGym:streakCount',
  CONFIDENCE_POINTS: '@MindGym:confidencePoints',
};

export const getStreakCount = async (): Promise<number> => {
  try {
    const count = await AsyncStorage.getItem(STORAGE_KEYS.STREAK_COUNT);
    return count ? parseInt(count, 10) : 0;
  } catch (error) {
    console.error('Error getting streak count:', error);
    return 0;
  }
};

export const getConfidencePoints = async (): Promise<number> => {
  try {
    const points = await AsyncStorage.getItem(STORAGE_KEYS.CONFIDENCE_POINTS);
    return points ? parseInt(points, 10) : 0;
  } catch (error) {
    console.error('Error getting confidence points:', error);
    return 0;
  }
};

export const completeDrill = async (): Promise<{ streak: number; points: number }> => {
  try {
    const now = new Date();
    const today = now.toDateString();
    
    // Get current values
    const [lastDate, currentStreak, currentPoints] = await Promise.all([
      AsyncStorage.getItem(STORAGE_KEYS.LAST_COMPLETED_DATE),
      getStreakCount(),
      getConfidencePoints(),
    ]);

    let newStreak = currentStreak;
    let newPoints = currentPoints + 10; // Add 10 confidence points per drill

    // Check if user completed a drill today already
    if (lastDate === today) {
      return { streak: newStreak, points: newPoints };
    }

    // Check if the last completion was yesterday (to maintain streak)
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastDate === yesterday.toDateString()) {
      newStreak += 1; // Increment streak if last completion was yesterday
    } else if (lastDate && lastDate !== today) {
      newStreak = 1; // Reset streak if more than one day has passed
    } else {
      newStreak = Math.max(1, newStreak + 1); // First time or new streak
    }

    // Save all updates
    await Promise.all([
      AsyncStorage.setItem(STORAGE_KEYS.LAST_COMPLETED_DATE, today),
      AsyncStorage.setItem(STORAGE_KEYS.STREAK_COUNT, newStreak.toString()),
      AsyncStorage.setItem(STORAGE_KEYS.CONFIDENCE_POINTS, newPoints.toString()),
    ]);

    return { streak: newStreak, points: newPoints };
  } catch (error) {
    console.error('Error completing drill:', error);
    return { streak: 0, points: 0 };
  }
};

export const resetProgress = async (): Promise<void> => {
  try {
    await Promise.all([
      AsyncStorage.removeItem(STORAGE_KEYS.LAST_COMPLETED_DATE),
      AsyncStorage.removeItem(STORAGE_KEYS.STREAK_COUNT),
      AsyncStorage.removeItem(STORAGE_KEYS.CONFIDENCE_POINTS),
    ]);
  } catch (error) {
    console.error('Error resetting progress:', error);
  }
};
