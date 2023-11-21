import * as React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';
import { Pfp, PfpStyle, UnusedPfpOverlayStyle, setCurrentPfpIndex, getPfpIndex } from '../../props/Pfp';
import { KolynCasualButton } from '../../kits/KolynComponentKit';


export function ProfilePageSwitchPfp({navigation}) {
  const themedStyles = ThemedStyles();

  const [currentSelectionMarkIndex, 
          onChangeCurrentSelectionMarkIndex] = React.useState(getPfpIndex());

  return (
      <CommonPart title={"Switch Pfp"}
        components={
            <View style={themedStyles.background}>

              <View style={{flex: 2}}>
                <TitleLabel
                  labelStyle={themedStyles.titleLabel}
                />
              </View>

              <View style={{flex: 6}}>
                <PfpGrid 
                  currentSelectionMarkIndex={currentSelectionMarkIndex}
                  onChangeCurrentSelectionMarkIndex={onChangeCurrentSelectionMarkIndex}
                />
              </View>

              <View style={{flex: 2}}>
                <KolynCasualButton 
                  onPress={()=>{navigation.goBack();}} 
                  text="Confirm"
                />
              </View>

            </View>
        }
      />
  );
}

/* Internal logic code start */

const itemData = (currentSelectionMarkIndex) => Pfp.map((pfp, index)=>{
  return {
    icon: (themedStyles) => (
      <View
        key={`${pfp.key}icon`}
      >
        <Image
          style={themedStyles.pfpIcon}
          source={pfp.image}
          key={`${pfp.key}image`}
        />
        {index != currentSelectionMarkIndex && 
          <View 
            style={[themedStyles.unusedPfpOverlay]}
            key={`${pfp.key}overlay`}
          />}
      </View>
    ),
    key: pfp.key
  }
});

/* Internal logic code end */

/*************************************************************************************************/

/* Connect to backend logic code start */

/* Connect to backend logic code end */

/*************************************************************************************************/

/* User interface code start */

/* The nest components should also possess unique key */
const PfpItem = ({ onChangeCurrentSelectionMarkIndex, item, index }) => {
  const themedStyles = ThemedStyles();

  return (
    <Pressable 
      style={themedStyles.item}
      onPress={()=>{ 
        onChangeCurrentSelectionMarkIndex(index); 
        setCurrentPfpIndex(index);
      }}
      key={item.key}
    >
      {item.icon(themedStyles)}
    </Pressable>
  );
};

/* Unique key for all elements in the list */
function PfpGrid({ currentSelectionMarkIndex, onChangeCurrentSelectionMarkIndex }) {
  const themedStyles = ThemedStyles();
  return (
    <View style={themedStyles.app}>
      {itemData(currentSelectionMarkIndex).map((item, index) => {
        return <PfpItem 
                onChangeCurrentSelectionMarkIndex={onChangeCurrentSelectionMarkIndex} 
                item={item} 
                index={index}
                key={item.key}
              />;
      })}
    </View>
  );
}

function TitleLabel({labelStyle}) {
  return (
    <Text
      style={labelStyle}
    >Pick a pfp!</Text>
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

    unusedPfpOverlay: UnusedPfpOverlayStyle(),

    titleLabel: StyleSheet.flatten([
      {alignSelf: 'center'},
      KolynStyle.kolynLabel(currentTheme.fontSizes.medium, currentTheme.mainFont, currentTheme.subColor,),
    ]),

    app: {
      width: '100%',
      height: '50%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignSelf: 'center',
      justifyContent: 'center',
      padding: 10
    },

    item: {
      minWidth: 120,
      maxWidth: 120,
      height: 120,
      alignItems: 'center',
      justifyContent: 'center',
    }

  }));
}
