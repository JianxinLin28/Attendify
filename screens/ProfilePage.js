import * as React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { themes } from '../kits/AppTheme';
import * as KolynStyle from '../kits/KolynStyleKit';
import { CommonPart } from '../kits/CommonPart';
import { ThemeContext} from '../kits/AppTheme';

export function ProfilePage() {
  const themeManager = React.useContext(ThemeContext);

  return (
      <CommonPart
        title={"Profile"}
        components={
          <View style={{flex: 6}}>
  
            <View style={{
              flex: 1, 
              flexDirection: 'row', 
              justifyContent: 'space-between',
              padding: 40,
              top: height/4,
            }}>

            <ThemeButtons changeTheme={themeManager.changeTheme}/>

            </View>
  
          </View>
        }
      >
  
      </CommonPart>
  )
}

/* Internal logic code start */

/* Internal logic code end */

/*************************************************************************************************/

/* Connect to backend logic code start */

/* Connect to backend logic code end */

/*************************************************************************************************/

/* User interface code start */

function ThemeButtons({ changeTheme }) {
  return themes.map(theme => (
    <ChangeThemeButton 
      backgroundColor={theme.mainColor}
      id={theme.index}
      onPress={() => {changeTheme(theme.index)}}
      key={theme.index}
    />
  ));
}

function ChangeThemeButton({ backgroundColor, id, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      id={id}
    >
      <View style={[
        styles.themeCircle,
        {backgroundColor: backgroundColor}
      ]}/>
    </Pressable>
  );
}

/* User interface code end */

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  themeCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: 'white',
    borderWidth: 4,
  },

});

function ThemedStyles() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;
  
  return (StyleSheet.create({
    themeCircle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderColor: 'white',
      borderWidth: 4,
    },

  }));
}
