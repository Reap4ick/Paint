import React, { useRef, useState, useEffect } from 'react';
import { 
  Alert, 
  StyleSheet, 
  View,
  TouchableOpacity,
  PanResponder,
  Text,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Canvas from 'react-native-canvas';
import { DamageDetailsScreenProps, Protocol } from './types';

type DrawingTool = 'pen' | 'eraser';

const DamageDetails = ({ navigation, route }: DamageDetailsScreenProps) => {
  const canvasRef = useRef<Canvas | null>(null);
  const [currentTool, setCurrentTool] = useState<DrawingTool>('pen');
  const isDrawing = useRef(false);
  const lastPoint = useRef({ x: 0, y: 0 });

  useEffect(() => {
    requestAnimationFrame(() => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        canvasRef.current.width = 300;
        canvasRef.current.height = 300;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 300, 300);
      }
    });
  }, []);
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (e) => {
      isDrawing.current = true;
      const { locationX, locationY } = e.nativeEvent;
      lastPoint.current = { x: locationX, y: locationY };
    },
    onPanResponderMove: (e) => {
      if (!isDrawing.current || !canvasRef.current) return;
      
      const { locationX, locationY } = e.nativeEvent;
      const ctx = canvasRef.current.getContext('2d');
      
      ctx.beginPath();
      ctx.strokeStyle = currentTool === 'pen' ? '#000000' : '#FFFFFF';
      ctx.lineWidth = currentTool === 'pen' ? 5 : 30;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(locationX, locationY);
      ctx.stroke();
      
      lastPoint.current = { x: locationX, y: locationY };
    },
    onPanResponderRelease: () => {
      isDrawing.current = false;
    },
  });

  // Інші функції залишаються незмінними
  const saveProtocol = async () => {
    try {
      if (!canvasRef.current) {
        Alert.alert('Помилка', 'Спочатку створіть ескіз');
        return;
      }

      const sketch = await canvasRef.current.toDataURL('image/png');
      const androidCompatibleSketch = Platform.OS === 'android' 
        ? `data:image/png;base64,${sketch.split(',')[1]}`
        : sketch;

      const newProtocol: Protocol = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        driverA: route.params.driverA,
        driverB: route.params.driverB,
        damage: {
          side: '',
          part: '',
          description: '',
          sketch: androidCompatibleSketch
        }
      };

      const protocols = JSON.parse(await AsyncStorage.getItem('protocols') || '[]');
      await AsyncStorage.setItem('protocols', JSON.stringify([...protocols, newProtocol]));
      
      navigation.navigate('ProtocolList', { refresh: Date.now() });

    } catch (error) {
      console.error('Помилка збереження:', error);
      Alert.alert('Помилка', 'Не вдалося зберегти протокол');
    }
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, 300, 300);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 300, 300);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableOpacity
          style={[styles.toolButton, currentTool === 'pen' && styles.activeTool]}
          onPress={() => setCurrentTool('pen')}>
          <Text>✏️ Олівець</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.toolButton, currentTool === 'eraser' && styles.activeTool]}
          onPress={() => setCurrentTool('eraser')}>
          <Text>🧹 Гумка</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.toolButton} onPress={clearCanvas}>
          <Text>❌ Очистити</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.canvasWrapper} {...panResponder.panHandlers}>
        <Canvas
          ref={ref => { canvasRef.current = ref }}
          style={styles.canvas}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveProtocol}>
        <Text style={styles.buttonText}>💾 Зберегти протокол</Text>
      </TouchableOpacity>
    </View>
  );
};

// Стилі залишаються незмінними
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  toolButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 3,
    minWidth: 100,
    alignItems: 'center',
  },
  activeTool: {
    backgroundColor: '#e9ecef',
  },
  canvasWrapper: {
    borderWidth: 2,
    borderColor: '#dee2e6',
    borderRadius: 12,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  canvas: {
    width: 300,
    height: 300,
  },
  saveButton: {
    backgroundColor: '#4c6ef5',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DamageDetails;