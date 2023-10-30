import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfilePageDefault } from './Default';
import { ProfilePageCheckinHistory } from './CheckinHistory';
import { ProfilePageInfo } from './Info';
import { ProfilePageSelectCourse } from './SelectCourse';
import { ProfilePageTheme } from './Theme';


const Stack = createNativeStackNavigator();
export function ProfilePage() {
  return (
    <Stack.Navigator
      initialRouteName="ProfilePageDefault"
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="ProfilePageDefault" component={ProfilePageDefault}/>
      <Stack.Screen name="ProfilePageCheckinHistory" component={ProfilePageCheckinHistory}/>
      <Stack.Screen name="ProfilePageInfo" component={ProfilePageInfo}/>
      <Stack.Screen name="ProfilePageSelectCourse" component={ProfilePageSelectCourse}/>
      <Stack.Screen name="ProfilePageTheme" component={ProfilePageTheme}/>
    </Stack.Navigator>
  );
}
