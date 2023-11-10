import * as React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, View, Pressable, Text, FlatList } from 'react-native';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';
import { KolynSubtitleLabel, KolynCasualButton } from '../../kits/KolynComponentKit';

const {width, height} = Dimensions.get('window');

export function UploadDocumentPage({navigation}) {
  const themedStyles = ThemedStyles();

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  var initialElements = GetExampleElements();

  const [elementState, setElementState] = React.useState(initialElements);

  const refreshElements = () => {
    setElementState(GetExampleElements());
  }

  const onRefresh = () => {
    setIsRefreshing(true);
    refreshElements();
    setIsRefreshing(false);
  }

  return (
      <CommonPart title={"Upload document"}
        components={
            <View style={themedStyles.background}>

              <View style={{flex: 2}}>
                <KolynSubtitleLabel title="Only accept .png / .jpg / .heic file formats:" />
              </View>

              <View style={{flex: 2}}>
                <UploadDocumentButton
                  buttonStyle={themedStyles.uploadButton}
                  labelStyle={themedStyles.uploadButtonLabel}
                  navigation={navigation}
                />
              </View>

              <View style={[themedStyles.flatListView, {flex: 4, top: -40}]}>
                <FileList
                  data={elementState}
                  onRefresh={onRefresh} 
                  isRefreshing={isRefreshing}
                  navigation={navigation}
                />
              </View>

              <View style={{flex: 2}}>
                <ConfirmButton
                  navigation={navigation}
                />
              </View>

              <View style={{flex: 2}}>
                <GoBackButton
                  navigation={navigation}
                />
              </View>
            </View>
        }
      />
  );
}


/* Internal logic code start */

function GetSubColor() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;
  return currentTheme.subColor;
}

function GetExampleElements()
{
  return [
    {
      id: 'E1',
      title: 'Excuse.png',
    },
    {
      id: 'E2',
      title: 'Excuse.png',
    },
    {
      id: 'E3',
      title: 'Excuse.png',
    },
  ];
}


function OpenFileSelection() {
  
}

/* Internal logic code end */

/*************************************************************************************************/

/* Connect to backend logic code start */

/*
  Uploading file require a server
  just leave this for now
*/
function SendFile() {

}

/* Connect to backend logic code end */

/*************************************************************************************************/

/* User interface code start */

function UploadDocumentButton({buttonStyle, labelStyle}) {
  return (
    <Pressable
      style={buttonStyle}
    >
      <Text style={labelStyle}>Upload Document</Text>
    </Pressable>
  );
}

function FileList({ data, onRefresh, isRefreshing }) {
  const themedStyles = ThemedStyles();

  const Item = ({title}) =>
  {
    return (
      <View style={themedStyles.item}>
        <Text style={themedStyles.title}>
          {title}
        </Text>
        <RemoveFileButton></RemoveFileButton>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={({item}) => <Item title={item.title} />}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
    />
  )
}

function RemoveFileButton() {
  const themedStyles = ThemedStyles();

  return (
    <View style={[themedStyles.removeCircle, {left: 50, top: -8}]}>
      <View style={themedStyles.removeRectangle}/>
    </View>
  );
}

function ConfirmButton({navigation}) {
  return (
    <KolynCasualButton 
      onPress={()=>{navigation.goBack()}} 
      text="Confirm"
    />
  );
}

function GoBackButton({navigation}) {
  return (
    <KolynCasualButton 
      onPress={()=>{navigation.goBack()}} 
      text="Go Back"
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

    flatListView: {
      top: 0, 
      flex: 2, 
      alignSelf: 'center', 
      backgroundColor: currentTheme.primaryColor
    },

    item: StyleSheet.flatten([
      {
        top: 0, 
        width: width*0.9, 
        alignSelf: 'center', 
        marginTop: 10, 
        borderRadius: 10, 
        backgroundColor: currentTheme.subColor,
        flexDirection: 'row',
      }, 
      KolynStyle.kolynButton(currentTheme.primaryColor),
    ]),

    title: StyleSheet.flatten([
      {alignSelf: 'center', height: 55},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.subColor)
    ]),

    uploadButton: StyleSheet.flatten([
      {width: 200},
      KolynStyle.kolynButton(currentTheme.mainColor),
    ]),
  
    uploadButtonLabel: StyleSheet.flatten([
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.primaryColor)
    ]),

    removeCircle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: currentTheme.mainColor
    },

    removeRectangle: {
      width: 16,
      height: 4,
      backgroundColor: currentTheme.primaryColor,
      alignSelf:'center',
      top: 8
    }

  }));
}
