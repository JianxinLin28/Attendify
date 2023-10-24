import * as React from 'react';
import { Platform, Dimensions, TextInput } from 'react-native';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { currentTheme, changeTheme } from '../kits/AppTheme';
import { loadFont } from '../props/FontLoader';
import * as KolynStyle from '../kits/KolynStyleKit';
import { CommonPart } from '../kits/CommonPart';


export function CoursePage(props) {

  return (
    <CommonPart title={"Manage Course"}></CommonPart>
  );
}

/* Internal logic code start */
/* Internal logic code end */

/*************************************************************************************************/

/* Connect to backend logic code start */
/* Connect to backend logic code end */

/*************************************************************************************************/

/* User interface code start */
/* User interface code end */
