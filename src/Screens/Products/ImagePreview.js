import React from 'react'
import { View, ImageBackground } from 'react-native'
import { Icon } from "_atoms";
import {useDispatch} from 'react-redux';
import {setProductImage} from "_reducers";

const ImagePreview = ({route, navigation}) => {
    const uri = route.params.uri;
    const dispatch = useDispatch();
    
    const confirm = () => {
        dispatch(setProductImage({data: uri}));
        navigation.navigate("NewProductForm");
    }

    return (
        <ImageBackground style={{flex:1}} source={{uri:uri, isStatic:true}}>
            <View style={{position:'absolute', bottom:24, alignSelf:'center', flexDirection:'row'}}>
                <Icon name="close-circle" size={64} status="alert" onPress={()=>navigation.goBack()}/>
                <Icon name="checkmark-circle" size={64} status="success" onPress={confirm} style={{marginLeft:64}}/>
            </View>
        </ImageBackground>
    )
}

export default ImagePreview
