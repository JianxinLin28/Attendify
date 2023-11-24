import * as React from 'react';
import { StyleSheet, Text, View, Pressable, Image, TextInput } from 'react-native';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';
import { KolynSubtitleLabel } from '../../kits/KolynComponentKit';
import { Pfp, PfpStyle, getPfpIndex } from '../../props/Pfp';
import { KolynCasualButton } from '../../kits/KolynComponentKit';
import { setStudentName, getStudentName } from '../../props/StudentName';
import { SpringButton } from '../../kits/SpringButton';


export function ProfilePageInfo({navigation}) {
  const themedStyles = ThemedStyles();
  
  const [name, onChangeName] = React.useState(getStudentName());
  const [email, onChangeEmail] = React.useState("attendify@umass.edu");
  const [phone, onChangePhone] = React.useState("000-000-0000");

  const [currentSelectionMarkIndex, 
    onChangeCurrentSelectionMarkIndex] = React.useState(getPfpIndex());

  
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      onChangeCurrentSelectionMarkIndex(getPfpIndex());
      onChangeName(getStudentName());
    });
    return () => unsubscribe();
  }, [navigation]);

  return (
      <CommonPart title={"Profile"}
        components={
            <View style={themedStyles.background}>

              <View style={{flex: 2}}>
                <KolynSubtitleLabel title="Inspect & Edit Info" />
              </View>

              <View style={{flex: 2, top: -10}}>
                <Pressable
                  onPress={()=>{navigation.navigate("ProfilePageSwitchPfp");}}
                >
                  <PfpIcon
                    image={Pfp[currentSelectionMarkIndex].image}
                    iconStyle={themedStyles.pfpIcon}
                  />
                </Pressable>
              </View>

              <View style={{flex: 2}}>
                <View style={{left: 15}}>
                  <ButtonEditTextfiled
                    text={name}
                    labelStyle={themedStyles.nameLabel}
                    onChangeText={onChangeName}
                  />
                </View>
                <StudentIDLabel
                  labelStyle={themedStyles.nameLabel}
                  id={"Attendify100"}
                />
              </View>

              <View style={{flex: 3}}>
                <ThemedLabel
                  labelStyle={themedStyles.infoLabel2}
                  text={"Email"}
                />
                <ButtonEditTextfiled
                  text={email}
                  labelStyle={themedStyles.infoLabel}
                  onChangeText={onChangeEmail}
                />
                {
                  /*
                <ThemedLabel
                  labelStyle={themedStyles.infoLabel2}
                  text={"Recovery phone number"}
                />
                <ThemedLabel
                  labelStyle={themedStyles.infoLabel}
                  text={phone}
                />
                */
                }
              </View>

              <View style={{flex: 2, top: -20}}>
                <ResetPasswordButton
                  onPress={()=>{navigation.navigate("ProfilePageResetPassword")}}
                  buttonStyle={themedStyles.resetPasswordButton}
                  labelStyle={themedStyles.resetPasswordButtonLabel}
                />
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

/* Internal logic code end */

/*************************************************************************************************/

/* Connect to backend logic code start */

/*
  Read the student's name from the database
*/
function ReadName() {
  return "";
}

/*
  Read the student's email from the database
*/
function ReadEmail() {

}

/*
  Edit the student's name in the database to newName
*/
function OnEditName(newName) {

}

/*
  Edit the student's email in the database to newEmail
*/
function OnEditEmail(newEmail) {

}

/* Connect to backend logic code end */

/*************************************************************************************************/

/* User interface code start */

function PfpIcon({ image, iconStyle }) {
  return (
    <Image 
      source={image}
      style={iconStyle}
    />
  );
}

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

function ThemedLabel({labelStyle, text}) {
  return (
    <Text
      style={labelStyle}
    >{text}</Text>
  );
}

function ButtonEditTextfiled({ text, labelStyle, onChangeText }) {
  const themedStyles = ThemedStyles();
  const [isEditable, setIsEditable] = React.useState(false);
  const textInputRef = React.useRef(null);

  const handleButtonPress = () => {
    // Trigger the focus on TextInput when the button is pressed
    setIsEditable(true);
    if (isEditable)
    {
      textInputRef.current.focus();
    }
  };

  return (
    <View style={{alignSelf: 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
      <TextInput
        ref={textInputRef} // Assign the ref to the TextInput component
        value={text}
        onChangeText={onChangeText}
        style={labelStyle}
        editable={isEditable}
        onSubmitEditing={()=>{
          console.log("editing submitted");
          setStudentName(text);
          setIsEditable(false);
        }}
      />
      <EditIcon
        onPress={()=>{handleButtonPress();}}
      />
    </View>
  );
}

function ResetPasswordButton({ onPress, buttonStyle, labelStyle }) {
  return (
    <SpringButton
      text="Reset password"
      onPress={onPress}
      buttonStyle={buttonStyle}
      labelStyle={labelStyle}
    />
  );
}

function EditIcon({ onPress }) {
  const themedStyles = ThemedStyles();

  return (
    <Pressable
      style={themedStyles.editIconPart1}
      onPress={onPress}
    >
      <View
        style={themedStyles.editIconPart2}
      >
      <View
        style={themedStyles.editIconPart3}
      />

      </View>
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

    infoLabel: StyleSheet.flatten([
      {alignSelf: 'center'},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.subColor,),
    ]),

    infoLabel2: StyleSheet.flatten([
      {alignSelf: 'center'},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.mainColor,),
    ]),

    resetPasswordButton: StyleSheet.flatten([
      {height: 40, width: 180, top: 30},
      KolynStyle.kolynButton(currentTheme.mainColor),
    ]),
  
    resetPasswordButtonLabel: StyleSheet.flatten([
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.primaryColor,),
    ]),

    editIconPart1: {
      width: 30,
      height: 30,
      left: 10,
      borderRadius: 15,
      backgroundColor: currentTheme.mainColor,
    },

    editIconPart2: {
      width: 15,
      height: 5,
      top: 11,
      left: 8,
      backgroundColor: currentTheme.primaryColor,
      transform: [
        {rotate: '135deg'}
      ]
    },

    editIconPart3: {
      width: 0,
      height: 0,
      top: 0,
      left: 15,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: 3,
      borderRightWidth: 3,
      borderBottomWidth: 5,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: currentTheme.primaryColor, // Change color as needed,
      transform: [
        {rotate: '90deg'}
      ]
    }

  }));
}
