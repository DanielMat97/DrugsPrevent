import axios from 'axios';
import Constants from 'expo-constants';
import { RecognitionResult } from '../types';

// Get OpenAI API key from expo constants
const OPENAI_API_KEY = Constants.expoConfig?.extra?.openaiApiKey || '';

/**
 * Sends an image to OpenAI for substance recognition
 * @param base64Image Base64-encoded image
 * @returns Promise with recognition result
 */
export const recognizeSubstance = async (base64Image: string): Promise<RecognitionResult> => {
  if (!OPENAI_API_KEY) {
    throw new Error('API key de OpenAI no configurada');
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              { 
                type: 'text', 
                text: 'Toma esta foto de una sustancia. Devuélveme: 1. Nombre probable de la sustancia. 2. Efectos secundarios más comunes. 3. Nivel de riesgo. 4. Recomendaciones de acción inmediata. Proporciona solo estos detalles en formato JSON como {substanceName, effects, riskLevel, recommendations} sin explicaciones adicionales.' 
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`
                }
              }
            ]
          }
        ],
        max_tokens: 800,
        response_format: { type: 'json_object' }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    // Parse the response
    const content = response.data.choices[0]?.message?.content || '{}';
    const result = JSON.parse(content);
    
    return {
      substanceName: result.substanceName || 'Sustancia desconocida',
      effects: result.effects || 'No se pudieron determinar los efectos',
      riskLevel: result.riskLevel || 'No determinado',
      recommendations: result.recommendations || 'Consulte con un profesional médico'
    };
  } catch (error) {
    console.error('Error al procesar la imagen con OpenAI:', error);
    throw new Error('Error al analizar la sustancia. Por favor intenta de nuevo.');
  }
};

/**
 * Fallback function that simulates recognition when OpenAI API fails or is not configured
 * @returns Promise with a mock result
 */
export const simulateRecognition = async (): Promise<RecognitionResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        substanceName: 'Posible Cannabis (Simulado)',
        effects: 'Alteración de percepción, euforia, aumento del apetito, enrojecimiento de los ojos, boca seca.',
        riskLevel: 'Medio',
        recommendations: 'Mantener a la persona en un ambiente seguro, proporcionar agua, monitorear cambios en comportamiento, buscar ayuda médica si hay síntomas de ansiedad intensa o paranoia.'
      });
    }, 2000); // Simulate 2 second delay
  });
}; 