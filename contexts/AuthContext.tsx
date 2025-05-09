import React, { createContext, useContext, useEffect, useReducer } from 'react';
import * as authService from '../services/auth';
import { AuthState, User } from '../types';

// Define the shape of the context
interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  isSignout: false,
  userToken: null,
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

// Define actions for reducer
type AuthAction =
  | { type: 'RESTORE_TOKEN'; token: string | null; user: User | null }
  | { type: 'SIGN_IN'; token: string; user: User }
  | { type: 'SIGN_OUT' };

// Reducer function to handle state updates
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        user: action.user,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
        user: action.user,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        userToken: null,
        user: null,
      };
    default:
      return state;
  }
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
    user: null,
  });

  // Effect to check for stored token on app load
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await authService.getStoredToken();
        const user = await authService.getStoredUser();
        dispatch({ type: 'RESTORE_TOKEN', token, user });
      } catch (e) {
        console.error('Failed to load user token', e);
        dispatch({ type: 'RESTORE_TOKEN', token: null, user: null });
      }
    };

    bootstrapAsync();
  }, []);

  // Auth functions to expose
  const authContext = {
    ...state,
    signIn: async (email: string, password: string) => {
      try {
        const { token, user } = await authService.signIn(email, password);
        dispatch({ type: 'SIGN_IN', token, user });
      } catch (error) {
        throw error;
      }
    },
    signUp: async (name: string, email: string, password: string) => {
      try {
        await authService.signUp(name, email, password);
        // Note: We don't automatically sign in after registration
      } catch (error) {
        throw error;
      }
    },
    signOut: async () => {
      try {
        await authService.signOut();
        dispatch({ type: 'SIGN_OUT' });
      } catch (error) {
        console.error('Error signing out', error);
        throw error;
      }
    },
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

// Hook for easier context use
export const useAuth = () => useContext(AuthContext); 