import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Star, Clock, Users } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CourseCardProps {
  course: {
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
  };
  onPress?: () => void;
}

export default function CourseCard({ course, onPress }: CourseCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Básico': return '#10b981';
      case 'Intermedio': return '#f59e0b';
      case 'Avanzado': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: course.thumbnail }} style={styles.thumbnail} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.thumbnailOverlay}
        />
        <View style={[styles.levelBadge, { backgroundColor: getLevelColor(course.level) }]}>
          <Text style={styles.levelText}>{course.level}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {course.title}
        </Text>
        
        <Text style={styles.instructor}>Por {course.instructor}</Text>
        
        <View style={styles.descriptionContainer}>
          <Text style={styles.description} numberOfLines={2}>
            {course.description}
          </Text>
        </View>
        
        <View style={styles.stats}>
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
            <Text style={styles.enrollButtonText}>
              {course.price === 0 ? 'Inscribirse Gratis' : `$${course.price}`}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  thumbnailContainer: {
    position: 'relative',
  },
  thumbnail: {
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
  content: {
    padding: 16,
  },
  title: {
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
  descriptionContainer: {
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  stats: {
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
