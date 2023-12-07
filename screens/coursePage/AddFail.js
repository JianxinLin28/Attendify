import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';
import { KolynSubtitleLabel, KolynCasualButton } from '../../kits/KolynComponentKit';


export function CoursePageAddFail({navigation}) {
  const themedStyles = ThemedStyles();

  return (
      <CommonPart title={"Manage Course"}
        components={
            <View style={themedStyles.background}>

              <View style={{flex: 2}}>
                <KolynSubtitleLabel title="Couldn't add course:" />
              </View>

              <View style={{flex: 2}}></View>

              <View style={{flex: 2}}>
                <HintLabel style={themedStyles.hintLabel} />
              </View>

              <View style={{flex: 2}}></View>

              <View style={{flex: 2}}></View>

              <View style={{flex: 2}}>
                <RetryButton navigation={navigation} />
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

function HintLabel({ style }) {
  return (
    <Text style={style} >
      { "You might have a typo or entered an invalid Course id. Please try again." }
    </Text>
  );
}

function RetryButton({navigation}) {
  return (
    <KolynCasualButton
      onPress={()=>{navigation.goBack()}}
      text={"Retry"}
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

    hintLabel: StyleSheet.flatten([
      {alignSelf: 'center', height: 30, flex: 1, flexWrap: 'wrap'},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.subColor)
    ]),

  }));
}
