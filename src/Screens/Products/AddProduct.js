import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Layout, Text, Header, Input, Button } from "_atoms";
import { useTranslation } from 'react-i18next';
import { Colors } from '_styles';


const AddProduct = ({navigation, route}) => {
    const {t, i18n} = useTranslation();
    const product = {name:'', buyingPrice:0, sellingPrice:0, image:require("../../Assets/images/bottle.jpg"), barcode:0, quantity:0}
    const [productDetails, setProductDetails] = React.useState(product);
    const _onChangeText = (target, text) => {
        const tmp = productDetails;
        tmp[target]=text;
        setProductDetails(tmp);
    }
    const onSave = (args) => {
        console.log("fire save action");
    }

    return (
        <Layout>
            <Header hideDrawer first canGoBack navigation={navigation}/>
            <Text style={{alignSelf:'center', position:'absolute', top:4}} category="h2" weight="bold">{productDetails.name}</Text>
                   
            <ScrollView  contentContainerStyle={{paddingBottom:24}} showsVerticalScrollIndicator={false}>
                <View style={{paddingHorizontal:"20%", paddingVertical:"4%", marginVertical:24, alignSelf:'center', borderColor:Colors.GRAY_DARK, borderRadius:8, borderWidth:1}}>
                    <Image style={{height:156, aspectRatio:1 }} source={productDetails.image}/> 
                </View>    
                <Input mode="flat" label={t("products:productName")} placeholder={productDetails.name}  errorMsg="limit riched" limit={30} _onChangeText={(text)=>_onChangeText("name",text)}/>
                <Input mode="flat" label={t("products:quantity")} placeholder={String(productDetails.quantity)} errorMsg="limit riched" limit={30} _onChangeText={(text)=>_onChangeText("quantity",text)}/>
                <Input mode="flat" label={t("products:buyingPrice")} placeholder={String(productDetails.buyingPrice)} errorMsg="limit riched" keyboardType="numeric" limit={7} _onChangeText={(text)=>_onChangeText("buyingPrice",text)}/>
                <Input mode="flat" label={t("products:sellingPrice")} placeholder={String(productDetails.sellingPrice)} errorMsg="limit riched" keyboardType="numeric" limit={7} _onChangeText={(text)=>_onChangeText("sellingPrice",text)}/>
                <Input mode="flat" label={t("products:code")} editable={false} placeholder={String(productDetails.barcode)} />
                <View style={{alignSelf:'center'}}>
                    <Button onPress={onSave}>{t("common:actions:save")}</Button> 
                </View>
            </ScrollView>
                     
        </Layout>
    )
}

export default AddProduct
