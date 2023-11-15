import * as React from 'react';
import { Platform } from 'react-native';
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native';
import Checkbox from 'expo-checkbox';
import * as SplashScreen from 'expo-splash-screen';
import { loadFont } from '../props/FontLoader';
import * as KolynStyle from '../kits/KolynStyleKit';
import {KolynMainTitleImage} from '../kits/KolynComponentKit';
import { ThemeContext} from '../kits/AppTheme';


/*
  The login page requests information from the user 
  Only the email and the password and rememeber me (checkmark)

  Once the login button is pressed, the system will attempt to search 
  account according to the given login info.
    1. If success, load all necessary user info to the next loaded page
    2. If fail, display the error label to indicate to the user the error

  Once the signup button is pressed, a sign up page will present (see SignupPage.js)
*/

const ios = Platform.OS == 'ios';

const ValidateResult = {
  Default: '',
  Success: 'Success',
  MissingEmailError: 'Missing email.',
  MissingPasswordError: 'Missing password.',
  NotMatchEmailErro: "Email not found.",
  IncorrectPasswordError: "Incorrect password."
}

export function LoginPage({ navigation }) {

  const themedStyles = ThemedStyles();
  const checkBoxColor = GetCheckBoxColor();
  const subColor = GetSubColor();

  /* The 'emailText' variable will be modified by the user */
  const [emailText, onChangeEmailText] = React.useState('');
  /* The 'passwordText' variable will be modified by the user */
  const [passwordText, onChangePasswordText] = React.useState('');
  /* The 'isChecked' turns to true if the box if checked, otherwise false */
  const [isChecked, setChecked] = React.useState(false);
  const [errorText, onChangeErrorText] = React.useState(ValidateResult.Default);

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
    <View style={themedStyles.screen}
        onLayout={onLayoutRootView}>
      <SafeAreaView 
        className={ios? '-mb-8': ''}
        style={{flex: 1}}>
        <View style={{flex: 1}}/>
        <View style={{flex: 6}}>
          <KolynMainTitleImage/>

          <EmailTextfield 
            emailText={emailText}
            onChangeEmailText={onChangeEmailText}
            textfieldStyle={themedStyles.inputTextfield}
          />

          <PasswordTextfild
            onChangePasswordText={onChangePasswordText}
            passwordText={passwordText}
            textfieldStyle={themedStyles.inputTextfield}
          />

          <LoginButton 
            onPress={() => PressLoginButton(navigation)}
            buttonStyle={themedStyles.loginButton}
            labelStyle={themedStyles.loginButtonLabel}
          />

          <RememberMe 
            setChecked={setChecked}
            isChecked={isChecked}
            containerStyle={themedStyles.rememberMe}
            checkBoxStyle={themedStyles.checkbox}
            checkBoxColor={checkBoxColor}
            subColor={subColor}
            labelStyle={themedStyles.rememberMeLabel}
          />

          <ErrorLabel 
            errorMessage={errorText}
            style={themedStyles.errorLabel}
          />

        </View>
        <View style={{flex: 1}}>
          <SignupButton 
            onPress={() => navigation.navigate('Signup')}
            buttonStyle={themedStyles.signupButton}
            labelStyle={themedStyles.signupButtonLabel}
          />
          <Credits style={themedStyles.creditLabel}/>
        </View>
      </SafeAreaView>
    </View>
  );
}

/* Internal logic code start */

function GetCheckBoxColor() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;
  return currentTheme.checkBoxColor;
}

function GetSubColor() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;
  return currentTheme.subColor;
}

/* Internal logic code end */

/*************************************************************************************************/

/* Connect to backend logic code start */

/* 
  Called when the login button is pressed 
  Navigate to the main page if the login info has been confirmed
  Otherwise, change to error label text
*/
function PressLoginButton(navigation) {
  

  navigation.navigate('BottomTab')
}

/* Connect to backend logic code end */

/*************************************************************************************************/

/* User interface code start */

/* The email textfield */
function EmailTextfield({ emailText, onChangeEmailText, textfieldStyle }) {
  return (
    <TextInput
      style={textfieldStyle}
      value={emailText}
      onChangeText={onChangeEmailText}
      placeholder="Enter email"
      keyboardType="email-address"
      secureTextEntry={false}
    />);
}

/* The password textfield, secure typing */
function PasswordTextfild({ onChangePasswordText, passwordText, textfieldStyle }) {
  return (
    <TextInput
      style={textfieldStyle}
      value={passwordText}
      onChangeText={onChangePasswordText}
      placeholder="Enter password"
      keyboardType="default"
      secureTextEntry={true}
    />);
}

/* The login button */
function LoginButton({ onPress, buttonStyle, labelStyle }) {
  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <Text style={labelStyle}>Log in</Text>
    </Pressable>
  );
}

/* Remember me check-in box and label */
function RememberMe({ 
  setChecked, 
  isChecked, 
  containerStyle, 
  checkBoxStyle, 
  checkBoxColor, 
  subColor, 
  labelStyle 
}) {
  return (
    <View style={containerStyle}>
      <Checkbox 
        style={checkBoxStyle}
        onValueChange={setChecked}
        color={isChecked ? checkBoxColor : subColor}
        value={isChecked}/>
      <Text style={labelStyle}>Remember me</Text>
    </View>
  );
}

/* The signup button */
function SignupButton({ onPress, buttonStyle, labelStyle }) {
  return (
    <Pressable 
      style={buttonStyle}
      onPress={onPress}
    >
      <Text style={labelStyle}>Sign up</Text>
    </Pressable>
  );
}

function ErrorLabel({ errorMessage, style }) {
  return (
    <Text style={style}>
      {errorMessage}
    </Text>
  );
}

/* The credits label */
function Credits({ style }) {
  return (
    <Text style={style}>
      Credits: Proud app made by CS 320 Group 6
    </Text>
  );
}

/* User interface code end */

function ThemedStyles() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;
  
  return (StyleSheet.create({

    screen: StyleSheet.flatten([
      KolynStyle.kolynScreen(currentTheme.mainColor),
    ]),
  
    inputTextfield: StyleSheet.flatten([
      {height: 40, width: 300}, 
      KolynStyle.kolynInputTextfield(currentTheme.primaryColor, currentTheme.mainFont),
    ]),
  
    loginButton: StyleSheet.flatten([
      {top: 55, width: 240}, 
      KolynStyle.kolynButton(currentTheme.primaryColor),
    ]),
  
    loginButtonLabel: StyleSheet.flatten([
      KolynStyle.kolynLabel(currentTheme.fontSizes.casual, currentTheme.mainFont, currentTheme.mainColor)
    ]),
  
    rememberMe: {
      top: 70,
      flexDirection: 'row',
      alignSelf:'center',
    },
  
    checkbox: { margin: 8 },
  
    rememberMeLabel: StyleSheet.flatten([
      KolynStyle.kolynLabel(currentTheme.fontSizes.medium, currentTheme.mainFont, currentTheme.primaryColor),
    ]),
  
    signupButton: StyleSheet.flatten([
      {height: 40, width: 70},
      KolynStyle.kolynButton(currentTheme.primaryColor),
    ]),
  
    signupButtonLabel: StyleSheet.flatten([
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.mainColor,),
    ]),
  
    errorLabel: StyleSheet.flatten([
      {textAlign: 'center', top: -60},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.errorColor),
    ]),
  
    creditLabel: StyleSheet.flatten([
      {textAlign: 'center'},
      KolynStyle.kolynLabel(currentTheme.fontSizes.tiny, currentTheme.mainFont, currentTheme.primaryColor),
    ]),
  
  }));
}
