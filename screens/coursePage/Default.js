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
import { Course, GetSampleCourseList } from '../../props/CourseList';
import { SpringButton } from '../../kits/SpringButton';


const {width, height} = Dimensions.get('window');
var initialElements = undefined;


const SwipeableFlatList = ({ themedStyles, onSwipeToDelete, datas, onRefresh, isRefreshing, navigation }) => {
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
          <Pressable 
          onPress={()=>{
            navigation.replace("CoursePageInspect", {fromDefaultPage: course});
          }}
        >
          <Text style={themedStyles.title}>{course.getTitle()}</Text>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <View style={[{flex: 10}, themedStyles.flatListView]}>
      <FlatList
        ref={flatListRef}
        data={datas}
        renderItem={({item})=> {

          //datas.forEach(x=>console.log(x.course.getTitle()))
          //console.log("--------");

          return <RenderSwipeableItem 
                                course={item.course} 
                                swipeableX={itemTransformXs[datas.findIndex(x=>x.course.getID() === item.course.getID())]}
                              />}
                            }
        keyExtractor={item => item.course.getID()}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
      />
      {true && handleSwipe(onSwipeToDelete)}
    </View>
  );
};

export function CoursePageDefault({route, navigation}) {
  const themedStyles = ThemedStyles();

  // The refresh control for the course flat list
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  if (initialElements == undefined) { // first time loading page
    // fetch course information from the server
    initialElements = GetSampleCourseList(); // GetCourseArray()
    //console.log("Initial elements are undefined");
  } 

  // The entire array for the course items
  const [elementState, setElementState] = React.useState(initialElements);
  //console.log("INITIALIZE ELEMENTSTATE");
  const [onSwipeToDelete, setOnSwipeToDelete] = React.useState(-1);

  const mySetElementState = (newElementState) => {
    setElementState(newElementState);
    initialElements = newElementState;
  };

  const optionalDeleteCourseID = route.params?.fromQuitSuccessPage;
  if (optionalDeleteCourseID !== undefined)
  {
    const toBeDeletedCourseIndex = elementState
                                    .findIndex(x=>x.course.getID() === optionalDeleteCourseID);
    React.useEffect(() => {
      const timeoutId = setTimeout(() => {

        // Call the function that you want to execute after the timeout
        animateSwipeDeletion(
          toBeDeletedCourseIndex,
          setOnSwipeToDelete,
          elementState,
          mySetElementState
        );
      }, 2000);

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timeoutId);
    }, []); // Empty dependency array to run the effect only once
  }

  // Called each time the flat list if refreshed
  const refreshElements = () => {
    /*
    elementState.forEach(x=>{
      console.log(x.course.getTitle());
    });
    */
    mySetElementState(elementState);
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
            {
                //console.log("Before rendering flatlist")
            }
            {
              //elementState.forEach(x=>console.log(x.course.getTitle()))
            }
            {
              //console.log("!!!!!!!!!!!!")
            }
            <SwipeableFlatList 
              themedStyles={themedStyles}
              onSwipeToDelete={onSwipeToDelete}
              datas={elementState}
              onRefresh={onRefresh}
              isRefreshing={isRefreshing}
              navigation={navigation}
            />

          <View style={{flex: 2}}>
            <AddCourseButton onPress={()=>{navigation.replace("CoursePageAddCourse")}}/>
          </View>
        </View>
      }
    />
  );
}

/* Internal logic code start */

function animateSwipeDeletion(indexToRemove, 
                              setOnSwipeToDelete, 
                              elementState, 
                              setElementState) {
  setOnSwipeToDelete(indexToRemove);

  var counter = 0;

  var newElementState = elementState.map(x => {
    if (counter++ == indexToRemove) {
      return { course: new Course(Math.random(), "", "") };
    }
    return x;
  });

  var realNewElementState = [];
  var i = 0;
  var followingI = 0;
  for (i; i < newElementState.length; i++) {
    if (i == indexToRemove) {
      continue;
    }
    realNewElementState[followingI] = newElementState[i];
    followingI++;
  }

  for (i = followingI; i < newElementState.length; i++) {
    realNewElementState[i] = { course: new Course(Math.random(), "", "") };
  }

  setTimeout(() => {
    setOnSwipeToDelete(-1);
    setElementState(realNewElementState);
/*
    realNewElementState.forEach(x=>{
      console.log(x.course.getTitle());
    });
*/
    //console.log("set element state");
  }, 
  2000);
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

/* The 'add course' button */
function AddCourseButton({ onPress }) {
  const themedStyles = ThemedStyles();

  return (
    <SpringButton
      text="Add course"
      onPress={onPress}
      buttonStyle={themedStyles.addCourseButton}
      labelStyle={themedStyles.addCourseLabel}
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
