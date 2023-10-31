import * as React from 'react';
import { Platform, Dimensions, TextInput } from 'react-native';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { changeTheme } from '../kits/AppTheme';
import { loadFont } from '../props/FontLoader';
import * as KolynStyle from '../kits/KolynStyleKit';
import { CommonPart } from '../kits/CommonPart';
import { ThemeContext } from '../kits/AppTheme';


/*
  This page is solely for UI testing
  If you are not doing UI, please do not write on this page
*/

export function TestPage({navigation}) {
  const themedStyles = ThemedStyles();

  const [, forceRender] = React.useState(undefined);

  const handleClick = () => {
    forceRender((prev) => !prev);
  };

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
      component={<LoginButton onPress={()=>console.log()}/>}
    />
  );
}

/* The login button */
function LoginButton({ onPress }) {
  return (
    <Pressable style={themedStyles.loginButton} onPress={onPress}>
      <Text style={themedStyles.loginButtonLabel}>Log in</Text>
    </Pressable>
  );
}

function ThemedStyles() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return (StyleSheet.create({

    screen: StyleSheet.flatten([
      KolynStyle.kolynScreen(currentTheme.mainColor),
    ]),
  
    divider: StyleSheet.flatten([
      {top: -20},
      KolynStyle.kolynDivider(currentTheme.primaryColor)
    ]),
  
    loginButton: StyleSheet.flatten([
      {top: 400, width: 240}, 
      KolynStyle.kolynButton(currentTheme.primaryColor),
    ]),
  
    loginButtonLabel: StyleSheet.flatten([
      KolynStyle.kolynLabel(currentTheme.fontSizes.casual, currentTheme.mainFont, currentTheme.mainColor)
    ]),
  }));
}
