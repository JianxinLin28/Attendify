import * as React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { KolynSwitchCourseButton2, KolynCasualButton, KolynCourseLabel } from '../../kits/KolynComponentKit';
import { getCourseIndex } from '../../props/CurrentCourse';
import { CommonPart } from '../../kits/CommonPart';
import { GetSampleCourseList } from '../../props/CourseList';


const {width, height} = Dimensions.get('window');

export function ProfilePageCheckinHistory({navigation}) {
  const themedStyles = ThemedStyles();

  const [courseText, onChangeCourseText] = React.useState('');
  const [timeText, onChangeTimeText] = React.useState('');

  var initialCourses = GetSampleCourseList(); // GetCourseArray()
  const [courseState, setCourseState] = React.useState(initialCourses);
  const [currentCourseIndex, setCurrentCourseIndex] = React.useState(getCourseIndex());

  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [elementState, setElementState] = React.useState(GetCheckinHistoryList());

    // Called each time the flat list if refreshed
    const refreshElements = () => {
      setElementState(GetCheckinHistoryList());
    }
  
    const onRefresh = () => {
      setIsRefreshing(true);
      refreshElements();
      setIsRefreshing(false);
    }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCurrentCourseIndex(getCourseIndex());
    });
    return () => unsubscribe();
  }, [navigation]);

  return (
      <CommonPart title={"Check-in history"}
        components={
            <View style={themedStyles.background}>
              
              <View style={{flex: 2, left: 98}}>
                <KolynSwitchCourseButton2
                  onPress={()=>{navigation.navigate("SwitchCourse")}}
                />
              </View>

              <View style={{flex: 2}}>
                <KolynCourseLabel
                  courseText={courseText}
                  onChangeCourseText={onChangeCourseText}
                  text={courseState[currentCourseIndex].course.getTitle()}
                  textColor={GetSubColor()}
                />

                <KolynCourseLabel
                  courseText={timeText}
                  onChangeCourseText={onChangeTimeText}
                  text={courseState[currentCourseIndex].course.getTimespan()}
                  textColor={GetSubColor()}
                />
              </View>

              <View style={{flex: 6, top: -30}}>
                <HistoryList
                  data={elementState}
                  onRefresh={onRefresh}
                  isRefreshing={isRefreshing}
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

export class CheckinHistory {
  #date;
  #checkinTime;

  constructor(date, checkinTime) {
    this.#date = date;
    this.#checkinTime = checkinTime;

    this.getDate = () => this.#date;
    this.getCheckinTime = () => this.#checkinTime;
  }
}

function GetCheckinHistoryList() {
  return [
    {
      checkinHistory: new CheckinHistory(
        '9/7',
        '13:01',
      )
    },
    {
      checkinHistory: new CheckinHistory(
        '9/12',
        '13:00',
      )
    },
    {
      checkinHistory: new CheckinHistory(
        '9/14',
        '13:05',
      )
    },
    {
      checkinHistory: new CheckinHistory(
        '9/19',
        '13:02',
      )
    }
  ]
}

/* Internal logic code end */

/*************************************************************************************************/

/* Connect to backend logic code start */

/*
  return a list of check-in historys
*/
function GetCheckinHistory() {

}

/* Connect to backend logic code end */

/*************************************************************************************************/

/* User interface code start */

function HistoryList({ data, onRefresh, isRefreshing }) {
  const themedStyles = ThemedStyles();

  const Item = ({text}) => 
  {
    return (
      <View style={themedStyles.item}>
          <Text style={themedStyles.title}>{text}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={({item}) => <Item 
                                      text={item.checkinHistory.getDate() + 
                                        ', ' + 
                                        item.checkinHistory.getCheckinTime()}
                                    />}
      keyExtractor={item => item.checkinHistory.getDate() + 
                              ', ' + 
                              item.checkinHistory.getCheckinTime()}
      showsVerticalScrollIndicator={false}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
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
      top: 50, 
      alignSelf: 'center', 
      flex: 5,
      backgroundColor: currentTheme.mainColor
    },

    item: StyleSheet.flatten([
      {
        top: 0, 
        width: width*0.9, 
        alignSelf: 'center', 
        marginTop: 10, 
        borderRadius: 10, 
        backgroundColor: currentTheme.primaryColor, 
        borderWidth: 4,
        borderColor: currentTheme.subColor
      }, 
        KolynStyle.kolynButton(currentTheme.primaryColor),
      ]),

      title: StyleSheet.flatten([
        {alignSelf: 'center', height: 55},
        KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.subColor)
      ]),

  }));
}
