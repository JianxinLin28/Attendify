import * as React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { themes, ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';
import { resetNavigatorTabIndex } from '../../props/NavigatorTabIndexController';
import { Pfp, PfpStyle, getPfpIndex } from '../../props/Pfp';

export function ProfilePageDefault({navigation}) {
  const themeManager = React.useContext(ThemeContext);
  const themedStyles = ThemedStyles();

  const [icon, onChangeIcon] = React.useState(Pfp[getPfpIndex()].image);

  return (
      <CommonPart title={"Profile"}
        components={
        <View style={[{flex: 6}, themedStyles.background]}>

          {
            /*
          <ThemeButtons 
            changeTheme={themeManager.changeTheme}
            containerStyle={themedStyles.themeButtonsContainer}
            themeButtonStyle={themedStyles.themeCircle}
            themePressableStyle={themedStyles.themePressable}
          />
          */
          }
          <View style={{flex: 1}}></View>

          <View style={{flex: 2}}>
            <PfpIcon
              image={icon}
              iconStyle={themedStyles.pfpIcon}
            />
          </View>

          <View style={{flex: 2}}>
            <StudentNameLabel
              labelStyle={themedStyles.nameLabel}
              name={"Team 6"}
            />
            <StudentIDLabel
              labelStyle={themedStyles.nameLabel}
              id={"Attendify100"}
            />
          </View>

          <View style={{flex: 4, justifyContent: 'center', alignItems: 'center', flexDirection: 'col'}}>
            <View style={{flex: 2, flexDirection: 'row'}}>
            <View style={{flex:1}}/>
              <GridButton
                text={"Inspect & Edit Info"}
                onPress={()=>{navigation.navigate("ProfilePageInfo");}}
              />

              <View style={{flex:1}}/>

              <GridButton
                text={"Check in history"}
                onPress={()=>{}}
              />
              <View style={{flex:1}}/>
            </View>

            <View style={{flex: 2, flexDirection: 'row'}}>
              <View style={{flex:1}}/>
              <GridButton
                text={"Change Theme"}
                onPress={()=>{}}
              />

              <View style={{flex:1}}/>

              <GridButton
                text={"Preference setting"}
                onPress={()=>{}}
              />

              <View style={{flex:1}}/>
            </View>

          </View>
          
          <View style={{flex: 2}}>
            <LogoutButton 
              onPress={()=>{
                navigation.popToTop(); 
                resetNavigatorTabIndex();
              }}
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

function StudentNameLabel({labelStyle, name}) {
  return (
    <Text
      style={labelStyle}
    >{name}</Text>
  );
}

function StudentIDLabel({labelStyle, id}) {
  return (
    <StudentNameLabel
      labelStyle={labelStyle}
      name={"Student ID: "+id}
    />
  );
}

function GridButton({text, onPress}) {
  const themedStyles = ThemedStyles();

  return (
    <Pressable
      style={[themedStyles.gridButton]}
      onPress={onPress}>
      <Text style={[themedStyles.gridButtonLabel, {flex:1, flexWrap: 'wrap'}]}>{text}</Text>
    </Pressable>
  );
}

function PfpIcon({ image, iconStyle }) {
  return (
    <Image 
      source={image}
      style={iconStyle}
    />
  );
}

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
  
  function LogoutButton({ onPress, buttonStyle, labelStyle }) {
    return (
    <Pressable
      onPress={onPress}
      style={buttonStyle}
    >
      <Text style={labelStyle}>
        Back to login
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

    pfpIcon: PfpStyle(),

    nameLabel: StyleSheet.flatten([
      {alignSelf: 'center'},
      KolynStyle.kolynLabel(currentTheme.fontSizes.medium, currentTheme.mainFont, currentTheme.subColor,),
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

      gridButton: StyleSheet.flatten([
        {width: 120, height: 80, backgroundColor:currentTheme.mainColor, alignSelf: 'center'}, 
        KolynStyle.kolynButton(currentTheme.mainColor),
      ]),
  
      gridButtonLabel: StyleSheet.flatten([
        {backgroundColor: currentTheme.mainColor, textAlign: 'center'},
        KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.primaryColor)
      ]),
  
      logoutButton: StyleSheet.flatten([
        {height: 40, width: 140, top: 30},
        KolynStyle.kolynButton(currentTheme.mainColor),
      ]),
    
      logoutButtonLabel: StyleSheet.flatten([
        KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.primaryColor,),
      ]),
  }));
}
