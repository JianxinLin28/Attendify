import * as React from 'react';
import { Platform } from 'react-native';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { currentTheme } from '../kits/AppTheme';
import { loadFont } from '../props/FontLoader';
import * as KolynStyle from '../kits/KolynStyleKit';
import {KolynMainTitleImage} from '../kits/KolynComponentKit';

/*
  The sign up alert page displays label to the user
    1. If the sign up were successful, it displays 'sign up successful'
    2. If not, it displays any info relevant to the error

  The sign up alert page can transit to sign up page (SignupPage.js) / login page (LoginPage.js)
    1. It transits to the sign up page if: any error occurred
    2. It transits to the login page if: everything go successful

  Only the sign up page shoule transit to this page
  In addition, all sign up info the user entered must be valid before going to this page

  This page should not handle any logic related to back-end
*/

const ios = Platform.OS == 'ios';

export function SignupAlertPage({navigation}, props) {
  /* The 'alert' message used to show sing up success or failure*/

  const route = useRoute();
  const fromSignupPage = route.params?.fromSignupPage;
  
  const determineMessage = () => {
    if (fromSignupPage.isErrorSignal) {
      return "A server error has occurred, please retry later.";
    }
    else {
      return "Account registration successful! Now you can log in with this account.";
    }
  };

  const { onPress = 'Save' } = props;

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
    <View
      behavior={ios ? 'padding' : 'height'}
      style={styles.screen}
      onLayout={onLayoutRootView}>
      <SafeAreaView 
          className={ios ? '-mb-8': ''}
          style={{flex: 1}}>
          <View style={{flex: 1}}/>
          <View style={{flex: 6}}>

            <KolynMainTitleImage/>

            <AlertrMessager
              messageText={determineMessage()}
            />

            <View style={{flex:1}}>

              <ConfirmButton
                onPress={ () => PressConfirmButton({
                  navigation: navigation,
                  fromSignupPage: fromSignupPage
                })}
              />

            </View>

          </View>
      </SafeAreaView>
    </View>
  );
}

/* Internal logic code start */

/* 
  Called when the confirm button is pressed 
    1. transit to the log in page if everything go well
    2. otherwise to the sign up page (preserve entered info)
*/
function PressConfirmButton({ navigation, fromSignupPage }) {
  if (fromSignupPage.isErrorSignal) { // to sign up page
    navigation.goBack();
  }
  else { // to log in page
    navigation.replace('Login');
  }
}

/* Internal logic code end */

/*************************************************************************************************/

/* User interface code start */

/* The alert message label */
function AlertrMessager({ messageText }) {
  return (
  <TextInput
    editable={false}
    style={[styles.alertLabel, {flex: 1, flexWrap: 'wrap'}]}
    value={messageText}
  />
  );
}

/* The confirm button */
function ConfirmButton({ onPress }) {
  return (
    <Pressable style={[
      styles.confirmButton]}
      onPress={onPress}>
      <Text style={styles.confirmButtonLabel}>Confirm</Text>
    </Pressable>
  );
}

/* User interface code end */

const styles = StyleSheet.create({
  screen: StyleSheet.flatten([
    KolynStyle.kolynScreen(currentTheme.mainColor),
  ]),

  confirmButton: StyleSheet.flatten([
    {width: 240},
    KolynStyle.kolynButton(currentTheme.primaryColor),
  ]),

  confirmButtonLabel: StyleSheet.flatten([
    KolynStyle.kolynLabel(currentTheme.fontSizes.casual, currentTheme.mainFont, currentTheme.mainColor,),
  ]),

  alertLabel: StyleSheet.flatten([
    {textAlign: 'center'},
    KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.primaryColor),
  ]),
});
