import * as React from 'react';
import { Platform, Dimensions, TextInput } from 'react-native';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { currentTheme, changeTheme } from '../kits/AppTheme';
import { loadFont } from '../props/FontLoader';
import * as KolynStyle from '../kits/KolynStyleKit';
import { CommonPart } from '../kits/CommonPart';


/*
  This page is solely for UI testing
  If you are not doing UI, please do not write on this page
*/

export function TestPage({navigation}) {
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
    <Pressable style={styles.loginButton} onPress={onPress}>
      <Text style={styles.loginButtonLabel}>Log in</Text>
    </Pressable>
  );
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({

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
});
