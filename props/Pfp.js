import * as React from 'react';
import { StyleSheet } from 'react-native';
import {  ThemeContext } from '../kits/AppTheme';

var currentPfpIndex = 0;

export const setCurrentPfpIndex = (newIndex) => {
  currentPfpIndex = newIndex;
}

export const getPfpIndex = () => currentPfpIndex;


export const Pfp = [
  {
    image: require('../assets/pfp-chair.png'),
    key: "chair"
  },
  {
    image: require('../assets/pfp-mark.png'),
    key: "chmarkair"
  },
  {
    image: require('../assets/pfp-apple.png'),
    key: "apple"
  },
  {
    image: require('../assets/pfp-android.png'),
    key: "android"
  },
  {
    image: require('../assets/pfp-react.png'),
    key: "react"
  },
  {
    image: require('../assets/pfp-mongo.png'),
    key: "mongo"
  }
];

export function PfpStyle() {
  const themedStyles = ThemedStyles();

  return themedStyles.pfpIcon;
}

export function UnusedPfpOverlayStyle() {
  const themedStyles = ThemedStyles();

  return themedStyles.unusedPfpOverlay;
}

function hexToRgba(hex, alpha) {
  const hexWithoutHash = hex.replace(/^#/, '');
  const bigint = parseInt(hexWithoutHash, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function ThemedStyles() {
  const themeManager = React.useContext(ThemeContext);
  const currentTheme = themeManager.theme;

  return (StyleSheet.create({

  pfpIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center'
  },

  unusedPfpOverlay: {
    ...StyleSheet.absoluteFillObject,
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    backgroundColor: hexToRgba(currentTheme.disableColor, 0.5),
  }

  }));
}
