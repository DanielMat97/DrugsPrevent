import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

function ScanScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Escaneo</Text>
      <Text>Esta pantalla permitirá analizar sustancias con la cámara</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="Iniciar cámara" 
          onPress={() => alert('Función de cámara en desarrollo')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6200ee',
  },
  buttonContainer: {
    marginTop: 30,
    width: '100%',
  },
});

export default ScanScreen; 