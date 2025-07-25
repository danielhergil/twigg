import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, CreditCard as Edit3, Award, BookOpen, Clock, Star, Users, Trophy, Target, Calendar } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  date?: string;
}

interface Course {
  id: string;
  title: string;
  progress: number;
  status: 'completed' | 'in-progress' | 'created';
  thumbnail: string;
  rating?: number;
  students?: number;
}

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'completed' | 'progress' | 'created'>('completed');
  
  const [userProfile] = useState({
    name: 'María García',
    email: 'maria.garcia@email.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    joinDate: 'Marzo 2024',
    bio: 'Desarrolladora apasionada por el aprendizaje continuo y la tecnología.',
    location: 'Madrid, España',
    stats: {
      coursesCompleted: 12,
      coursesInProgress: 3,
      coursesCreated: 2,
      totalStudents: 450,
      hoursLearned: 156,
      currentStreak: 7,
      totalPoints: 2840,
      level: 15,
    }
  });

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Primer Curso',
      description: 'Completaste tu primer curso',
      icon: '🎯',
      earned: true,
      date: 'Marzo 2024'
    },
    {
      id: '2',
      title: 'Racha de 7 días',
      description: 'Estudiaste 7 días consecutivos',
      icon: '🔥',
      earned: true,
      date: 'Abril 2024'
    },
    {
      id: '3',
      title: 'Mentor',
      description: 'Creaste tu primer curso',
      icon: '👨‍🏫',
      earned: true,
      date: 'Abril 2024'
    },
    {
      id: '4',
      title: 'Experto',
      description: 'Completa 20 cursos',
      icon: '🏆',
      earned: false,
    },
  ]);

  const [courses] = useState<Course[]>([
    {
      id: '1',
      title: 'React Native Avanzado',
      progress: 100,
      status: 'completed',
      thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: '2',
      title: 'Machine Learning Básico',
      progress: 30,
      status: 'in-progress',
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: '3',
      title: 'Introducción a TypeScript',
      progress: 0,
      status: 'created',
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.8,
      students: 234,
    },
  ]);

  const filteredCourses = courses.filter(course => course.status === activeTab);

  const renderStatCard = (icon: React.ReactNode, value: string | number, label: string, color: string) => (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
        {icon}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const renderCourseCard = (course: Course) => (
    <TouchableOpacity key={course.id} style={styles.courseCard}>
      <Image source={{ uri: course.thumbnail }} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle} numberOfLines={2}>
          {course.title}
        </Text>
        
        {course.status === 'completed' && (
          <View style={styles.completedBadge}>
            <Award size={14} color="#10b981" />
            <Text style={styles.completedText}>Completado</Text>
          </View>
        )}
        
        {course.status === 'in-progress' && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${course.progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{course.progress}%</Text>
          </View>
        )}
        
        {course.status === 'created' && (
          <View style={styles.createdStats}>
            <View style={styles.statRow}>
              <Star size={14} color="#fbbf24" />
              <Text style={styles.statText}>{course.rating}</Text>
            </View>
            <View style={styles.statRow}>
              <Users size={14} color="#6b7280" />
              <Text style={styles.statText}>{course.students}</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#1a1a2e', '#16213e']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity style={styles.settingsButton}>
              <Settings size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
              <TouchableOpacity style={styles.editAvatarButton}>
                <Edit3 size={16} color="#ffffff" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.userName}>{userProfile.name}</Text>
            <Text style={styles.userEmail}>{userProfile.email}</Text>
            <Text style={styles.userBio}>{userProfile.bio}</Text>
            
            <View style={styles.userMeta}>
              <View style={styles.metaItem}>
                <Calendar size={16} color="#94a3b8" />
                <Text style={styles.metaText}>Se unió en {userProfile.joinDate}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Stats Grid */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            {renderStatCard(
              <Trophy size={20} color="#f59e0b" />,
              userProfile.stats.level,
              'Nivel',
              '#f59e0b'
            )}
            {renderStatCard(
              <Target size={20} color="#ef4444" />,
              userProfile.stats.totalPoints,
              'Puntos',
              '#ef4444'
            )}
            {renderStatCard(
              <Clock size={20} color="#10b981" />,
              `${userProfile.stats.hoursLearned}h`,
              'Estudiadas',
              '#10b981'
            )}
            {renderStatCard(
              <Award size={20} color="#00d4ff" />,
              userProfile.stats.coursesCompleted,
              'Completados',
              '#00d4ff'
            )}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Logros</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.achievementsContainer}>
              {achievements.map((achievement) => (
                <View
                  key={achievement.id}
                  style={[
                    styles.achievementCard,
                    !achievement.earned && styles.achievementCardLocked
                  ]}
                >
                  <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                  <Text style={[
                    styles.achievementTitle,
                    !achievement.earned && styles.achievementTitleLocked
                  ]}>
                    {achievement.title}
                  </Text>
                  <Text style={[
                    styles.achievementDescription,
                    !achievement.earned && styles.achievementDescriptionLocked
                  ]}>
                    {achievement.description}
                  </Text>
                  {achievement.earned && achievement.date && (
                    <Text style={styles.achievementDate}>{achievement.date}</Text>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Courses Tabs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mis Cursos</Text>
          
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'completed' && styles.tabActive]}
              onPress={() => setActiveTab('completed')}
            >
              <Text style={[styles.tabText, activeTab === 'completed' && styles.tabTextActive]}>
                Completados ({userProfile.stats.coursesCompleted})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'progress' && styles.tabActive]}
              onPress={() => setActiveTab('progress')}
            >
              <Text style={[styles.tabText, activeTab === 'progress' && styles.tabTextActive]}>
                En Progreso ({userProfile.stats.coursesInProgress})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'created' && styles.tabActive]}
              onPress={() => setActiveTab('created')}
            >
              <Text style={[styles.tabText, activeTab === 'created' && styles.tabTextActive]}>
                Creados ({userProfile.stats.coursesCreated})
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.coursesGrid}>
            {filteredCourses.map(renderCourseCard)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  settingsButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#00d4ff',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#00d4ff',
    borderRadius: 16,
    padding: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 8,
  },
  userBio: {
    fontSize: 14,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  userMeta: {
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  statsSection: {
    marginTop: -20,
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: (width - 60) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  achievementsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 20,
  },
  achievementCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  achievementCardLocked: {
    backgroundColor: '#f1f5f9',
    opacity: 0.6,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementTitleLocked: {
    color: '#94a3b8',
  },
  achievementDescription: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 8,
  },
  achievementDescriptionLocked: {
    color: '#cbd5e1',
  },
  achievementDate: {
    fontSize: 10,
    color: '#00d4ff',
    fontWeight: '500',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#1e293b',
    fontWeight: '600',
  },
  coursesGrid: {
    gap: 16,
  },
  courseCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  courseImage: {
    width: 80,
    height: 80,
  },
  courseInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  completedText: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00d4ff',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#00d4ff',
    fontWeight: '500',
    minWidth: 30,
  },
  createdStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#64748b',
  },
});