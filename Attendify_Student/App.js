import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginPage } from './screens/LoginPage';
import { SignupPage } from './screens/SignupPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeActivity"
        screenOptions={{headerShown: false}}
        >
          <Stack.Screen name="Login" component={SignupPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
