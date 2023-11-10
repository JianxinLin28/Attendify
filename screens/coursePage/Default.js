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
            <View style={themedStyles.flatListView}>

              <CourseList 
                data={elementState}
                onRefresh={onRefresh} 
                isRefreshing={isRefreshing}
                navigation={navigation}
              />

            </View>

          <View style={{flex: 1, top: 50}}>

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

  const Item = ({title}) => 
  {
    return (
      <View style={themedStyles.item}>
        <Pressable 
          onPress={()=>{
            navigation.replace("CoursePageInspect");
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
        borderWidth: 4 }, 
      KolynStyle.kolynButton(currentTheme.primaryColor),
    ]),
  
    title: StyleSheet.flatten([
      {alignSelf: 'center', height: 55},
      KolynStyle.kolynLabel(currentTheme.fontSizes.small, currentTheme.mainFont, currentTheme.subColor)
    ]),
  
    addCourseButton: StyleSheet.flatten([
      {top: 55, width: 240, alignSelf: 'center'}, 
      KolynStyle.kolynButton(currentTheme.mainColor),
    ]),
  
    addCourseLabel: StyleSheet.flatten([
      KolynStyle.kolynLabel(currentTheme.fontSizes.casual, currentTheme.mainFont, currentTheme.primaryColor)
    ]),
  }));
}
