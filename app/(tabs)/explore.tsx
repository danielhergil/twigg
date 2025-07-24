import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Star, Clock, Users, Plus, BookOpen, TrendingUp, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  category: string;
  price: number;
  thumbnail: string;
  tags: string[];
}

export default function CoursesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedLevel, setSelectedLevel] = useState('Todos');

  const categories = ['Todos', 'Desarrollo', 'IA', 'Diseño', 'Marketing', 'Negocios'];
  const levels = ['Todos', 'Básico', 'Intermedio', 'Avanzado'];

  const [courses] = useState<Course[]>([
    {
      id: '1',
      title: 'React Native Avanzado',
      description: 'Aprende técnicas avanzadas de React Native para crear aplicaciones profesionales',
      instructor: 'Carlos Mendoza',
      rating: 4.8,
      reviews: 234,
      students: 1250,
      duration: '12 semanas',
      level: 'Avanzado',
      category: 'Desarrollo',
      price: 0,
      thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['React Native', 'Mobile', 'JavaScript'],
    },
    {
      id: '2',
      title: 'Inteligencia Artificial para Principiantes',
      description: 'Introducción completa al mundo de la IA y Machine Learning',
      instructor: 'Ana Rodríguez',
      rating: 4.6,
      reviews: 189,
      students: 890,
      duration: '8 semanas',
      level: 'Básico',
      category: 'IA',
      price: 0,
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['IA', 'Machine Learning', 'Python'],
    },
    {
      id: '3',
      title: 'Diseño UX/UI Moderno',
      description: 'Crea interfaces atractivas y funcionales con las últimas tendencias',
      instructor: 'Laura García',
      rating: 4.9,
      reviews: 156,
      students: 670,
      duration: '10 semanas',
      level: 'Intermedio',
      category: 'Diseño',
      price: 0,
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['UX', 'UI', 'Figma', 'Design'],
    },
    {
      id: '4',
      title: 'Marketing Digital 2025',
      description: 'Estrategias avanzadas de marketing digital para el próximo año',
      instructor: 'Miguel Torres',
      rating: 4.7,
      reviews: 312,
      students: 1420,
      duration: '6 semanas',
      level: 'Intermedio',
      category: 'Marketing',
      price: 0,
      thumbnail: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Marketing', 'SEO', 'Redes Sociales'],
    },
    {
      id: '5',
      title: 'Finanzas Personales',
      description: 'Aprende a gestionar tus finanzas y crear riqueza a largo plazo',
      instructor: 'Sofía López',
      rating: 4.9,
      reviews: 267,
      students: 980,
      duration: '5 semanas',
      level: 'Básico',
      category: 'Negocios',
      price: 0,
      thumbnail: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Finanzas', 'Inversiones', 'Ahorro'],
    },
  ]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Básico': return '#10b981';
      case 'Intermedio': return '#f59e0b';
      case 'Avanzado': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'Todos' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'Todos' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const renderCourseCard = (course: Course) => (
    <TouchableOpacity key={course.id} style={styles.courseCard}>
      <View style={styles.courseThumbnailContainer}>
        <Image source={{ uri: course.thumbnail }} style={styles.courseThumbnail} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.thumbnailOverlay}
        />
        <View style={[styles.levelBadge, { backgroundColor: getLevelColor(course.level) }]}>
          <Text style={styles.levelText}>{course.level}</Text>
        </View>
      </View>
      
      <View style={styles.courseContent}>
        <Text style={styles.courseTitle} numberOfLines={2}>
          {course.title}
        </Text>
        
        <Text style={styles.instructor}>Por {course.instructor}</Text>
        
        <View style={styles.courseDescriptionContainer}>
          <Text style={styles.courseDescription} numberOfLines={2}>
            {course.description}
          </Text>
        </View>
        
        <View style={styles.courseStats}>
          <View style={styles.statItem}>
            <Star size={14} color="#fbbf24" />
            <Text style={styles.statText}>{course.rating}</Text>
          </View>
          <View style={styles.statItem}>
            <Users size={14} color="#6b7280" />
            <Text style={styles.statText}>{course.students}</Text>
          </View>
          <View style={styles.statItem}>
            <Clock size={14} color="#6b7280" />
            <Text style={styles.statText}>{course.duration}</Text>
          </View>
        </View>

        <View style={styles.tagsContainer}>
          {course.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.enrollButton}>
          <LinearGradient
            colors={['#00d4ff', '#0099cc']}
            style={styles.enrollButtonGradient}
          >
            <Text style={styles.enrollButtonText}>Inscribirse Gratis</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Explorar Cursos</Text>
        <Text style={styles.headerSubtitle}>Descubre nuevos conocimientos</Text>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#6b7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar cursos, temas, instructores..."
              placeholderTextColor="#6b7280"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Featured Section */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Destacados</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.featuredScroll}
          >
            <TouchableOpacity style={styles.featuredCard}>
              <LinearGradient
                colors={['#8b5cf6', '#7c3aed']}
                style={styles.featuredGradient}
              >
                <Zap size={24} color="#ffffff" />
                <Text style={styles.featuredTitle}>IA Generativa</Text>
                <Text style={styles.featuredSubtitle}>12 cursos nuevos</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.featuredCard}>
              <LinearGradient
                colors={['#10b981', '#059669']}
                style={styles.featuredGradient}
              >
                <TrendingUp size={24} color="#ffffff" />
                <Text style={styles.featuredTitle}>Negocios</Text>
                <Text style={styles.featuredSubtitle}>8 cursos nuevos</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.featuredCard}>
              <LinearGradient
                colors={['#f59e0b', '#d97706']}
                style={styles.featuredGradient}
              >
                <BookOpen size={24} color="#ffffff" />
                <Text style={styles.featuredTitle}>Desarrollo</Text>
                <Text style={styles.featuredSubtitle}>15 cursos nuevos</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Create Course Button */}
        <TouchableOpacity style={styles.createCourseButton}>
          <LinearGradient
            colors={['#10b981', '#059669']}
            style={styles.createCourseGradient}
          >
            <Plus size={24} color="#ffffff" />
            <View style={styles.createCourseText}>
              <Text style={styles.createCourseTitle}>Crear Nuevo Curso</Text>
              <Text style={styles.createCourseSubtitle}>Comparte tu conocimiento</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Category Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Categorías</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.filterChip,
                  selectedCategory === category && styles.filterChipActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedCategory === category && styles.filterChipTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Level Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Nivel</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {levels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.filterChip,
                  selectedLevel === level && styles.filterChipActive
                ]}
                onPress={() => setSelectedLevel(level)}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedLevel === level && styles.filterChipTextActive
                ]}>
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Results */}
        <View style={styles.resultsSection}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>
              {filteredCourses.length} cursos encontrados
            </Text>
            <TouchableOpacity>
              <Text style={styles.sortText}>Ordenar por</Text>
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
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
  },
  filterButton: {
    backgroundColor: '#00d4ff',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  featuredSection: {
    marginTop: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  featuredScroll: {
    flexDirection: 'row',
    gap: 16,
  },
  featuredCard: {
    borderRadius: 16,
    overflow: 'hidden',
    width: 160,
  },
  featuredGradient: {
    padding: 16,
    height: 100,
    justifyContent: 'center',
    gap: 8,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  featuredSubtitle: {
    fontSize: 12,
    color: '#e9d5ff',
  },
  createCourseButton: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  createCourseGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  createCourseText: {
    flex: 1,
  },
  createCourseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  createCourseSubtitle: {
    fontSize: 14,
    color: '#d1fae5',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterChip: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterChipActive: {
    backgroundColor: '#00d4ff',
    borderColor: '#00d4ff',
  },
  filterChipText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#ffffff',
  },
  resultsSection: {
    marginBottom: 32,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  sortText: {
    fontSize: 14,
    color: '#00d4ff',
    fontWeight: '500',
  },
  coursesGrid: {
    gap: 16,
  },
  courseCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  courseThumbnailContainer: {
    position: 'relative',
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
  levelBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  levelText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  courseContent: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  instructor: {
    fontSize: 12,
    color: '#00d4ff',
    fontWeight: '500',
    marginBottom: 8,
  },
  courseDescriptionContainer: {
    marginBottom: 12,
  },
  courseDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#1e293b',
    fontWeight: '500',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 10,
    color: '#475569',
    fontWeight: '500',
  },
  enrollButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  enrollButtonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  enrollButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
