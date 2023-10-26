import * as React from 'react';
import { Platform, Dimensions, TextInput } from 'react-native';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { currentTheme, changeTheme } from '../kits/AppTheme';
import { loadFont } from '../props/FontLoader';
import * as KolynStyle from '../kits/KolynStyleKit';
import { KolynSwitchCourseButton } from '../kits/KolynComponentKit';
import { CommonPart } from '../kits/CommonPart';


export function BluetoothPage({navigation}, props) {


  const fontsLoaded = loadFont();
  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <CommonPart 
      title={"Bluetooth Scan"}
      navigation={navigation}
      components={
        <View style={{flex: 6}}>

          <KolynSwitchCourseButton
            foregroundColor={currentTheme.mainColor}
            backgroundColor={currentTheme.primaryColor}
          />

          {/* Add new stuff here */}

        </View>
      }
    />
  )
}
