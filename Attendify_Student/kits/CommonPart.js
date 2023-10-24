import * as React from 'react';
import { Platform, Dimensions } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { currentTheme } from '../kits/AppTheme';
import { loadFont } from '../props/FontLoader';
import * as KolynStyle from '../kits/KolynStyleKit';
import { KolynTopTitleLabel } from '../kits/KolynComponentKit';

/*
  The common part for the Bluetooth scan, QR code scan, Manage course, Clicker, Profile pages
*/

const ios = Platform.OS == 'ios';

export function CommonPart({components, title}) {
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

const styles = StyleSheet.create({
  screen: StyleSheet.flatten([
    KolynStyle.kolynScreen(currentTheme.mainColor),
  ]),

  divider: StyleSheet.flatten([
    {top: -20},
    KolynStyle.kolynDivider(currentTheme.primaryColor)
  ]),
});
