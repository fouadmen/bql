import React from 'react'
import { View, TextInput } from 'react-native'
import { Camera } from "_organisms";
import { Button } from "_atoms";
import { Colors } from '_styles';
import { useTranslation } from 'react-i18next';
import { setProductInfo } from "_reducers";
import {useDispatch} from 'react-redux';

const styles = {
    root: {
        flex: 1,
    },
    upperSection: {
        flex: 1
    },
    lowerSection: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    camera: {
        height: '100%',
    },
};

const CaptureBarcode = ({navigation}) => {
    const [barcode, setBarcode] = React.useState("");
    const [displayCamera, setDisplayCamera] = React.useState(false);
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();

    React.useEffect(() => {
        setTimeout(() => {
         setDisplayCamera(true);
        }, 500); 
     },[]);
    
    const onItemScan = (rawData) => {
        setBarcode(rawData.data);
    }

    const saveBarcode = () => {
        dispatch(setProductInfo({target:"barcode", data:barcode}));
        navigation.navigate("NewProductForm");
        setDisplayCamera(false);
    }

    const onChangeText = (val) => {
        setBarcode(val)    
    }

    return (
        
            <View style={styles.root}>
                <View style={styles.upperSection}>
                    { displayCamera ? <Camera displayMask={true} onBarCodeRead={onItemScan}/> :  <View style={{flex:1}}/>}
                </View>
                <View style={styles.lowerSection}>
                    <TextInput 
                        value={barcode}
                        placeholder={t("products:code")} 
                        onChangeText={onChangeText}
                        keyboardType="numeric"
                        style={{width:'100%', borderBottomWidth:1, borderBottomColor:Colors.GRAY_DARK, fontSize:20}} 
                    />
                    <Button disabled={barcode==""} style={{marginTop:16}} onPress={saveBarcode}>{t("common:actions:continue")}</Button>
                </View>
            </View>

    )
}

export default CaptureBarcode;
