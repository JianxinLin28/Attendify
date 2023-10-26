import * as React from 'react';
import { useState } from 'react';
import { Dimensions, TextInput, ScrollView } from 'react-native';
import { StyleSheet, Text, View, Pressable, FlatList, StatusBar } from 'react-native';
import { currentTheme } from '../kits/AppTheme';
import * as KolynStyle from '../kits/KolynStyleKit';
import { CommonPart } from '../kits/CommonPart';


const {width, height} = Dimensions.get('window');

const Item = ({title}) => 
{
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export function CoursePage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  var initialElements = GetExampleElements(); // GetCourseArray()

  const [elementState, setElementState] = useState(initialElements);
  // Called each time the flat list if refreshed
  const refreshElements = () => {

  }

  const onRefresh = () => {
    setIsRefreshing(true);
    refreshElements();
    setIsRefreshing(false);
  }

  return (
    <CommonPart title={"Manage Course"}
      components={
          <View style={styles.background}>
            <View style={styles.flatListView}>

              <CourseList 
                data={elementState}
                onRefresh={onRefresh} 
                isRefreshing={isRefreshing}
              />

            </View>

          <View style={{flex: 1, top: 50}}>

            <AddCourseButton onPress={()=>{}}/>

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
  id can be string/number as long as two elements 
  in the array do not share the same id value
*/
function GetCourseArray()
{

}

/* Connect to backend logic code end */

/*************************************************************************************************/

/* User interface code start */

/* The flat list that is used to show the courses */
function CourseList({ data, onRefresh, isRefreshing }) {
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
  return (
    <Pressable style={styles.addCourseButton} onPress={onPress}>
        <Text style={styles.addCourseLabel}>Add Course</Text>
    </Pressable>
  );
}

/* User interface code end */

const styles = StyleSheet.create({
  background: {
    top: -20, 
    flex: 1, 
    width: width, 
    height: height, 
    alignSelf: 'center', 
    backgroundColor: currentTheme.primaryColor
  },

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
});
