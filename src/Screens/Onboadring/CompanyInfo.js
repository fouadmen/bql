import React from 'react'
import { Layout, Text, Input, Button } from "_atoms";
import { useTranslation } from 'react-i18next';
import { View, Modal } from 'react-native';
import { Colors } from "_styles";
import { useSelector } from 'react-redux';
import StoreController from '../../Controllers/StoreController';
const ErrorModal = (props) => {
    const {t, i18n} = useTranslation();
    return (
        <Modal transparent animationType="fade" visible={props.visible} onRequestClose={()=>props.closeHandler()}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <View style={{height:200, width:'80%', backgroundColor:Colors.WHITE, padding:24, paddingTop:40, flexDirection:"column", justifyContent:"space-between", borderRadius:10}}>
                    <Text style={{alignSelf: 'center'}} category="p" weight="bold">{props.message}</Text>
                    <View style={{alignSelf:'center'}}>
                        <Button onPress={()=>props.closeHandler()}>{t("auth:gotIt")}</Button> 
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const CompanyInfo = ({navigation}) => {
    const {t, i18n} = useTranslation();
    const [storeInfo, setStoreInfo] = React.useState({storeName:"", openingHours:"", address:""});
    const [time, setTime] = React.useState({am:8, pm:10})
    const [showModal, setShowModal] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState("");
    const {id} = useSelector(state=>state.auth);
    const _onChangeText = (data) => {
        if (data.am) {
            data.am = data.am >0 && data.am <= 12 ? data.am : 8;
            return setTime({...time,...data});
        }
        if (data.pm) {
            data.pm = data.pm >0 && data.pm <= 12 ? data.pm : 10;
            return setTime({...time,...data});
        }
        setStoreInfo({...storeInfo,...data});
    }
    const onNext = async () => {
        try {
            storeInfo.openingHours = `${time.am}_${time.pm}`;
            for (const k in storeInfo) {
                if (/^\s*$/.test(storeInfo[k])) {
                    const error = new Error(t(`onboarding:${k}IsRequired`))
                    error.name = "FormError";
                    throw error;
                }
            }
            const store = await StoreController.createStore({...storeInfo, ...{ownerId : id}});
            navigation.navigate("Welcome", {store});
        } catch (error) {
            if (error.name==="FormError") {
                setModalMessage(error.message);
                setShowModal(true);
            }
            else{
                console.log("error : ", error);
            }
            
        }
    }
    return (
        <Layout>
            <View style={{flex:0.9, justifyContent:'center' }}>
                <Text style={{alignSelf: 'center', marginVertical:24}} category="h3" weight="bold">{t("onboarding:tellUs")}</Text>
                <View style={{minHeight:300}}>
                    <Input containerStyle={{flex:1}} mode="flat" label={t("onboarding:storeName")} placeholder={t("onboarding:storeName")}  errorMsg="limit riched" limit={50} _onChangeText={(text)=>_onChangeText({storeName: text})}/>
                    <Input containerStyle={{flex:1}} mode="flat" label={t("onboarding:address")} placeholder={t("onboarding:address")}  errorMsg="limit riched" limit={50} _onChangeText={(text)=>_onChangeText({address: text})}/>
                    <Text style={{ marginVertical:24}} category="s2" weight="medium">{t("onboarding:openingHours")}</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Input containerStyle={{flex:1,marginRight:16}} mode="flat" label={t("onboarding:pm")} placeholder={t("onboarding:pm")} keyboardType="numeric" errorMsg="limit riched" limit={5} _onChangeText={(text)=>_onChangeText({pm : text})}/>
                        <Text style={{alignSelf: 'center', marginVertical:24}} category="s2" weight="medium">{t("onboarding:to")}</Text>
                        <Input containerStyle={{flex:1,marginLeft:16}} mode="flat" label={t("onboarding:am")} placeholder={t("onboarding:am")} keyboardType="numeric" errorMsg="limit riched" limit={5} _onChangeText={(text)=>_onChangeText({am : text})}/>
                    </View>
                </View>
            </View>
            <View style={{alignSelf:'center'}}>
                <Button onPress={onNext}>{t("common:actions:next")}</Button> 
            </View>
            { showModal && <ErrorModal visible={showModal} closeHandler={()=>setShowModal(false)} message={modalMessage}/>}
        </Layout>
    )
}

export default CompanyInfo
