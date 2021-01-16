import React from 'react';
import { View } from 'react-native';
import { Colors } from '_styles';
import Icon from './Icon';

const FAB = ({onPress}) => {
    return (
        <View style={{backgroundColor: Colors.PRIMARY, height:48, width:48, borderRadius:24, position:'absolute', bottom:24, right:24, flexDirection:'column', justifyContent:'center'}}>
            <Icon containerStyle={{alignSelf:'center'}} name="add" status="white" onPress={onPress ? onPress : null}/>  
        </View>
    )
}

export default FAB;
