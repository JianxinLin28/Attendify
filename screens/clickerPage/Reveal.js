import * as React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';
import { KolynCasualButton } from '../../kits/KolynComponentKit';


export function ClickerPageReveal({navigation}) {
  const themedStyles = ThemedStyles();

  const [questionTitleText, onChangeQuestionTitleText] = React.useState('Q1');
  const [answerText, onChangeAnswerText] = React.useState('A');
  const [explanationText, onChangeExplanationText] = React.useState('Explain');
  const [responseText, onChangeResponseText] = React.useState('You answered: none');

  return (
      <CommonPart title={"Clicker"}
        components={
          <View style={themedStyles.background}>

            <View style={{flex: 2}}>
              <QuestionTitleLabel 
                labelStyle={themedStyles.questionTitleLabel}
                questionTitleText={questionTitleText}
                onChangeQuestionTitleText={onChangeQuestionTitleText}
              />
            </View>

            <View style={{flex: 2}}>
              <AnswerIsLabel
                labelStyle={themedStyles.answerIsLabel}
              />

              <AnswerLabel
                labelStyle={themedStyles.answerLabel}
                answerText={answerText}
                onChangeAnswerText={onChangeAnswerText}
              />
            </View>

            <View style={{flex: 2}}>
              <ExplanationTextBox
                explanationText={explanationText}
                onChangeExplanationText={onChangeExplanationText}
                textfieldStyle={themedStyles.explanationTextfield}
              />
            </View>

            <View style={{flex: 2}}></View>

            <View style={{flex: 2}}>
              <StudentResponseLabel
                onChangeResponseText={onChangeResponseText}
                responseText={responseText}
                labelStyle={themedStyles.studentResponseLabel}
              />
            </View>

            <View style={{flex: 2}}>
              <KolynCasualButton 
                onPress={()=>{navigation.navigate("ClickerPageDefault")}} 
                text="Continue"
              />
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

function QuestionTitleLabel({ labelStyle, questionTitleText, onChangeQuestionTitleext }) {
  return (
    <TextInput
      editable={false}
      style={labelStyle}
      value={questionTitleText}
      onChangeText={onChangeQuestionTitleext}
    />
  );
}

function AnswerIsLabel({ labelStyle }) {
  return (
  <Text style={labelStyle}>
    The answer is: 
  </Text>
  );
}

function AnswerLabel({ labelStyle, answerText, onChangeAnswerText}) {
  return (
    <TextInput
      editable={false}
      style={labelStyle}
      value={answerText}
      onChangeText={onChangeAnswerText}
    />
  );
}

function ExplanationTextBox({ onChangeExplanationText, explanationText, textfieldStyle }) {
  return (
    <TextInput
      style={textfieldStyle}
      value={explanationText}
      onChangeText={onChangeExplanationText}
      editable={false}
      multiline={true}
    />
  );
}

function StudentResponseLabel({ onChangeResponseText, responseText, labelStyle }) {
  return (
    <TextInput
      style={labelStyle}
      value={responseText}
      onChangeText={onChangeResponseText}
      editable={false}
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

    questionTitleLabel: StyleSheet.flatten([
      {alignSelf: 'center', top: 20},
      KolynStyle.kolynLabel(currentTheme.fontSizes.medium, currentTheme.mainFont, currentTheme.subColor)
    ]),

    answerLabel: StyleSheet.flatten([
      {alignSelf: 'center'},
      KolynStyle.kolynLabel(currentTheme.fontSizes.medium, currentTheme.mainFont, currentTheme.subColor)
    ]),

    answerIsLabel: StyleSheet.flatten([
      {alignSelf: 'center'},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.subColor)
    ]),

    studentResponseLabel: StyleSheet.flatten([
      {alignSelf: 'center'},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.subColor)
    ]),

    explanationTextfield: StyleSheet.flatten([
      {
        height: 150, 
        width: 300, 
        borderWidth: 3, 
        borderColor: currentTheme.subColor,
      }, 
      KolynStyle.kolynInputTextfield(currentTheme.primaryColor, currentTheme.mainFont),
    ]),
  }));
}
