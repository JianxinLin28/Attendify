import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QRScanPageDefault } from './Default';
import { SwitchCoursePage } from '../blutoothPage/SwitchCourse';

const Stack = createNativeStackNavigator();
export function QRScanPage() {
  return (
    <Stack.Navigator
      initialRouteName="QRScanPageDefault"
      screenOptions={{headerShown: false, gestureEnabled: false}}
    >
      <Stack.Screen name="QRScanPageDefault" component={QRScanPageDefault}/>
      <Stack.Screen name="SwitchCourse" component={SwitchCoursePage}/>
    </Stack.Navigator>
  )
}
