import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BluetoothPageDefault } from './Default';
import { SwitchCoursePage } from './SwitchCourse';

const Stack = createNativeStackNavigator();
export function BluetoothPage() {
  return (
    <Stack.Navigator
      initialRouteName="BluetoothPageDefault"
      screenOptions={{headerShown: false, gestureEnabled: false}}
    >
      <Stack.Screen name="BluetoothPageDefault" component={BluetoothPageDefault}/>
      <Stack.Screen name="SwitchCourse" component={SwitchCoursePage}/>
    </Stack.Navigator>
  )
}
