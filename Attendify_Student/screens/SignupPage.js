import * as React from 'react';
import {useState, useCallback} from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { currentTheme, changeTheme } from '../kits/AppTheme';
import { loadFont } from '../props/FontLoader';
import * as KolynStyle from '../kits/KolynStyleKit';
import * as KolynComponent from '../kits/KolynComponentKit';
import {KolynMainTitleImage} from '../kits/KolynComponentKit';

const ios = Platform.OS == 'ios';

export function SignupPage(props) {
  const [lnameText, onChangeLnameText] = React.useState('');
  const [fnameText, onChangeFnameText] = React.useState('');
  const [idText, onChangeIDText] = React.useState('');
  const [emailText, onChangeEmailText] = React.useState('');
  const [passwordText, onChangePasswordText] = React.useState('');
  const [repasswordText, onChangeRePasswordText] = React.useState('');
  const { onPress = 'Save' } = props;
  const [errorText, onChangeErrorText] = React.useState('');

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
    <KeyboardAvoidingView 
      behavior={ios ? 'padding' : 'height'}
      style={styles.screen}
      onLayout={onLayoutRootView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView 
          className={ios ? '-mb-8': ''}
          style={{flex: 1}}>
          <View style={{flex: 1}}/>
          <View style={{flex: 6}}>

            <KolynMainTitleImage/>

            <RegisterLabel/>

            <NameTextfields 
              lnameText={lnameText}
              onChangeLnameText={onChangeLnameText}
              fnameText={fnameText}
              onChangeFnameText={onChangeFnameText}
            />

          <CustomTextfield
            style={styles.inputTextfield}
            text={idText}
            onChangeText={onChangeIDText}
            placeholder="Enter spire ID"
            keyboardType="numeric"
          />  

          <CustomTextfield
            style={styles.inputTextfield}
            text={emailText}
            onChangeText={onChangeEmailText}
            placeholder="Enter email"
            keyboardType="email-address"
          />

          <CustomTextfield
            style={styles.inputTextfield}
            text={passwordText}
            onChangeText={onChangePasswordText}
            placeholder="Enter password"
            keyboardType="default"
          />

          <CustomTextfield
            style={styles.inputTextfield}
            text={repasswordText}
            onChangeText={onChangeRePasswordText}
            placeholder="Re-enter password"
            keyboardType="default"
          />

          <ErrorMessager 
            errorText={errorText}
            onChangeErrorText={onChangeErrorText} />

          <SignupButton onPress={() => ValidateSignupInfo(
            {
              lnameText: lnameText,
              fnameText: fnameText,
              idText: idText,
              emailText: emailText,
              passwordText: passwordText,
              repasswordText: repasswordText,
              onChangeErrorText: onChangeErrorText,
            }
          )} />

          <BackButton onPress={onPress} />

          </View>
      </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

function RegisterLabel() {
  return (
    <Text style={styles.registerLabel}>
      Register a new student account
    </Text>
  );
}

/* Last & First name */
function NameTextfields({ lnameText, onChangeLnameText, fnameText, onChangeFnameText }) {
  return (
    <View style={styles.name}>
      <CustomTextfield
        style={styles.nameTextfield}
        text={lnameText}
        onChangeText={onChangeLnameText}
        placeholder="Last name"
        keyboardType="default"
      />

      <CustomTextfield
        style={styles.nameTextfield}
        text={fnameText}
        onChangeText={onChangeFnameText}
        placeholder="First name"
        keyboardType="default"
      />
    </View>
  );
}

function CustomTextfield({ style, text, onChangeText, placeholder, keyboardType }) {
  return KolynComponent.KolynTextfield({
    style: style, 
    text: text, 
    onChangeText: onChangeText, 
    placeholder: placeholder, 
    keyboardType: keyboardType, 
    isSecure: false
  });
}

function ErrorMessager({ errorText, onChangeErrorText }) {
  return (
  <TextInput
    editable={false}
    style={styles.errorLabel}
    value={errorText}
    onChangeText={onChangeErrorText}>
  </TextInput>
  );
}

/* The signup button */
function SignupButton({ onPress }) {
  return (
    <Pressable style={[
      styles.signupButton]}
      onPress={onPress}>
      <Text style={styles.signupButtonLabel}>Sign up</Text>
    </Pressable>
  );
}

/* The back button */
function BackButton({ onPress }) {
  return (
    <Pressable style={[
      styles.backButton]}
      onPress={onPress}>
      <Text style={styles.backButtonLabel}>Go back</Text>
    </Pressable>
  );
}

function ValidateSignupInfo({ 
      lnameText, 
      fnameText, 
      idText, 
      emailText, 
      passwordText, 
      repasswordText, 
      onChangeErrorText }) {
  if (lnameText == "") {
    onChangeErrorText("Error: last name is empty.");
    return;
  }
  if (fnameText == "") {
    onChangeErrorText("Error: first name is empty.");
    return;
  }
  if (idText == "") {
    onChangeErrorText("Error: spire ID is empty.");
    return;
  }
  if (emailText == "") {
    onChangeErrorText("Error: email is empty.");
    return;
  }
  if (passwordText == "") {
    onChangeErrorText("Error: password is empty.");
    return;
  }
  if (repasswordText == "") {
    onChangeErrorText("Error: re-enter password is empty.");
    return;
  }

  onChangeErrorText("");
}

const styles = StyleSheet.create({

  screen: StyleSheet.flatten([
    KolynStyle.kolynScreen(currentTheme.mainColor),
  ]),

  registerLabel: StyleSheet.flatten([
    {textAlign: 'center'},
    KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.subColor),
  ]),

  name: {
    flexDirection: 'row',
    alignSelf:'center',
  },

  nameTextfield: StyleSheet.flatten([
    {height: 40, width: 140}, 
    KolynStyle.kolynInputTextfield(currentTheme.subColor, currentTheme.mainFont),
  ]),

  inputTextfield: StyleSheet.flatten([
    {height: 40, width: 300}, 
    KolynStyle.kolynInputTextfield(currentTheme.subColor, currentTheme.mainFont),
  ]),

  errorLabel: StyleSheet.flatten([
    {textAlign: 'center'},
    KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.errorColor),
  ]),

  signupButton: StyleSheet.flatten([
    {width: 240, top: 55},
    KolynStyle.kolynButton(currentTheme.subColor),
  ]),

  signupButtonLabel: StyleSheet.flatten([
    KolynStyle.kolynLabel(currentTheme.fontSizes.casual, currentTheme.mainFont, currentTheme.mainColor,),
  ]),

  backButton: StyleSheet.flatten([
    {width: 70, top: 90},
    KolynStyle.kolynButton(currentTheme.subColor),
  ]),

  backButtonLabel: StyleSheet.flatten([
    KolynStyle.kolynLabel(currentTheme.fontSizes.tiny, currentTheme.mainFont, currentTheme.mainColor,),
  ]),

});
