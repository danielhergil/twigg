// profile.web.tsx

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
import {
  Settings,
  CreditCard as Edit3,
  Award,
  Target,
  Clock,
  Star,
  Users,
  TrendingUp,
  Crown,
  Calendar,
} from 'lucide-react-native';

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

export default function ProfileWeb() {
  const [activeTab, setActiveTab] = useState<'completed' | 'in-progress' | 'created'>('completed');

  const [user] = useState({
    name: 'María García',
    email: 'maria.garcia@email.com',
    avatar:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    joinDate: 'Marzo 2024',
    bio: 'Desarrolladora apasionada por el aprendizaje continuo y la tecnología.',
    stats: {
      level: 15,
      totalPoints: 2840,
      hoursLearned: 156,
      coursesCompleted: 12,
      coursesInProgress: 3,
      coursesCreated: 2,
      totalStudents: 450,
      currentStreak: 7,
    },
  });

  const [achievements] = useState<Achievement[]>([
    { id: '1', title: 'Primer Curso', description: 'Completaste tu primer curso', icon: '🎯', earned: true, date: 'Marzo 2024' },
    { id: '2', title: 'Racha 7 días', description: 'Estudiaste 7 días seguidos', icon: '🔥', earned: true, date: 'Abril 2024' },
    { id: '3', title: 'Mentor', description: 'Creaste tu primer curso', icon: '👨‍🏫', earned: true, date: 'Abril 2024' },
    { id: '4', title: 'Experto', description: 'Completa 20 cursos', icon: '🏆', earned: false },
    { id: '5', title: 'Velocidad de Luz', description: 'Menos de 1 semana por curso', icon: '⚡', earned: true, date: 'Mayo 2024' },
    { id: '6', title: 'Perfeccionista', description: '100% en 5 evaluaciones', icon: '💯', earned: false },
  ]);

  const [courses] = useState<Course[]>([
    {
      id: '1',
      title: 'React Native Avanzado',
      progress: 100,
      status: 'completed',
      thumbnail:
        'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: '2',
      title: 'Machine Learning Básico',
      progress: 30,
      status: 'in-progress',
      thumbnail:
        'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    {
      id: '3',
      title: 'Intro a TypeScript',
      progress: 0,
      status: 'created',
      thumbnail:
        'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.8,
      students: 234,
    },
    {
      id: '4',
      title: 'Diseño de Interfaces',
      progress: 100,
      status: 'completed',
      thumbnail:
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
  ]);

  const filtered = courses.filter((c) => c.status === activeTab);

  const statCards = [
    {
      icon: <Crown size={24} color="#fff" />,
      value: user.stats.level,
      label: 'Nivel',
      colors: ['#6a11cb', '#2575fc'],
    },
    {
      icon: <Target size={24} color="#fff" />,
      value: user.stats.totalPoints,
      label: 'Puntos',
      colors: ['#ef4444', '#b91c1c'],
    },
    {
      icon: <Clock size={24} color="#fff" />,
      value: `${user.stats.hoursLearned}h`,
      label: 'Horas',
      colors: ['#10b981', '#059669'],
    },
    {
      icon: <Award size={24} color="#fff" />,
      value: user.stats.coursesCompleted,
      label: 'Completados',
      colors: ['#00d4ff', '#0099cc'],
    },
    {
      icon: <Users size={24} color="#fff" />,
      value: user.stats.totalStudents,
      label: 'Estudiantes',
      colors: ['#8b5cf6', '#7c3aed'],
    },
    {
      icon: <TrendingUp size={24} color="#fff" />,
      value: user.stats.currentStreak,
      label: 'Racha',
      colors: ['#f59e0b', '#d97706'],
    },
  ];

  return (
    <SafeAreaView style={styles.wrapper}>
      {/* HEADER */}
      <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.header}>
        <View style={styles.headerInner}>
          <Text style={styles.headerTitle}>¡Hola, {user.name}!</Text>
          <TouchableOpacity>
            <Settings size={28} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.profileInner}>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editAvatar}>
              <Edit3 size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <Text style={styles.userBio}>{user.bio}</Text>
            <View style={styles.joinRow}>
              <Calendar size={16} color="rgba(255,255,255,0.85)" />
              <Text style={styles.joinText}>Se unió en {user.joinDate}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.container}>
        {/* STATS */}
        <View style={styles.statsRow}>
          {statCards.map((s, i) => (
            <LinearGradient key={i} colors={s.colors} style={styles.statCard}>
              {s.icon}
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </LinearGradient>
          ))}
        </View>

        {/* ACHIEVEMENTS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Logros</Text>
            <Text style={styles.seeAll}>Ver todos →</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.achievementsRow}
          >
            {achievements.map((a) => (
              <View
                key={a.id}
                style={[
                  styles.achieveCard,
                  !a.earned && styles.achieveLocked,
                ]}
              >
                <Text style={styles.achieveIcon}>{a.icon}</Text>
                <Text style={styles.achieveTitle}>{a.title}</Text>
                <Text style={styles.achieveDesc}>{a.description}</Text>
                {a.earned && a.date && (
                  <Text style={styles.achieveDate}>{a.date}</Text>
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* MY COURSES */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mis Cursos</Text>
          </View>
          <View style={styles.tabsRow}>
            {[
              { key: 'completed', label: `Completados (${user.stats.coursesCompleted})` },
              { key: 'in-progress', label: `En Progreso (${user.stats.coursesInProgress})` },
              { key: 'created', label: `Creados (${user.stats.coursesCreated})` },
            ].map(({ key, label }) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.tab,
                  activeTab === key && styles.tabActive,
                ]}
                onPress={() => setActiveTab(key as any)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === key && styles.tabTextActive,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Ahora en lista vertical */}
          <View style={styles.coursesList}>
            {filtered.map((c) => (
              <View key={c.id} style={styles.courseCard}>
                <Image source={{ uri: c.thumbnail }} style={styles.courseImg} />
                {c.status === 'completed' && (
                  <View style={styles.badgeComplete}>
                    <Award size={16} color="#fff" />
                  </View>
                )}
                <View style={styles.courseInfo}>
                  <Text style={styles.courseTitle} numberOfLines={2}>
                    {c.title}
                  </Text>
                  {c.status === 'in-progress' && (
                    <View style={styles.progressRow}>
                      <View style={styles.progressBar}>
                        <LinearGradient
                          colors={['#6a11cb', '#2575fc']}
                          style={[
                            styles.progressFill,
                            { width: `${c.progress}%` },
                          ]}
                        />
                      </View>
                      <Text style={styles.progressText}>{c.progress}%</Text>
                    </View>
                  )}
                  {c.status === 'created' && (
                    <View style={styles.metaRow}>
                      <Star size={14} color="#fbbf24" />
                      <Text style={styles.metaText}>{c.rating}</Text>
                      <Users size={14} color="#6b7280" />
                      <Text style={styles.metaText}>{c.students}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    maxWidth: 1200,
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
  },
  profileInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrap: {
    position: 'relative',
    marginRight: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  editAvatar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
  },
  userDetails: {
    flex: 1,
    maxWidth: 600,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  userEmail: {
    marginTop: 4,
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
  },
  userBio: {
    marginTop: 8,
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    lineHeight: 20,
  },
  joinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  joinText: {
    marginLeft: 8,
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
  },

  container: {
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 32,
  },

  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    flexBasis: '32%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  statValue: {
    marginTop: 12,
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  statLabel: {
    marginTop: 4,
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },

  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
  },
  seeAll: {
    fontSize: 14,
    color: '#6a11cb',
    fontWeight: '500',
  },

  achievementsRow: {
    flexDirection: 'row',
    paddingLeft: 0,
  },
  achieveCard: {
    width: 160,
    marginRight: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  achieveLocked: {
    backgroundColor: '#f1f5f9',
    opacity: 0.6,
  },
  achieveIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achieveTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 4,
  },
  achieveDesc: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 8,
  },
  achieveDate: {
    fontSize: 10,
    color: '#00d4ff',
  },

  tabsRow: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    overflow: 'hidden',
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#1e293b',
    fontWeight: '600',
  },

  // Ahora lista vertical sin columnas
  coursesList: {
    flexDirection: 'column',
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  courseImg: {
    width: 120,
    height: 80,
  },
  badgeComplete: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 6,
  },
  courseInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    fontSize: 12,
    color: '#6a11cb',
    fontWeight: '500',
    width: 30,
    textAlign: 'right',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  metaText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#64748b',
  },
});
