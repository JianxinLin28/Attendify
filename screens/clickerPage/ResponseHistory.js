import * as React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';
import { KolynSubtitleLabel, KolynCasualButton, KolynCourseLabel } from '../../kits/KolynComponentKit';


const {width, height} = Dimensions.get('window');

export function ClickerPageResponseHistory({navigation}) {
  const themedStyles = ThemedStyles();

  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [courseText, onChangeCourseText] = React.useState('');
  const [timeText, onChangeTimeText] = React.useState('');

  var initialElements = GetExampleElements(); // GetCourseArray()

  const [elementState, setElementState] = React.useState(initialElements);
  // Called each time the flat list if refreshed
  const refreshElements = () => {
    setElementState(GetExampleElements());
  }

  const onRefresh = () => {
    setIsRefreshing(true);
    refreshElements();
    setIsRefreshing(false);
  }

  return (
      <CommonPart title={"Clicker"}
        components={
            <View style={themedStyles.background}>

              <View style={{flex: 2}}>
                <KolynSubtitleLabel title="Response history" />
              </View>

              <View style={{flex: 2}}>
                <KolynCourseLabel
                  courseText={courseText}
                  onChangeCourseText={onChangeCourseText}
                  text="CS 320, Jaime Dávila"
                  textColor={GetSubColor()}
                />

                <KolynCourseLabel
                  courseText={timeText}
                  onChangeCourseText={onChangeTimeText}
                  text="Tu, Th 13:00 - 14:15"
                  textColor={GetSubColor()}
                />
              </View>

              <View style={{flex: 6, top: -20}}>
                <ResponseHistoryList 
                  data={elementState}
                  onRefresh={onRefresh} 
                  isRefreshing={isRefreshing}
                  navigation={navigation}
                />
              </View>

              <View style={{flex: 2}}>
                <KolynCasualButton 
                  onPress={()=>{navigation.goBack()}} 
                  text="Go Back"
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
      id: 'Q1',
      date: '9/7',
      title: 'Long long long long long long message',
      isCorrect: true
    },
    {
      id: 'Q2',
      date: '9/7',
      title: 'Long message',
      isCorrect: true
    },
    {
      id: 'Q3',
      date: '9/7',
      title: 'Long message',
      isCorrect: false
    },
    {
      id: 'Q4',
      date: '9/7',
      title: 'Long message',
      isCorrect: true
    },
    {
      id: 'Q5',
      date: '9/7',
      title: 'Long message',
      isCorrect: false
    },
    {
      id: 'Q6',
      date: '9/7',
      title: 'Long message',
      isCorrect: true
    }
  ];
}

/* Internal logic code end */

/*************************************************************************************************/

/* Connect to backend logic code start */

/*
  Fetch all historical question & student response
  from the database
  return an array
*/
function FetchAllQuestionHistory(studentID) {

}

/* Connect to backend logic code end */

/*************************************************************************************************/

/* User interface code start */

function ResponseHistoryList({ data, onRefresh, isRefreshing, navigation }) {
  const themedStyles = ThemedStyles();

  const Item = ({title, date, isCorrect}) => 
  {
    return (
      <View style={themedStyles.item}>
        <Pressable 
          onPress={()=>{
            navigation.navigate("ClickerPageHistoryDetail")
          }}
        >
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={themedStyles.date}>{date}</Text>
            {isCorrect && <CheckMark style={themedStyles}/>}
            {!isCorrect && <CrossMark style={themedStyles}/>}
          </View>

          <View style={themedStyles.itemInner}>
            <Text style={themedStyles.title}>{title.length > 27 ? title.slice(0, 27)+"..." : title}</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={({item}) => <Item title={item.title} date={item.date} isCorrect={item.isCorrect} />}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
    />
  );
}

function CheckMark({ style }) {
  return (
    <View>
      <View style={style.checkMarkPart1} />
      <View style={style.checkMarkPart2} />
    </View>
  );
}

function CrossMark({ style }) {
  return (
    <View>
      <View style={style.crossMarkPart1} />
      <View style={style.crossMarkpart2} />
    </View>
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

    item: StyleSheet.flatten([
      {
        top: 0, 
        width: width*0.9, 
        alignSelf: 'center', 
        marginTop: 10, 
        borderRadius: 10, 
        height: 100,
        backgroundColor: currentTheme.mainColor, 
      }, 
      KolynStyle.kolynButton(currentTheme.mainColor),
    ]),

    itemInner: StyleSheet.flatten([
      {
        width: width*0.8, 
        alignSelf: 'center',
        marginTop: 10, 
        borderRadius: 10,
        top: -15,
        height: 50,
        backgroundColor: currentTheme.primaryColor, 
      }, 
      KolynStyle.kolynButton(currentTheme.primaryColor),
    ]),
  
    title: StyleSheet.flatten([
      {alignSelf: 'center', flex: 1, alignSelf: 'flex-start', start: 10},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.subColor)
    ]),

    date: StyleSheet.flatten([
      {alignSelf: 'center', flex: 1, alignSelf: 'flex-start', start: 10},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.primaryColor)
    ]),

    checkMarkPart1: {
      width: 15,
      height: 5,
      top: 15,
      right: 20,
      backgroundColor: currentTheme.primaryColor,
      transform: [
        {rotate: '45deg'}
      ]
    },

    checkMarkPart2: {
      width: 20,
      height: 5,
      top: 5,
      right: 10,
      backgroundColor: currentTheme.primaryColor,
      transform: [
        {rotate: '136deg'}
      ]
    },

    crossMarkPart1: {
      width: 24,
      height: 5,
      top: 15,
      right: 20,
      backgroundColor: currentTheme.primaryColor,
      transform: [
        {rotate: '45deg'}
      ]
    },

    crossMarkpart2: {
      width: 24,
      height: 5,
      top: 10,
      right: 20,
      backgroundColor: currentTheme.primaryColor,
      transform: [
        {rotate: '135deg'}
      ]
    }
  }));
}
