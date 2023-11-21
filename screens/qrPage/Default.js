import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, TextInput } from 'react-native';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import * as KolynStyle from '../../kits/KolynStyleKit';
import {KolynSwitchCourseButton, KolynCourseLabel } from '../../kits/KolynComponentKit';
import { CommonPart } from '../../kits/CommonPart';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ThemeContext} from '../../kits/AppTheme';
import { CheckinStatus, ReadCheckinStatus } from '../../logic/CheckinStatus';
import { getCourseIndex } from '../../props/CurrentCourse';
import { GetSampleCourseList } from '../../props/CourseList';


/*
  -> Purely for UI purpose <-
  Handle what contents should be rendered in the current page
  See the page function below, the conditional rendering
  determines what components are rendered
*/
const PageVariant = {
  Default: 'Default',
  CheckedIn: 'CheckedIn',
  CodeInvalid: 'CodeInvalid',
}

/*
  The default QR code scan page
*/
export function QRScanPageDefault({navigation}) {
  const themedStyles = ThemedStyles();

  // Read the check-in status from the database for
  // each time you render this page
  const checkinStatus = ReadCheckinStatus();

  // Remember, if you need to change the text, you need to call onChange...
  // The label for the course name
  const [courseText, onChangeCourseText] = React.useState('');
  // The label for the course time
  const [timeText, onChangeTimeText] = React.useState('');
  // The check-in status text for the label
  const [statusText, onChangeStatusText] = React.useState(checkinStatus == CheckinStatus.CheckedIn ?
                                                      CheckinStatus.CheckedIn : CheckinStatus.NotCheckedIn);
  // The current page variant
  const [pageVariant, setPageVariant] = React.useState(checkinStatus == CheckinStatus.CheckedIn ? 
                                                      PageVariant.CheckedIn : PageVariant.Default);
  // Camera permission is an optional boolean
  const [hasPermission, setHasPermission] = useState(null);

  var initialElements = GetSampleCourseList(); // GetCourseArray()
  const [elementState, setElementState] = React.useState(initialElements);
  const [currentCourseIndex, setCurrentCourseIndex] = React.useState(getCourseIndex());


  const HasPermission = () => !(hasPermission === null || hasPermission === false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCurrentCourseIndex(getCourseIndex());
    });
    return () => unsubscribe();
  }, [navigation]);

  // Add handle bar code logic to here
  const handleBarCodeScanned = ({ type, data }) => {
    var isQRCodeValid = IsQRCodeValid(type, data);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    if (isQRCodeValid) {
      onChangeStatusText(CheckinStatus.CheckedIn);
      setPageVariant(PageVariant.CheckedIn);
    } else {
      setPageVariant(PageVariant.CodeInvalid);
    }
  };

  return (
    <CommonPart 
      title={"QR Code Scan"}
      components={
        <GainCameraPermission
          setHasPermission={setHasPermission}
          components={
          <View style={{flex: 6}}>

            <View style={{flex: 2}}>
              <KolynSwitchCourseButton
                onPress={()=>{navigation.navigate("SwitchCourse")}}
              />
            </View>

            <View style={{flex: 2, top: -20}}>

              <KolynCourseLabel
                courseText={courseText}
                onChangeCourseText={onChangeCourseText}
                text={elementState[currentCourseIndex].course.getTitle()}
                textColor={GetPrimaryColor()}
              />

              <KolynCourseLabel
                courseText={timeText}
                onChangeCourseText={onChangeTimeText}
                text={elementState[currentCourseIndex].course.getTimespan()}
                textColor={GetPrimaryColor()}
              />

            </View>

            <View style={{flex: 2}}>
              { pageVariant == PageVariant.Default && HasPermission() &&
                <CameraScanner
                  handleBarCodeScanned={handleBarCodeScanned}
                  style={themedStyles.barCodeScanner}
                /> }

              { pageVariant == PageVariant.Default && HasPermission() && 
                <ScanHintLabel 
                  text={"Scan your instructor's QR code to check in."}
                  style={themedStyles.scanHintLabel}
                /> }

              { pageVariant == PageVariant.CheckedIn && HasPermission() && 
                <MessageLabel 
                  text={"You have been checked in."}
                  style={themedStyles.messageLabel}
                /> }

              { pageVariant == PageVariant.CheckedIn && HasPermission() && 
                <ScanAgainButton 
                  onPress={()=>{setPageVariant(PageVariant.Default)}}
                  buttonStyle={themedStyles.scanAgainButton}
                  labelStyle={themedStyles.scanAgainLabel}
                /> }
            </View>

            <View style={{flex: 2}}>
              { !HasPermission() && 
                <MessageLabel 
                  text={"Camera permission is not enabled."}
                  style={themedStyles.messageLabel}
                /> }
            </View>

            <View style={{flex: 2}}>
              { !HasPermission() && <GrantPermissionButton 
                onPress={() => {
                    const getBarCodeScannerPermissions = async () => {
                      const { status } = await BarCodeScanner.requestPermissionsAsync();
                      setHasPermission(status === 'granted');
                    };

                    getBarCodeScannerPermissions();
                }}
                buttonStyle={themedStyles.scanAgainButton}
                labelStyle={themedStyles.scanAgainLabel}
              /> }
            </View>

            <View style={{flex: 2}}>
              <StatusLabel
                statusText={statusText}
                onChangeStatusText={onChangeStatusText}
                style={themedStyles.statusLabel}
              />
            </View>

          </View>
        }
        />
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

/*
  There is a strange warning bug here but it should not interfer
  the user experience
*/
function GainCameraPermission({ components, setHasPermission}) {
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  return (
    components
  );
}

/* Internal logic code end */

/*************************************************************************************************/

/* Connect to backend logic code start */


// Send the QR code data to the backend and
// check if the code is valid
// return a boolean
function IsQRCodeValid(type, data) {
  return true;
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
      {alignSelf: 'center', height: 30, top: 30},
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
