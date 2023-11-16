import * as React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { ThemeContext } from '../../kits/AppTheme';
import * as KolynStyle from '../../kits/KolynStyleKit';
import { CommonPart } from '../../kits/CommonPart';


const {width, height} = Dimensions.get('window');
var initialElements = undefined;


const SwipeableFlatList = ({ themedStyles, onSwipeToDelete, datas, onRefresh, isRefreshing }) => {
  const flatListRef = React.useRef(null);

  var itemTransformXs = datas.map(_ => useSharedValue(0));

  const handleSwipe = (index) => {
    if (flatListRef.current) {
      if (index > 0) {
        flatListRef.current.scrollToIndex({
          animated: true,
          index: index - 1,
        });
      }

      // Update the translateX value to trigger the animation
      if (onSwipeToDelete != -1)
        {
        itemTransformXs[index].value = withTiming(0.1, {}, () => {
          // Call the callback function provided by the parent component

          // Reset translateX value after animation is complete
          itemTransformXs[index].value = withTiming(1000);
        });
      }
      else {
        itemTransformXs.forEach(x=>{
          if(x != undefined)
          {
            x.value = 0;
          }
        })
      }
    }
  };

  const RenderSwipeableItem = ({ course, swipeableX }) => {
    
    const swipeableAnimatedStyle = () => useAnimatedStyle(() => {
      return {
        transform: [{ translateX: swipeableX.value }],
      };
    });

    return (
      <Animated.View style={[
          course.getTitle() != "" && themedStyles.item, 
          swipeableAnimatedStyle()
        ]}>
        <Text style={themedStyles.title}>{course.getTitle()}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={[{flex: 10}, themedStyles.flatListView]}>
      <FlatList
        ref={flatListRef}
        data={datas}
        renderItem={({item})=> <RenderSwipeableItem 
                                course={item.course} 
                                swipeableX={itemTransformXs[datas.findIndex(x=>x.course.getID() === item.course.getID())]}
                              />}
        keyExtractor={item => item.course.getID()}
      />
      {true && handleSwipe(onSwipeToDelete)}
    </View>
  );
};

// TODO: maintain fixed length array

export function CoursePageDefault({route, navigation}) {
  const themedStyles = ThemedStyles();

  // The refresh control for the course flat list
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const optionalDeleteCourseID = route.params?.fromQuitSuccessPage;
  if (optionalDeleteCourseID !== undefined)
  {
    const toBeDeletedCourseIndex = GetExampleElements()
                                    .findIndex(x=>x.course.getID() === optionalDeleteCourseID);
    
    // use swipe away animation on the item in this index

  }

  if (initialElements == undefined) { // first time loading page
    // fetch course information from the server
    initialElements = GetExampleElements(); // GetCourseArray()
    console.log("initialElements are not defined");
  } 
  else { // go back to this page
    // check if anything is deleted
    // if yes, swipe that element out and delete it from the list
    
    /*
    // for example, with the first item removed: 
    const fetchedElements = [...GetExampleElements().slice(1, 6)];
    
    initialElements = fetchedElements;
    if (initialElements.length != fetchedElements.length) {
      console.log("there was a change");
    } 
    else {
      console.log("there wasn't a change");
    }
    console.log("initialElements are defined");
    */
  } 

  // The entire array for the course items
  const [elementState, setElementState] = React.useState(initialElements);
  const [onSwipeToDelete, setOnSwipeToDelete] = React.useState(0);

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

            {/*
            <View style={[{flex: 10}, themedStyles.flatListView]}>
              
              <CourseList 
                data={elementState}
                onRefresh={onRefresh} 
                isRefreshing={isRefreshing}
                navigation={navigation}
              />

            </View>
            */
            }

            <SwipeableFlatList 
              themedStyles={themedStyles}
              onSwipeToDelete={onSwipeToDelete}
              datas={elementState}
              onRefresh={onRefresh}
              isRefreshing={isRefreshing}
            />

          <View style={{flex: 2}}>

            { /*<AddCourseButton onPress={()=>{navigation.replace("CoursePageAddCourse")}}/>*/ }
            <AddCourseButton onPress={()=>{

              setOnSwipeToDelete(1);  

              //const updatedData = [...initialElements];

              //updatedData.splice(3, 1);
              //updatedData.forEach(x=>console.log(x.course.getTitle()))
              setTimeout(() => { 
                setOnSwipeToDelete(-1);  
                setElementState(GetExampleElements2());
              }, 2000);

            }}/>
          </View>
        </View>
      }
    />
  );
}

/* Internal logic code start */
export class Course {
  #id;
  #title;
  #timespan;

  constructor(id, title, timespan) {
    this.#id = id;
    this.#title = title;
    this.#timespan = timespan;

    this.getID = () => this.#id;
    this.getTitle = () => this.#title;
    this.getTimespan = () => this.#timespan;
  }
}

function GetExampleElements()
{
  return [
    {
      course: new Course(
        'HE7LE8', 
        'CS320, Jaime Dávila',
        'Tu, Th 13:00 - 14:15')
    },
    {
      course: new Course(
        '8h7K4j', 
        'CS311, Ghazaleh Parvini', 
        'Mo, We, Fr 11:30 - 12:45')
    },
    {
      course: new Course(
        '2s6R1q', 
        'CS576, Evangelos Kalogerakis', 
        'Mo, We, Fr 5:15 - 6:30')
    },
    {
      course: new Course(
        '5d8F2w',
        'CS345, Jaime Dávila',
        'Tu, Th 15:00 - 16:15')
    },
    {
      course: new Course(
        '9t4Y7x',
        'CS220, Marius Minea',
        'Tu, Th 9:00 - 10:15')
    },
    {
      course: new Course(
        '7Q2r9P',
        'CS377, Prashant Shenoy',
        'Fr 9:00 - 10:15')
    }
  ];
}

function GetExampleElements2()
{
  return [
    {
      course: new Course(
        'HE7LE8', 
        'CS320, Jaime Dávila',
        'Tu, Th 13:00 - 14:15')
    },
    {
      course: new Course(
        '2s6R1q', 
        'CS576, Evangelos Kalogerakis', 
        'Mo, We, Fr 5:15 - 6:30')
    },
    {
      course: new Course(
        '9t4Y7x',
        'CS220, Marius Minea',
        'Tu, Th 9:00 - 10:15')
    },
    {
      course: new Course(
        '7Q2r9P',
        'CS377, Prashant Shenoy',
        'Fr 9:00 - 10:15')
    },
    {
      course: new Course(
        '5d8F2w',
        'CS345, Jaime Dávila',
        'Tu, Th 15:00 - 16:15')
    },
    {
      course: new Course(
        '8h7K4j', 
        '', 
        '')
    },
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

  const Item = ({course}) => 
  {
    return (
      <View style={themedStyles.item}>
        <Pressable 
          onPress={()=>{
            navigation.replace("CoursePageInspect", {fromDefaultPage: course});
          }}
        >
          <Text style={themedStyles.title}>{course.getTitle()}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={({item}) => <Item course={item.course} />}
      keyExtractor={item => item.course.getID()}
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
        <Text style={themedStyles.addCourseLabel}>Remove 311</Text>
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
