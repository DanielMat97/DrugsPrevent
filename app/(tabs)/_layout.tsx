import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  // Depuración de rutas
  useEffect(() => {
    console.log('Tabs layout mounted - scan tab should be visible');
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0032a0',
        headerStyle: {
          backgroundColor: '#0032a0',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: Platform.select({
          ios: {
            elevation: 0,
            shadowOpacity: 0,
            borderTopWidth: 0,
          },
          android: {
            elevation: 0,
            shadowOpacity: 0,
            borderTopWidth: 0,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Escanear',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="camera" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contactos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="phone" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null, // Oculta la pestaña pero deja el archivo accesible
        }}
      />
    </Tabs>
  );
}
