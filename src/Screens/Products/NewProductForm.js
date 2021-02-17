import React from 'react';
import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Layout, Text, Header, Input, Button, Picker, Icon } from "_atoms";
import { useTranslation } from 'react-i18next';
import { Colors } from '_styles';
import { setProductInfo, resetProductState } from "_reducers";
import {useDispatch, useSelector} from 'react-redux';

// TODO : Remove units from productDetails
const NewProductForm = ({navigation, route}) => {
    const product = useSelector(state=>state.product);
    const [productDetails, setProductDetails] = React.useState({unit:'kg'});
    const [totalValue, setTotalValue] = React.useState(0);
    const [allowSave, setAllowSave] = React.useState(false);
    const dispatch = useDispatch();
    const {t, i18n} = useTranslation();
    const units = {kg:t("common:kg"),piece:t("common:piece"),litre:t("common:litre")};
    const refs = [];
    var pickerRef = null;

    const _onChangeText = (target, text) => {
        dispatch(setProductInfo({target, data:text}))
        setAllowSave(Object.getOwnPropertyNames(product.productInfo).filter(k => product.productInfo[k] === "").length<=1);
    }

    React.useEffect(() => {
        setTotalValue(product.productInfo.quantity && product.productInfo.purchasePrice ? (product.productInfo.quantity * product.productInfo.purchasePrice).toFixed(2) : 0);
    },[product.productInfo.quantity, product.productInfo.purchasePrice]);

    const addImage = () => {
        navigation.navigate("ProductPicture");
    }

    const addBarcode = () => {
        navigation.navigate("CaptureBarcode");
    }

    const forwardRef = (cb) => {
        refs.push(cb)
    }

    const setPickerRef = (cb) => {
        pickerRef=cb;
    }

    const init_fields = () => {
        refs.forEach(cb=>cb());
        setTotalValue(0);
        setProductDetails({unit:'kg'});
        pickerRef && pickerRef('kg');
    }
    const onSave = (saveAndNew) => {
        setAllowSave(false);
        saveProduct().then((res)=>{
            dispatch(resetProductState());
            init_fields();
            !saveAndNew && navigation.goBack();
        }).catch((err) => {
            console.error("In NewProduct:onSave : " + err);
        })
    }

    const uploadImage = async (uri) => {
        if (!uri)
            return undefined; 
        return true;
    }

    const sendProduct =  async (productData) => {
        return true
    }

    const saveProduct = () => {
        return new Promise( async (resolve, reject) => {
            const imageId =  await uploadImage(product.productImage.uri);
            const saved =  await sendProduct({product : productDetails, image : imageId});
            saved ? resolve(saved) : reject(saved);
            setTimeout(() => {
                var saved = true;
                saved ? resolve(saved) : reject(saved);
            }, 2000);
        })
    }

    return (
        <Layout style={{paddingHorizontal:0}}>
            <Header hideDrawer navigation={navigation}/>
            <Text style={{alignSelf:'center', position:'absolute', top:4}} category="h2" weight="bold">New Item</Text>
            <ScrollView contentContainerStyle={{paddingBottom:24}} style={{marginTop:32}} showsVerticalScrollIndicator={false}>
                <View style={{height:240, backgroundColor: product.productImage.uri !== "" ? Colors.WHITE : Colors.GRAY_LIGHT, alignItems:'center', flexDirection:'column', justifyContent:'center'}}>
                    {
                        product.productImage.uri !== "" ? 
                            <Image style={{height:"100%", width:'100%'}} resizeMode="cover" source={{uri : product.productImage.uri}}/> 
                        :
                        <TouchableOpacity onPress={addImage} style={{alignItems:'center'}}>
                            <Icon name="camera" size={48}/>
                            <Text category="p" weight="medium">ADD PHOTO</Text>
                        </TouchableOpacity>
                    }
                </View>
                <View style={{marginTop:24, paddingHorizontal:24}}>
                    <Input mode="flat" label={t("products:productName")} placeholder={t("products:productName")}  errorMsg="limit riched" limit={30} forwardRef={forwardRef} _onChangeText={(text)=>_onChangeText("name",text)}/>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Input containerStyle={{flex:1,marginRight:16}} mode="flat" label={t("products:minQuantity")} placeholder={t("products:minQuantity")} keyboardType="numeric" errorMsg="limit riched" limit={5} forwardRef={forwardRef} _onChangeText={(text)=>_onChangeText("minQuantity",text)}/>
                        <Input containerStyle={{flex:1,marginLeft:16}} mode="flat" label={t("products:quantity")} placeholder={t("products:quantity")} keyboardType="numeric" errorMsg="limit riched" limit={5} forwardRef={forwardRef} _onChangeText={(text)=>_onChangeText("quantity",text)}/>
                    </View>
                    <View style={{flexDirection:'row-reverse', marginBottom:16}}>
                        <Text weight="bold" status="hint">{t("products:unit")}</Text>
                        <Picker forwardRef={setPickerRef} onSelect={(unit)=>{_onChangeText('unit', unit)}} mode="dropdown" data={units}/>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Input containerStyle={{flex:1,marginRight:16}} mode="flat" label={t("products:totalValue")} editable={false} forwardRef={forwardRef} placeholder={String(totalValue)} />
                        <Input containerStyle={{flex:1,marginLeft:16}}  mode="flat" label={t("products:purchasePrice")} placeholder={t("products:purchasePrice")} errorMsg="limit riched" keyboardType="numeric" limit={5} forwardRef={forwardRef} _onChangeText={(text)=>_onChangeText("purchasePrice",text)}/>
                    </View>
                    <Input mode="flat" label={t("products:sellingPrice")} placeholder={t("products:sellingPrice")} errorMsg="limit riched" keyboardType="numeric" limit={5} forwardRef={forwardRef} _onChangeText={(text)=>_onChangeText("sellingPrice",text)}/>
                    <Input mode="flat" label={t("products:code")} editable={false} placeholder={String(product.productInfo.barcode || t("products:code"))} forwardRef={forwardRef} leftComponent={<Icon name="barcode" containerStyle={{position:'absolute'}} onPress={addBarcode}/>}/>
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

