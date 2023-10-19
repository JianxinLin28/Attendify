import * as React from 'react';
import {useState, useCallback} from 'react';
import { Platform } from 'react-native';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { SafeAreaView, Image, Dimensions } from 'react-native';
import Checkbox from 'expo-checkbox';
import * as SplashScreen from 'expo-splash-screen';
import { currentTheme, changeTheme } from '../style/AppTheme';
import { loadFont } from '../props/FontLoader';
import { kolynScreen, kolynInputfield, kolynButton, kolynLabel } from '../style/KolynKit';

changeTheme(0);
const ios = Platform.OS == 'ios';

export function LoginPage(props) {
  /* The 'emailText' variable will be modified by the user */
  const [emailText, onChangeEmailText] = React.useState('');
  /* The 'passwordText' variable will be modified by the user */
  const [passwordText, onChangePasswordText] = React.useState('');
  const { onPress = 'Save' } = props;
  /* The 'isChecked' turns to true if the box if checked, otherwise false */
  const [isChecked, setChecked] = useState(false);

  const fontsLoaded = loadFont();
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.screen}
        onLayout={onLayoutRootView}>
      <SafeAreaView 
        className={ios? '-mb-8': ''}
        style={{flex: 1}}>
        <View style={{flex: 1}}/>
        <View style={{flex: 6}}>
          <MainTitleImage/>

          <EmailTextfield
            onChangeEmailText={onChangeEmailText}
            emailText={emailText}
          />

          <PasswordTextfild
            onChangePasswordText={onChangePasswordText}
            passwordText={passwordText}
          />

          <LoginButton onPress={onPress}/>

          <RememberMe 
            setChecked = {setChecked}
            isChecked = {isChecked}
          />
        </View>
        <View style={{flex: 1}}>
          <SignupButton onPress={onPress} />
          <Credits/>
        </View>
      </SafeAreaView>
    </View>
  );
}

/* The icon & title image */
function MainTitleImage() {
  return (
    <Image
      source={require('../assets/main-title.png')}
      style={styles.title}
    />
  )
}

/* The email textfield */
function EmailTextfield({ onChangeEmailText, emailText }) {
  return (
    <TextInput
      style={styles.inputTextfield}
      onChangeText={onChangeEmailText}
      value={emailText}
      placeholder="Enter email"
      keyboardType="email-address"
      secureTextEntry={false}
    />
  )
}

/* The password textfield, secure typing */
function PasswordTextfild({ onChangePasswordText, passwordText }) {
  return (
    <TextInput
      style={styles.inputTextfield}
      onChangeText={onChangePasswordText}
      value={passwordText}
      placeholder="Enter password"
      keyboardType="default"
      secureTextEntry={true}
    />
  )
}

/* The login button */
function LoginButton({ onPress }) {
  return (
    <Pressable style={styles.loginButton} onPress={onPress}>
      <Text style={styles.loginButtonLabel}>Log in</Text>
    </Pressable>
  )
}

/* Remember me check-in box and label */
function RememberMe({ setChecked, isChecked }) {
  return (
    <View style={styles.rememberMe}>
      <Checkbox 
        style={styles.checkbox}
        onValueChange={setChecked}
        color={isChecked ? currentTheme.checkBoxColor : currentTheme.subColor}
        value={isChecked}/>
      <Text style={styles.rememberMeLabel}>Remember me</Text>
    </View>
  )
}

/* The signup button */
function SignupButton({ onPress }) {
  return (
    <Pressable style={[
      styles.signupButton]}
      onPress={onPress}>
      <Text style={styles.signupButtonLabel}>Sign up</Text>
    </Pressable>
  )
}

/* The credits label */
function Credits({  }) {
  return (
    <Text style={styles.creditLabel}>
      Credits: Proud app made by CS 320 Group 6
    </Text>
  )
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({

  screen: StyleSheet.flatten([
    kolynScreen(currentTheme.mainColor),
  ]),

  title: {
    resizeMode: 'contain',
    width: 400,
    height: width*0.2,
    alignSelf: 'center',
  },

  inputTextfield: StyleSheet.flatten([
    {height: 40, width: 300}, 
    kolynInputfield(currentTheme.subColor, currentTheme.mainFont),
  ]),

  loginButton: StyleSheet.flatten([
    {top: 55, width: 240}, 
    kolynButton(currentTheme.subColor),
  ]),

  loginButtonLabel: StyleSheet.flatten([
    kolynLabel(currentTheme.fontSizes.casual, currentTheme.mainFont, currentTheme.mainColor)
  ]),

  rememberMe: {
    top: 70,
    flexDirection: 'row',
    alignSelf:'center',
  },

  checkbox: { margin: 8 },

  rememberMeLabel: StyleSheet.flatten([
    kolynLabel(currentTheme.fontSizes.medium, currentTheme.mainFont, currentTheme.subColor),
  ]),

  signupButton: StyleSheet.flatten([
    {height: 40, width: 70},
    kolynButton(currentTheme.subColor),
  ]),

  signupButtonLabel: StyleSheet.flatten([
    kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.mainColor,),
  ]),

  creditLabel: StyleSheet.flatten([
    {textAlign: 'center'},
    kolynLabel(currentTheme.fontSizes.tiny, currentTheme.mainFont, currentTheme.subColor),
  ]),

});
