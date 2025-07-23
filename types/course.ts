export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  category: string;
  price: number;
  thumbnail: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  completed: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'theory' | 'exercise' | 'quiz';
  content: LessonContent;
  order: number;
  completed: boolean;
  duration?: number; // en minutos
}

export interface LessonContent {
  // Para teoría
  text?: string;
  images?: string[];
  videos?: string[];
  
  // Para quiz
  question?: string;
  options?: string[];
  correct?: number | number[]; // índice(s) de respuesta(s) correcta(s)
  explanation?: string;
  
  // Para ejercicios
  prompt?: string;
  placeholder?: string;
  solution?: string;
  hints?: string[];
}

export interface UserProgress {
  userId: string;
  courseId: string;
  currentModuleId: string;
  currentLessonId: string;
  completedLessons: string[];
  completedModules: string[];
  progress: number; // porcentaje 0-100
  startedAt: string;
  lastAccessedAt: string;
  completedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  joinDate: string;
  stats: UserStats;
  preferences: UserPreferences;
}

export interface UserStats {
  coursesCompleted: number;
  coursesInProgress: number;
  coursesCreated: number;
  totalStudents: number;
  hoursLearned: number;
  currentStreak: number;
  totalPoints: number;
  level: number;
}

export interface UserPreferences {
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    reminders: boolean;
  };
  learningGoals: {
    dailyMinutes: number;
    weeklyGoals: string[];
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'course_completion' | 'streak' | 'creation' | 'social';
  requirements: {
    count?: number;
    type?: string;
  };
  points: number;
}

export interface UserAchievement {
  userId: string;
  achievementId: string;
  earnedAt: string;
  progress?: number;
}