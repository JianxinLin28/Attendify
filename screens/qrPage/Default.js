import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, TextInput } from 'react-native';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import * as KolynStyle from '../../kits/KolynStyleKit';
import {KolynSwitchCourseButton, KolynCourseLabel } from '../../kits/KolynComponentKit';
import { CommonPart } from '../../kits/CommonPart';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ThemeContext} from '../../kits/AppTheme';


const CheckinStatus = {
  CheckedIn: 'Status: Checked in',
  NotCheckedIn: 'Status: Not checked in'
}

const PageVariant = {
  Default: 'Default',
  CheckedIn: 'CheckedIn'
}

export function QRScanPageDefault({navigation}) {
  const themedStyles = ThemedStyles();

  const checkinStatus = ReadCheckinStatus();

  const [courseText, onChangeCourseText] = React.useState('');
  const [timeText, onChangeTimeText] = React.useState('');
  const [statusText, onChangeStatusText] = React.useState(checkinStatus == CheckinStatus.CheckedIn ?
                                                      CheckinStatus.CheckedIn : CheckinStatus.NotCheckedIn);
  const [pageVariant, setPageVariant] = React.useState(checkinStatus == CheckinStatus.CheckedIn ? 
                                                      PageVariant.CheckedIn : PageVariant.Default);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const HasPermission = () => !(hasPermission === null || hasPermission === false);

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  // Add handle bar code logic to here
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    onChangeStatusText(CheckinStatus.CheckedIn);
    setPageVariant(PageVariant.CheckedIn);
  };

  return (
    <CommonPart 
      title={"QR Code Scan"}
      components={
        <View style={{flex: 6}}>

        <KolynSwitchCourseButton
          onPress={()=>{navigation.navigate("SwitchCourse")}}
        />

        <View style={{top: 50, flex: 2}}>

          <KolynCourseLabel
            courseText={courseText}
            onChangeCourseText={onChangeCourseText}
            text="CS 320, Jaime Dávila"
            textColor={GetPrimaryColor()}
          />

          <KolynCourseLabel
            courseText={timeText}
            onChangeCourseText={onChangeTimeText}
            text="Tu, Th 13:00 - 14:15"
            textColor={GetPrimaryColor()}
          />

        </View>

        <View style={{top: 50, flex: 3}}>

          { pageVariant == PageVariant.Default && !((hasPermission === null || hasPermission === false)) &&
          <CameraScanner
            handleBarCodeScanned={handleBarCodeScanned}
            style={themedStyles.barCodeScanner}
          /> }

          { pageVariant == PageVariant.Default && HasPermission && <ScanHintLabel 
                                                                    text={"Scan your instructor's QR code to check in."}
                                                                    style={themedStyles.scanHintLabel}
                                                                  />}

          { pageVariant == PageVariant.CheckedIn && HasPermission && <MessageLabel 
                                                                      text={"You have been checked in."}
                                                                      style={themedStyles.messageLabel}
                                                                    />}

          { pageVariant == PageVariant.CheckedIn && HasPermission && <ScanAgainButton 
                                                                      onPress={()=>{setPageVariant(PageVariant.Default)}}
                                                                      buttonStyle={themedStyles.scanAgainButton}
                                                                      labelStyle={themedStyles.scanAgainLabel}
                                                                    /> }

          { !HasPermission && <MessageLabel 
                                text={"Camera permission is not enabled."}
                                style={themedStyles.messageLabel}
                              />}

          { !HasPermission && <GrantPermissionButton 
                                onPress={() => {setHasPermission(true)}}
                                buttonStyle={themedStyles.scanAgainButton}
                                labelStyle={themedStyles.scanAgainLabel}
                              />}

        </View>

        <StatusLabel
          statusText={statusText}
          onChangeStatusText={onChangeStatusText}
          style={themedStyles.statusLabel}
        />

        </View>
      }
    />
  );
}

/* Internal logic code start */

function GetPrimaryColor() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;
  return currentTheme.primaryColor;
}

/* Internal logic code end */

/*************************************************************************************************/

/* Connect to backend logic code start */

/* 
  Read the check-in status from the server
  returns a CheckinStatus enum
*/
function ReadCheckinStatus()
{
  return CheckinStatus.NotCheckedIn;
}

/* Connect to backend logic code end */

/*************************************************************************************************/

/* User interface code start */

/* The in-app camera scanner, dose not work in a simulator */
function CameraScanner({ handleBarCodeScanned, style }) {
  return (
    <View>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={style}
      />
    </View>
  );
}

/* A button when pressed changed the page variant to default */
function ScanAgainButton({ onPress, buttonStyle, labelStyle }) {
  return (
    <Pressable style={buttonStyle} onPress={onPress}>
        <Text style={labelStyle}>Press to scan again</Text>
    </Pressable>
  );
}

function GrantPermissionButton({ onPress, buttonStyle, labelStyle }) {
  return (
    <Pressable style={buttonStyle} onPress={onPress}>
        <Text style={labelStyle}>Grant Permission</Text>
    </Pressable>
  );
}

/* Show the user that he has been checked in */
function MessageLabel({ text, style }) {
  return (
    <Text
      style={style}
    >
      { text }
    </Text>
  );
}

/* A tiny label used to hint the user to scan the QR code */
function ScanHintLabel({ text, style }) {
  return (
    <Text
      style={style}
    >
      { text }
    </Text>
  );
}

/* The label used to indicate check-in status to the user */
function StatusLabel({ statusText, onChangeStatusText, style }) {
  return (
    <TextInput
      editable={false}
      style={style}
      onChangeText={onChangeStatusText}
    >
      { statusText }
    </TextInput>
  );
}

/* User interface code end */

const {width, height} = Dimensions.get('window');

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
  
    barCodeScanner: {top: -120, height: height/3, width: width, alignSelf: 'center'},
  
    messageLabel: StyleSheet.flatten([
      {alignSelf: 'center', height: 30, top: -50},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.primaryColor)
    ]),
  
    scanHintLabel: StyleSheet.flatten([
      {alignSelf: 'center', height: 30, top: -110},
      KolynStyle.kolynLabel(currentTheme.fontSizes.tiny, currentTheme.mainFont, currentTheme.primaryColor)
    ]),
  
    statusLabel: StyleSheet.flatten([
      {alignSelf: 'center', height: 30, top: -40},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.primaryColor)
    ]),
  
    scanAgainButton: StyleSheet.flatten([
      {top: 55, width: 240, alignSelf: 'center'}, 
      KolynStyle.kolynButton(currentTheme.primaryColor),
    ]),
  
    scanAgainLabel: StyleSheet.flatten([
      KolynStyle.kolynLabel(currentTheme.fontSizes.casual, currentTheme.mainFont, currentTheme.mainColor)
    ]),
  }));
}
