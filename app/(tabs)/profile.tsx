// profile.tsx
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
  Trophy,
  Target,
  Clock,
  Star,
  Users,
  TrendingUp,
  Zap,
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

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'completed' | 'progress' | 'created'>('completed');
  
  const [user] = useState({
    name: 'María García',
    email: 'maria.garcia@email.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
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
    }
  });

  const [achievements] = useState<Achievement[]>([
    { id:'1', title:'Primer Curso', description:'Completaste tu primer curso', icon:'🎯', earned:true, date:'Marzo 2024' },
    { id:'2', title:'Racha 7 días', description:'Estudiaste 7 días seguidos', icon:'🔥', earned:true, date:'Abril 2024' },
    { id:'3', title:'Mentor', description:'Creaste tu primer curso', icon:'👨‍🏫', earned:true, date:'Abril 2024' },
    { id:'4', title:'Experto', description:'Completa 20 cursos', icon:'🏆', earned:false },
    { id:'5', title:'Velocidad de Luz', description:'Menos de 1 semana por curso', icon:'⚡', earned:true, date:'Mayo 2024' },
    { id:'6', title:'Perfeccionista', description:'100% en 5 evaluaciones', icon:'💯', earned:false },
  ]);

  const [courses] = useState<Course[]>([
    { id:'1', title:'React Native Avanzado', progress:100, status:'completed', thumbnail:'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id:'2', title:'Machine Learning Básico', progress:30, status:'in-progress', thumbnail:'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id:'3', title:'Intro a TypeScript', progress:0, status:'created', thumbnail:'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=300', rating:4.8, students:234 },
    { id:'4', title:'Diseño de Interfaces', progress:100, status:'completed', thumbnail:'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300' },
  ]);

  const filtered = courses.filter(c => c.status === activeTab);

  const statCards = [
    { icon: <Crown size={20} color="#fff"/>,     value: user.stats.level,           label:'Nivel',       colors:['#6a11cb','#2575fc'] },
    { icon: <Target size={20} color="#fff"/>,    value: user.stats.totalPoints,     label:'Puntos',      colors:['#ef4444','#b91c1c'] },
    { icon: <Clock size={20} color="#fff"/>,     value: `${user.stats.hoursLearned}h`, label:'Horas',      colors:['#10b981','#059669'] },
    { icon: <Award size={20} color="#fff"/>,     value: user.stats.coursesCompleted,label:'Completados', colors:['#00d4ff','#0099cc'] },
    { icon: <Users size={20} color="#fff"/>,     value: user.stats.totalStudents,   label:'Estudiantes', colors:['#8b5cf6','#7c3aed'] },
    { icon: <TrendingUp size={20} color="#fff"/>,value: user.stats.currentStreak,   label:'Racha',       colors:['#f59e0b','#d97706'] },
  ];

  const renderCourseCard = (c: Course) => (
    <View key={c.id} style={styles.courseCard}>
      <Image source={{uri:c.thumbnail}} style={styles.courseImg}/>
      {c.status==='completed' && (
        <View style={styles.badgeComplete}>
          <Award size={16} color="#fff"/>
        </View>
      )}
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle} numberOfLines={2}>{c.title}</Text>
        {c.status==='in-progress' && (
          <View style={styles.progressRow}>
            <View style={styles.progressBar}>
              <LinearGradient colors={['#6a11cb','#2575fc']} style={[styles.progressFill,{width:`${c.progress}%`}]} />
            </View>
            <Text style={styles.progressText}>{c.progress}%</Text>
          </View>
        )}
        {c.status==='created' && (
          <View style={styles.metaRow}>
            <Star size={14} color="#fbbf24"/><Text style={styles.metaText}>{c.rating}</Text>
            <Users size={14} color="#6b7280"/><Text style={styles.metaText}>{c.students}</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <LinearGradient colors={['#6a11cb','#2575fc']} style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.greeting}>¡Hola, {user.name}!</Text>
            <TouchableOpacity>
              <Settings size={24} color="#fff"/>
            </TouchableOpacity>
          </View>
          <View style={styles.profileRow}>
            <View style={styles.avatarWrap}>
              <Image source={{uri:user.avatar}} style={styles.avatar}/>
              <TouchableOpacity style={styles.editAvatar}>
                <Edit3 size={16} color="#fff"/>
              </TouchableOpacity>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <Text style={styles.userBio}>{user.bio}</Text>
              <View style={styles.joinRow}>
                <Calendar size={14} color="rgba(255,255,255,0.8)"/>
                <Text style={styles.joinText}>Se unió en {user.joinDate}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* STATS */}
        <View style={styles.statsScroll}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingLeft:20}}>
            {statCards.map((s,i)=>(
              <LinearGradient key={i} colors={s.colors} style={styles.statCard}>
                {s.icon}
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </LinearGradient>
            ))}
          </ScrollView>
        </View>

        {/* ACHIEVEMENTS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Logros</Text>
            <TouchableOpacity><Text style={styles.seeAll}>Ver todos</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingLeft:20}}>
            {achievements.map(a=>(
              <View key={a.id} style={[styles.achieveCard, !a.earned && styles.achieveLocked]}>
                <Text style={styles.achieveIcon}>{a.icon}</Text>
                <Text style={styles.achieveTitle}>{a.title}</Text>
                <Text style={styles.achieveDesc}>{a.description}</Text>
                {a.earned && a.date && <Text style={styles.achieveDate}>{a.date}</Text>}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* MY COURSES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mis Cursos</Text>
          <View style={styles.tabs}>
            {['completed','progress','created'].map(tab => {
              const label = tab==='completed'?'Completados':tab==='progress'?'En Progreso':'Creados';
              const count = tab==='completed'?user.stats.coursesCompleted:tab==='progress'?user.stats.coursesInProgress:user.stats.coursesCreated;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tab, activeTab===tab && styles.tabActive]}
                  onPress={()=>setActiveTab(tab as any)}
                >
                  <Text style={[styles.tabText, activeTab===tab && styles.tabTextActive]}>
                    {label} ({count})
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.coursesList}>
            {filtered.map(renderCourseCard)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#f8fafc' },
  header: {
    paddingBottom:24,
    borderBottomLeftRadius:24,
    borderBottomRightRadius:24,
    paddingHorizontal:20,
  },
  headerRow: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:10,
    marginBottom:16,
  },
  greeting: { color:'#fff', fontSize:24, fontWeight:'700' },
  profileRow: { flexDirection:'row', alignItems:'center' },
  avatarWrap:{ position:'relative', marginRight:16 },
  avatar:{ width:80, height:80, borderRadius:40, borderWidth:3, borderColor:'#fff' },
  editAvatar:{ position:'absolute', bottom:0, right:0, backgroundColor:'#fff', borderRadius:12, padding:4 },
  userInfo: { flex:1 },
  userName:{ color:'#fff', fontSize:20, fontWeight:'600' },
  userEmail:{ color:'rgba(255,255,255,0.85)', fontSize:14, marginVertical:4 },
  userBio:{ color:'rgba(255,255,255,0.8)', fontSize:12, marginBottom:8 },
  joinRow:{ flexDirection:'row', alignItems:'center' },
  joinText:{ color:'rgba(255,255,255,0.8)', fontSize:12, marginLeft:4 },

  statsScroll:{ marginTop: 12, marginBottom:24 },
  statCard:{
    width: width*0.4,
    marginRight:16,
    borderRadius:16,
    padding:16,
    alignItems:'center',
  },
  statValue:{ color:'#fff', fontSize:20, fontWeight:'700', marginVertical:8 },
  statLabel:{ color:'rgba(255,255,255,0.9)', fontSize:12 },

  section:{ marginBottom:32 },
  sectionHeader:{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:20, marginBottom:12 },
  sectionTitle:{ fontSize:18, fontWeight:'700', color:'#1e293b' },
  seeAll:{ fontSize:14, color:'#6a11cb' },

  achieveCard:{
    width:140, marginRight:16, backgroundColor:'#fff', borderRadius:16, padding:12, alignItems:'center',
    shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.1, shadowRadius:8, elevation:4,
  },
  achieveLocked:{ opacity:0.5, backgroundColor:'#f1f5f9' },
  achieveIcon:{ fontSize:28, marginBottom:8 },
  achieveTitle:{ fontSize:14, fontWeight:'600', textAlign:'center', marginBottom:4 },
  achieveDesc:{ fontSize:12, color:'#64748b', textAlign:'center', lineHeight:16 },
  achieveDate:{ fontSize:10, color:'#00d4ff', marginTop:4 },

  tabs:{ flexDirection:'row', backgroundColor:'#f1f5f9', marginHorizontal:20, borderRadius:12, overflow:'hidden', marginBottom:16 },
  tab:{ flex:1, paddingVertical:8, alignItems:'center' },
  tabActive:{ backgroundColor:'#fff' },
  tabText:{ fontSize:12, color:'#64748b' },
  tabTextActive:{ color:'#1e293b', fontWeight:'600' },

  coursesList:{ paddingHorizontal:20 },
  courseCard:{
    flexDirection:'row', backgroundColor:'#fff', borderRadius:16, marginBottom:16, overflow:'hidden',
    shadowColor:'#000', shadowOffset:{width:0,height:1}, shadowOpacity:0.1, shadowRadius:4, elevation:2,
  },
  courseImg:{ width:80, height:80 },
  badgeComplete:{ position:'absolute', top:8, right:8, backgroundColor:'#10b981', borderRadius:12, padding:4 },
  courseInfo:{ flex:1, padding:12, justifyContent:'center' },
  courseTitle:{ fontSize:14, fontWeight:'600', color:'#1e293b', marginBottom:6 },
  progressRow:{ flexDirection:'row', alignItems:'center' },
  progressBar:{ flex:1, height:6, backgroundColor:'#e2e8f0', borderRadius:3, overflow:'hidden', marginRight:8 },
  progressFill:{ height:'100%' },
  progressText:{ fontSize:12, color:'#6a11cb', fontWeight:'600', width:30, textAlign:'right' },
  metaRow:{ flexDirection:'row', alignItems:'center', gap:12 },
  metaText:{ fontSize:12, color:'#64748b', marginLeft:4 },
});
