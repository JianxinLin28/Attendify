import * as React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { StyleSheet, View, TextInput, Pressable, Text } from 'react-native';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';
import { KolynSubtitleLabel, KolynCourseLabel, KolynCasualButton } from '../../kits/KolynComponentKit';
import { SpringButton } from '../../kits/SpringButton';


export function CoursePageExcuse({navigation}) {
  const themedStyles = ThemedStyles();

  const [courseText, onChangeCourseText] = React.useState('');
  const [timeText, onChangeTimeText] = React.useState('');
  const [excuseText, onChangeExcuseText] = React.useState('');

  return (
      <CommonPart title={"Manage Course"}
        components={
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={themedStyles.background}>

              <View style={{flex: 2}}>
                <KolynSubtitleLabel title="Apply for excuse" />
              </View>

              <View style={{flex: 2}}>
                <KolynCourseLabel
                  courseText={courseText}
                  onChangeCourseText={onChangeCourseText}
                  text="CS 320, Jaime Dávila"
                  textColor={GetSubColor()}
                />

                <KolynCourseLabel
                  courseText={timeText}
                  onChangeCourseText={onChangeTimeText}
                  text="Tu, Th 13:00 - 14:15"
                  textColor={GetSubColor()}
                />
              </View>

              <View style={{flex: 2, top: -30}}>
                <UploadDocumentButton
                  buttonStyle={themedStyles.uploadButton}
                  labelStyle={themedStyles.uploadButtonLabel}
                  navigation={navigation}
                />
                <ExcuseTextfield
                  onChangeExcuseText={onChangeExcuseText}
                  excuseText={excuseText}
                  textfieldStyle={themedStyles.inputTextfield}
                />
              </View>

              <View style={{flex: 2}}></View>

              <View style={{flex: 2}}>
                <ConfirmButton 
                  navigation={navigation}
                />
              </View>

              <View style={{flex: 2}}>
                <GoBackButton
                  navigation={navigation}
                />
              </View>

            </View>
            </TouchableWithoutFeedback>
        }
      />
  );
}

/* Internal logic code start */

function GetSubColor() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;
  return currentTheme.subColor;
}

/* Internal logic code end */

/*************************************************************************************************/

/* Connect to backend logic code start */

/*
  Called when ther confirm button is pressed
  Send the excuse message to the data base
  return true if the message is successfully sent
  otherwise return false
*/
function ConfirmButtonPressed(excuseMessage) {
  return true;
}

/* Connect to backend logic code end */

/*************************************************************************************************/

/* User interface code start */

function UploadDocumentButton({buttonStyle, labelStyle, navigation}) {
  return (
    <SpringButton
      text="Upload Document"
      onPress={()=>{navigation.navigate("UploadDocumentPage")}}
      buttonStyle={buttonStyle}
      labelStyle={labelStyle}
    />
  );
}

function ExcuseTextfield({ onChangeExcuseText, excuseText, textfieldStyle }) {
  return (
    <TextInput
      style={textfieldStyle}
      value={excuseText}
      onChangeText={onChangeExcuseText}
      placeholder="Please state your reasons why you want to apply for an excuse for the next meeting section in this box. You instructor will see this."
      keyboardType="default"
      secureTextEntry={false}
      multiline={true}
    />);
}

function ConfirmButton({navigation}) {
  return (
    <KolynCasualButton
      onPress={()=>{navigation.navigate("CoursePageExcuseSuccess")}}
      text={"Confirm"}
    />
  );
}

function GoBackButton({navigation}) {
  return (
    <KolynCasualButton
      onPress={()=>{navigation.goBack()}}
      text={"Go Back"}
    />
  );
}

/* User interface code end */

function ThemedStyles() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return (StyleSheet.create({

    background: StyleSheet.flatten([
      {top: -20},
      KolynStyle.kolynPrimaryColorScreen(currentTheme.primaryColor)
    ]),

    inputTextfield: StyleSheet.flatten([
      {
        height: 150, 
        width: 300, 
        borderWidth: 3, 
        borderColor: currentTheme.subColor,
      }, 
      KolynStyle.kolynInputTextfield(currentTheme.primaryColor, currentTheme.mainFont),
    ]),

    uploadButton: StyleSheet.flatten([
      {width: 200},
      KolynStyle.kolynButton(currentTheme.mainColor),
    ]),
  
    uploadButtonLabel: StyleSheet.flatten([
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.primaryColor)
    ]),

  }));
}
