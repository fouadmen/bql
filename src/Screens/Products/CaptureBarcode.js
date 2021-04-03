import React from 'react'
import { View, TextInput } from 'react-native'
import { Camera } from "_organisms";
import { Button } from "_atoms";
import { Colors } from '_styles';
import { useTranslation } from 'react-i18next';
import { setProductInfo, setProduct, setProductImage } from "_reducers";
import {useDispatch} from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import ProductController from "../../Controllers/ProductController";
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
    const [_barcode, setBarcode] = React.useState("");
    const [displayCamera, setDisplayCamera] = React.useState(false);
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();

    useFocusEffect(React.useCallback(() => {
        setTimeout(() => setDisplayCamera(true), 500); 
        return () => {
            setDisplayCamera(false)
        }
    },[]))

    const onItemScan = (rawData) => {
        setBarcode(rawData.data);
    }

    const saveBarcode = async () => {
        try {
            let product = await ProductController.fetchProduct(_barcode);
            if(!product){
                dispatch(setProductInfo({target:"barcode", data:_barcode}));
                dispatch(setProductImage({data: ''}));
                navigation.navigate("NewProductForm", {'isNew' : true});
                setDisplayCamera(false);
                return;
            }
            const {barcode, name, unit, imageUri, id} = product;
            dispatch(setProduct({data:{barcode, name, unit, id}}));
            dispatch(setProductImage({data: imageUri}))
            navigation.navigate("NewProductForm", {'isNew' : false});
            setDisplayCamera(false);
        } catch (error) {
            console.log(error);
        }
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
                        value={_barcode}
                        placeholder={t("products:code")} 
                        onChangeText={onChangeText}
                        keyboardType="numeric"
                        style={{width:'100%', borderBottomWidth:1, borderBottomColor:Colors.GRAY_DARK, fontSize:20}} 
                    />
                    <Button disabled={_barcode==""} style={{marginTop:16}} onPress={saveBarcode}>{t("common:actions:continue")}</Button>
                </View>
            </View>

    )
}

export default CaptureBarcode;
