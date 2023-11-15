import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginPage } from './screens/LoginPage';
import { SignupPage } from './screens/SignupPage';
import { SignupAlertPage } from './screens/SingupAlertPage';
import { ThemeProvider, ThemeContext } from './kits/AppTheme';
import { setNavigatorTabIndex, getNavigatorTabIndex } from './props/NavigatorTabIndexController';

import { CoursePage } from './screens/coursePage/CoursePage';
import { ClickerPage } from './screens/clickerPage/ClickerPage';
import { ProfilePage } from './screens/profilePage/ProfilePage';
import { BluetoothPage } from './screens/blutoothPage/BluetoothPage';
import { QRScanPage } from './screens/qrPage/QRScanPage';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const images = [
  require('./assets/bluetooth-scan-icon.png'),
  require('./assets/qr-scan-icon.png'),
  require('./assets/add-icon.png'),
  require('./assets/clicker-icon.png'),
  require('./assets/profile-icon.png')
];

export default function App() {
  state = {
    isReady: false,
  };

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false, gestureEnabled: false}}
        >
            <Stack.Screen name="Login" component={LoginPage}/>
            <Stack.Screen name="Signup" component={SignupPage}/>
            <Stack.Screen name="SignupAlert" component={SignupAlertPage}/>
            <Stack.Screen name="BottomTab" component={BottomTabNavigator}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

function BottomTabNavigator() {
  const themedStyles = ThemedStyles();
  const mainColor = GetMainColor();

  
  return (
    <Tab.Navigator
      screenOptions={() =>({
        showLabel: false,
        headerShown: false,
        tabBarActiveTintColor: mainColor,
        tabBarInactiveTintColor: mainColor,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: mainColor,
          paddingHorizontal: 10,
          height: 100
        },
        gestureEnabled: false
      })}
    >
      <Tab.Screen name="Bluetooth" options={{
        animation: 'none',
        tabBarIcon:() => (
          <View>
            <Image 
              source={images[0]}
              style={themedStyles.smallPageIcon}>
            </Image>
            {getNavigatorTabIndex() == 0 && <View style={themedStyles.bottomUnderline}/>}
          </View>
        )
      }} 
      component={BluetoothPage}
      listeners={{
        tabPress: () => {
          setNavigatorTabIndex(0);
        }
      }}/>

      <Tab.Screen name="QRScan" options={{
        animation: 'none',
        tabBarIcon:() => (
          <View>
            <Image 
              source={images[1]}
              style={themedStyles.smallPageIcon}>
            </Image>
            {getNavigatorTabIndex() == 1 && <View style={themedStyles.bottomUnderline}/>}
          </View>
        )
      }} 
      component={QRScanPage}
      listeners={{
        tabPress: () => {
          setNavigatorTabIndex(1);
        }
      }}/>

      <Tab.Screen name="Course" options={{
        animation: 'none',
        tabBarIcon:() => (
          <View style={themedStyles.bottomCircle}>
            <View>
              <Image
                source={images[2]}
                style={themedStyles.bigPageIcon}>
              </Image>
              {getNavigatorTabIndex() == 2 && <View style={[themedStyles.bottomUnderline, {top: 20}]}/>}
            </View>
          </View>
        )
      }} 
      component={CoursePage}
      listeners={{
        tabPress: () => {
          setNavigatorTabIndex(2);
        }
      }}/>

      <Tab.Screen name="Clicker" options={{
        animation: 'none',
        tabBarIcon:() => (
          <View>
            <Image 
              source={images[3]}
              style={themedStyles.smallPageIcon}>
            </Image>
            {getNavigatorTabIndex() == 3 && <View style={themedStyles.bottomUnderline}/>}
          </View>
        )
      }} 
      component={ClickerPage}
      listeners={{
        tabPress: () => {
          setNavigatorTabIndex(3);
        }
      }}/>

      <Tab.Screen name="Profile" options={{
        animation: 'none',
        tabBarIcon:() => (
          <View>
            <Image 
              source={images[4]}
              style={themedStyles.smallPageIcon}>
            </Image>
            {getNavigatorTabIndex() == 4 && <View style={themedStyles.bottomUnderline}/>}
          </View>
        )
      }} 
      component={ProfilePage}
      listeners={{
        tabPress: () => {
          setNavigatorTabIndex(4);
        }
      }}/>

    </Tab.Navigator>
  );
}

function GetMainColor() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;
  return currentTheme.mainColor;
}

function ThemedStyles() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return (StyleSheet.create({

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
  
  }));
}
