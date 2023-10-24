import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TestPage } from './screens/TestPage';
import { LoginPage } from './screens/LoginPage';
import { SignupPage } from './screens/SignupPage';
import { SignupAlertPage } from './screens/SingupAlertPage';
import { QRScanPage } from './screens/QRScanPage';
import { CoursePage } from './screens/CoursePage';
import { ClickerPage } from './screens/ClickerPage';
import { ProfilePage } from './screens/ProfilePage';
import { BluetoothPage } from './screens/BluetoothPage';
import { currentTheme } from './kits/AppTheme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}
      >
          <Stack.Screen name="Test" component={TestPage}/>
          <Stack.Screen name="Login" component={LoginPage}/>
          <Stack.Screen name="Signup" component={SignupPage}/>
          <Stack.Screen name="SignupAlert" component={SignupAlertPage}/>
          <Stack.Screen name="BottomTab" component={BottomTabNavigator}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

var navigatorTabIndex = 0;
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={() =>({
        showLabel: false,
        headerShown: false,
        tabBarActiveTintColor: currentTheme.mainColor,
        tabBarInactiveTintColor: currentTheme.mainColor,
        tabBarStyle: [
          {
            borderTopWidth: 0,
            backgroundColor: currentTheme.mainColor,
            paddingHorizontal: 10,
            height: 100
          }
        ],
      })}
    >
      <Tab.Screen name="Bluetooth" options={{
        animation: 'none',
        tabBarIcon:() => (
          <View>
            <Image 
              source={require('./assets/bluetooth-scan-icon.png')}
              style={styles.smallPageIcon}>
            </Image>
            {navigatorTabIndex == 0 && <View style={styles.bottomUnderline}/>}
          </View>
        )
      }} 
      component={BluetoothPage}
      listeners={{
        tabPress: () => {
          navigatorTabIndex=0
        }
      }}/>

      <Tab.Screen name="QRScan" options={{
        animation: 'none',
        tabBarIcon:() => (
          <View>
            <Image 
              source={require('./assets/qr-scan-icon.png')}
              style={styles.smallPageIcon}>
            </Image>
            {navigatorTabIndex == 1 && <View style={styles.bottomUnderline}/>}
          </View>
        )
      }} 
      component={QRScanPage}
      listeners={{
        tabPress: () => {
          navigatorTabIndex=1
        }
      }}/>

      <Tab.Screen name="Course" options={{
        animation: 'none',
        tabBarIcon:() => (
          <View style={styles.bottomCircle}>
            <View>
              <Image
                source={require('./assets/add-icon.png')}
                style={styles.bigPageIcon}>
              </Image>
              {navigatorTabIndex == 2 && <View style={[styles.bottomUnderline, {top: 20}]}/>}
            </View>
          </View>
        )
      }} 
      component={CoursePage}
      listeners={{
        tabPress: () => {
          navigatorTabIndex=2
        }
      }}/>

      <Tab.Screen name="Clicker" options={{
        animation: 'none',
        tabBarIcon:() => (
          <View>
            <Image 
              source={require('./assets/clicker-icon.png')}
              style={styles.smallPageIcon}>
            </Image>
            {navigatorTabIndex == 3 && <View style={styles.bottomUnderline}/>}
          </View>
        )
      }} 
      component={ClickerPage}
      listeners={{
        tabPress: () => {
          navigatorTabIndex=3
        }
      }}/>

      <Tab.Screen name="Profile" options={{
        animation: 'none',
        tabBarIcon:() => (
          <View>
            <Image 
              source={require('./assets/profile-icon.png')}
              style={styles.smallPageIcon}>
            </Image>
            {navigatorTabIndex == 4 && <View style={styles.bottomUnderline}/>}
          </View>
        )
      }} 
      component={ProfilePage}
      listeners={{
        tabPress: () => {
          navigatorTabIndex=4
        }
      }}/>

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({

  bottomCircle: {
    top: -45,
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    backgroundColor: currentTheme.mainColor
  },

  bottomUnderline: {
    top: -25,
    width: 48,
    height: 5,
    borderRadius: 5,
    backgroundColor: currentTheme.primaryColor,
    alignSelf: 'center'
  },

  smallPageIcon: {
    resizeMode: 'contain',
    width: 56,
    height: 56,
    top: -30,
  },

  bigPageIcon: {
    top: 10,
    resizeMode: 'contain',
    width: 64,
    height: 64,
    alignSelf: 'center'
  },

});
