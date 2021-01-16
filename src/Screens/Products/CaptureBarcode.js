import React from 'react'
import { View, TextInput } from 'react-native'
import { Camera } from "_organisms";
import { Button } from "_atoms";
import { Colors } from '_styles';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';


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
    const [barcode, setBarcode] = React.useState("")
    const {t, i18n} = useTranslation();
    
    const onItemScan = (rawData) => {
        setBarcode(rawData.data);
    }

    const saveBarcode = () => {
        //save barcode
        navigation.navigate("NewProductForm")
    }

    const onChangeText = (val) => {
        setBarcode(val)    
    }

    return (
        
            <View style={styles.root}>
                <View style={styles.upperSection}>
                    {/* { useIsFocused ? <Camera displayMask={true} onBarCodeRead={onItemScan}/> :  <View style={{flex:1}}/>} */}
                    <View style={{flex:1}}/>
                </View>
                <View style={styles.lowerSection}>
                    <TextInput 
                        value={barcode}
                        placeholder={t("products:code")} 
                        onChangeText={onChangeText}
                        keyboardType="numeric"
                        style={{width:'100%', borderBottomWidth:1, borderBottomColor:Colors.GRAY_DARK, fontSize:20}} 
                    />
                    <Button disabled={barcode!==""} style={{marginTop:16}} onPress={saveBarcode}>{t("common:actions:continue")}</Button>
                </View>
            </View>

    )
}

export default CaptureBarcode;
