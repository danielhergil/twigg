import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Plus, 
  BookOpen, 
  Clock, 
  Users, 
  Target,
  Sparkles,
  ArrowRight,
  Settings
} from 'lucide-react-native';

interface CourseTemplate {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
  modules: number;
  icon: string;
}

export default function CreateScreen() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'Básico' | 'Intermedio' | 'Avanzado'>('Básico');
  const [estimatedDuration, setEstimatedDuration] = useState('');

  const templates: CourseTemplate[] = [
    {
      id: '1',
      title: 'Curso de Programación',
      description: 'Estructura básica para cursos de desarrollo y programación',
      estimatedTime: '8-12 semanas',
      difficulty: 'Intermedio',
      modules: 6,
      icon: '💻',
    },
    {
      id: '2',
      title: 'Curso de Diseño',
      description: 'Template para cursos de diseño gráfico y UX/UI',
      estimatedTime: '6-10 semanas',
      difficulty: 'Básico',
      modules: 5,
      icon: '🎨',
    },
    {
      id: '3',
      title: 'Curso de Marketing',
      description: 'Estructura para cursos de marketing digital y estrategias',
      estimatedTime: '4-8 semanas',
      difficulty: 'Básico',
      modules: 4,
      icon: '📈',
    },
    {
      id: '4',
      title: 'Curso de Ciencias',
      description: 'Template para cursos científicos y técnicos',
      estimatedTime: '10-16 semanas',
      difficulty: 'Avanzado',
      modules: 8,
      icon: '🔬',
    },
  ];

  const difficulties = ['Básico', 'Intermedio', 'Avanzado'] as const;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Básico': return '#10b981';
      case 'Intermedio': return '#f59e0b';
      case 'Avanzado': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const handleCreateCourse = () => {
    if (!courseTitle.trim()) {
      Alert.alert('Error', 'Por favor ingresa un título para el curso');
      return;
    }

    if (!courseDescription.trim()) {
      Alert.alert('Error', 'Por favor ingresa una descripción para el curso');
      return;
    }

    if (!estimatedDuration.trim()) {
      Alert.alert('Error', 'Por favor ingresa la duración estimada');
      return;
    }

    // Aquí se integraría con OpenAI para generar el curso
    Alert.alert(
      'Creando Curso',
      'Tu curso está siendo generado con IA. Esto puede tomar unos minutos...',
      [
        {
          text: 'OK',
          onPress: () => {
            // Simular creación del curso
            setTimeout(() => {
              Alert.alert('¡Éxito!', 'Tu curso ha sido creado correctamente');
              // Reset form
              setCourseTitle('');
              setCourseDescription('');
              setEstimatedDuration('');
              setSelectedTemplate(null);
            }, 2000);
          }
        }
      ]
    );
  };

  const renderTemplateCard = (template: CourseTemplate) => (
    <TouchableOpacity
      key={template.id}
      style={[
        styles.templateCard,
        selectedTemplate === template.id && styles.templateCardSelected
      ]}
      onPress={() => setSelectedTemplate(template.id)}
    >
      <View style={styles.templateHeader}>
        <Text style={styles.templateIcon}>{template.icon}</Text>
        <View style={[
          styles.difficultyBadge,
          { backgroundColor: getDifficultyColor(template.difficulty) }
        ]}>
          <Text style={styles.difficultyText}>{template.difficulty}</Text>
        </View>
      </View>
      
      <Text style={styles.templateTitle}>{template.title}</Text>
      <Text style={styles.templateDescription}>{template.description}</Text>
      
      <View style={styles.templateStats}>
        <View style={styles.statItem}>
          <Clock size={14} color="#6b7280" />
          <Text style={styles.statText}>{template.estimatedTime}</Text>
        </View>
        <View style={styles.statItem}>
          <BookOpen size={14} color="#6b7280" />
          <Text style={styles.statText}>{template.modules} módulos</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Crear Nuevo Curso</Text>
        <Text style={styles.headerSubtitle}>
          Usa IA para generar contenido personalizado
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* AI Generation Card */}
        <View style={styles.aiCard}>
          <LinearGradient
            colors={['#8b5cf6', '#7c3aed']}
            style={styles.aiGradient}
          >
            <Sparkles size={32} color="#ffffff" />
            <View style={styles.aiContent}>
              <Text style={styles.aiTitle}>Generación con IA</Text>
              <Text style={styles.aiDescription}>
                Nuestra IA creará automáticamente el contenido, ejercicios y evaluaciones
                basándose en tu tema y objetivos de aprendizaje.
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Course Form */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Información del Curso</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Título del Curso *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ej: Introducción a React Native"
              placeholderTextColor="#94a3b8"
              value={courseTitle}
              onChangeText={setCourseTitle}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Descripción *</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Describe qué aprenderán los estudiantes..."
              placeholderTextColor="#94a3b8"
              value={courseDescription}
              onChangeText={setCourseDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Duración Estimada *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ej: 8 semanas, 20 horas"
              placeholderTextColor="#94a3b8"
              value={estimatedDuration}
              onChangeText={setEstimatedDuration}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nivel de Dificultad</Text>
            <View style={styles.difficultySelector}>
              {difficulties.map((difficulty) => (
                <TouchableOpacity
                  key={difficulty}
                  style={[
                    styles.difficultyOption,
                    selectedDifficulty === difficulty && styles.difficultyOptionSelected,
                    { borderColor: getDifficultyColor(difficulty) }
                  ]}
                  onPress={() => setSelectedDifficulty(difficulty)}
                >
                  <Text style={[
                    styles.difficultyOptionText,
                    selectedDifficulty === difficulty && { color: getDifficultyColor(difficulty) }
                  ]}>
                    {difficulty}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Templates Section */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Plantillas Sugeridas</Text>
          <Text style={styles.sectionSubtitle}>
            Selecciona una plantilla como punto de partida (opcional)
          </Text>
          
          <View style={styles.templatesGrid}>
            {templates.map(renderTemplateCard)}
          </View>
        </View>

        {/* Create Button */}
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateCourse}
        >
          <LinearGradient
            colors={['#00d4ff', '#0099cc']}
            style={styles.createButtonGradient}
          >
            <Sparkles size={20} color="#ffffff" />
            <Text style={styles.createButtonText}>Generar Curso con IA</Text>
            <ArrowRight size={20} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  aiCard: {
    marginTop: 20,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  aiGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  aiContent: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  aiDescription: {
    fontSize: 14,
    color: '#e9d5ff',
    lineHeight: 20,
  },
  formSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1e293b',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  difficultySelector: {
    flexDirection: 'row',
    gap: 12,
  },
  difficultyOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  difficultyOptionSelected: {
    backgroundColor: '#f8fafc',
  },
  difficultyOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  templatesGrid: {
    gap: 16,
  },
  templateCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  templateCardSelected: {
    borderColor: '#00d4ff',
    backgroundColor: '#f0f9ff',
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  templateIcon: {
    fontSize: 32,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  templateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  templateDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  templateStats: {
    flexDirection: 'row',
    gap: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 12,
    color: '#64748b',
  },
  createButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 20,
  },
  createButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  bottomSpacer: {
    height: 40,
  },
});