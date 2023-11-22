import * as React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';
import { resetNavigatorTabIndex } from '../../props/NavigatorTabIndexController';
import { Pfp, PfpStyle, getPfpIndex } from '../../props/Pfp';


export function ProfilePageDefault({navigation}) {
  const themedStyles = ThemedStyles();

  const [currentSelectionMarkIndex, 
    onChangeCurrentSelectionMarkIndex] = React.useState(getPfpIndex());
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      onChangeCurrentSelectionMarkIndex(getPfpIndex());
    });
    return () => unsubscribe();
  }, [navigation]);

  return (
      <CommonPart title={"Profile"}
        components={
        <View style={[{flex: 6}, themedStyles.background]}>

          <View style={{flex: 1}}></View>

          <View style={{flex: 2}}>
            <PfpIcon
              image={Pfp[currentSelectionMarkIndex].image}
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
                onPress={()=>{navigation.navigate("ProfilePageTheme")}}
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
