export type ExerciseStep = {
  id: string;
  type: 'instruction' | 'timer' | 'reflection';
  content: string;
  duration?: number; // in seconds
};

export type Exercise = {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
  steps: ExerciseStep[];
};

export type ExercisePack = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  days: {
    day: number;
    title: string;
    exercises: Exercise[];
  }[];
};

// Helper function to get exercise by ID
export const getExerciseById = (id: string): Exercise | undefined => {
  for (const pack of exercisePacks) {
    for (const day of pack.days) {
      const exercise = day.exercises.find(ex => ex.id === id);
      if (exercise) return exercise;
    }
  }
  return undefined;
};

export const exercisePacks: ExercisePack[] = [
  {
    id: 'social-confidence',
    title: 'Social Confidence',
    description: '5-day training to overcome social anxiety and build confidence in social situations',
    icon: 'users',
    color: '#4A90E2',
    duration: '5 days',
    difficulty: 'Beginner',
    days: [
      {
        day: 1,
        title: 'Mastering Eye Contact',
        exercises: [
          {
            id: 'sc-1-1',
            title: 'Mirror Practice',
            description: 'Practice making eye contact with yourself in a mirror for 2 minutes. Focus on maintaining a relaxed, confident gaze.',
            duration: '5 min',
            difficulty: 'Beginner',
            completed: false,
            steps: [
              {
                id: '1',
                type: 'instruction',
                content: 'Find a quiet space with a mirror where you can stand comfortably.'
              },
              {
                id: '2',
                type: 'instruction',
                content: 'Stand about an arm\'s length away from the mirror.'
              },
              {
                id: '3',
                type: 'timer',
                content: 'Look into your own eyes for 2 minutes',
                duration: 120, // 2 minutes in seconds
              },
              {
                id: '4',
                type: 'reflection',
                content: 'How did it feel to maintain eye contact with yourself?',
              },
            ],
          },
          {
            id: 'sc-1-2',
            title: 'The 50/70 Rule',
            description: 'Practice the 50/70 rule: maintain eye contact 50% of the time while speaking and 70% while listening.',
            duration: '10 min',
            difficulty: 'Beginner',
            completed: false,
            steps: [
              {
                id: '1',
                type: 'instruction',
                content: 'Find a conversation partner or practice with a friend.'
              },
              {
                id: '2',
                type: 'instruction',
                content: 'When speaking, maintain eye contact for about 50% of the time.'
              },
              {
                id: '3',
                type: 'instruction',
                content: 'When listening, increase eye contact to about 70% of the time.'
              },
              {
                id: '4',
                type: 'reflection',
                content: 'How did it feel to adjust your eye contact?',
              },
            ],
          },
        ],
      },
      {
        day: 2,
        title: 'Small Talk Foundations',
        exercises: [
          {
            id: 'sc-2-1',
            title: 'FORD Method',
            description: 'Practice the FORD method: ask questions about Family, Occupation, Recreation, and Dreams.',
            duration: '15 min',
            difficulty: 'Beginner',
            completed: false,
            steps: [
              {
                id: '1',
                type: 'instruction',
                content: 'Find a conversation partner or practice with a friend.'
              },
              {
                id: '2',
                type: 'instruction',
                content: 'Ask questions about Family (e.g., "How is your family doing?"',
                duration: 60,
              },
              {
                id: '3',
                type: 'instruction',
                content: 'Ask questions about Occupation (e.g., "What do you do for work?"',
                duration: 60,
              },
              {
                id: '4',
                type: 'instruction',
                content: 'Ask questions about Recreation (e.g., "What do you enjoy doing in your free time?"',
                duration: 60,
              },
              {
                id: '5',
                type: 'instruction',
                content: 'Ask questions about Dreams (e.g., "What are your goals for the future?"',
                duration: 60,
              },
              {
                id: '6',
                type: 'reflection',
                content: 'How did it feel to use the FORD method?',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'overthinking-detox',
    title: 'Overthinking Detox',
    description: '5-day program to break free from overthinking and analysis paralysis',
    icon: 'brain',
    color: '#9C27B0',
    duration: '5 days',
    difficulty: 'Intermediate',
    days: [
      {
        day: 1,
        title: 'Thought Awareness',
        exercises: [
          {
            id: 'od-1-1',
            title: 'Thought Journal',
            description: 'Spend 10 minutes journaling your thoughts without judgment.',
            duration: '10 min',
            difficulty: 'Beginner',
            completed: false,
            steps: [
              {
                id: '1',
                type: 'instruction',
                content: 'Find a quiet place where you can write without interruptions.'
              },
              {
                id: '2',
                type: 'timer',
                content: 'Write down your thoughts as they come, without filtering or judging them.',
                duration: 600, // 10 minutes
              },
              {
                id: '3',
                type: 'reflection',
                content: 'How do you feel after journaling your thoughts?',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'emotion-regulation',
    title: 'Emotion Regulation',
    description: '5-day training to understand and manage your emotions effectively',
    icon: 'heart',
    color: '#E91E63',
    duration: '5 days',
    difficulty: 'Intermediate',
    days: [
      {
        day: 1,
        title: 'Emotion Identification',
        exercises: [
          {
            id: 'er-1-1',
            title: 'Emotion Wheel',
            description: 'Use an emotion wheel to identify and label your current emotions.',
            duration: '10 min',
            difficulty: 'Beginner',
            completed: false,
            steps: [
              {
                id: '1',
                type: 'instruction',
                content: 'Look at the emotion wheel and identify the primary emotion you\'re feeling.'
              },
              {
                id: '2',
                type: 'instruction',
                content: 'Try to identify more specific emotions within that category.'
              },
              {
                id: '3',
                type: 'reflection',
                content: 'What emotions did you identify? How does naming them make you feel?',
              },
            ],
          },
        ],
      },
    ],
  },
];

export const getPackById = (id: string) => {
  return exercisePacks.find(pack => pack.id === id);
};