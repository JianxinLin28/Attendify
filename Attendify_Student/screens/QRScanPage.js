import * as React from 'react';
import { Platform, Dimensions, TextInput } from 'react-native';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { currentTheme, changeTheme } from '../kits/AppTheme';
import { loadFont } from '../props/FontLoader';
import * as KolynStyle from '../kits/KolynStyleKit';
import {KolynSwitchCourseButton } from '../kits/KolynComponentKit';
import { CommonPart } from '../kits/CommonPart';


export function QRScanPage({ navigation }) {
  const [courseText, onChangeCourseText] = React.useState('');
  const [timeText, onChangeTimeText] = React.useState('');
  const [statusText, onChangeStatusText] = React.useState('');

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
      title={"QR Code Scan"}
      navigation={navigation}
      components={
        <View style={{flex: 6}}>
        <KolynSwitchCourseButton
          foregroundColor={currentTheme.mainColor}
          backgroundColor={currentTheme.primaryColor}
        />

        <View style={{top: 50, flex: 2}}>

          <TextInput
            editable={false}
            style={styles.courseLabel}
            value={courseText}
            onChangeText={onChangeCourseText}
          >CS 320, Jaime Dávila</TextInput>

          <TextInput
            editable={false}
            style={styles.courseLabel}
            value={timeText}
            onChangeText={onChangeTimeText}
          >Tu, Th 13:00 - 14:15</TextInput>

        </View>

        <View style={{top: 50, flex: 3}}>
          <CameraButton/>
        </View>

        <TextInput
            editable={false}
            style={styles.statusLabel}
            value={statusText}
            onChangeText={onChangeStatusText}
        >
          Status: Not checked in
        </TextInput>
        </View>
      }
    />
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

  divider: StyleSheet.flatten([
    {top: -20},
    KolynStyle.kolynDivider(currentTheme.primaryColor)
  ]),

  courseLabel: StyleSheet.flatten([
    {alignSelf: 'center', height: 30},
    KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.primaryColor)
  ]),

  statusLabel:StyleSheet.flatten([
    {alignSelf: 'center', height: 30, top: -80},
    KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.primaryColor)
  ]),

  cameraButton: StyleSheet.flatten([
    {height: 40, width: 160, justifyContent: 'flex-start', alignItems: 'center'},
    KolynStyle.kolynButton(currentTheme.primaryColor),
  ]),

  cameraButtonLabel: StyleSheet.flatten([
    KolynStyle.kolynLabel(currentTheme.fontSizes.medium, currentTheme.mainFont, currentTheme.mainColor,),
  ]),
});
