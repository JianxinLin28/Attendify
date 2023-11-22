import * as React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { themes, ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';
import { KolynSubtitleLabel } from '../../kits/KolynComponentKit';
import { KolynCasualButton } from '../../kits/KolynComponentKit';


export function ProfilePageTheme({navigation}) {
  const themeManager = React.useContext(ThemeContext);
  const themedStyles = ThemedStyles();

  return (
      <CommonPart title={"Profile"}
        components={
            <View style={themedStyles.background}>
              
              <View style={{flex: 2}}>
                <KolynSubtitleLabel title="Change app theme" />
              </View>

              <View style={{flex: 2}}>
              <ThemeButtons 
                changeTheme={themeManager.changeTheme}
                containerStyle={themedStyles.themeButtonsContainer}
                themeButtonStyle={themedStyles.themeCircle}
                themePressableStyle={themedStyles.themePressable}
              />
              </View>
              <View style={{flex: 2}}></View>
              <View style={{flex: 2}}></View>
              <View style={{flex: 2}}></View>

              <View style={{flex: 2}}>
                <KolynCasualButton
                  onPress={()=>{navigation.goBack();}}
                  text={"Go Back"}
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

function ThemeButtons({ changeTheme, containerStyle, themeButtonStyle, themePressableStyle }) {
  return (
    <View
      style={containerStyle}
    >
      {themes.map(theme => (
        <ChangeThemeButton 
          backgroundColor={theme.mainColor}
          id={theme.index+""}
          onPress={() => {changeTheme(theme.index)}}
          buttonStyle={themeButtonStyle}
          pressableStyle={themePressableStyle}
          key={theme.index}
        />
      ))}
  </View>
  );
}

function ChangeThemeButton({ backgroundColor, id, onPress, buttonStyle, pressableStyle }) {
  return (
    <Pressable
      onPress={onPress}
      id={id}
      style={pressableStyle}
    >
      <View style={[
        buttonStyle,
        {backgroundColor: backgroundColor}
      ]}/>
    </Pressable>
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

    themeButtonsContainer: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      flex: 1, 
      padding: 40
    },

    themePressable: {
      width: 50,
      height: 50,
    },

    themeCircle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderColor: 'white',
      borderWidth: 4,
    },
  }));
}
