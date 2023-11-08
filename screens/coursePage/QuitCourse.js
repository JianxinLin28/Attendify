import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';
import { KolynSubtitleLabel, KolynCourseLabel, KolynCasualButton } from '../../kits/KolynComponentKit';


export function CoursePageQuitCourse({navigation}) {
  const themedStyles = ThemedStyles();

  const [courseText, onChangeCourseText] = React.useState('');
  const [timeText, onChangeTimeText] = React.useState('');

  return (
      <CommonPart title={"Manage Course"}
        components={
          <View style={themedStyles.background}>

            <View style={{flex: 2}}>
              <KolynSubtitleLabel title="Quit course" />
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

            <View style={{flex: 2}}>
              <AreYouSureLabel
                style={themedStyles.areYouSureLabel}
              />
              <HintLabel style={themedStyles.hintLabel} />
            </View>

            <View style={{flex: 2}}>
              
            </View>

            <View style={{flex: 2}}>
              <QuitCourseButton
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

function AreYouSureLabel({ style }) {
  return (
    <Text style={style}>
      { "Are you sure you want to quit?" }
    </Text>
  );
}

function HintLabel({ style }) {
  return (
    <Text style={style}>
      { "Your data will be saved so that when you re-enroll the system will automatically fetch your information." }
    </Text>
  );
}

function QuitCourseButton({navigation}) {
  return (
    <KolynCasualButton 
      onPress={()=>{navigation.navigate("CoursePageQuitSuccess")}} 
      text="Quit"
    />
  );
}

function GoBackButton({navigation}) {
  return (
    <KolynCasualButton 
      onPress={()=>{navigation.goBack()}} 
      text="GoBack"
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

    areYouSureLabel: StyleSheet.flatten([
      {alignSelf: 'center', height: 30},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.subColor)
    ]),

    hintLabel: StyleSheet.flatten([
      {alignSelf: 'center', height: 60,  flex: 1, flexWrap: 'wrap', width: '60%'},
      KolynStyle.kolynLabel(currentTheme.fontSizes.tiny, currentTheme.mainFont, currentTheme.subColor)
    ]),

  }));
}
