import * as React from 'react';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';
import { KolynSubtitleLabel, KolynCasualButton } from '../../kits/KolynComponentKit';


export function CoursePageAddCourse({navigation}) {
  const themedStyles = ThemedStyles();

  return (
      <CommonPart title={"Manage Course"}
        components={
          <View style={themedStyles.background}>
            <KolynSubtitleLabel title="Add course" />
            <View style={{flex: 3}}/>
            <View style={{flex: 3}}>
              <AddCourseButton
                navigation={navigation}
              />
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
  var isAddingCourseSuccessful = false;

  if (isAddingCourseSuccessful) {
    navigation.replace("CoursePageAddSuccess");
  } 
  else {
    navigation.replace("CoursePageAddFail");
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
