import * as React from 'react';
import { Platform, Dimensions, TextInput } from 'react-native';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { currentTheme, changeTheme } from '../kits/AppTheme';
import { loadFont } from '../props/FontLoader';
import * as KolynStyle from '../kits/KolynStyleKit';
import { KolynTopTitleLabel } from '../kits/KolynComponentKit';


const ios = Platform.OS == 'ios';

export function CommonPart({navigation, components, title}) {
  const MemoizedDivider = React.memo(function Divider() {
    return (<View style={styles.divider} />);
  });

  const fontsLoaded = loadFont();
  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.screen}
        onLayout={onLayoutRootView}>
      <SafeAreaView 
        className={ios? '-mb-8': ''}
        style={{flex: 1}}>
        
        <KolynTopTitleLabel 
          text={title}
          foregroundColor={currentTheme.primaryColor}/>

        <MemoizedDivider/>

        <View style={{flex: 6}}>

          {components}

        </View>

        <MemoizedDivider/>

      </SafeAreaView>
    </View>
  );
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({

  screen: StyleSheet.flatten([
    KolynStyle.kolynScreen(currentTheme.mainColor),
  ]),

  divider: StyleSheet.flatten([
    {top: -20},
    KolynStyle.kolynDivider(currentTheme.primaryColor)
  ]),
});
