import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from "react-native-vector-icons/Feather";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import {Colors} from '_styles';

const _status = {
    "default" : {color: Colors.BASIC_TEXT_COLOR},
    "base": {color: Colors.HINT_TEXT_COLOR},
    "primary" : {color: Colors.PRIMARY},
    "success": {color: Colors.SUCCESS},
    "warning": {color: Colors.WARNING},
    "alert": {color: Colors.ALERT},
    "white":{color: Colors.WHITE}
}
const Icon = (props)=>{
    const {style, status, name, size, type, onPress, containerStyle, disabled} = props;
    let _Icon = ""
    let _style = StyleSheet.flatten([style, status ? _status[status] : _status['default'] ]);
    let _size = size || 24;
    
    if(type==="AntDesign") {
        _Icon=()=> (<AntDesign style={_style} name={name} size={_size}/>)            
    }else if(type==="FontAwesome"){
        _Icon= ()=> (<FontAwesome style={_style} name={name} size={_size}/>)
    }else if(type==="MaterialIcons"){
        _Icon = ()=>(<MaterialIcons style={_style} name={name} size={_size}/>)
    }else if(type==="Feather"){
        _Icon=()=>(<Feather style={_style} name={name} size={_size}/>)
    }else if(type=="FontAwesome5"){
        _Icon=()=>(<FontAwesome5 style={_style} name={name} size={_size}/>)
    }else if(type=="SimpleLineIcons"){
        _Icon=()=>(<SimpleLineIcons style={_style} name={name} size={_size}/>)
    }else if(type=="Entypo"){
        _Icon=()=>(<Entypo style={_style} name={name} size={_size}/>)
    }else if(type=="MaterialCommunityIcons"){
        _Icon=()=>(<MaterialCommunityIcons style={_style} name={name} size={_size}/>)
    }else{
        _Icon=()=>( <Ionicons style={_style} name={name} size={_size}/>)
    }

    if (onPress) {
        return (
            <TouchableOpacity disabled={disabled} style={containerStyle} onPress={onPress}>{_Icon()}</TouchableOpacity>
        );
    }

    return <View style={containerStyle}><_Icon /></View> 
}

export default Icon;
