import React, { useState, useEffect, useRef } from 'react';
import { View, Button, StyleSheet, Dimensions, Text, Alert, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { runOnJS } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [faces, setFaces] = useState([]);
  const [photos, setPhotos] = useState([]);
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const devices = useCameraDevices();
  const device = devices.front;

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
      if (status !== 'authorized') {
        Alert.alert('Permission Required', 'Camera permission is required to use this feature.');
      }
    })();
  }, []);

  const handleFacesDetected = (face) => {
    runOnJS(setFaces)(face.faces);
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto({
        qualityPrioritization: 'quality',
        skipMetadata: true,
      });
      setPhotos([...photos, photo]);
      navigation.navigate('Feed', { photos: [...photos, photo] });
    }
  };

  if (!device) return <View style={{ flex: 1, backgroundColor: 'black' }} />;

  return (
    <View style={{ flex: 1 }}>
      {hasPermission ? (
        <Camera
          ref={cameraRef}
          style={{ flex: 1 }}
          device={device}
          isActive={true}
          photo={true}
          onFrameProcessor={handleFacesDetected}
          frameProcessorFps={5}
        />
      ) : (
        <Text>No access to camera</Text>
      )}
      {faces.map((face, index) => (
        <View
          key={index}
          style={[
            styles.face,
            {
              left: face.bounds.origin.x,
              top: face.bounds.origin.y,
              width: face.bounds.size.width,
              height: face.bounds.size.height,
            },
          ]}
        />
      ))}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCapture}>
          <Text style={styles.buttonText}>Capture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Feed', { photos })}>
          <Text style={styles.buttonText}>Feed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  face: {
    borderWidth: 2,
    borderColor: 'red',
    position: 'absolute',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'black',
  },
  button: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CameraScreen;
