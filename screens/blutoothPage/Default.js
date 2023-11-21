import * as React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { KolynSwitchCourseButton } from '../../kits/KolynComponentKit';
import { CommonPart } from '../../kits/CommonPart';
import { KolynCourseLabel, KolynBluetoothScanIcon } from '../../kits/KolynComponentKit';
import { CheckinStatus, ReadCheckinStatus } from '../../logic/CheckinStatus';
import { getCourseIndex } from '../../props/CurrentCourse';
import { GetSampleCourseList } from '../../props/CourseList';


export const Hint = {
  PressButton: 'Press to search for Beacon to check in.',
  Searching: 'Searching...',
  CheckedIn: 'You have been checked in for this section.',
  SearchFail: 'Searching has failed, please retry.'
}

export function BluetoothPageDefault({navigation}) {
  const themedStyles = ThemedStyles();

  // Read the check-in status from the database for
  // each time you render this page
  const checkinStatus = ReadCheckinStatus();

  const disableColor = GetDisableColor();
  const mainColor = GetMainColor();

  const [courseText, onChangeCourseText] = React.useState('');
  const [timeText, onChangeTimeText] = React.useState('');
  const [pressHintText, onChangePressHintText] = React.useState(Hint.PressButton);
  const [disableButton, onButtonDisabled] = React.useState(false);
  const [enableCircularRotation, onEnableCircularRotation] = React.useState(false);

  var initialElements = GetSampleCourseList(); // GetCourseArray()
  const [elementState, setElementState] = React.useState(initialElements);
  const [currentCourseIndex, setCurrentCourseIndex] = React.useState(getCourseIndex());

  // The check-in status text for the label
  const [statusText, onChangeStatusText] = React.useState(checkinStatus == CheckinStatus.CheckedIn ?
    CheckinStatus.CheckedIn : CheckinStatus.NotCheckedIn);

  var touchProps = {
    backgroundColor: !disableButton ? mainColor : disableColor
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCurrentCourseIndex(getCourseIndex());
    });
    return () => unsubscribe();
  }, [navigation]);

  return (
    <CommonPart 
      title={"Bluetooth Scan"}
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

          <View style={{flex: 5}}>
            <TouchableOpacity
              style={[{...touchProps}, themedStyles.scanButton]}
              onPress={()=>{
                ScanButtonPressed(onChangePressHintText, 
                                    onChangeStatusText,
                                    onButtonDisabled,
                                    onEnableCircularRotation);
              }}
              disabled={disableButton}
            >
              <KolynBluetoothScanIcon
                enableCircularRotation = {enableCircularRotation}
              />
            </TouchableOpacity>
          </View>

          <View style={{flex: 1}}>
            <PressHintLabel
              labelStyle={themedStyles.pressHintLabel}
              pressHintText={pressHintText}
            />
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
  )
}

/* Internal logic code start */

function GetMainColor() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;
  return currentTheme.mainColor;
}

function GetDisableColor() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;
  return currentTheme.disableColor;
}

function GetPrimaryColor() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;
  return currentTheme.primaryColor;
}

function ScanButtonPressed(onChangePressHintText,
                            onChangeStatusText,
                            onButtonDisabled,
                            onEnableCircularRotation) {
  onChangePressHintText(Hint.Searching);
  onEnableCircularRotation(true);
  
  const delayedSuccess = () => {
    SwitchToCheckedInUI(onChangePressHintText, 
      onChangeStatusText,
      onButtonDisabled);
    onEnableCircularRotation(false);
  }

  const delayedFail = () => {
    SwitchToFail(onChangePressHintText);
    onEnableCircularRotation(false);
  }

  const timeout = setTimeout(delayedSuccess, 7000);

  // clearTimeout(timeout)
}

function SwitchToCheckedInUI(onChangePressHintText, 
                              onChangeStatusText,
                              onButtonDisabled) {
  onChangePressHintText(Hint.CheckedIn);
  onChangeStatusText(CheckinStatus.CheckedIn);
  onButtonDisabled(true);
}

function SwitchToFail(onChangePressHintText) {
  onChangePressHintText(Hint.SearchFail);
}

/* Internal logic code end */

/*************************************************************************************************/

/* Connect to backend logic code start */

// Go to ./logic/CheckinStatus.js to implement code

/* Connect to backend logic code end */

/*************************************************************************************************/

/* User interface code start */

function PressHintLabel({ labelStyle, pressHintText }) {
  return (
    <Text style={labelStyle}>
      {pressHintText}
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

function ThemedStyles() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return (StyleSheet.create({
    pressHintLabel: StyleSheet.flatten([
      {alignSelf: 'center', width: 250, height: 90, top: -20, textAlign: 'center'},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.primaryColor)
    ]),

    scanButton: {
      top: -20,
      borderRadius: 110, 
      width: 220, 
      height: 220,
      alignSelf: 'center',
      alignContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5, // This is for Android
    },

    scanButtonEnableColor: {
      backgroundColor: currentTheme.mainColor
    },

    scanButtonDisableColor: {
      backgroundColor: currentTheme.disableColor
    },

    statusLabel: StyleSheet.flatten([
      {alignSelf: 'center', height: 30, top: 30},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.primaryColor)
    ]),
  }));
}
