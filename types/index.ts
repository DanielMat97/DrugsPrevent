// User and Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
  user: User | null;
}

// Alert Types
export interface Alert {
  id: string;
  title: string;
  description: string;
  date: string;
  level: 'low' | 'medium' | 'high';
}

// Substance Recognition Types
export interface RecognitionResult {
  substanceName: string;
  effects: string;
  riskLevel: string;
  recommendations: string;
}

// Contact Types
export interface Contact {
  id: string;
  name: string;
  description: string;
  phone: string;
  email: string;
} 