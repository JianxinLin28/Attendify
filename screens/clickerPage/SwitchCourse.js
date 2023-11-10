import * as React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';


const {width, height} = Dimensions.get('window');

export function SwitchCoursePage({navigation}) {
  const themedStyles = ThemedStyles();

  const [isRefreshing, setIsRefreshing] = React.useState(false);

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
    <CommonPart title={"Switch Course"}
      components={
          <View style={themedStyles.background}>
            <View style={[themedStyles.flatListView, {flex: 7}]}>

              <CourseList 
                data={elementState}
                onRefresh={onRefresh} 
                isRefreshing={isRefreshing}
                navigation={navigation}
              />

            </View>

            <View style={{flex: 1}}/>
        </View>
      }
    />
  );
}

/* Internal logic code start */

function GetExampleElements()
{
  return [
    {
      id: 'CS320',
      title: 'CS320, Jaime Dávila',
    },
    {
      id: 'CS311',
      title: 'CS311, Ghazaleh Parvini',
    },
    {
      id: 'CS576',
      title: 'CS576, Evangelos Kalogerakis',
    },
    {
      id: 'CS345',
      title: 'CS345, Jaime Dávila',
    },
    {
      id: 'CS220',
      title: 'CS220, Marius Minea',
    },
    {
      id: 'CS377',
      title: 'CS377, Prashant Shenoy'
    }
  ];
}

/* Internal logic code end */

/*************************************************************************************************/

/* Connect to backend logic code start */

/*
  Return an array of courses, each represented by
  {
    courseId
    courseTitle
    courseTimespan
    courseSection
  }
  id can be string/number as long as two elements 
  in the array do not share the same id value
*/
function GetCourseArray(studentID)
{

}

/*
  Update the current course of this student
  send this data to the database and update

  return true is action were successful
  otherwise return false
*/
function UpdateStudentCurrentCourse(studentID, courseID) {

}

/* Connect to backend logic code end */

/*************************************************************************************************/

/* User interface code start */

/* The flat list that is used to show the courses */
function CourseList({ data, onRefresh, isRefreshing, navigation }) {
  const themedStyles = ThemedStyles();

  const Item = ({title}) => 
  {
    return (
      <View style={themedStyles.item}>
        <Pressable 
          onPress={()=>{
            navigation.goBack();
          }}
        >
          <Text style={themedStyles.title}>{title}</Text>
        </Pressable>
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
