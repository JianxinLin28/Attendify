import * as React from 'react';
import { View } from 'react-native';
import { KolynSwitchCourseButton } from '../../kits/KolynComponentKit';
import { CommonPart } from '../../kits/CommonPart';


export function BluetoothPageDefault({navigation}) {

  return (
    <CommonPart 
      title={"Bluetooth Scan"}
      components={
        <View style={{flex: 6}}>

          <KolynSwitchCourseButton
            onPress={()=>{navigation.navigate("SwitchCourse")}}
          />

          {/* Add new stuff here */}

        </View>
      }
    />
  )
}

/* Internal logic code start */
/* Internal logic code end */

/*************************************************************************************************/

/* Connect to backend logic code start */
/* Connect to backend logic code end */

/*************************************************************************************************/

/* User interface code start */
/* User interface code end */
