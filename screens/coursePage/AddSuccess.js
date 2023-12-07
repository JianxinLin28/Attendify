import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';
import { KolynSubtitleLabel, KolynCourseLabel, KolynCasualButton } from '../../kits/KolynComponentKit';


export function CoursePageAddSuccess({navigation}) {
  const themedStyles = ThemedStyles();

  const [courseText, onChangeCourseText] = React.useState('');
  const [timeText, onChangeTimeText] = React.useState('');

  return (
      <CommonPart title={"Manage Course"}
        components={
            <View style={themedStyles.background}>

              <View style={{flex: 2}}>
                <KolynSubtitleLabel title="Successfully added:" />
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

              <View style={{flex: 2}}></View>

              <View style={{flex: 2}}></View>

              <View style={{flex: 2}}></View>

              <View style={{flex: 2}}>
                <GreatButton
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

function GreatButton({navigation}) {
  return (
    <KolynCasualButton 
      onPress={()=>{navigation.navigate("CoursePageDefault")}} 
      text="Great"
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
