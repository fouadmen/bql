import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {Colors} from '_styles';
import Text from './Text';

const _status = {
    "primary" : {backgroundColor: Colors.PRIMARY},
    "success": {backgroundColor: Colors.SUCCESS},
    "warning": {backgroundColor: Colors.WARNING},
    "alert": {backgroundColor: Colors.ALERT},
    "white": {backgroundColor: Colors.WHITE},
    "disable":{backgroundColor: Colors.GRAY_MEDIUM}
}
const Button = ({children, status, onPress, textStatus, icon, style, disabled})=>{
    return (
        <TouchableOpacity disabled={disabled} onPress={disabled ? null : onPress ? onPress : null}>
            <View style={StyleSheet.flatten([styles.default, style, status ? _status[status] : disabled ? _status['disable'] : _status['primary']])}>
                <Text style={styles.textStyle} status={textStatus ? textStatus : 'white'} weight="medium" category="p">{children}</Text>
                {icon ? icon() : null}
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    default :{
        height:48,
        minWidth: 120,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        borderRadius:24,
        padding:20
    },
    textStyle:{
        lineHeight:18,
        marginRight: 10
    }
})
export default Button;
