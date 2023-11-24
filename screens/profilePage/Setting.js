import * as React from 'react';
import { StyleSheet, View, Switch, Text } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';
import { KolynSubtitleLabel } from '../../kits/KolynComponentKit';
import { KolynCasualButton } from '../../kits/KolynComponentKit';


export function ProfilePageSetting({navigation}) {
  const themedStyles = ThemedStyles();

  const mainColor = GetMainColor();
  const primaryColor = GetPrimaryColor();
  const disableColor = GetDisableColor();

  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [selected, setSelected] = React.useState("");

  return (
      <CommonPart title={"Profile"}
        components={
            <View style={themedStyles.background}>
              
              <View style={{flex: 2}}>
                <KolynSubtitleLabel title="Perference setting" />
              </View>

              <View style={{flex: 2, flexDirection: 'row'}}>
                <ThemedLabel
                  labelStyle={themedStyles.textLabel}
                  text="Receive notifications from app"
                />
                <ThemedToggle
                  isEnabled={isEnabled}
                  toggleSwitch={toggleSwitch}
                  toggleStyle={themedStyles.container}
                  falseColor={primaryColor}
                  trueColor={mainColor}
                  enableColor={primaryColor}
                  disableColor={disableColor}
                  iosBgColor={primaryColor}
                />
              </View>

              <View style={{flex: 6}}>
                <View style={{flex: 1, left: -100}}>
                  <ThemedLabel
                    labelStyle={themedStyles.textLabel}
                    text="Language: "
                  />
                </View>
                <View style={{flex: 5}}>
                  <LanguageDropDownList
                    data={languages}
                    setSelected={setSelected}
                    boxStyles={themedStyles.box}
                    labelStyles={themedStyles.textLabel}
                    disableColor={disableColor}
                  />
                </View>
              </View>

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

function GetPrimaryColor() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;
  return currentTheme.primaryColor;
}
function GetDisableColor() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;
  return currentTheme.disableColor;
}

function GetMainColor() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;
  return currentTheme.mainColor;
}

const languages = [
  {key: '1', value: 'English'},
  {key: '2', value: 'Spanish', disabled: true}
];

/* Internal logic code end */

/*************************************************************************************************/

/* Connect to backend logic code start */

/* Connect to backend logic code end */

/*************************************************************************************************/

/* User interface code start */

function ThemedLabel({labelStyle, text}) {
  return (
    <Text
      style={labelStyle}
    >{text}</Text>
  );
}

function ThemedToggle({ isEnabled, toggleSwitch, toggleStyle, falseColor, trueColor, enableColor, disableColor, iosBgColor }) {
  
  return (
    <View style={toggleStyle}>
      <Switch
        trackColor={{false: falseColor, true: trueColor}}
        thumbColor={isEnabled ? enableColor : disableColor}
        ios_backgroundColor={iosBgColor}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  )
}

function LanguageDropDownList({ data, setSelected, boxStyles, labelStyles, disableColor }) {
  return (
    <SelectList
      boxStyles={boxStyles}
      dropdownStyles={boxStyles}
      setSelected={val=>setSelected(val)}
      data={data}
      defaultOption={data[0]}
      inputStyles={labelStyles}
      dropdownTextStyles={labelStyles}
      disabledTextStyles={[labelStyles, {color: disableColor}]}
      save="value"
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

    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    textLabel: StyleSheet.flatten([
      {alignSelf: 'center', flex: 4, textAlign: 'center'},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.subColor,),
    ]),

    box: {
      width: '80%',
      alignSelf: 'center'
    }
  }));
}
