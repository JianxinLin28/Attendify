import * as React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';
import { KolynSubtitleLabel, KolynCasualButton } from '../../kits/KolynComponentKit';


export function CoursePageAddCourse({navigation}) {
  const themedStyles = ThemedStyles();

  const [idText, onChangeIDText] = React.useState('');

  return (
      <CommonPart title={"Manage Course"}
        components={
          <View style={themedStyles.background}>

            <View style={{flex: 2}}>
              <KolynSubtitleLabel title="Add course" />
            </View>

            <View style={{flex: 2}}/>
            
            <View style={{flex: 2}}/>

            <View style={{flex: 2, top: -70}}>
              <EnterCourseIDHintLabel style={themedStyles.enterCourseIDHintLabel}/>
              <CourseIDTextfild
                onChangeIDText={onChangeIDText}
                idText={idText}
                textfieldStyle={themedStyles.inputTextfield}
              />
            </View>

            <View style={{flex: 2}}>
              <AddCourseButton
                navigation={navigation}
              />
            </View>

            <View style={{flex: 2}}>
              <KolynCasualButton 
                onPress={()=>{navigation.replace("CoursePageDefault")}} 
                text="Go Back"
              />
            </View>

          </View>
        }
      />
  );
}

/* Internal logic code start */

function PressAddCourseButton({navigation}) {
  var isAddingCourseSuccessful = true;

  if (isAddingCourseSuccessful) {
    navigation.push("CoursePageAddSuccess");
  } 
  else {
    navigation.push("CoursePageAddFail");
  }
}

/* Internal logic code end */

/*************************************************************************************************/

/* Connect to backend logic code start */

/* Connect to backend logic code end */

/*************************************************************************************************/

/* User interface code start */

function AddCourseButton({navigation}) {
  return (
    <KolynCasualButton 
      onPress={()=>{PressAddCourseButton({navigation: navigation})}} 
      text="Add"
    />
  );
}

function EnterCourseIDHintLabel({ style }) {
  return (
    <Text style={style} >
      { "Please enter the course id:" }
    </Text>
  );
}

function CourseIDTextfild({ onChangeIDText, idText, textfieldStyle }) {
  return (
    <TextInput
      style={textfieldStyle}
      value={idText}
      onChangeText={onChangeIDText}
      placeholder=""
      keyboardType="default"
      secureTextEntry={false}
    />);
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

    enterCourseIDHintLabel: StyleSheet.flatten([
      {alignSelf: 'center', height: 30},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.subColor)
    ]),

    inputTextfield: StyleSheet.flatten([
      {height: 40, width: 300, borderWidth: 3, borderColor: currentTheme.subColor}, 
      KolynStyle.kolynInputTextfield(currentTheme.primaryColor, currentTheme.mainFont),
    ]),

  }));
}
