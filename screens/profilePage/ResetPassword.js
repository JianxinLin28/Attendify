import * as React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';
import { KolynSubtitleLabel } from '../../kits/KolynComponentKit';
import { KolynCasualButton } from '../../kits/KolynComponentKit';

// 1. Verify the current password
// 2. Enter & re-enter the new password
// 3. Display change success

const PageVariant = {
  VerifyCurrent: 'Please enter your password:',
  NewPassword: 'Set a new password',
  ChangeSuccess: 'Password changed successfully!'
}

export function ProfilePageResetPassword({navigation}) {
  const themedStyles = ThemedStyles();

  const [passwordText, onChangePasswordText] = React.useState('');
  const [repasswordText, onChangeRePasswordText] = React.useState('');
  const [rerepasswordText, onChangeReRePasswordText] = React.useState('');
  const [pageVariant, onChangePageVariant] = React.useState(PageVariant.VerifyCurrent);

  return (
      <CommonPart title={"Profile"}
        components={
            <View style={themedStyles.background}>

              <View style={{flex: 2}}>
                <KolynSubtitleLabel title="Reset password" />
              </View>

              <View style={{flex: 2}}>
                {pageVariant == PageVariant.NewPassword &&
                  <View>
                    <ThemedLabel
                    labelStyle={themedStyles.infoLabel}
                    text={pageVariant}
                  />
                  </View>
                }

                {pageVariant == PageVariant.NewPassword &&
                  <View>
                    <PasswordTextfild
                      onChangePasswordText={onChangePasswordText}
                      passwordText={passwordText}
                      textfieldStyle={themedStyles.inputTextfield}
                    />
                  </View>
                }
              </View>

              <View style={{flex: 2}}>
                {pageVariant == PageVariant.VerifyCurrent &&
                <View>
                  <ThemedLabel
                    labelStyle={themedStyles.infoLabel}
                    text={pageVariant}
                  />
                  <PasswordTextfild
                    onChangePasswordText={onChangeRePasswordText}
                    passwordText={repasswordText}
                    textfieldStyle={themedStyles.inputTextfield}
                  />
                </View>
                }

                {pageVariant == PageVariant.NewPassword &&
                  <View>
                    <ThemedLabel
                    labelStyle={themedStyles.infoLabel}
                    text={"Re-enter new password"}
                    />
                    <PasswordTextfild
                      onChangePasswordText={onChangeReRePasswordText}
                      passwordText={rerepasswordText}
                      textfieldStyle={themedStyles.inputTextfield}
                    />
                  </View>
                }

                {pageVariant == PageVariant.ChangeSuccess &&
                <ThemedLabel
                  labelStyle={themedStyles.infoLabel}
                  text={pageVariant}
                />
                }
              </View>

              <View style={{flex: 2}}></View>

              <View style={{flex: 2}}>
                {pageVariant == PageVariant.VerifyCurrent &&
                <View>
                  <KolynCasualButton
                    onPress={()=>{onChangePageVariant(PageVariant.NewPassword)}}
                    text={"Next"}
                  />
                </View>
                }
                {pageVariant == PageVariant.NewPassword &&
                <View>
                  <KolynCasualButton
                    onPress={()=>{
                      onChangePageVariant(PageVariant.ChangeSuccess)
                    }}
                    text={"Next"}
                  />
                </View>
                }
                {pageVariant == PageVariant.ChangeSuccess &&
                <View>
                  <KolynCasualButton
                    onPress={()=>{
                      navigation.goBack();
                    }}
                    text={"Next"}
                  />
                </View>
                }
              </View>

              <View style={{flex: 2}}>
                <View>
                  {pageVariant != PageVariant.ChangeSuccess &&
                  <KolynCasualButton
                    onPress={()=>{navigation.goBack();}}
                    text={"Go Back"}
                  />
                  }
                </View>
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

function ThemedLabel({labelStyle, text}) {
  return (
    <Text
      style={labelStyle}
    >{text}</Text>
  );
}

function PasswordTextfild({ onChangePasswordText, passwordText, textfieldStyle }) {
  return (
    <TextInput
      style={textfieldStyle}
      value={passwordText}
      onChangeText={onChangePasswordText}
      placeholder="Enter password"
      keyboardType="default"
      secureTextEntry={true}
    />);
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

      infoLabel: StyleSheet.flatten([
        {alignSelf: 'center'},
        KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.subColor,),
      ]),

      inputTextfield: StyleSheet.flatten([
        {height: 40, width: 300, color: currentTheme.primaryColor}, 
        KolynStyle.kolynInputTextfield(currentTheme.mainColor, currentTheme.mainFont),
      ]),
  }));
}
