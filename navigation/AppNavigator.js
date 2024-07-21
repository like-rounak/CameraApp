import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from '../screens/CameraScreen';
import FeedScreen from '../screens/FeedScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Camera">
      <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Feed" component={FeedScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
