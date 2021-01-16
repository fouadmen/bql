import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Colors} from '_styles';

const Divider = ({style}) => {
  return (
    <View style={StyleSheet.flatten([styles.default, style])}></View>
  );
};

const styles = StyleSheet.create({
  default: {
   height:1,
   backgroundColor:Colors.GRAY_LIGHT
  },
});  

export default Divider
