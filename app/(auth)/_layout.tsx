import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function AuthLayout() {
  return (
    <View style={styles.container}>
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: '#0032a0',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="login" options={{ title: 'Iniciar Sesión' }} />
        <Stack.Screen name="register" options={{ title: 'Registrarse' }} />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0032a0',
  },
}); 