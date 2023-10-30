import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image, Dimensions } from 'react-native';
import * as KolynStyle from '../kits/KolynStyleKit';
import { ThemeContext} from '../kits/AppTheme';

const {width} = Dimensions.get('window');


/* The icon & title image */
export function KolynMainTitleImage() {
  const themedStyles = ThemedStyles();

  return (
    <Image
      source={require('../assets/main-title.png')}
      style={themedStyles.mainTitle}
    />
  );
}

export function KolynTopTitleLabel({ text }) {
  const themedStyles = ThemedStyles();

  return (
    <View
      style={themedStyles.topTitle}>
      <Text style={themedStyles.topTitleLabel}>{text}</Text>
    </View>
  );
}

export function KolynSubtitleLabel({ title }) {
  const themedStyles = ThemedStyles();

  return (
    <Text style={themedStyles.subtitle}>
      {title}
    </Text>
  );
}

/* Navigate to 'Switch Course' page when pressed */
/* By default, background white, foreground blue */
export function KolynSwitchCourseButton() {
  const themedStyles = ThemedStyles();

  return (
    <Pressable
      style={[themedStyles.switchCourseButton]}>
      <Text style={[themedStyles.switchCourseButtonLabel]}>Switch course</Text>
    </Pressable>
  );
}

export function KolynCasualButton({onPress, text}) {
  const themedStyles = ThemedStyles();

  return (
    <Pressable
      style={[themedStyles.casualButton]}
      onPress={onPress}>
      <Text style={[themedStyles.casualButtonLabel]}>{text}</Text>
    </Pressable>
  );
}

function ThemedStyles() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return (StyleSheet.create({
    
    mainTitle: {
      resizeMode: 'contain',
      width: 400,
      height: width*0.2,
      alignSelf: 'center',
    },
  
    topTitle: {color: currentTheme.mainColor},
  
    topTitleLabel: StyleSheet.flatten([
      {alignSelf: 'center', height: 50, top: -10, backgroundColor: currentTheme.mainColor},
      KolynStyle.kolynLabel(currentTheme.fontSizes.casual, currentTheme.mainFont, currentTheme.primaryColor)
    ]),
  
    switchCourseButton: StyleSheet.flatten([
      {top: 20, width: 150, height: 40, end: -width/3.5, backgroundColor:currentTheme.mainColor}, 
      KolynStyle.kolynButton(currentTheme.primaryColor),
    ]),
  
    switchCourseButtonLabel: StyleSheet.flatten([
      {backgroundColor: currentTheme.primaryColor},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.mainColor)
    ]),

    subtitle: StyleSheet.flatten([
      {alignSelf: 'center', top: 20},
      KolynStyle.kolynLabel(currentTheme.fontSizes.medium, currentTheme.mainFont, currentTheme.subColor)
    ]),

    casualButton: StyleSheet.flatten([
      {width: 240, backgroundColor:currentTheme.mainColor, alignSelf: 'center'}, 
      KolynStyle.kolynButton(currentTheme.mainColor),
    ]),

    casualButtonLabel: StyleSheet.flatten([
      {backgroundColor: currentTheme.mainColor},
      KolynStyle.kolynLabel(currentTheme.fontSizes.casual, currentTheme.mainFont, currentTheme.primaryColor)
    ]),

  }));
}
