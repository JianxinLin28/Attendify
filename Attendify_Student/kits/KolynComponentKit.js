import * as React from 'react';
import { Pressable, StyleSheet, TextInput, Text, View } from 'react-native';
import { Image, Dimensions } from 'react-native';


const {width} = Dimensions.get('window');

/* The icon & title image */
export function KolynMainTitleImage() {
  return (
    <Image
      source={require('../assets/main-title.png')}
      style={styles.mainTitle}
    />
  );
}

export function KolynTopTitleLabel({ text, backgroundStyle, textLabelStyle }) {
  return (
    <View
      style={backgroundStyle}>
      <Text style={textLabelStyle}>{text}</Text>
    </View>
  );
}

/* Navigate to 'Switch Course' page when pressed */
export function KolynSwitchCourseButton({ buttonStyle, textLabelStyle }) {
  return (
    <Pressable
      style={[buttonStyle, {height: 40}, {width: 120}]}>
      <Text style={textLabelStyle}>Switch course</Text>
    </Pressable>
  );
}

export function KolynBottomNavigatorTab({ backgroundStyle, circleColor }) {
  return (
      <View
        style={[styles.circle, {backgroundColor: circleColor}]}>
        <View
        style={[backgroundStyle, {alignSelf: 'center', top: 28, flexDirection: 'row', gap: 15}]}>
        <Image
          source={require('../assets/bluetooth-scan-icon.png')}
          style={styles.smallPageIcon}
        />
        <Image
          source={require('../assets/qr-scan-icon.png')}
          style={styles.smallPageIcon}
        />
        <Image
          source={require('../assets/add-icon.png')}
          style={[styles.bigPageIcon, {top: -20}]}
        />
        <Image
          source={require('../assets/clicker-icon.png')}
          style={styles.smallPageIcon}
        />
        <Image
          source={require('../assets/profile-icon.png')}
          style={styles.smallPageIcon}
        />
      </View>
      </View>
  );
}

// do not add any style that is related to the current theme
const styles = StyleSheet.create({

  mainTitle: {
    resizeMode: 'contain',
    width: 400,
    height: width*0.2,
    alignSelf: 'center',
  },

  smallPageIcon: {
    resizeMode: 'contain',
    width: 56,
    height: 56,
  },

  bigPageIcon: {
    resizeMode: 'contain',
    width: 64,
    height: 64,
  },

  circle: {
    top: -30,
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
  },

});
