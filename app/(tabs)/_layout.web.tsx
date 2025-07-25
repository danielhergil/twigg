// app/(tabs)/_layout.web.tsx
import React from 'react';
import { Slot, useRouter, usePathname } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LayoutWeb() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { route: '/', label: 'Inicio' },
    { route: '/explore', label: 'Explorar' },
    { route: '/create', label: 'Crear' },
    { route: '/profile', label: 'Perfil' },
  ];

  return (
    <View style={styles.container}>
      {/* Top navigation bar */}
      <View style={styles.navbar}>
        {tabs.map(tab => {
          const isActive = pathname === tab.route;
          return (
            <TouchableOpacity
              key={tab.route}
              onPress={() => router.push(tab.route)}
              style={styles.navItem}
            >
              <Text style={[styles.navText, isActive && styles.navTextActive]}>
                {tab.label}
              </Text>
              {isActive && <View style={styles.underline} />}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Page content */}
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  navbar: {
    width: '100%',                 // ocupa todo el ancho
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    // boxShadow solo funciona en web
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  navItem: {
    marginHorizontal: 24,
    alignItems: 'center',
  },
  navText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
  },
  navTextActive: {
    color: '#6a11cb',
  },
  underline: {
    marginTop: 4,
    height: 3,
    width: '100%',
    backgroundColor: '#6a11cb',
    borderRadius: 1.5,
  },
  content: {
    flex: 1,
    width: '100%',                // quita el maxWidth para que sea responsive
    paddingHorizontal: 40,
    paddingTop: 24,
  },
});
