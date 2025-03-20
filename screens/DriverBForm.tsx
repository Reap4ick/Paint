import React, { useState } from 'react';
import { 
  Alert, 
  Button, 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  Platform,
  Pressable 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DriverBFormScreenProps } from './types';

const DriverBForm = ({ navigation, route }: DriverBFormScreenProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: new Date(),
    phone: '',
    carModel: '',
    carNumber: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setFormData({...formData, birthDate: selectedDate});
    }
  };

  const validateForm = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      Alert.alert('Помилка', "Заповніть обов'язкові поля");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigation.navigate('DamageDetails', {
        driverA: route.params.driverA,
        driverB: formData
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Дані водія Б</Text>

      <TextInput
        style={styles.input}
        placeholder="Ім'я *"
        value={formData.firstName}
        onChangeText={(text) => setFormData({...formData, firstName: text})}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Прізвище *"
        value={formData.lastName}
        onChangeText={(text) => setFormData({...formData, lastName: text})}
      />
      
      <Pressable
        style={styles.dateContainer}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>
          Дата народження: {formData.birthDate.toLocaleDateString('uk-UA')}
        </Text>
      </Pressable>
      
      {showDatePicker && (
        <DateTimePicker
          value={formData.birthDate}
          mode="date"
          display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
          onChange={handleDateChange}
        />
      )}
      
      <TextInput
        style={styles.input}
        placeholder="Телефон"
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={(text) => setFormData({...formData, phone: text})}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Модель авто"
        value={formData.carModel}
        onChangeText={(text) => setFormData({...formData, carModel: text})}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Номер авто"
        value={formData.carNumber}
        onChangeText={(text) => setFormData({...formData, carNumber: text})}
      />
      
      <View style={styles.button}>
        <Button
          title="Далі →"
          onPress={handleNext}
          color="#2196F3"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 25,
    color: '#2c3e50',
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  dateContainer: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 12,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  dateText: {
    fontSize: 16,
    color: '#495057',
  },
  button: {
    marginTop: 20,
  },
});

export default DriverBForm;