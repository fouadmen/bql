import React from 'react';
import { StyleSheet, Text as Text_ } from 'react-native';
import {Colors, Typography} from '_styles';

const categories = {
    'h1': {fontSize: Typography.FONT_SIZE_32}, 
    'h2': {fontSize: Typography.FONT_SIZE_24}, 
    'h3': {fontSize: Typography.FONT_SIZE_20}, 
    'h4': {fontSize: Typography.FONT_SIZE_18}, 
    's1': {fontSize: Typography.FONT_SIZE_14},
    's2': {fontSize: Typography.FONT_SIZE_13},
    's3': {fontSize: Typography.FONT_SIZE_12},
    'p': {fontSize: Typography.FONT_SIZE_16},
    'extra': {fontSize: Typography.FONT_SIZE_80}
}

const _status = {
    "base":{color : Colors.BASIC_TEXT_COLOR},
    "hint":{color: Colors.HINT_TEXT_COLOR},
    "primary" : {color: Colors.PRIMARY},
    "success": {color: Colors.SUCCESS},
    "warning": {color: Colors.WARNING},
    "alert": {color: Colors.ALERT},
    "white": {color: Colors.WHITE},
    "black": {color: Colors.BLACK},
    "disable": {color: Colors.GRAY_DARK}
}

const _weight = {
    "bold": {fontFamily: Typography.FONT_FAMILY_BOLD},
    "medium": {fontFamily: Typography.FONT_FAMILY_MEDIUM},
    "regular": {fontFamily: Typography.FONT_FAMILY_REGULAR},
}
const defaultStyle = {textAlignVertical:'center'}

const Text = (props) => {
    const {category, status, weight, children, style, ...nativeProps} = props;
    return (
        <Text_ 
            {...nativeProps}
            style={StyleSheet.flatten([style, defaultStyle, category ? categories[category ? category : 'h1'] : {}, status ? _status[status] : _status["base"], weight ? _weight[weight]: _weight['regular']  ])}>
            {children}
        </Text_>
    );
};

/**
 * 
 * @param {category:String, status:String, weight:String, children:Component, style:Object} props 
 */
export default Text;
