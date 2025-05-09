import { useAuth } from '@/contexts/AuthContext';
import { createAlert, fetchAlerts } from '@/services/alerts';
import { Alert as AlertType } from '@/types';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert as RNAlert, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Divider, FAB, Text } from 'react-native-paper';

export default function HomeScreen() {
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    setLoading(true);
    try {
      const alertData = await fetchAlerts();
      setAlerts(alertData);
    } catch (error) {
      console.error('Error loading alerts', error);
      RNAlert.alert('Error', 'No se pudieron cargar las alertas');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAlert = async () => {
    setCreating(true);
    try {
      // Create a random new alert
      const levels: AlertType['level'][] = ['low', 'medium', 'high'];
      const randomLevel = levels[Math.floor(Math.random() * levels.length)];
      
      const newAlert = await createAlert({
        title: 'Nueva alerta',
        description: `Posible observación de consumo de sustancias en: ${new Date().toLocaleTimeString()}`,
        level: randomLevel,
      });
      
      setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
      RNAlert.alert('Éxito', 'Alerta creada correctamente');
    } catch (error) {
      console.error('Error creating alert', error);
      RNAlert.alert('Error', 'No se pudo crear la alerta');
    } finally {
      setCreating(false);
    }
  };

  const getAlertColor = (level: AlertType['level']) => {
    switch (level) {
      case 'high':
        return '#ef5350';
      case 'medium':
        return '#ffb74d';
      case 'low':
        return '#66bb6a';
      default:
        return '#bbbbbb';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.welcomeCard}>
          <Card.Content>
            <Text style={styles.welcomeTitle}>Bienvenido, {user?.name || 'Usuario'}</Text>
            <Text style={styles.welcomeSubtitle}>
              PsyPrevenir te ayuda a identificar y prevenir el uso de sustancias psicoactivas
            </Text>
          </Card.Content>
        </Card>

        <View style={styles.alertsHeader}>
          <Text style={styles.alertsTitle}>Alertas Recientes</Text>
          <Button
            mode="contained"
            onPress={loadAlerts}
            disabled={loading}
            style={{ borderRadius: 20 }}
            labelStyle={{ fontSize: 12 }}
          >
            Actualizar
          </Button>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />
        ) : alerts.length === 0 ? (
          <Text style={styles.noAlertsText}>No hay alertas disponibles</Text>
        ) : (
          alerts.map((item) => (
            <Card key={item.id} style={styles.alertCard}>
              <View style={[styles.levelIndicator, { backgroundColor: getAlertColor(item.level) }]} />
              <Card.Content>
                <Text style={styles.alertTitle}>{item.title}</Text>
                <Text style={styles.alertDescription}>{item.description}</Text>
                <Text style={styles.alertDate}>{formatDate(item.date)}</Text>
              </Card.Content>
              <Divider />
              <Card.Actions>
                <Button>Ver detalles</Button>
                <Button>Compartir</Button>
              </Card.Actions>
            </Card>
          ))
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        label="Generar Alerta"
        onPress={handleCreateAlert}
        loading={creating}
        disabled={creating}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  welcomeCard: {
    marginBottom: 20,
    backgroundColor: '#6200ee',
    borderRadius: 10,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  alertsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  alertsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  alertCard: {
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  levelIndicator: {
    height: 8,
    width: '100%',
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  alertDescription: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
  alertDate: {
    marginTop: 8,
    fontSize: 12,
    color: '#888',
    alignSelf: 'flex-end',
  },
  loader: {
    marginTop: 40,
  },
  noAlertsText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
    fontSize: 16,
  },
  bottomSpace: {
    height: 80,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee',
  },
});
