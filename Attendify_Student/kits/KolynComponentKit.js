import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image, Dimensions } from 'react-native';
import { currentTheme } from './AppTheme';
import * as KolynStyle from '../kits/KolynStyleKit';


const {width} = Dimensions.get('window');

/* The icon & title image */
export function KolynMainTitleImage() {
  return (
    <Image
      source={require('../assets/main-title.png')}
      style={styles.mainTitle}
    />
  );
}

export function KolynTopTitleLabel({ text, foregroundColor }) {
  return (
    <View
      style={styles.topTitle}>
      <Text style={[styles.topTitleLabel, {color: foregroundColor}]}>{text}</Text>
    </View>
  );
}

/* Navigate to 'Switch Course' page when pressed */
/* By default, background white, foreground blue */
export function KolynSwitchCourseButton({ foregroundColor, backgroundColor }) {
  return (
    <Pressable
      style={[styles.switchCourseButton, {backgroundColor: backgroundColor}]}>
      <Text style={[styles.switchCourseButtonLabel, {color: foregroundColor}]}>Switch course</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({

  mainTitle: {
    resizeMode: 'contain',
    width: 400,
    height: width*0.2,
    alignSelf: 'center',
  },

  topTitle: {color: currentTheme.mainColor},

  topTitleLabel: StyleSheet.flatten([
    {alignSelf: 'center', height: 50, top: -10},
    KolynStyle.kolynLabel(currentTheme.fontSizes.casual, currentTheme.mainFont, currentTheme.primaryColor)
  ]),

  switchCourseButton: StyleSheet.flatten([
    {top: 20, width: 150, height: 40, end: -width/3.5}, 
    KolynStyle.kolynButton(currentTheme.primaryColor),
  ]),

  switchCourseButtonLabel: StyleSheet.flatten([
    KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.mainColor)
  ]),
});
