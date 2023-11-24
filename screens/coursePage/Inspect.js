import * as React from 'react';
import { LogBox } from 'react-native';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';
import { KolynSubtitleLabel, KolynCourseLabel, KolynCasualButton } from '../../kits/KolynComponentKit';
import { SpringButton } from '../../kits/SpringButton';


LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export function CoursePageInspect({route, navigation}) {
  const themedStyles = ThemedStyles();

  const [courseText, onChangeCourseText] = React.useState('');
  const [timeText, onChangeTimeText] = React.useState('');

  const course = route.params?.fromDefaultPage;

  const courseID = course.getID().toString();

  return (
      <CommonPart title={"Manage Course"}
        components={
          <View style={themedStyles.background}>

            <View style={{flex: 2}}>
              <KolynSubtitleLabel title="Course statics" />
            </View>

            <View style={{flex: 2}}>
              <KolynCourseLabel
                courseText={courseText}
                onChangeCourseText={onChangeCourseText}
                text={course.getTitle()}
                textColor={GetSubColor()}
              />

              <KolynCourseLabel
                courseText={timeText}
                onChangeCourseText={onChangeTimeText}
                text={course.getTimespan()}
                textColor={GetSubColor()}
              />
            </View>

            <View style={{flex: 2}}>

              <TextLabel
                text={""}
                onChangeText={()=>{}}
                content={`Course id: ${ courseID }`}
              />

              <TextLabel
                text={""}
                onChangeText={()=>{}}
                content={"Course section: none"}
              />

              <TextLabel
                text={""}
                onChangeText={()=>{}}
                content={"Enrolled: 9/6/2023"}
              />

            </View>

            <View style={{flex: 2}}>
              <QuitCourseButton
                buttonStyle={themedStyles.quitCourseButton}
                labelStyle={themedStyles.quitCourseButtonLabel}
                navigation={navigation}
                course={course}
              />
            </View>

            <View style={{flex: 2}}>
              <ApplyExcuseButton 
                navigation={navigation}
              />
            </View>

            <View style={{flex: 2}}>
              <GoBackButton
                navigation={navigation}
              />
            </View>

          </View>
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

/* Connect to backend logic code end */

/*************************************************************************************************/

/* User interface code start */

function TextLabel({ text, onChangeText, content }) {
  return (
    <KolynCourseLabel
      courseText={text}
      onChangeCourseText={onChangeText}
      text={content}
      textColor={GetSubColor()}
    />
  );
}

function QuitCourseButton({buttonStyle, 
                          labelStyle, 
                          navigation, 
                          course}) {
  return (
    <SpringButton
      text="Quit Course"
      onPress={()=>{navigation.navigate("CoursePageQuitCourse", {fromInspectPage: course})}}
      buttonStyle={buttonStyle}
      labelStyle={labelStyle}
    />
  );
}

function ApplyExcuseButton({navigation}) {
  return (
    <KolynCasualButton
      onPress={()=>{navigation.navigate("CoursePageExcuse")}}
      text={"Apply Excuse"}
    />
  );
}

function GoBackButton({navigation}) {
  return (
    <KolynCasualButton
      onPress={()=>{navigation.replace("CoursePageDefault")}}
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

    quitCourseButton: StyleSheet.flatten([
      {width: 130},
      KolynStyle.kolynButton(currentTheme.mainColor),
    ]),
  
    quitCourseButtonLabel: StyleSheet.flatten([
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.primaryColor)
    ]),

  }));
}
