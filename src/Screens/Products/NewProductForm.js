import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Layout, Text, Header, Input, Button, Picker } from "_atoms";
import { useTranslation } from 'react-i18next';
import { Colors } from '_styles';


const NewProductForm = ({navigation, route}) => {
    const {t, i18n} = useTranslation();
    const [productDetails, setProductDetails] = React.useState({name:"", quantity:"", minQuantity:"", unit:"", purchasePrice:"", sellingPrice:"",barcode:"", })
    const [totalValue, setTotalValue] = React.useState(0);
    const [allowSave, setAllowSave] = React.useState(false);

    const units = {kg:t("common:kg"),piece:t("common:piece"),litre:t("common:litre")}

    const _onChangeText = (target, text) => {
        const tmp = productDetails;
        tmp[target]=text;
        setProductDetails(tmp);

        setTotalValue((productDetails.quantity * productDetails.purchasePrice).toFixed(2) || 0);
        setAllowSave(Object.getOwnPropertyNames(productDetails).filter(k => productDetails[k] === "").length<=1);
    }

    const onSave = (saveAndNew) => {
        console.log("fire save action");
    }

    return (
        <Layout style={{paddingHorizontal:0}}>
            <Header hideDrawer navigation={navigation}/>
            <Text style={{alignSelf:'center', position:'absolute', top:4}} category="h2" weight="bold">New Item</Text>
            <ScrollView contentContainerStyle={{paddingBottom:24}} style={{marginTop:32}} showsVerticalScrollIndicator={false}>
                <View style={{height:240, backgroundColor:Colors.WHITE, alignItems:'center', flexDirection:'column', paddingVertical:24}}>
                    <Image style={{height:"100%", width:'100%'}} resizeMode="contain" source={require("../../Assets/images/pepsi.jpg")}/>
                </View>
                <View style={{marginTop:24, paddingHorizontal:24}}>
                    <Input mode="flat" label={t("products:productName")} placeholder={productDetails.name}  errorMsg="limit riched" limit={30} _onChangeText={(text)=>_onChangeText("name",text)}/>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Input containerStyle={{flex:1,marginRight:16}} mode="flat" label={t("products:minQuantity")} placeholder={String(productDetails.minQuantity)} keyboardType="numeric" errorMsg="limit riched" limit={30} _onChangeText={(text)=>_onChangeText("minQuantity",text)}/>
                        <Input containerStyle={{flex:1,marginLeft:16}} mode="flat" label={t("products:quantity")} placeholder={String(productDetails.quantity)} keyboardType="numeric" errorMsg="limit riched" limit={30} _onChangeText={(text)=>_onChangeText("quantity",text)}/>
                    </View>
                    <View style={{flexDirection:'row-reverse', marginBottom:16}}>
                        <Text weight="bold" status="hint">{t("products:unit")}</Text>
                        <Picker  onSelect={(unit)=>{_onChangeText('unit', unit)}} mode="dropdown" data={units}/>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Input containerStyle={{flex:1,marginRight:16}} mode="flat" label={t("products:totalValue")} editable={false} placeholder={String(totalValue)} />
                        <Input containerStyle={{flex:1,marginLeft:16}}  mode="flat" label={t("products:purchasePrice")} placeholder={String(productDetails.purchasePrice)} errorMsg="limit riched" keyboardType="numeric" limit={7} _onChangeText={(text)=>_onChangeText("purchasePrice",text)}/>
                    </View>
                    <Input mode="flat" label={t("products:sellingPrice")} placeholder={String(productDetails.sellingPrice)} errorMsg="limit riched" keyboardType="numeric" limit={7} _onChangeText={(text)=>_onChangeText("sellingPrice",text)}/>
                    <Input mode="flat" label={t("products:code")} editable={false} placeholder={String(productDetails.barcode)} />
                </View>
                <View style={{flexDirection:'row', width:'100%', justifyContent:'space-around', paddingHorizontal:24, alignItems:'center'}}>
                    <Button disabled={!allowSave} style={{marginTop:16}} onPress={()=>onSave(true)} status="white" textStatus="hint" style={{borderWidth:0.5,borderColor:Colors.SUCCESS}}>{t("common:actions:saveAndNew")}</Button>
                    <Button disabled={!allowSave} style={{marginTop:16}} onPress={()=>onSave(false)} status="success" style={{borderWidth:0.5,borderColor:Colors.WHITE}}>{t("common:actions:saveAndClose")}</Button>
                </View>
            </ScrollView>
        </Layout>
    )
}

export default NewProductForm

