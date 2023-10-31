import * as React from 'react';
import { Platform, Dimensions, TextInput } from 'react-native';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { loadFont } from '../props/FontLoader';
import * as KolynStyle from '../kits/KolynStyleKit';
import { KolynSwitchCourseButton } from '../kits/KolynComponentKit';
import { CommonPart } from '../kits/CommonPart';


export function BluetoothPage(props) {

  return (
    <CommonPart 
      title={"Bluetooth Scan"}
      components={
        <View style={{flex: 6}}>

          <KolynSwitchCourseButton/>

          {/* Add new stuff here */}

        </View>
      }
    />
  )
}

/* Internal logic code start */
/* Internal logic code end */

/*************************************************************************************************/

/* Connect to backend logic code start */
/* Connect to backend logic code end */

/*************************************************************************************************/

/* User interface code start */
/* User interface code end */
