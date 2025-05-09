import { mockAlerts } from '../mocks/mocks';
import { Alert } from '../types';

/**
 * Simulates fetching alerts from an API
 * @returns Promise with alerts data
 */
export const fetchAlerts = async (): Promise<Alert[]> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAlerts);
    }, 1200); // Simulate 1.2 second delay
  });
};

/**
 * Simulates creating a new alert
 * @param alertData Alert data (without ID and date)
 * @returns Promise with the created alert
 */
export const createAlert = async (
  alertData: Omit<Alert, 'id' | 'date'>
): Promise<Alert> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create a new alert with generated ID and current date
      const newAlert: Alert = {
        id: Math.random().toString(36).substring(2, 11),
        date: new Date().toISOString(),
        ...alertData,
      };
      resolve(newAlert);
    }, 1500); // Simulate 1.5 second delay
  });
}; 