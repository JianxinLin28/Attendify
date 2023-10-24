import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, TextInput } from 'react-native';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { currentTheme } from '../kits/AppTheme';
import * as KolynStyle from '../kits/KolynStyleKit';
import {KolynSwitchCourseButton } from '../kits/KolynComponentKit';
import { CommonPart } from '../kits/CommonPart';
import { BarCodeScanner } from 'expo-barcode-scanner';


const {width, height} = Dimensions.get('window');

const CheckinStatus = {
  CheckedIn: 'Status: Checked in',
  NotCheckedIn: 'Status: Not checked in'
}

const PageVariant = {
  Default: 'Default',
  ScanSuccess: 'ScanSuccess',
  CheckedIn: 'CheckedIn',
  ScanFail: 'ScanFail'
}

const ScanMessage = {
  Success: 'Scan success! You have been checked in !',
  Fail: 'Scan failed, please try again.',
}

export function QRScanPage() {
  const checkinStatus = ReadCheckinStatus();

  const [courseText, onChangeCourseText] = React.useState('');
  const [timeText, onChangeTimeText] = React.useState('');
  const [statusText, onChangeStatusText] = React.useState('');
  const [pageVariant, setPageVariant] = React.useState(
                                                      checkinStatus == CheckinStatus.CheckedIn ? 
                                                      PageVariant.CheckedIn : PageVariant.Default);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <CommonPart 
      title={"QR Code Scan"}
      components={
        <View style={{flex: 6}}>

        <KolynSwitchCourseButton
          foregroundColor={currentTheme.mainColor}
          backgroundColor={currentTheme.primaryColor}
        />

        <View style={{top: 50, flex: 2}}>

          <CourseLabel
            courseText={courseText}
            onChangeCourseText={onChangeCourseText}
            text="CS 320, Jaime Dávila"
          />

          <CourseLabel
            courseText={timeText}
            onChangeCourseText={onChangeTimeText}
            text="Tu, Th 13:00 - 14:15"
          />

        </View>

        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{top: 30, height: 300, width: width, alignSelf: 'center'}}
        />
        {scanned && <Pressable title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}

        <View style={{top: 50, flex: 3}}>

          { /* pageVariant == PageVariant.Default && <CameraButton onPress={()=>OpenCameraApp()}/> */ }

          { /* pageVariant == PageVariant.CheckedIn && <DisabledCameraButton/> */ }

          { pageVariant == PageVariant.ScanSuccess && <MessageLabel text={ScanMessage.Success}/> }

          { pageVariant == PageVariant.ScanSuccess && <OKButton onPress={()=>{setPageVariant(PageVariant.CheckedIn)}}/> }

          { pageVariant == PageVariant.ScanFail && <MessageLabel text={ScanMessage.Fail}/> }

          { pageVariant == PageVariant.ScanFail && <View style={styles.scanPageCameraButton}><CameraButton onPress={()=>OpenCameraApp()}/></View> }

        </View>

        <StatusLabel
          statusText={statusText}
          onChangeStatusText={onChangeStatusText}
          checkinStatus={checkinStatus}
        />

        </View>
      }
    />
  );
}

/* Internal logic code start */

function OpenCameraApp() {

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

function MessageLabel({ text }) {
  return (
    <Text
      style={[styles.courseLabel, {flex: 1, flexWrap: 'wrap', top: -50}]}
    >
      { text }
    </Text>
  );
}

function CourseLabel({ courseText, onChangeCourseText, text }) {
  return (
    <TextInput
      editable={false}
      style={styles.courseLabel}
      value={courseText}
      onChangeText={onChangeCourseText}
    >
      { text }
    </TextInput>
  );
}

function OKButton({ onPress }) {
  return (
    <Pressable style={[
      styles.cameraButton,
      styles.scanPageCameraButton
    ]}
      onPress={onPress}
    >
      <Text style={styles.cameraButtonLabel}>OK</Text>
    </Pressable>
  );
}

/* The open camera button */
function CameraButton({ onPress }) {
  return (
    <Pressable style={[
      styles.cameraButton]}
      onPress={onPress}
    >
      <Text style={styles.cameraButtonLabel}>Open 'Camera'</Text>
    </Pressable>
  );
}

/* The open camera button */
function DisabledCameraButton() {
  return (
    <Pressable style={[
      styles.disabledCameraButton]}
    >
      <Text style={styles.cameraButtonLabel}>Open 'Camera'</Text>
    </Pressable>
  );
}

/* The label used to indicate check-in status to the user */
function StatusLabel({ statusText, onChangeStatusText, checkinStatus }) {
  return (
    <TextInput
      editable={false}
      style={styles.statusLabel}
      value={statusText}
      onChangeText={onChangeStatusText}
    >
      { checkinStatus }
    </TextInput>
  );
}

/* User interface code end */

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

  scanPageCameraButton: { top: -200 },

  disabledCameraButton: StyleSheet.flatten([
    {height: 40, width: 160, justifyContent: 'flex-start', alignItems: 'center'},
    KolynStyle.kolynButton(currentTheme.disableColor),
  ]),

  cameraButtonLabel: StyleSheet.flatten([
    KolynStyle.kolynLabel(currentTheme.fontSizes.medium, currentTheme.mainFont, currentTheme.mainColor,),
  ]),
});
