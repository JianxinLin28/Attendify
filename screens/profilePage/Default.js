import * as React from 'react';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { themes, ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';
import { resetNavigatorTabIndex } from '../../props/NavigatorTabIndexController';

export function ProfilePageDefault({navigation}) {
  const themeManager = React.useContext(ThemeContext);
  const themedStyles = ThemedStyles();

  return (
      <CommonPart title={"Profile"}
        components={
        <View style={[{flex: 6}, themedStyles.background]}>

          <ThemeButtons 
            changeTheme={themeManager.changeTheme}
            containerStyle={themedStyles.themeButtonsContainer}
            themeButtonStyle={themedStyles.themeCircle}
            themePressableStyle={themedStyles.themePressable}
          />
        
          <View style={{flex: 2}}>
            <LogoutButton 
              onPress={()=>{navigation.popToTop(); resetNavigatorTabIndex();}}
              buttonStyle={themedStyles.logoutButton}
              labelStyle={themedStyles.logoutButtonLabel}
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
            id={theme.index}
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
  
  function LogoutButton({ onPress, buttonStyle, labelStyle }) {
    return (
    <Pressable
      onPress={onPress}
      style={buttonStyle}
    >
      <Text style={labelStyle}>
        Log out
      </Text>
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
  
      logoutButton: StyleSheet.flatten([
        {height: 40, width: 90},
        KolynStyle.kolynButton(currentTheme.mainColor),
      ]),
    
      logoutButtonLabel: StyleSheet.flatten([
        KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.primaryColor,),
      ]),
  }));
}
