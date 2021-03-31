import React from 'react';
import { View, ActivityIndicator } from 'react-native'
import { Colors } from "_styles";
const LoadingActivity = () => {
    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size="large" color={Colors.PRIMARY}/>
        </View>
    )
}

export default LoadingActivity;