import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateMockToken, mockUser } from '../mocks/mocks';
import { User } from '../types';

// Storage keys
const TOKEN_KEY = '@PsyPrevenir:token';
const USER_KEY = '@PsyPrevenir:user';

/**
 * Simulates a sign-in process
 * @param email User email
 * @param password User password
 * @returns Promise with user data
 */
export const signIn = async (email: string, password: string): Promise<{ token: string; user: User }> => {
  // Simple validation
  if (!isValidEmail(email)) {
    return Promise.reject('Correo electrónico inválido');
  }
  
  if (password.length < 6) {
    return Promise.reject('La contraseña debe tener al menos 6 caracteres');
  }

  // Simulate API call delay
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const token = generateMockToken();
        const user = { ...mockUser, email }; // Use the provided email with mock data
        
        // Store token and user data
        await AsyncStorage.setItem(TOKEN_KEY, token);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
        
        resolve({ token, user });
      } catch (error) {
        reject('Error durante el inicio de sesión');
      }
    }, 1000); // Simulate 1 second delay
  });
};

/**
 * Simulates a sign-up process
 * @param name User name
 * @param email User email
 * @param password User password
 * @returns Promise with success message
 */
export const signUp = async (name: string, email: string, password: string): Promise<string> => {
  // Simple validation
  if (name.trim().length < 3) {
    return Promise.reject('El nombre debe tener al menos 3 caracteres');
  }
  
  if (!isValidEmail(email)) {
    return Promise.reject('Correo electrónico inválido');
  }
  
  if (password.length < 6) {
    return Promise.reject('La contraseña debe tener al menos 6 caracteres');
  }

  // Simulate API call delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // In a real app, we would store the user in a database
        resolve('Usuario registrado exitosamente');
      } catch (error) {
        reject('Error durante el registro');
      }
    }, 1500); // Simulate 1.5 second delay
  });
};

/**
 * Simulates a sign-out process
 * @returns Promise with success message
 */
export const signOut = async (): Promise<string> => {
  // Simulate API call delay
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        // Remove stored token and user data
        await AsyncStorage.removeItem(TOKEN_KEY);
        await AsyncStorage.removeItem(USER_KEY);
        
        resolve('Sesión cerrada exitosamente');
      } catch (error) {
        reject('Error durante el cierre de sesión');
      }
    }, 800); // Simulate 0.8 second delay
  });
};

/**
 * Checks if there's a stored token
 * @returns Promise with token or null
 */
export const getStoredToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error retrieving token', error);
    return null;
  }
};

/**
 * Gets the stored user data
 * @returns Promise with user data or null
 */
export const getStoredUser = async (): Promise<User | null> => {
  try {
    const userJson = await AsyncStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Error retrieving user data', error);
    return null;
  }
};

/**
 * Validates email format
 * @param email Email to validate
 * @returns boolean indicating if email is valid
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}; 