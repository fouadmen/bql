import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Layout, Text, Header, Input, Button } from "_atoms";
import { useTranslation } from 'react-i18next';
import { Colors } from '_styles';
import {Picker as Component} from '@react-native-picker/picker';

const Picker = (props) => {
    const [selectedItem, setSelectedItem] = React.useState("");
    const onValueChange = (val, idx) => {
        setSelectedItem(val)
        props.onSelect(val)
    }

    React.useEffect(()=>{
        setSelectedItem(props.data[0])
    },[])
    
    return (
        <Component
            selectedValue={selectedItem}
            style={[props.style, {height: 50, aspectRatio:2}]}
            onValueChange={onValueChange} mode={props.mode}>
            { Object.getOwnPropertyNames(props.data).map(key => (<Component.Item label={props.data[key]} value={key} />)) }
        </Component>
    )
}

const NewProductForm = ({navigation, route}) => {
    const {t, i18n} = useTranslation();
    const [productDetails, setProductDetails] = React.useState({name:"", quantity:"", minQuantity:"", unit:"", purchasePrice:"", sellingPrice:"",barcode:"", })
    const units = {kg:t("common:kg"),piece:t("common:piece"),litre:t("common:litre")}
    const _onChangeText = (target, text) => {
        const tmp = productDetails;
        tmp[target]=text;
        setProductDetails(tmp);
        console.log({target, text});
    }
    const onUnitSelect = (unit) => {
        console.log("selected unit : ", unit);
    }
    const onSave = (args) => {
        console.log("fire save action");
    }

    return (
        <Layout style={{paddingHorizontal:0}}>
            <Header hideDrawer navigation={navigation}/>
            <Text style={{alignSelf:'center', position:'absolute', top:4}} category="h2" weight="bold">New Item</Text>
            <ScrollView contentContainerStyle={{paddingBottom:24}} style={{marginTop:32}} showsVerticalScrollIndicator={false}>
                <View style={{height:240, backgroundColor:'red'}}></View>
                <View style={{marginTop:24, paddingHorizontal:24}}>
                    <Input mode="flat" label={t("products:productName")} placeholder={productDetails.name}  errorMsg="limit riched" limit={30} _onChangeText={(text)=>_onChangeText("name",text)}/>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Input containerStyle={{flex:1,marginRight:16}} mode="flat" label={t("products:minQuantity")} placeholder={String(productDetails.minQuantity)} keyboardType="numeric" errorMsg="limit riched" limit={30} _onChangeText={(text)=>_onChangeText("quantity",text)}/>
                        <Input containerStyle={{flex:1,marginLeft:16}} mode="flat" label={t("products:quantity")} placeholder={String(productDetails.quantity)} keyboardType="numeric" errorMsg="limit riched" limit={30} _onChangeText={(text)=>_onChangeText("quantity",text)}/>
                    </View>
                    <View style={{flexDirection:'row-reverse', marginBottom:16}}>
                        <Text weight="bold" status="hint">{t("products:unit")}</Text>
                        <Picker  onSelect={onUnitSelect} mode="dropdown" data={units}/>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Input containerStyle={{flex:1,marginRight:16}} mode="flat" label={t("products:totalValue")} editable={false} placeholder={String(productDetails.purchasePrice * productDetails.quantity)} />
                        <Input containerStyle={{flex:1,marginLeft:16}}  mode="flat" label={t("products:purchasePrice")} placeholder={String(productDetails.purchasePrice)} errorMsg="limit riched" keyboardType="numeric" limit={7} _onChangeText={(text)=>_onChangeText("purchasePrice",text)}/>
                    </View>
                    <Input mode="flat" label={t("products:sellingPrice")} placeholder={String(productDetails.sellingPrice)} errorMsg="limit riched" keyboardType="numeric" limit={7} _onChangeText={(text)=>_onChangeText("sellingPrice",text)}/>
                    <Input mode="flat" label={t("products:code")} editable={false} placeholder={String(productDetails.barcode)} />
                </View>
            </ScrollView>
           
        </Layout>
    )
}

export default NewProductForm

