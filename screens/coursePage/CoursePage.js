import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CoursePageDefault } from './Default';
import { CoursePageAddCourse } from './AddCourse';
import { CoursePageAddFail } from './AddFail';
import { CoursePageAddSuccess } from './AddSuccess';
import { CoursePageExcuse } from './Excuse';
import { CoursePageInspect } from './Inspect';
import { CoursePageQuitCourse } from './QuitCourse';


const Stack = createNativeStackNavigator();
export function CoursePage() {
  return (
      <Stack.Navigator
        initialRouteName="CoursePageDefault"
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="CoursePageDefault" component={CoursePageDefault}/>
        <Stack.Screen name="CoursePageAddCourse" component={CoursePageAddCourse}/>
        <Stack.Screen name="CoursePageAddFail" component={CoursePageAddFail}/>
        <Stack.Screen name="CoursePageAddSuccess" component={CoursePageAddSuccess}/>
        <Stack.Screen name="CoursePageExcuse" component={CoursePageExcuse}/>
        <Stack.Screen name="CoursePageInspect" component={CoursePageInspect}/>
        <Stack.Screen name="CoursePageQuitCourse" component={CoursePageQuitCourse}/>
      </Stack.Navigator>
  );
}
