import * as React from 'react';
import { Platform, Dimensions, TextInput } from 'react-native';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native';
import Checkbox from 'expo-checkbox';
import * as SplashScreen from 'expo-splash-screen';
import { currentTheme } from '../kits/AppTheme';
import { loadFont } from '../props/FontLoader';
import * as KolynStyle from '../kits/KolynStyleKit';
import * as KolynComponent from '../kits/KolynComponentKit';
import {KolynSwitchCourseButton, 
        KolynTopTitleLabel,
        KolynBottomNavigatorTab} from '../kits/KolynComponentKit';

const ios = Platform.OS == 'ios';

export function QRScanPage(props) {
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
    <View style={styles.screen}
        onLayout={onLayoutRootView}>
      <SafeAreaView 
        className={ios? '-mb-8': ''}
        style={{flex: 1}}>
        
        <KolynTopTitleLabel
          text="QR Code Scan"
          backgroundStyle={styles.topTitle}
          textLabelStyle={styles.topTitleLabel}
        />

        <View style={styles.divider} />

        <View style={{flex: 6}}>

          <KolynSwitchCourseButton
            buttonStyle={styles.switchCourseButton}
            textLabelStyle={styles.switchCourseButtonLabel}
          />

          <View style={{top: 50, flex: 2}}>

            <TextInput
              editable={false}
              style={styles.courseLabel}
              value={errorText}
              onChangeText={onChangeErrorText}
            >CS 320, Jaime Dávila</TextInput>
  
            <TextInput
              editable={false}
              style={styles.courseLabel}
              value={errorText}
              onChangeText={onChangeErrorText}
            >Tu, Th 13:00 - 14:15</TextInput>

          </View>

          <View style={{top: 50, flex: 3}}>
            <CameraButton/>
          </View>

          <View style={[styles.divider, {top: -20}]} />

          <KolynBottomNavigatorTab 
            backgroundStyle={styles.topTitle}
            circleColor={currentTheme.mainColor}
          />
          
        </View>
      </SafeAreaView>
    </View>
  );
}

/* The open camera button */
function CameraButton({ onPress }) {
  return (
    <Pressable style={[
      styles.cameraButton]}
      onPress={onPress}>
      <Text style={styles.cameraButtonLabel}>Open 'Camera'</Text>
    </Pressable>
  );
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({

  screen: StyleSheet.flatten([
    KolynStyle.kolynScreen(currentTheme.mainColor),
  ]),

  topTitle: {color: currentTheme.mainColor},

  topTitleLabel: StyleSheet.flatten([
    {alignSelf: 'center', height: 50},
    KolynStyle.kolynLabel(currentTheme.fontSizes.casual, currentTheme.mainFont, currentTheme.primaryColor)
  ]),

  divider: KolynStyle.kolynDivider(currentTheme.primaryColor),

  switchCourseButton: StyleSheet.flatten([
    {top: 20, width: 240, end: -width/3.0}, 
    KolynStyle.kolynButton(currentTheme.subColor),
  ]),

  switchCourseButtonLabel: StyleSheet.flatten([
    KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.mainColor)
  ]),

  courseLabel: StyleSheet.flatten([
    {alignSelf: 'center', height: 30},
    KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.primaryColor)
  ]),

  cameraButton: StyleSheet.flatten([
    {height: 40, width: 160, justifyContent: 'flex-start', alignItems: 'center'},
    KolynStyle.kolynButton(currentTheme.subColor),
  ]),

  cameraButtonLabel: StyleSheet.flatten([
    KolynStyle.kolynLabel(currentTheme.fontSizes.medium, currentTheme.mainFont, currentTheme.mainColor,),
  ]),
});
