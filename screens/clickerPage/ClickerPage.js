import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClickerPageDefault } from "./Default";
import { ClickerPageHistoryDetail } from "./HistoryDetail";
import { ClickerPageQuestion } from "./Question";
import { ClickerPageResponseHistory } from "./ResponseHistory";
import { ClickerPageReveal } from "./Reveal";


const Stack = createNativeStackNavigator();
export function ClickerPage() {
  return (
    <Stack.Navigator
      initialRouteName="ClickerPageDefault"
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="ClickerPageDefault" component={ClickerPageDefault}/>
      <Stack.Screen name="ClickerPageHistoryDetail" component={ClickerPageHistoryDetail}/>
      <Stack.Screen name="ClickerPageQuestion" component={ClickerPageQuestion}/>
      <Stack.Screen name="ClickerPageResponseHistory" component={ClickerPageResponseHistory}/>
      <Stack.Screen name="ClickerPageReveal" component={ClickerPageReveal}/>
    </Stack.Navigator>
  );
}
