import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Star, Clock, Users } from 'lucide-react-native';

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
      <Image source={{ uri: course.thumbnail }} style={styles.thumbnail} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {course.title}
          </Text>
          <View style={[styles.levelBadge, { backgroundColor: getLevelColor(course.level) }]}>
            <Text style={styles.levelText}>{course.level}</Text>
          </View>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {course.description}
        </Text>
        
        <Text style={styles.instructor}>Por {course.instructor}</Text>
        
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Star size={14} color="#fbbf24" />
            <Text style={styles.statText}>{course.rating}</Text>
            <Text style={styles.statSubtext}>({course.reviews})</Text>
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
          <Text style={styles.enrollButtonText}>
            {course.price === 0 ? 'Inscribirse Gratis' : `$${course.price}`}
          </Text>
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
  thumbnail: {
    width: '100%',
    height: 140,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
    marginRight: 12,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 8,
  },
  instructor: {
    fontSize: 12,
    color: '#00d4ff',
    fontWeight: '500',
    marginBottom: 12,
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
  statSubtext: {
    fontSize: 12,
    color: '#64748b',
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
    backgroundColor: '#00d4ff',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  enrollButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});