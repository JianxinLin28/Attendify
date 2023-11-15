import * as React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';


const {width, height} = Dimensions.get('window');

export function CoursePageDefault({navigation}) {
  const themedStyles = ThemedStyles();

  // The refresh control for the course flat list
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  var initialElements = GetExampleElements(); // GetCourseArray()

  // The entire array for the course items
  const [elementState, setElementState] = React.useState(initialElements);
  // Called each time the flat list if refreshed
  const refreshElements = () => {
    setElementState(GetExampleElements());
  }

  // Refresh the flat list
  const onRefresh = () => {
    setIsRefreshing(true);
    refreshElements();
    setIsRefreshing(false);
  }

  return (
    <CommonPart title={"Manage Course"}
      components={
          <View style={themedStyles.background}>
            <View style={[{flex: 10}, themedStyles.flatListView]}>

              <CourseList 
                data={elementState}
                onRefresh={onRefresh} 
                isRefreshing={isRefreshing}
                navigation={navigation}
              />

            </View>

          <View style={{flex: 2}}>

            <AddCourseButton onPress={()=>{navigation.replace("CoursePageAddCourse")}}/>

          </View>
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
      course: {
        id: 'HE7LE8',
        title: 'CS320, Jaime Dávila',
        timespan: 'Tu, Th 13:00 - 14:15'
      }
    },
    {
      course: {
        id: '8h7K4j',
        title: 'CS311, Ghazaleh Parvini',
        timespan: 'Mo, We, Fr 11:30 - 12:45'
      }
    },
    {
      course: {
        id: '2s6R1q',
        title: 'CS576, Evangelos Kalogerakis',
        timespan: 'Mo, We, Fr 5:15 - 6:30'
      }
    },
    {
      course: {
        id: '5d8F2w',
        title: 'CS345, Jaime Dávila',
        timespan: 'Tu, Th 15:00 - 16:15'
      }
    },
    {
      course: {
        id: '9t4Y7x',
        title: 'CS220, Marius Minea',
        timespan: 'Tu, Th 9:00 - 10:15'
      }
    },
    {
      course: {
        id: '7Q2r9P',
        title: 'CS377, Prashant Shenoy',
        timespan: 'Fr 9:00 - 10:15'
      }
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
  id must be represented in string form and
  two items do not share the same id value
*/
function GetCourseArray(studentID)
{

}

/* Connect to backend logic code end */

/*************************************************************************************************/

/* User interface code start */

/* The flat list that is used to show the courses */
function CourseList({ data, onRefresh, isRefreshing, navigation }) {
  const themedStyles = ThemedStyles();

  const Item = ({title, id, timespan}) => 
  {
    return (
      <View style={themedStyles.item}>
        <Pressable 
          onPress={()=>{
            navigation.replace("CoursePageInspect", {courseID: id, title: title, timespan: timespan});
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
      renderItem={({item}) => <Item title={item.title} id={item.id} timespan={item.timespan} />}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
    />
  );
}

/* The 'add course' button */
function AddCourseButton({ onPress }) {
  const themedStyles = ThemedStyles();

  return (
    <Pressable style={themedStyles.addCourseButton} onPress={onPress}>
        <Text style={themedStyles.addCourseLabel}>Add Course</Text>
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

    flatListView: {
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
        borderWidth: 4 }, 
      KolynStyle.kolynButton(currentTheme.primaryColor),
    ]),
  
    title: StyleSheet.flatten([
      {alignSelf: 'center', height: 55},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.subColor)
    ]),
  
    addCourseButton: StyleSheet.flatten([
      {width: 240, alignSelf: 'center'}, 
      KolynStyle.kolynButton(currentTheme.mainColor),
    ]),
  
    addCourseLabel: StyleSheet.flatten([
      KolynStyle.kolynLabel(currentTheme.fontSizes.casual, currentTheme.mainFont, currentTheme.primaryColor)
    ]),
  }));
}
