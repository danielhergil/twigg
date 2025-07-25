// app/(tabs)/explore.web.tsx
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
import {
  Search,
  Filter,
  Star,
  Clock,
  Users,
  Plus,
  TrendingUp,
  Zap,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  category: string;
  thumbnail: string;
  tags: string[];
}

export default function ExploreWeb() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedLevel, setSelectedLevel] = useState('Todos');

  const categories = ['Todos', 'Desarrollo', 'IA', 'Diseño', 'Marketing', 'Negocios'];
  const levels = ['Todos', 'Básico', 'Intermedio', 'Avanzado'];

  const [courses] = useState<Course[]>([
    {
      id: '1',
      title: 'React Native Avanzado',
      description: 'Técnicas avanzadas de React Native para crear apps profesionales',
      instructor: 'Carlos Mendoza',
      rating: 4.8,
      students: 1250,
      duration: '12 semanas',
      level: 'Avanzado',
      category: 'Desarrollo',
      thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['React Native', 'Mobile', 'JavaScript'],
    },
    {
      id: '2',
      title: 'Inteligencia Artificial para Principiantes',
      description: 'Introducción al mundo de la IA y Machine Learning',
      instructor: 'Ana Rodríguez',
      rating: 4.6,
      students: 890,
      duration: '8 semanas',
      level: 'Básico',
      category: 'IA',
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['IA', 'Machine Learning', 'Python'],
    },
    // ...otros cursos
  ]);

  const getLevelColor = (l: string) => {
    switch (l) {
      case 'Básico':     return '#10b981';
      case 'Intermedio': return '#f59e0b';
      case 'Avanzado':   return '#ef4444';
      default:           return '#6b7280';
    }
  };

  const filtered = courses.filter(c => {
    const q = searchQuery.toLowerCase();
    const matchText =
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q));
    const matchCat = selectedCategory === 'Todos' || c.category === selectedCategory;
    const matchLev = selectedLevel === 'Todos'   || c.level === selectedLevel;
    return matchText && matchCat && matchLev;
  });

  const renderCard = (c: Course) => (
    <View key={c.id} style={styles.courseCard}>
      <Image source={{ uri: c.thumbnail }} style={styles.courseThumbnail} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.6)']}
        style={styles.thumbnailOverlay}
      />
      <View style={[styles.levelBadge, { backgroundColor: getLevelColor(c.level) }]}>
        <Text style={styles.levelText}>{c.level}</Text>
      </View>
      <View style={styles.courseContent}>
        <Text style={styles.courseTitle}>{c.title}</Text>
        <View style={styles.courseInfo}>
          <View style={styles.infoRow}>
            <Clock size={14} color="#6b7280" />
            <Text style={styles.infoText}>{c.duration}</Text>
          </View>
          <View style={styles.infoRow}>
            <Star size={14} color="#fbbf24" />
            <Text style={styles.infoText}>{c.rating}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.enrollButton}>
          <LinearGradient
            colors={['#6a11cb', '#2575fc']}
            style={styles.enrollButtonGradient}
          >
            <Text style={styles.enrollButtonText}>Inscribirse Gratis</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.header}>
        <Text style={styles.headerTitle}>Explorar Cursos</Text>
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Search size={20} color="#6b7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar cursos..."
              placeholderTextColor="#6b7280"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Filter size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={[
                styles.chip,
                selectedCategory === cat && styles.chipActive,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedCategory === cat && styles.chipTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
          {levels.map(lv => (
            <TouchableOpacity
              key={lv}
              onPress={() => setSelectedLevel(lv)}
              style={[
                styles.chip,
                selectedLevel === lv && styles.chipActive,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedLevel === lv && styles.chipTextActive,
                ]}
              >
                {lv}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      <ScrollView style={styles.container}>
        <View style={styles.grid}>
          {filtered.map(renderCard)}
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    color: '#374151',
  },
  filterBtn: {
    marginLeft: 12,
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 10,
    borderRadius: 8,
  },
  chips: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  chip: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#00d4ff',
  },
  chipText: {
    color: '#fff',
    fontSize: 12,
  },
  chipTextActive: {
    fontWeight: '600',
  },
  container: {
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',  // <-- ya no deja huecos
    gap: 24,
  },
  courseCard: {
    flexBasis: '30%',               // <-- ocupa 30% y se envuelve
    marginRight: '3.333%',          // <-- deja espacio entre columnas
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  courseThumbnail: {
    width: '100%',
    height: 160,
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
  },
  levelText: {
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
    marginBottom: 16,
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
  enrollButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  enrollButtonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
