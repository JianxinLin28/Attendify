import * as React from 'react';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';
import { KolynSubtitleLabel } from '../../kits/KolynComponentKit';


export function CoursePageExcuse() {
  const themedStyles = ThemedStyles();

  return (
      <CommonPart title={"Manage Course"}
        components={
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

              <View style={{flex: 2}}>

              </View>

            </View>
        }
      />
  );
}

/* Internal logic code start */

/* Internal logic code end */

/*************************************************************************************************/

/* Connect to backend logic code start */

/* Connect to backend logic code end */

/*************************************************************************************************/

/* User interface code start */

function UploadDocumentButton() {
  
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
