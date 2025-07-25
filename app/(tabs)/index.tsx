// index.tsx
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
import { LinearGradient } from 'expo-linear-gradient';
import {
  Play,
  Clock,
  Star,
  TrendingUp,
  Award,
  Search,
  Plus,
  Target,
  Zap,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface Course {
  id: string;
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  lastAccessed: string;
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
  estimatedTime: string;
  rating: number;
  category: string;
  thumbnail: string;
}

export default function Dashboard() {
  const [userName] = useState('María García');
  const [continueCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Introducción a React Native',
      progress: 65,
      totalLessons: 24,
      completedLessons: 16,
      lastAccessed: 'Hace 2 horas',
      difficulty: 'Intermedio',
      estimatedTime: '8 semanas',
      rating: 4.8,
      category: 'Desarrollo',
      thumbnail:
        'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '2',
      title: 'Machine Learning Básico',
      progress: 30,
      totalLessons: 18,
      completedLessons: 5,
      lastAccessed: 'Ayer',
      difficulty: 'Básico',
      estimatedTime: '6 semanas',
      rating: 4.6,
      category: 'IA',
      thumbnail:
        'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ]);

  const [stats] = useState({
    coursesCompleted: 12,
    hoursLearned: 156,
    currentStreak: 7,
    totalPoints: 2840,
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Básico':
        return '#10b981';
      case 'Intermedio':
        return '#f59e0b';
      case 'Avanzado':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const renderCourseCard = (course: Course) => (
    <TouchableOpacity key={course.id} style={styles.courseCard}>
      <View style={styles.courseThumbnailContainer}>
        <Image
          source={{ uri: course.thumbnail }}
          style={styles.courseThumbnail}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.thumbnailOverlay}
        />
        <View
          style={[
            styles.difficultyBadge,
            { backgroundColor: getDifficultyColor(course.difficulty) },
          ]}
        >
          <Text style={styles.difficultyText}>{course.difficulty}</Text>
        </View>
      </View>

      <View style={styles.courseContent}>
        <Text style={styles.courseTitle} numberOfLines={2}>
          {course.title}
        </Text>

        <View style={styles.courseInfo}>
          <View style={styles.infoRow}>
            <Clock size={14} color="#6b7280" />
            <Text style={styles.infoText}>{course.estimatedTime}</Text>
          </View>
          <View style={styles.infoRow}>
            <Star size={14} color="#fbbf24" />
            <Text style={styles.infoText}>{course.rating}</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              {course.completedLessons}/{course.totalLessons} lecciones
            </Text>
            <Text style={styles.progressPercentage}>{course.progress}%</Text>
          </View>
          <View style={styles.progressBar}>
            <LinearGradient
              colors={['#6a11cb', '#2575fc']}
              style={[styles.progressFill, { width: `${course.progress}%` }]}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.continueButton}>
          <LinearGradient
            colors={['#6a11cb', '#2575fc']}
            style={styles.continueButtonGradient}
          >
            <Play size={16} color="#ffffff" />
            <Text style={styles.continueButtonText}>Continuar</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <LinearGradient
        colors={['#6a11cb', '#2575fc']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>¡Hola, {userName}! 👋</Text>
            <Text style={styles.subtitle}>Continúa tu aprendizaje</Text>
          </View>
          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              source={{
                uri:
                  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
              }}
              style={styles.avatar}
            />
            <View style={styles.onlineIndicator} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* BODY */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.statsScroll}
          >
            <LinearGradient
              colors={['#00d4ff', '#0099cc']}
              style={styles.statCard}
            >
              <Award size={20} color="#fff" />
              <Text style={styles.statNumber}>
                {stats.coursesCompleted}
              </Text>
              <Text style={styles.statLabel}>Completados</Text>
            </LinearGradient>

            <LinearGradient
              colors={['#10b981', '#059669']}
              style={styles.statCard}
            >
              <Clock size={20} color="#fff" />
              <Text style={styles.statNumber}>
                {stats.hoursLearned}h
              </Text>
              <Text style={styles.statLabel}>Estudiadas</Text>
            </LinearGradient>

            <LinearGradient
              colors={['#f59e0b', '#d97706']}
              style={styles.statCard}
            >
              <TrendingUp size={20} color="#fff" />
              <Text style={styles.statNumber}>
                {stats.currentStreak}
              </Text>
              <Text style={styles.statLabel}>Días seguidos</Text>
            </LinearGradient>

            <LinearGradient
              colors={['#ef4444', '#b91c1c']}
              style={styles.statCard}
            >
              <Star size={20} color="#fff" />
              <Text style={styles.statNumber}>
                {stats.totalPoints}
              </Text>
              <Text style={styles.statLabel}>Puntos</Text>
            </LinearGradient>
          </ScrollView>
        </View>

        {/* Continue Learning */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Continuar Aprendiendo
            </Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionSubtitle}>
            Retoma donde lo dejaste
          </Text>
          <View style={styles.coursesContainer}>
            {continueCourses.map(renderCourseCard)}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionCard}>
              <LinearGradient
                colors={['#6366f1', '#8b5cf6']}
                style={styles.actionGradient}
              >
                <Search size={24} color="#ffffff" />
                <Text style={styles.actionText}>Explorar Cursos</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <LinearGradient
                colors={['#00d4ff', '#0099cc']}
                style={styles.actionGradient}
              >
                <Plus size={24} color="#ffffff" />
                <Text style={styles.actionText}>Crear Curso</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <LinearGradient
                colors={['#10b981', '#059669']}
                style={styles.actionGradient}
              >
                <Target size={24} color="#ffffff" />
                <Text style={styles.actionText}>Metas</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Daily Challenge */}
        <View style={styles.section}>
          <LinearGradient
            colors={['#8b5cf6', '#7c3aed']}
            style={styles.challengeCard}
          >
            <View style={styles.challengeContent}>
              <View style={styles.challengeHeader}>
                <Zap size={24} color="#ffffff" />
                <Text style={styles.challengeTitle}>
                  Desafío Diario
                </Text>
              </View>
              <Text style={styles.challengeDescription}>
                Completa 30 minutos de estudio hoy para ganar 50
                puntos extra
              </Text>
              <View style={styles.challengeProgress}>
                <View style={styles.challengeProgressBar}>
                  <LinearGradient
                    colors={['#00d4ff', '#0099cc']}
                    style={[
                      styles.challengeProgressFill,
                      { width: '45%' },
                    ]}
                  />
                </View>
                <Text style={styles.challengeProgressText}>
                  15/30 min
                </Text>
              </View>
              <TouchableOpacity style={styles.challengeButton}>
                <Text style={styles.challengeButtonText}>
                  Empezar
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  avatarContainer: { position: 'relative' },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#6a11cb',
  },
  content: { flex: 1, paddingHorizontal: 20 },
  statsContainer: { marginTop: 20, marginBottom: 30 },
  statsScroll: { flexDirection: 'row', gap: 12 },
  statCard: {
    width: width * 0.3,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
  },
  section: { marginBottom: 32 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  seeAllText: {
    fontSize: 14,
    color: '#6a11cb',
    fontWeight: '500',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 20,
  },
  coursesContainer: { gap: 16 },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 4,
  },
  courseThumbnailContainer: { position: 'relative' },
  courseThumbnail: { width: '100%', height: 140 },
  thumbnailOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  difficultyBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  courseContent: { padding: 16 },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  courseInfo: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  infoText: { fontSize: 12, color: '#64748b' },
  progressContainer: { marginBottom: 16 },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: { fontSize: 12, color: '#64748b' },
  progressPercentage: { fontSize: 12, fontWeight: '600', color: '#6a11cb' },
  progressBar: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 3 },
  continueButton: { borderRadius: 12, overflow: 'hidden' },
  continueButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  continueButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  quickActions: { flexDirection: 'row', gap: 12 },
  actionCard: { flex: 1, borderRadius: 16, overflow: 'hidden', minHeight: 100 },
  actionGradient: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: '100%',
  },
  actionText: { color: '#fff', fontSize: 14, fontWeight: '600', textAlign: 'center' },
  challengeCard: { borderRadius: 16, overflow: 'hidden' },
  challengeContent: { padding: 20, gap: 12 },
  challengeHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  challengeTitle: { fontSize: 18, fontWeight: '700', color: '#fff' },
  challengeDescription: { fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 20 },
  challengeProgress: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 },
  challengeProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  challengeProgressFill: { height: '100%', borderRadius: 3 },
  challengeProgressText: { fontSize: 12, color: '#fff', fontWeight: '500', minWidth: 60 },
  challengeButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  challengeButtonText: { color: '#6a11cb', fontSize: 14, fontWeight: '600' },
});
