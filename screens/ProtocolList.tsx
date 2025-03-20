import React, { useEffect, useState } from 'react';
import { 
  FlatList, 
  Pressable, 
  StyleSheet, 
  Text, 
  View, 
  Button 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProtocolListScreenProps, Protocol } from './types';

const ProtocolList = ({ navigation, route }: ProtocolListScreenProps) => {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const stored = await AsyncStorage.getItem('protocols');
        if (stored) setProtocols(JSON.parse(stored));
      } catch (error) {
        console.error('Помилка завантаження:', error);
      }
    };
    
    loadData();
  }, [route.params?.refresh]);

  const renderItem = ({ item }: { item: Protocol }) => (
    <Pressable
      style={styles.item}
      onPress={() => navigation.navigate('ProtocolDetails', { protocol: item })}
      android_ripple={{ color: '#f0f0f0' }}
    >
      <Text style={styles.itemTitle}>Протокол #{item.id}</Text>
      <Text style={styles.itemText}>Дата: {new Date(item.date).toLocaleDateString()}</Text>
      <Text style={styles.itemText}>Водій А: {item.driverA.firstName} {item.driverA.lastName}</Text>
      <Text style={styles.itemText}>Водій Б: {item.driverB.firstName} {item.driverB.lastName}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={protocols}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Немає створених протоколів</Text>
        }
      />
      
      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <Button
            title="Новий протокол"
            onPress={() => navigation.navigate('DriverAForm')}
            color="#2196F3"
          />
        </View>
        <View style={styles.footerButton}>
          <Button
            title="На головну"
            onPress={() => navigation.navigate('Home')}
            color="#4CAF50"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  list: {
    padding: 15,
    paddingBottom: 80,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2c3e50',
  },
  itemText: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 4,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#6c757d',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
  },
  footerButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default ProtocolList;