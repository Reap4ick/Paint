import React, { useState, useRef, useEffect } from 'react';
import { View, Button, StyleSheet, Alert, Image } from 'react-native';
import { Canvas, Path, SkPath, Skia } from '@shopify/react-native-skia';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { captureRef } from 'react-native-view-shot';

const SketchScreen = () => {
  const [paths, setPaths] = useState<SkPath[]>([]);
  const [savedImage, setSavedImage] = useState<string | null>(null);
  const canvasRef = useRef<View>(null);

  useEffect(() => {
    loadSavedImage();
  }, []);

  const handleDraw = () => {
    const newPath = Skia.Path.Make();
    newPath.moveTo(50, 50);
    newPath.lineTo(200, 200);
    newPath.lineTo(50, 200);
    newPath.close();
    setPaths([...paths, newPath]);
  };

  const clearCanvas = () => {
    setPaths([]);
    setSavedImage(null);
    AsyncStorage.removeItem('sketchImage');
  };

  const saveImage = async () => {
    if (!canvasRef.current) return;
    
    try {
      const uri = await captureRef(canvasRef, { format: 'png', quality: 1 });
      await AsyncStorage.setItem('sketchImage', uri);
      setSavedImage(uri);
      Alert.alert('Збережено', 'Малюнок збережено успішно!');
    } catch (error) {
      console.error('Помилка збереження:', error);
    }
  };

  const loadSavedImage = async () => {
    try {
      const savedUri = await AsyncStorage.getItem('sketchImage');
      if (savedUri) {
        setSavedImage(savedUri);
      }
    } catch (error) {
      console.error('Помилка завантаження:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View ref={canvasRef} style={styles.canvasContainer}>
        <Canvas style={styles.canvas}>
          {paths.map((path, index) => (
            <Path key={index} path={path} color="black" strokeWidth={5} />
          ))}
        </Canvas>
      </View>

      <View style={styles.buttons}>
        <Button title="Намалювати" onPress={handleDraw} />
        <Button title="Очистити" onPress={clearCanvas} />
        <Button title="Зберегти" onPress={saveImage} />
      </View>

      {savedImage && (
        <View>
          <Image source={{ uri: savedImage }} style={styles.savedImage} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  canvasContainer: { width: 300, height: 300, backgroundColor: 'lightgray', marginBottom: 20 },
  canvas: { width: '100%', height: '100%' },
  buttons: { flexDirection: 'row', gap: 10 },
  savedImage: { width: 300, height: 300, marginTop: 20, borderWidth: 1, borderColor: 'black' },
});

export default SketchScreen;
