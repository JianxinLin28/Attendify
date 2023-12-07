import * as React from 'react';
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';
import { KolynSubtitleLabel, KolynCasualButton } from '../../kits/KolynComponentKit';


export function ClickerPageHistoryDetail({navigation}) {
  const themedStyles = ThemedStyles();

  const route = useRoute();
  const fromResponseHistory = route.params?.fromResponseHistory;

  const [question, setQuestion] = React.useState(fromResponseHistory);
  const [boxText, onChangeBoxText] = React.useState(question.getContext());
  const [isInContext, onChangeIsInContext] = React.useState(true);

  return (
      <CommonPart title={"Clicker"}
        components={
          <View style={themedStyles.background}>

            <View style={{flex: 2}}>
              <KolynSubtitleLabel title="Response detail" />
            </View>

            <View style={{flex: 3, top: -30}}>
              <TextBox
                boxText={boxText}
                onChangeBoxText={onChangeBoxText}
                textfieldStyle={themedStyles.boxTextfield}
              />
              <ToOriginalButton
                navigation={navigation}
                question={question}
              />
            </View>

            <View style={{flex: 1}}>
              <SwitchButton
                buttonStyle={themedStyles.switchButton}
                labelStyle={themedStyles.switchButtonLabel}
                question={question}
                onChangeBoxText={onChangeBoxText}
                isInContext={isInContext}
                onChangeIsInContext={onChangeIsInContext}
              />
            </View>

            <View style={{flex: 2}}>
              <TaggedAnswer
                viewStyle={{top: 20}}
                taggingText={"Correct answer:"}
                answerText={question.getPrettyCorrectAnswer()}
                style={themedStyles}
              />
            </View>

            <View style={{flex: 2, top: -20}}>
              <TaggedAnswer
                viewStyle={{top: 20}}
                taggingText={"You chose:"}
                answerText={question.getPrettyOriginalResponse()}
                style={themedStyles}
              />
            </View>

            <View style={{flex: 2}}>
              <KolynCasualButton 
                onPress={()=>{navigation.goBack()}} 
                text="Go Back"
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

function TextBox({ boxText, onChangeBoxText, textfieldStyle }) {
  return (
    <TextInput
      style={textfieldStyle}
      onChangeText={onChangeBoxText}
      value={boxText}
      editable={false}
      multiline={true}
    />
  );
}

function SwitchButton({buttonStyle, labelStyle, question, onChangeBoxText, isInContext, onChangeIsInContext }) {
  return (
    <Pressable
      style={buttonStyle}
      onPress={()=>{
        if (isInContext) {
          onChangeBoxText(question.getExplanation());
        }
        else {
          onChangeBoxText(question.getContext());
        }
        onChangeIsInContext(!isInContext);
      }}
    >
      <Text style={labelStyle}>{ isInContext ? "Switch to explanation" : "Switch to question" }</Text>
    </Pressable>
  );
}

function ToOriginalButton({ navigation, question }) {
  const themedStyles = ThemedStyles();

  return (
    <Pressable
      style={[{alignSelf: 'flex-end', top: -200, left: -20}, themedStyles.toOriginalButton]}
      onPress={()=>{navigation.navigate("ClickerPageQuestion", {previousPage: "HistoryDetail", question: question})}}
    >
      <View style={themedStyles.toOriginalButtonInner} />
    </Pressable>
  );
}

function TaggedAnswer({ taggingText, answerText, style, viewStyle }) {
  return (
    <View style={viewStyle}>
      
      <Text style={style.tagging}>
        { taggingText }
      </Text>

      <View style={style.answerButton}>
        <Text style={style.answerButtonLabel}>
          { answerText }
        </Text>
      </View>

    </View>
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

    boxTextfield: StyleSheet.flatten([
      {
        height: 150, 
        width: 300, 
        borderWidth: 3, 
        borderColor: currentTheme.subColor,
      }, 
      KolynStyle.kolynInputTextfield(currentTheme.primaryColor, currentTheme.mainFont),
    ]),

    switchButton: StyleSheet.flatten([
      {width: 240, top: 10},
      KolynStyle.kolynButton(currentTheme.mainColor),
    ]),
  
    switchButtonLabel: StyleSheet.flatten([
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.primaryColor)
    ]),

    toOriginalButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: currentTheme.mainColor
    },

    toOriginalButtonInner: {
      width: 30,
      height: 30,
      top: 10,
      left: 10,
      borderColor: currentTheme.primaryColor,
      borderWidth: 4
    },

    tagging: StyleSheet.flatten([
      {alignSelf: 'center', alignSelf: 'flex-start', right: -40},
      KolynStyle.kolynLabel(currentTheme.fontSizes.medium, currentTheme.mainFont, currentTheme.subColor)
    ]),

    answerButton: StyleSheet.flatten([
      {width: '80%'},
      KolynStyle.kolynButton(currentTheme.mainColor),
    ]),
  
    answerButtonLabel: StyleSheet.flatten([
      KolynStyle.kolynLabel(currentTheme.fontSizes.tiny, currentTheme.mainFont, currentTheme.primaryColor)
    ]),
  }));
}
