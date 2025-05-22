import { Redirect } from 'expo-router';
import React from 'react';

export default function RedirectToScan() {
  // Esta página redirige a la pestaña scan
  return <Redirect href="/(tabs)/scan" />;
} 