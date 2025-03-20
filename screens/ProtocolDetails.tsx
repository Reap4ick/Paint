import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { ProtocolDetailsScreenProps } from './types';

const ProtocolDetails = ({ route }: ProtocolDetailsScreenProps) => {
  const { protocol } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Протокол #{protocol.id}</Text>
      
      <Text style={styles.sectionTitle}>Водій А:</Text>
      <Text>Ім'я: {protocol.driverA.firstName} {protocol.driverA.lastName}</Text>
      <Text>Дата народження: {new Date(protocol.driverA.birthDate).toLocaleDateString()}</Text>
      <Text>Телефон: {protocol.driverA.phone}</Text>
      <Text>Авто: {protocol.driverA.carModel} {protocol.driverA.carNumber}</Text>

      <Text style={styles.sectionTitle}>Водій Б:</Text>
      <Text>Ім'я: {protocol.driverB.firstName} {protocol.driverB.lastName}</Text>
      <Text>Дата народження: {new Date(protocol.driverB.birthDate).toLocaleDateString()}</Text>
      <Text>Телефон: {protocol.driverB.phone}</Text>
      <Text>Авто: {protocol.driverB.carModel} {protocol.driverB.carNumber}</Text>

      {protocol.damage.sketch && (
        <>
          <Text style={styles.sectionTitle}>Ескіз:</Text>
          <Image 
            source={{ 
              uri: protocol.damage.sketch.startsWith('data:') 
                ? protocol.damage.sketch 
                : `data:image/png;base64,${protocol.damage.sketch}`
            }}
            style={styles.sketch}
            resizeMode="contain"
            onError={(e) => console.log('Помилка завантаження:', e.nativeEvent.error)}
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
  },
  sketch: {
    width: '100%',
    height: 300,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
});

export default ProtocolDetails;