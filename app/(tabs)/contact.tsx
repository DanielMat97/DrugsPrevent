import { mockContacts } from '@/mocks/mocks';
import { Contact } from '@/types';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Linking, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Card, Divider, Text } from 'react-native-paper';

export default function ContactScreen() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch with delay
    const fetchContacts = async () => {
      try {
        setLoading(true);
        // Wait for 1 second to simulate network request
        await new Promise(resolve => setTimeout(resolve, 1000));
        setContacts(mockContacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        Alert.alert('Error', 'No se pudieron cargar los contactos');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`)
      .catch(err => {
        console.error('Error opening phone dialer:', err);
        Alert.alert('Error', 'No se pudo abrir el marcador telefónico');
      });
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`)
      .catch(err => {
        console.error('Error opening email client:', err);
        Alert.alert('Error', 'No se pudo abrir el cliente de correo');
      });
  };

  const renderContactItem = ({ item }: { item: Contact }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactDescription}>{item.description}</Text>
        
        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>Teléfono:</Text>
          <Text style={styles.contactValue}>{item.phone}</Text>
        </View>
        
        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>Email:</Text>
          <Text style={styles.contactValue}>{item.email}</Text>
        </View>
      </Card.Content>
      <Divider />
      <Card.Actions style={styles.actionButtons}>
        <Button
          mode="contained"
          icon="phone"
          onPress={() => handleCall(item.phone)}
          style={[styles.actionButton, styles.callButton]}
        >
          Llamar
        </Button>
        <Button
          mode="outlined"
          icon="email"
          onPress={() => handleEmail(item.email)}
          style={styles.actionButton}
        >
          Email
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contactos de Emergencia</Text>
        <Text style={styles.subtitle}>
          Encuentra ayuda inmediata para casos de consumo de sustancias
        </Text>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0032a0" />
          <Text style={styles.loadingText}>Cargando contactos...</Text>
        </View>
      ) : (
        <FlatList
          data={contacts}
          renderItem={renderContactItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay contactos disponibles</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#0032a0',
    padding: 20,
    paddingTop: 15,
    paddingBottom: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contactDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  contactInfo: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  contactLabel: {
    fontWeight: 'bold',
    width: 70,
  },
  contactValue: {
    flex: 1,
  },
  actionButtons: {
    justifyContent: 'space-between',
    padding: 8,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  callButton: {
    backgroundColor: '#0032a0',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#666',
  },
}); 