import * as React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';
import { KolynCourseLabel, KolynSwitchCourseButton2, KolynCasualButton } from '../../kits/KolynComponentKit';

const {width} = Dimensions.get('window');

/*
  Use push notifications to receive signal from the backend server
  and display the questions (go to question page)
*/

export function ClickerPageDefault({navigation}) {
  const themedStyles = ThemedStyles();

  const [courseText, onChangeCourseText] = React.useState('');
  const [timeText, onChangeTimeText] = React.useState('');

  return (
      <CommonPart title={"Clicker"}
        components={
            <View style={themedStyles.background}>

            <View style={{flex: 2}}>
              <HistoryButton
                buttonStyle={themedStyles.historyButton}
                labelStyle={themedStyles.historyButtonLabel}
                navigation={navigation}
              />
              <KolynSwitchCourseButton2
                onPress={()=>{navigation.navigate("SwitchCourse")}}
              />
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

            <View style={{flex: 2}}>
              <NoQuestionLabel
                labelStyle={themedStyles.noQuestionLabel}
              />
            </View>

            <View style={{flex: 2}}></View>

            <View style={{flex: 2}}>
              <KolynCasualButton
                text="Get a question"
                onPress={()=>{navigation.navigate("ClickerPageQuestion")}}
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

function TransitToQuestionPage() {
  const question = GetQuestion();

}

/* Internal logic code end */

/*************************************************************************************************/

/* Connect to backend logic code start */

// Go to ./logic/CheckinStatus.js to implement code

/*  
  Get current question from the server,
  return the question if there is
  otherwise return null
*/
function GetQuestion() {

}

/* Connect to backend logic code end */

/*************************************************************************************************/

/* User interface code start */

function HistoryButton({ buttonStyle, labelStyle, navigation }) {
  return (
    <Pressable
      style={buttonStyle}
      onPress={()=>navigation.navigate("ClickerPageResponseHistory")}
    >
      <Text style={labelStyle}>History</Text>
    </Pressable>
  );
}

function NoQuestionLabel({ labelStyle }) {
  return (
    <Text style={labelStyle}>
      There is no question yet.
    </Text>
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

    historyButton: StyleSheet.flatten([
      {top: 40, width: 150, height: 40, start: -width/3.5, backgroundColor:currentTheme.primaryColor}, 
      KolynStyle.kolynButton(currentTheme.mainColor),
    ]),
  
    historyButtonLabel: StyleSheet.flatten([
      {backgroundColor: currentTheme.mainColor},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.primaryColor)
    ]),
    
    noQuestionLabel: StyleSheet.flatten([
      {alignSelf: 'center'},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.subColor)
    ])
  }));
}
