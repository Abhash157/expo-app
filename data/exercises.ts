export type Exercise = {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
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
          },
          {
            id: 'sc-1-2',
            title: 'The 50/70 Rule',
            description: 'Practice the 50/70 rule: maintain eye contact 50% of the time while speaking and 70% while listening.',
            duration: '10 min',
            difficulty: 'Beginner',
            completed: false,
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
          },
        ],
      },
      {
        day: 3,
        title: 'Confident Body Language',
        exercises: [
          {
            id: 'sc-3-1',
            title: 'Power Poses',
            description: 'Practice power poses for 2 minutes to boost confidence before social interactions.',
            duration: '5 min',
            difficulty: 'Beginner',
            completed: false,
          },
        ],
      },
      {
        day: 4,
        title: 'Entering Social Spaces',
        exercises: [
          {
            id: 'sc-4-1',
            title: 'The 3-Second Rule',
            description: 'Practice entering a room with confidence within 3 seconds of arriving.',
            duration: '10 min',
            difficulty: 'Intermediate',
            completed: false,
          },
        ],
      },
      {
        day: 5,
        title: 'Real-world Practice',
        exercises: [
          {
            id: 'sc-5-1',
            title: 'Social Challenge',
            description: 'Initiate a conversation with a stranger or acquaintance using your new skills.',
            duration: '20 min',
            difficulty: 'Advanced',
            completed: false,
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
          },
        ],
      },
    ],
  },
];

export const getPackById = (id: string) => {
  return exercisePacks.find(pack => pack.id === id);
};
