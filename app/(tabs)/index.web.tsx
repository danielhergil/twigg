// index.web.tsx
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

export default function DashboardWeb() {
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
    // añade más cursos si quieres...
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
    <View key={course.id} style={styles.courseCard}>
      <Image source={{ uri: course.thumbnail }} style={styles.courseThumbnail} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.6)']}
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

      <View style={styles.courseContent}>
        <Text style={styles.courseTitle}>{course.title}</Text>
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
            <Play size={16} color="#fff" />
            <Text style={styles.continueButtonText}>Continuar</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.header}>
        <View style={styles.headerInner}>
          <Text style={styles.headerTitle}>¡Hola, {userName}! 👋</Text>
          <TouchableOpacity>
            <Image
              source={{
                uri:
                  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>
          Bienvenido a tu panel de aprendizaje
        </Text>
      </LinearGradient>

      <ScrollView style={styles.container}>
        {/* Estadísticas */}
        <View style={styles.statsRow}>
          <LinearGradient
            colors={['#00d4ff', '#0099cc']}
            style={styles.statCard}
          >
            <Award size={24} color="#fff" />
            <Text style={styles.statNumber}>{stats.coursesCompleted}</Text>
            <Text style={styles.statLabel}>Completados</Text>
          </LinearGradient>
          <LinearGradient
            colors={['#10b981', '#059669']}
            style={styles.statCard}
          >
            <Clock size={24} color="#fff" />
            <Text style={styles.statNumber}>{stats.hoursLearned}h</Text>
            <Text style={styles.statLabel}>Estudiadas</Text>
          </LinearGradient>
          <LinearGradient
            colors={['#f59e0b', '#d97706']}
            style={styles.statCard}
          >
            <TrendingUp size={24} color="#fff" />
            <Text style={styles.statNumber}>{stats.currentStreak}</Text>
            <Text style={styles.statLabel}>Días seguidos</Text>
          </LinearGradient>
          <LinearGradient
            colors={['#ef4444', '#b91c1c']}
            style={styles.statCard}
          >
            <Star size={24} color="#fff" />
            <Text style={styles.statNumber}>{stats.totalPoints}</Text>
            <Text style={styles.statLabel}>Puntos</Text>
          </LinearGradient>
        </View>

        {/* Continuar Aprendiendo */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Continuar Aprendiendo</Text>
            <Text style={styles.seeAll}>Ver todos →</Text>
          </View>
          <View style={styles.coursesGrid}>
            {continueCourses.map(renderCourseCard)}
          </View>
        </View>

        {/* Acciones Rápidas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionCard}>
              <LinearGradient
                colors={['#6366f1', '#8b5cf6']}
                style={styles.actionInner}
              >
                <Search size={28} color="#fff" />
                <Text style={styles.actionText}>Explorar Cursos</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <LinearGradient
                colors={['#00d4ff', '#0099cc']}
                style={styles.actionInner}
              >
                <Plus size={28} color="#fff" />
                <Text style={styles.actionText}>Crear Curso</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <LinearGradient
                colors={['#10b981', '#059669']}
                style={styles.actionInner}
              >
                <Target size={28} color="#fff" />
                <Text style={styles.actionText}>Metas</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Desafío Diario */}
        <View style={styles.section}>
          <LinearGradient
            colors={['#8b5cf6', '#7c3aed']}
            style={styles.challengeCard}
          >
            <View style={styles.challengeInner}>
              <View style={styles.challengeHeader}>
                <Zap size={28} color="#fff" />
                <Text style={styles.challengeTitle}>Desafío Diario</Text>
              </View>
              <Text style={styles.challengeDesc}>
                Completa 30 minutos de estudio hoy para ganar 50 puntos extra
              </Text>
              <View style={styles.challengeProgress}>
                <View style={styles.challengeBar}>
                  <View
                    style={[styles.challengeFill, { width: '45%' }]}
                  />
                </View>
                <Text style={styles.challengeText}>15/30 min</Text>
              </View>
              <TouchableOpacity style={styles.challengeBtn}>
                <Text style={styles.challengeBtnText}>Empezar</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
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
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    marginTop: 8,
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#fff',
  },
  container: {
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 32,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  statNumber: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
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
  coursesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  courseCard: {
    width: 'calc(50% - 12px)',
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
  },
  courseThumbnail: {
    width: '100%',
    height: 140,
  },
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
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  courseContent: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  courseInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 12,
    color: '#64748b',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressText: {
    fontSize: 12,
    color: '#64748b',
  },
  progressPercentage: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6a11cb',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  continueButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  continueButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionInner: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  challengeCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  challengeInner: {
    padding: 24,
    gap: 16,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  challengeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  challengeDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginVertical: 8,
  },
  challengeProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  challengeBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  challengeFill: {
    height: '100%',
    backgroundColor: '#fff',
  },
  challengeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  challengeBtn: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  challengeBtnText: {
    color: '#6a11cb',
    fontSize: 14,
    fontWeight: '600',
  },
});
