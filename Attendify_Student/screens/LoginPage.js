import * as React from 'react';
import { Platform } from 'react-native';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { SafeAreaView, Image, Dimensions } from 'react-native';
import Checkbox from 'expo-checkbox';
import {useState, useEffect, useCallback} from 'react';
import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { FontFamily, FontSize, Color } from '../style/GlobalStyle';
import { AppTheme } from '../style/AppTheme';

const ios = Platform.OS == 'ios';

export function LoginPage(props) {
  const [emailText, onChangeEmailText] = React.useState('');
  const [passwordText, onChangePasswordText] = React.useState('');
  const { onPress = 'Save' } = props;
  const [isChecked, setChecked] = useState(false);

  const fontsLoaded = LoadFont();
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}
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

          <SignupButton onPress={onPress} />
        </View>
        <Credits/>
      </SafeAreaView>
    </View>
  );
}

function LoadFont() {
  const [fontsLoaded] = Font.useFonts({
    'BalooBhai-Regular': require('../assets/fonts/BalooBhai-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
  
    prepare();
  }, []);

  return fontsLoaded;
}

function MainTitleImage() {
  const {width} = Dimensions.get('window');

  return (
    <Image
      source={require('../assets/main-title.png')}
      style={{
        resizeMode: 'contain',
        width: width*3.0/2.0,
        height: width*0.2,
        alignSelf: 'center',
      }}
    />
  )
}

function Credits({  }) {
  return (
    <Text style={{
      top: 0,
      fontSize: FontSize.tiny,
      fontFamily: FontFamily.mainFont,
      color: Color.colorWhite,
      textAlign: 'center',
      flex: 1,
    }}>
      Credits: Proud app made by CS 320 Group 6
    </Text>
  )
}

function SignupButton({ onPress }) {
  return (
    <Pressable style={[
      {top: 250},
      styles.smallButton]}
      onPress={onPress}>
      <Text style={{
        fontSize: FontSize.small,
        fontFamily: FontFamily.mainFont,
        color: AppTheme.theme,
      }}>Sign up</Text>
    </Pressable>
  )
}

function RememberMe({ setChecked, isChecked }) {
  return (
    <View style={{
      top: 70,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Checkbox 
        style={styles.checkbox}
        onValueChange={setChecked}
        color={isChecked ? 'green' : Color.colorWhite}
        value={isChecked}
        >
      </Checkbox>

      <Text style={{
        fontSize: FontSize.medium,
        fontFamily: FontFamily.mainFont,
        color: Color.colorWhite,
      }}>Remember me</Text>
    </View>
  )
}

function LoginButton({ onPress }) {
  return (
    <Pressable style={styles.loginButton} onPress={onPress}>
      <Text style={{
        fontSize: FontSize.casual,
        fontFamily: FontFamily.mainFont,
        color: AppTheme.theme,
      }}>Log in</Text>
    </Pressable>
  )
}

function EmailTextfield({ onChangeEmailText, emailText }) {
  return (
    <Textfield
      onChangeText={onChangeEmailText}
      value={emailText}
      placeholder="Enter email"
      keyboardType="email-address"
      isSecure={false}
    />
  )
}

function PasswordTextfild({ onChangePasswordText, passwordText }) {
  return (
    <Textfield
      onChangeText={onChangePasswordText}
      value={passwordText}
      placeholder="Enter password"
      keyboardType="default"
      isSecure={true}
    />
  )
}

function Textfield({onChangeText, value, placeholder, keyboardType, isSecure}) {
  return (
    <TextInput 
      secureTextEntry={isSecure}
      style={styles.input}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      keyboardType={keyboardType}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: AppTheme.theme,
  },

  input: {
    height: 40,
    margin: 12,
    backgroundColor: Color.colorWhite,
    padding: 10,
    borderRadius: 10,
    fontFamily: FontFamily.mainFont,
  },

  loginButton: {
    top: 55,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 1,
    paddingHorizontal: 1,
    borderRadius: 10,
    elevation: 3,
    width: 240,
    backgroundColor: Color.colorWhite,
    alignSelf: 'center',
  },

  smallButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 1,
    paddingHorizontal: 1,
    borderRadius: 10,
    elevation: 3,
    width: 70,
    backgroundColor: Color.colorWhite,
    alignSelf: 'center',
  },

  checkbox: {
    margin: 8,
  }
});
