import React from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'
import { Icon } from "_atoms";
const ImagePreview = ({route, navigation}) => {
    const uri = route.params.uri;
    return (
        <ImageBackground style={{flex:1}} source={{uri:uri, isStatic:true}}>
            <View style={{position:'absolute', bottom:24, alignSelf:'center', flexDirection:'row'}}>
                <Icon name="close-circle" size={64} status="alert" onPress={()=>navigation.goBack()}/>
                <Icon name="checkmark-circle" size={64} status="success" onPress={()=>navigation.navigate("CaptureBarcode")} style={{marginLeft:64}}/>
            </View>
        </ImageBackground>
    )
}

export default ImagePreview
