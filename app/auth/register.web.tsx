// register.web.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User, Mail, Lock } from 'lucide-react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { auth } from '../../utils/firebase';
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

export default function RegisterScreenWeb() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateForm = (field: keyof typeof formData, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const handleRegister = async () => {
    const { name, email, password, confirmPassword } = formData;
    if (!name || !email || !password || !confirmPassword) {
      window.alert('Error: Por favor completa todos los campos');
      return;
    }
    if (password !== confirmPassword) {
      window.alert('Error: Las contraseñas no coinciden');
      return;
    }
    if (!acceptTerms) {
      window.alert('Error: Debes aceptar los términos y condiciones');
      return;
    }

    setLoading(true);
    try {
      // Crea usuario en Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      // Opcional: define el nombre para el usuario
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      // Mensaje y redirección
      window.alert('¡Cuenta creada correctamente! Ahora inicia sesión.');
      router.replace('/auth/login');
    } catch (error: any) {
      let message = 'Error al registrar usuario';
      if (error.code === 'auth/email-already-in-use') {
        message = 'El correo ya está en uso';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Correo inválido';
      } else if (error.code === 'auth/weak-password') {
        message = 'La contraseña es muy débil';
      }
      window.alert(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      style={styles.background}
    >
      <View style={styles.card}>
        <Image
          source={require('../../assets/images/logo-gamestrategies-1.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Regístrate</Text>

        {/* Nombre de usuario */}
        <View style={styles.inputWrapper}>
          <User size={20} color="#6b7280" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            placeholderTextColor="#9ca3af"
            value={formData.name}
            onChangeText={v => updateForm('name', v)}
            autoCapitalize="none"
          />
        </View>
        {/* Correo electrónico */}
        <View style={styles.inputWrapper}>
          <Mail size={20} color="#6b7280" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={v => updateForm('email', v)}
          />
        </View>
        {/* Contraseña */}
        <View style={styles.inputWrapper}>
          <Lock size={20} color="#6b7280" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#9ca3af"
            secureTextEntry={!showPassword}
            value={formData.password}
            onChangeText={v => updateForm('password', v)}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(prev => !prev)}
            style={styles.eyeIcon}
          >
            <FontAwesome
              name={showPassword ? 'eye' : 'eye-slash'}
              size={20}
              color="#6b7280"
            />
          </TouchableOpacity>
        </View>
        {/* Confirmar contraseña */}
        <View style={styles.inputWrapper}>
          <Lock size={20} color="#6b7280" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            placeholderTextColor="#9ca3af"
            secureTextEntry={!showConfirmPassword}
            value={formData.confirmPassword}
            onChangeText={v => updateForm('confirmPassword', v)}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(prev => !prev)}
            style={styles.eyeIcon}
          >
            <FontAwesome
              name={showConfirmPassword ? 'eye' : 'eye-slash'}
              size={20}
              color="#6b7280"
            />
          </TouchableOpacity>
        </View>

        {/* Términos y condiciones */}
        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setAcceptTerms(prev => !prev)}
          >
            {acceptTerms && <View style={styles.checked} />}
          </TouchableOpacity>
          <Text style={styles.termsText}>
            Acepto los{' '}
            <Text style={styles.link}>términos y condiciones</Text>
          </Text>
        </View>

        {/* Botón de registro */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleRegister}
          disabled={loading}
        >
          <LinearGradient
            colors={['#00d4ff', '#0099cc']}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Registrando...' : 'Crear cuenta'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Separador */}
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>o</Text>
          <View style={styles.line} />
        </View>

        {/* Botones sociales
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialBtn}>
            <FontAwesome name="facebook" size={20} color="#3b5998" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <FontAwesome name="google" size={20} color="#db4437" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn}>
            <FontAwesome name="twitter" size={20} color="#1da1f2" />
          </TouchableOpacity>
        </View> */}

        {/* Pie de página */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Ya tienes cuenta?</Text>
          <Link href="/auth/login" asChild>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Inicia Sesión</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 40,
    width: 400,
    maxWidth: '90vw',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%',
    marginBottom: 16,
  },
  icon: {
    marginRight: 12,
  },
  eyeIcon: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    outlineStyle: 'none',
    outlineWidth: 0,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#9ca3af',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    width: 12,
    height: 12,
    backgroundColor: '#0099cc',
    borderRadius: 2,
  },
  termsText: {
    color: '#374151',
    fontSize: 14,
  },
  link: {
    color: '#0099cc',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 24,
  },
  button: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  orText: {
    marginHorizontal: 12,
    color: '#6b7280',
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 32,
  },
  socialBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
  },
  footerLink: {
    fontSize: 14,
    color: '#0099cc',
    fontWeight: '600',
    marginLeft: 4,
  },
});
