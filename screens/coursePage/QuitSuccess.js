import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';
import { KolynSubtitleLabel, KolynCourseLabel, KolynCasualButton } from '../../kits/KolynComponentKit';


export function CoursePageQuitSuccess({route, navigation}) {
  const themedStyles = ThemedStyles();

  const [courseText, onChangeCourseText] = React.useState('');
  const [timeText, onChangeTimeText] = React.useState('');

  const course = route.params?.fromQuitCoursePage;

  return (
      <CommonPart title={"Manage Course"}
        components={
            <View style={themedStyles.background}>

              <View style={{flex: 2}}>
                <KolynSubtitleLabel title="Course quitted:" />
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

              <View style={{flex: 2}}></View>

              <View style={{flex: 2}}></View>

              <View style={{flex: 2}}></View>

              <View style={{flex: 2}}>
                <ContinueButton
                  navigation={navigation}
                  courseID={course.getID()}
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

function ContinueButton({navigation, courseID}) {
  return (
    <KolynCasualButton 
      onPress={()=>{navigation.navigate("CoursePageDefault", {fromQuitSuccessPage: courseID})}} 
      text="Continue"
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

  }));
}
