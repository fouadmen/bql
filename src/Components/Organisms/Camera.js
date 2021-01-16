import React from 'react';
import { View, StyleSheet } from 'react-native';
import {RNCamera} from 'react-native-camera';
import { BarcodeMask } from "_molecules";
const Camera = (props) => {
  return (
    <View style={styles.container}>
      <RNCamera
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        captureAudio={false}
        style={styles.preview}
        torchMode={"off"}     
        onBarCodeRead={props.onBarCodeRead ? props.onBarCodeRead : null}
        >
        {props.displayMask ? <BarcodeMask/> : null}
      </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1
  }
});

export default Camera;