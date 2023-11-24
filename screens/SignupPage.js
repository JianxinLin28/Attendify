import * as React from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { loadFont } from '../props/FontLoader';
import * as KolynStyle from '../kits/KolynStyleKit';
import {KolynMainTitleImage} from '../kits/KolynComponentKit';
import { ThemeContext } from '../kits/AppTheme';
import { SpringButton } from '../kits/SpringButton';


/* 
  The signup page requests information from the user 
  Once the information is validated, click 'sign in' button 
  should transit to the 'sign up alert page', see SignupAlertPage.js:

    1. If the server is working correctly, pass all necessary info to the 'sign up alert page'
    2. Otherwise, display the error and ask the user to retry

  If the information is invalid, click the 'sign in' button
  should result in displaying error message, see function ValidateSignupInfo
*/

const ios = Platform.OS == 'ios';

const ValidateResult = {
  Success: 'Success',
  MissingLastNameError: 'Missing last name.',
  MissingFirstNameError: 'Missing first name.',
  MissingIDError: 'Missing ID.',
  MissingEmailError: 'Missing email.',
  MissingPasswordError: 'Missing password.',
  IncorrectReEnterPasswordError: 'Password not match.',
}

export function SignupPage({navigation}) {
  const themedStyles = ThemedStyles();

  const [lnameText, onChangeLnameText] = React.useState('');
  const [fnameText, onChangeFnameText] = React.useState('');
  const [idText, onChangeIDText] = React.useState('');
  const [emailText, onChangeEmailText] = React.useState('');
  const [passwordText, onChangePasswordText] = React.useState('');
  const [repasswordText, onChangeRePasswordText] = React.useState('');
  const [errorText, onChangeErrorText] = React.useState('');

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
      style={themedStyles.screen}
      onLayout={onLayoutRootView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView 
          className={ios ? '-mb-8': ''}
          style={{flex: 1}}>
          <View style={{flex: 1}}/>
          <KeyboardAvoidingView style={{flex: 6}}>

            <KolynMainTitleImage/>

            <RegisterLabel/>

            <NameTextfields 
              lnameText={lnameText}
              onChangeLnameText={onChangeLnameText}
              fnameText={fnameText}
              onChangeFnameText={onChangeFnameText}
            />

          <CustomTextfield
            style={themedStyles.inputTextfield}
            text={idText}
            onChangeText={onChangeIDText}
            placeholder="Enter spire ID"
            keyboardType="numeric"
          />  

          <CustomTextfield
            style={themedStyles.inputTextfield}
            text={emailText}
            onChangeText={onChangeEmailText}
            placeholder="Enter email"
            keyboardType="email-address"
          />

          <CustomTextfield
            style={themedStyles.inputTextfield}
            text={passwordText}
            onChangeText={onChangePasswordText}
            placeholder="Enter password"
            keyboardType="default"
          />

          <CustomTextfield
            style={themedStyles.inputTextfield}
            text={repasswordText}
            onChangeText={onChangeRePasswordText}
            placeholder="Re-enter password"
            keyboardType="default"
          />

        </KeyboardAvoidingView>
        <View style={{flex: 3}}>

          <ErrorMessager 
            errorText={errorText}
            onChangeErrorText={onChangeErrorText} 
            style={themedStyles.errorLabel}
          />

          <SignupButton 
            onPress={() => 
              PressSignupButton({
                lnameText: lnameText,
                fnameText: fnameText,
                idText: idText,
                emailText: emailText,
                passwordText: passwordText,
                repasswordText: repasswordText,
                onChangeErrorText: onChangeErrorText,
                navigation: navigation
              })
            }
            buttonStyle={themedStyles.signupButton}
            labelStyle={themedStyles.signupButtonLabel}
          />

          <BackButton 
            onPress={() => PressGoBackButton({navigation: navigation})} 
            buttonStyle={themedStyles.backButton}
            labelStyle={themedStyles.backButtonLabel}
          />

        </View>

      </SafeAreaView>
      </TouchableWithoutFeedback>
    </View>
  );
}

/* Internal logic code start */

/* Called when the 'sign up' button is pressed */
function PressSignupButton(
  { 
    lnameText, 
    fnameText, 
    idText, 
    emailText, 
    passwordText, 
    repasswordText,
    onChangeErrorText,
    navigation
  }
) {
  var validateResult = ValidateSignupInfo({
    lnameText: lnameText,
    fnameText: fnameText,
    idText: idText,
    emailText: emailText,
    passwordText: passwordText,
    repasswordText: repasswordText,
  });

  // The entered information is validated
  if (validateResult == ValidateResult.Success)
  {
    var passingToAlertInfo = {
      isErrorSignal: false,
    };

    if (IsServerReady()) {
      TransferDataToServer({ 
        lnameText: lnameText,
        fnameText: fnameText,
        idText: idText,
        emailText: emailText,
        passwordText: passwordText,
      });
    } 
    else {
      PassErrorSignalToAlertPage({ passingToAlertInfo: passingToAlertInfo });
    }

    OpenAlertPage({ 
      navigation: navigation, 
      passingToAlertInfo: passingToAlertInfo 
    });
  }
  else {
    ChangeErrorMessagerText({ onChangeErrorText, validateResult });
  }
}

/* 
  Called when the 'go back' button is pressed
*/
function PressGoBackButton({ navigation }) {
  navigation.replace('Login');
}

/* Open the alert page, and make it display the occurred errors */
function PassErrorSignalToAlertPage({ passingToAlertInfo }) {
  passingToAlertInfo.isErrorSignal = true;
}

function OpenAlertPage({ navigation, passingToAlertInfo})
{
  navigation.push('SignupAlert', { fromSignupPage: passingToAlertInfo });
}

/* Internal logic code end */

/*************************************************************************************************/

/* Connect to backend logic code start */

/* 
  Confirm all entered information is valid

  The error label should present error to the user if any error occur
  in the order of:
  1. Last name
  2. First name
  3. ID
  4. Email
  5. Password
  6. Re-enter password
  
  only one error is presented at a time

  You can add your own enum items to ValidateResult as you see fit
*/
function ValidateSignupInfo(
  { 
    lnameText, 
    fnameText, 
    idText, 
    emailText, 
    passwordText, 
    repasswordText
  }
  ) {
  
  if (lnameText == "") {
    return ValidateResult.MissingLastNameError;
  }
  if (fnameText == "") {
    return ValidateResult.MissingFirstNameError;
  }
  if (idText == "") {
    return ValidateResult.MissingIDError;
  }
  if (emailText == "") {
    return ValidateResult.MissingEmailError;
  }
  if (passwordText == "") {
    return ValidateResult.MissingPasswordError;
  }
  if (repasswordText != passwordText) {
    return ValidateResult.IncorrectReEnterPasswordError;
  }
  
  return ValidateResult.Success;
}

/* Sent any necessary data to server */
function TransferDataToServer(
  { 
    lnameText, 
    fnameText, 
    idText, 
    emailText, 
    passwordText
  }
) {

}

/* Check to see if server is available, returns a boolean */
function IsServerReady() {
  return false;
}

/* Connect to backend logic code end */

/*************************************************************************************************/

/* User interface code start */

/* The title that says register a new student account */
function RegisterLabel() {
  const themedStyles = ThemedStyles();

  return (
    <Text style={themedStyles.registerLabel}>
      Register a new student account
    </Text>
  );
}

/* Last & First name */
function NameTextfields({ lnameText, onChangeLnameText, fnameText, onChangeFnameText }) {
  const themedStyles = ThemedStyles();

  return (
    <View style={themedStyles.name}>
      <CustomTextfield
        style={themedStyles.nameTextfield}
        text={lnameText}
        onChangeText={onChangeLnameText}
        placeholder="Last name"
        keyboardType="default"
      />

      <CustomTextfield
        style={themedStyles.nameTextfield}
        text={fnameText}
        onChangeText={onChangeFnameText}
        placeholder="First name"
        keyboardType="default"
      />
    </View>
  );
}

function CustomTextfield({ style, text, onChangeText, placeholder, keyboardType }) {
  return (
    <TextInput
      style={style}
      value={text}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={false}
    />);
}

/* The error message label, use the error font color */
function ErrorMessager({ errorText, onChangeErrorText, style }) {
  return (
  <TextInput
    editable={false}
    style={style}
    value={errorText}
    onChangeText={onChangeErrorText}>
  </TextInput>
  );
}

/* Update the error messager label */
function ChangeErrorMessagerText({ onChangeErrorText, validateResult })
{
  if (validateResult != ValidateResult.Success) {
    onChangeErrorText( validateResult );
  }
}

/* The signup button */
function SignupButton({ onPress, buttonStyle, labelStyle }) {
  return (
    <SpringButton
      text="Sign up"
      onPress={onPress}
      buttonStyle={buttonStyle}
      labelStyle={labelStyle}
    />
  );
}

/* The back button */
function BackButton({ onPress, buttonStyle, labelStyle }) {
  return (
    <SpringButton
      text="Go back"
      onPress={onPress}
      buttonStyle={buttonStyle}
      labelStyle={labelStyle}
    />
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
  
    registerLabel: StyleSheet.flatten([
      {textAlign: 'center'},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.primaryColor),
    ]),
  
    name: {
      flexDirection: 'row',
      alignSelf:'center',
    },
  
    nameTextfield: StyleSheet.flatten([
      {height: 40, width: 140}, 
      KolynStyle.kolynInputTextfield(currentTheme.primaryColor, currentTheme.mainFont),
    ]),
  
    inputTextfield: StyleSheet.flatten([
      {height: 40, width: 300}, 
      KolynStyle.kolynInputTextfield(currentTheme.primaryColor, currentTheme.mainFont),
    ]),
  
    errorLabel: StyleSheet.flatten([
      {textAlign: 'center'},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.errorColor),
    ]),
  
    signupButton: StyleSheet.flatten([
      {width: 240},
      KolynStyle.kolynButton(currentTheme.primaryColor),
    ]),
  
    signupButtonLabel: StyleSheet.flatten([
      KolynStyle.kolynLabel(currentTheme.fontSizes.casual, currentTheme.mainFont, currentTheme.mainColor,),
    ]),
  
    backButton: StyleSheet.flatten([
      {width: 70, top: 36},
      KolynStyle.kolynButton(currentTheme.primaryColor),
    ]),
  
    backButtonLabel: StyleSheet.flatten([
      KolynStyle.kolynLabel(currentTheme.fontSizes.tiny, currentTheme.mainFont, currentTheme.mainColor,),
    ]),
  
  }));
}
