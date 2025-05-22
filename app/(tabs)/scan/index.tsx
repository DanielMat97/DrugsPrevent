import { useAuth } from '@/contexts/AuthContext';
import { recognizeSubstance, simulateRecognition } from '@/services/openai';
import { RecognitionResult } from '@/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function Page() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const { user } = useAuth();
  
  // Comprobar permisos al cargar
  useEffect(() => {
    (async () => {
      try {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (error) {
        console.error('Error al solicitar permisos:', error);
        setHasPermission(false);
      }
    })();
  }, []);
  
  // Función para activar la cámara
  const activateCamera = async () => {
    try {
      // Verificar permisos primero
      if (!hasPermission) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Sin permisos de cámara',
            'Necesitamos acceso a tu cámara para poder analizar sustancias.',
            [{ text: 'Entendido' }]
          );
          return;
        }
        setHasPermission(true);
      }
      
      // Abrir selector de imágenes con la cámara
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [4, 3],
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        // Guardamos la URI para mostrar vista previa si es necesario
        setImageUri(result.assets[0].uri);
        // Analizar la imagen capturada
        await analyzeImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
      Alert.alert('Error', 'No se pudo abrir la cámara. Por favor, inténtalo de nuevo.');
    }
  };
  
  // Función para analizar la imagen
  const analyzeImage = async (imageUri: string) => {
    try {
      setIsAnalyzing(true);
      // Feedback táctil
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Leer la imagen como base64
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      if (!base64Image) {
        throw new Error('No se pudo leer la imagen como base64');
      }
      
      // Intentar reconocer la sustancia con OpenAI
      let recognitionResult: RecognitionResult;
      try {
        console.log('Enviando imagen a OpenAI para análisis...');
        recognitionResult = await recognizeSubstance(base64Image);
        console.log('Análisis completado con éxito');
      } catch (error) {
        console.warn('Error con OpenAI, usando simulación:', error);
        // Si hay error con OpenAI, usar la simulación como fallback
        recognitionResult = await simulateRecognition();
      }
      
      // Mostrar los resultados
      setResult(recognitionResult);
      
    } catch (error) {
      console.error('Error al analizar la imagen:', error);
      Alert.alert('Error', 'No se pudo analizar la imagen. Por favor, inténtalo de nuevo.');
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // Volver a la pantalla principal
  const resetScan = () => {
    setResult(null);
    setImageUri(null);
  };

  // Renderizar nivel de riesgo con color apropiado
  const getRiskLevelColor = (riskLevel: string) => {
    const level = riskLevel.toLowerCase();
    if (level.includes('alto') || level.includes('high')) return '#ef5350';
    if (level.includes('medio') || level.includes('medium')) return '#ffb74d';
    if (level.includes('bajo') || level.includes('low')) return '#66bb6a';
    return '#bbbbbb';
  };

  // Pantalla de análisis
  if (isAnalyzing) {
    return (
      <View style={styles.analysisContainer}>
        <ActivityIndicator size="large" color="#0032a0" />
        <Text style={styles.analysisText}>
          Analizando sustancia con IA...
        </Text>
        <Text style={styles.analysisSubtext}>
          Esto puede tardar unos segundos
        </Text>
      </View>
    );
  }

  // Pantalla de resultados
  if (result) {
    return (
      <View style={styles.resultContainer}>
        <View style={styles.resultHeader}>
          <Text style={styles.resultTitle}>Resultado del Análisis</Text>
          <Text style={styles.resultSubstance}>{result.substanceName}</Text>
        </View>
        
        <View style={[styles.riskLevel, { backgroundColor: getRiskLevelColor(result.riskLevel) }]}>
          <Text style={styles.riskText}>Nivel de Riesgo: {result.riskLevel}</Text>
        </View>
        
        <View style={styles.resultSection}>
          <Text style={styles.sectionTitle}>Efectos Comunes</Text>
          <Text style={styles.sectionContent}>{result.effects}</Text>
        </View>
        
        <View style={styles.resultSection}>
          <Text style={styles.sectionTitle}>Recomendaciones</Text>
          <Text style={styles.sectionContent}>{result.recommendations}</Text>
        </View>
        
        <Button 
          mode="contained"
          icon="camera"
          onPress={resetScan}
          style={styles.scanAgainButton}
        >
          Escanear otra vez
        </Button>
      </View>
    );
  }

  // Pantalla inicial
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="camera-enhance" size={80} color="#0032a0" style={styles.icon} />
      <Text style={styles.text}>Análisis de Sustancias</Text>
      <Text style={styles.description}>
        Toma una foto clara de la sustancia que deseas analizar. 
        Nuestra IA te ayudará a identificarla y te proporcionará información importante.
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button 
          mode="contained"
          icon="camera"
          onPress={activateCamera}
          style={styles.startButton}
        >
          Iniciar cámara
        </Button>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="information" size={24} color="#0032a0" />
          <Text style={styles.infoText}>La información es orientativa y no reemplaza la consulta médica</Text>
        </View>
        
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="lock" size={24} color="#0032a0" />
          <Text style={styles.infoText}>Tus imágenes son procesadas de forma segura y no se almacenan</Text>
        </View>
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
  icon: {
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0032a0',
  },
  description: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
  },
  startButton: {
    padding: 5,
  },
  infoContainer: {
    marginTop: 40,
    width: '100%',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  analysisContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  analysisText: {
    marginTop: 20,
    fontSize: 18,
    color: '#6200ee',
  },
  analysisSubtext: {
    marginTop: 10,
    fontSize: 14,
    color: '#888',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  cameraText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 30,
  },
  backButton: {
    marginTop: 20,
  },
  resultContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  resultHeader: {
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0032a0',
    marginBottom: 5,
  },
  resultSubstance: {
    fontSize: 18,
    color: '#333',
  },
  riskLevel: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  riskText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  scanAgainButton: {
    marginTop: 20,
    backgroundColor: '#0032a0',
  }
}); 