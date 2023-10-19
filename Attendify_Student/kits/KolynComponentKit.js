import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Image, Dimensions } from 'react-native';

/* The icon & title image */
export function KolynMainTitleImage() {
  return (
    <Image
      source={require('../assets/main-title.png')}
      style={styles.title}
    />
  );
}

export function KolynTextfield({ style, text, onChangeText, placeholder, keyboardType, isSecure }) {
  return (
    <TextInput
      style={style}
      onChangeText={onChangeText}
      value={text}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={isSecure}
    />
  );
}

export function KolynBottomNavigatorTab({  }) {

}

const {width} = Dimensions.get('window');
// do not add any style that is related to the current theme
const styles = StyleSheet.create({

  title: {
    resizeMode: 'contain',
    width: 400,
    height: width*0.2,
    alignSelf: 'center',
  },

})
