import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from "_atoms";
import { RNCamera } from 'react-native-camera';
import { Colors } from '_styles';

import { useIsFocused } from '@react-navigation/native';

const Camera =(props) => {
    const cameraRef = React.createRef();

    const takePicture = async ()=>{
        if (cameraRef) {
            const data = await cameraRef.current.takePictureAsync({base64: true });
            props.onPictureTaken('data:image/jpeg;base64,'+data.base64);
        }
    };    
      
    return (
        <RNCamera
            ref={cameraRef}
            style={{
                flex: 1,
                justifyContent: 'space-between',
            }}
            captureAudio={false}
            playSoundOnCapture={true}
            androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}   
            
            >
                <View style={{height:56, backgroundColor:"#000", flexDirection:'row', justifyContent:'space-between', paddingHorizontal:24, opacity:0.4}}>
                    <Text weight="medium" category="h4" status="white">Cancel</Text>
                    <Text weight="bold" category="h3" status="white">Snap Photo</Text>
                    <Text weight="medium" category="h4" status="white">Skip</Text>
                </View>

                <TouchableOpacity onPress={takePicture} style={{height:64, aspectRatio:1, backgroundColor:Colors.WHITE, borderRadius:32, flexDirection:'row', justifyContent:'center', bottom:24, alignSelf:'center'}}>
                    <View style={{height:54, aspectRatio:1, backgroundColor:Colors.GRAY_MEDIUM, borderRadius:32, alignSelf:'center'}}/>
                </TouchableOpacity>
        </RNCamera>
        );
}

const ProductPicture = ({navigation}) => {
    const [displayCamera, setDisplayCamera] = React.useState(false);
    const isFocused = useIsFocused
    
    const onPictureTaken = (uri) => {
        navigation.navigate("ImagePreview", {uri})
    }

    return (
       <>
           { isFocused ? <Camera onPictureTaken={onPictureTaken}/> :  <View/>}
       </>
    )
}

export default ProductPicture;