import React from 'react';
import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Layout, Text, Header, Input, Button, Picker, Icon } from "_atoms";
import { useTranslation } from 'react-i18next';
import { Colors } from '_styles';
import { setProductInfo, resetProductState } from "_reducers";
import {useDispatch, useSelector} from 'react-redux';
import ProductController from "../../Controllers/ProductController";
import StockController from "../../Controllers/StockController";

// TODO : Remove units from productDetails
const NewProductForm = ({navigation, route}) => {
    const product = useSelector(state=>state.product);
    const store = useSelector(state => state.store.store);
    const [productDetails, setProductDetails] = React.useState({unit:'kg'});
    const [totalValue, setTotalValue] = React.useState(0);
    const [allowSave, setAllowSave] = React.useState(false);
    const dispatch = useDispatch();
    const {t, i18n} = useTranslation();
    const units = {kg:t("common:kg"),piece:t("common:piece"),litre:t("common:litre")};
    const refs = [];
    let pickerRef = null;
    const {isNew} = route.params;

    const _onChangeText = (target, text) => {
        dispatch(setProductInfo({target, data:text}));
        setAllowSave(Object.getOwnPropertyNames(product.productInfo).filter(k => product.productInfo[k] === "").length<=1);
    }

    React.useEffect(() => {
        setTotalValue(product.productInfo.quantity && product.productInfo.buyingPrice ? (product.productInfo.quantity * product.productInfo.buyingPrice).toFixed(2) : 0);
    },[product.productInfo.quantity, product.productInfo.buyingPrice]);

    const addImage = () => {
        navigation.navigate("ProductPicture");
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
        save().then((res)=>{
            dispatch(resetProductState());
            init_fields();
            navigation.navigate("Products");
            // !saveAndNew && navigation.goBack();
        }).catch((err) => {
            console.error("In NewProduct:onSave : " + err);
        })
    }

    const uploadImage = async (uri) => {
        if (!uri)
            return undefined; 
        return true;
    }

    const saveProduct =  async (imageUrl) => {
        const productInfo = {
            name:product.productInfo.name,
            categoryId:"ckn157orw0000huqpf81l5kcu",
            description:"",
            barcode:product.productInfo.barcode,
            unit:product.productInfo.unit,
            imageUri: imageUrl
        } 
        return await ProductController.createProduct(productInfo);
    }

    const saveStock = async (productId) => {
        const storeId = store.id
        const { quantity, minLimit, buyingPrice, sellingPrice } = product.productInfo;
        return await StockController.createStock({ quantity, minLimit, buyingPrice, sellingPrice, productId, storeId}, storeId );
    }

    const save = () => {
        return new Promise( async (resolve, reject) => {
            try {
                const imageUrl =  await uploadImage(product.productImage.uri);
                const savedProduct =  await saveProduct(imageUrl);
                const stock = await saveStock(savedProduct.id);
                stock ? resolve(stock) : reject(stock);
            } catch (error) {
                reject(error);
            }
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
                            <Image style={{height:"100%", width:'100%'}} resizeMode="contain" source={{uri : product.productImage.uri}}/> 
                        :
                        <TouchableOpacity onPress={addImage} style={{alignItems:'center'}}>
                            <Icon name="camera" size={48}/>
                            <Text category="p" weight="medium">ADD PHOTO</Text>
                        </TouchableOpacity>
                    }
                </View>
                <View style={{marginTop:24, paddingHorizontal:24}}>
                    <Input mode="flat" label={t("products:productName")} placeholder={isNew ? t("products:productName") : product.productInfo.name}  errorMsg="limit riched" limit={30} editable={isNew} forwardRef={forwardRef} _onChangeText={(text)=>_onChangeText("name",text)}/>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Input containerStyle={{flex:1,marginRight:16}} mode="flat" label={t("products:minLimit")} placeholder={t("products:minLimit")} keyboardType="numeric" errorMsg="limit riched" limit={5} forwardRef={forwardRef} _onChangeText={(text)=>_onChangeText("minLimit",text)}/>
                        <Input containerStyle={{flex:1,marginLeft:16}} mode="flat" label={t("products:quantity")} placeholder={t("products:quantity")} keyboardType="numeric" errorMsg="limit riched" limit={5} forwardRef={forwardRef} _onChangeText={(text)=>_onChangeText("quantity",text)}/>
                    </View>
                    {
                        isNew && <View style={{flexDirection:'row-reverse', marginBottom:16}}>
                        <Text weight="bold" status="hint">{t("products:unit")}</Text>
                        <Picker forwardRef={setPickerRef} onSelect={(unit)=>{_onChangeText('unit', unit)}} mode="dropdown" data={units}/>
                    </View>
                    }
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Input containerStyle={{flex:1,marginRight:16}} mode="flat" label={t("products:totalValue")} editable={false} forwardRef={forwardRef} placeholder={String(totalValue)} />
                        <Input containerStyle={{flex:1,marginLeft:16}}  mode="flat" label={t("products:buyingPrice")} placeholder={t("products:buyingPrice")} errorMsg="limit riched" keyboardType="numeric" limit={5} forwardRef={forwardRef} _onChangeText={(text)=>_onChangeText("buyingPrice",text)}/>
                    </View>
                    <Input mode="flat" label={t("products:sellingPrice")} placeholder={t("products:sellingPrice")} errorMsg="limit riched" keyboardType="numeric" limit={5} forwardRef={forwardRef} _onChangeText={(text)=>_onChangeText("sellingPrice",text)}/>
                    {isNew && <Input mode="flat" label={ t("products:code") } editable={false} placeholder={String(product.productInfo.barcode || t("products:code"))} forwardRef={forwardRef}/>}
                </View>
                <View style={{flexDirection:'row', width:'100%', justifyContent:'space-around', paddingHorizontal:24, alignItems:'center'}}>
                    {/* <Button disabled={!allowSave} style={{marginTop:16}} onPress={()=>onSave(true)} status="white" textStatus="hint" style={{borderWidth:0.5,borderColor:Colors.SUCCESS}}>{t("common:actions:saveAndNew")}</Button> */}
                    <Button disabled={!allowSave} style={{marginTop:16}} onPress={()=>onSave(false)} status="success" style={{borderWidth:0.5,borderColor:Colors.WHITE}}>{t("common:actions:saveAndClose")}</Button>
                </View>
            </ScrollView>
        </Layout>
    )
}

export default NewProductForm

