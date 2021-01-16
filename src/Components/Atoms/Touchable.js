import React from 'react'
import { TouchableNativeFeedback, TouchableOpacity, Platform} from 'react-native';
import {Colors} from '_styles';

const Touchable = ({children, onPress}) => {
    const os = Platform.OS;
    if (os==="android") {
        return (
            <TouchableNativeFeedback onPress={onPress} background={TouchableNativeFeedback.Ripple(Colors.GRAY_LIGHT, true)}>{children}</TouchableNativeFeedback>
        );
    } else {
        return (
            <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
        )
    }
}

export default Touchable
