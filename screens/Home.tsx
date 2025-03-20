import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { HomeScreenProps } from './types';

const Home = ({ navigation }: HomeScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Європротокол ДТП</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Новий протокол"
          onPress={() => navigation.navigate('DriverAForm')}
          color="#2196F3"
        />
        <Button
          title="Мої протоколи"
          onPress={() => navigation.navigate('ProtocolList')}
          color="#4CAF50"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2c3e50',
  },
  buttonContainer: {
    gap: 15,
    marginHorizontal: 20,
  },
});

export default Home;