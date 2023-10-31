import * as React from 'react';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';
import { KolynSubtitleLabel, KolynCourseLabel, KolynCasualButton } from '../../kits/KolynComponentKit';


export function CoursePageInspect({navigation}) {
  const themedStyles = ThemedStyles();

  const [courseText, onChangeCourseText] = React.useState('');
  const [timeText, onChangeTimeText] = React.useState('');

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

              <TextLabel
                text={""}
                onChangeText={()=>{}}
                content={"Course id: HE7LE8"}
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
              <QuitCourseButton/>
            </View>

            <View style={{flex: 2}}>
              <ApplyExcuseButton/>
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

function QuitCourseButton() {
  const themedStyles = ThemedStyles();

  return (
    <Pressable
      style={[themedStyles.quitCourseButton]}>
      <Text style={[themedStyles.quitCourseButtonLabel]}>Quit Course</Text>
    </Pressable>
  );
}

function ApplyExcuseButton() {
  return (
    <KolynCasualButton
      onPress={()=>{}}
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
