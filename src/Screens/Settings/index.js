import React from 'react';
import { View, ImageBackground, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text, Header, Input, Button, Icon } from "_atoms";
import { useTranslation } from 'react-i18next';
import { Colors } from '_styles';
import { setStoreInfo } from "_reducers";
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {AppContext} from '../../Controllers/Context'
import { useFocusEffect } from '@react-navigation/native';

import StoreController from '../../Controllers/StoreController';
import UserController from '../../Controllers/UserController';

const HEADER_HEIGHT = 80;
const Settings = ({navigation}) => {
    const [profile, setProfile] = React.useState({ name:"", email:"", phone:"" });
    const [store, setStore] = React.useState(useSelector(state => state.store.store));

    const dispatch = useDispatch();
    const { signOut } = React.useContext(AppContext);
    
    useFocusEffect(React.useCallback(() => {
        const fetchUser = async () => {
            try {
                const { name , email, phone } = (await UserController.fetchUser());
                setProfile({ name , email, phone });
            } catch (error) {
                console.error(error)        
            }
        } 
        fetchUser();
        return ()=>setProfile({ name:"", email:"", phone:"" });
    },[]));

    const _onChangeText = (target, data) => {
        if (target=="user")  return setProfile({...profile, ...data});
        setStore({...store, ...data});
    }
    
    const imageGalleryLaunch = () => {
        let options = {
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 200,
            maxWidth: 200,
        };
        launchImageLibrary(options, (res) => {    
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
          } else {
            dispatch(setProfileInfo({target:"image", data:{uri: "data:image/png;base64,"+res.base64, filename:res.fileName}}))
          }
        });
      }  
    const onSave = async () => {
        try {
            await UserController.updateUser(profile);
            await StoreController.updateStore(store);
            dispatch(setStoreInfo({...store}))
        } catch (error) {
            console.error(error);
        }
    }

    const {t, i18n} = useTranslation();
    return (
        <Layout>
            <Header canGoBack navigation={navigation}/>
            <Text style={{alignSelf:'flex-end'}} category="h2" weight="bold">{t("screens:settings")}</Text>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical:16}}>
                <View style={[{height:HEADER_HEIGHT, flexDirection:'row',alignItems:'flex-start'}]}>
                    <View style={{flex:1,alignSelf:'center', alignItems:'center'}}>
                        {/* <TouchableOpacity style={styles.profileImage} onPress={imageGalleryLaunch}>
                            {image.uri != "" ? <ImageBackground source={{uri: image.uri}} resizeMethod="resize" resizeMode="cover" style={{height:120, width:120}}/> : <Icon status="black" name="camera" type="Feather" size={40}/>}
                            
                        </TouchableOpacity> */}
                        <Text style={{opacity: 1}} status="black" category="h3" weight="bold" >{store.storeName}</Text>
                    </View>
                </View>

                <Text style={{alignSelf:'flex-end'}} category="p" weight="bold">{t("settings:userProfile")}</Text>
                <View style={{marginVertical:8}}>
                    <Input mode="flat" label={t("settings:name")} placeholder={profile.name || t("settings:enterName")}  errorMsg="limit riched" limit={30} _onChangeText={(text)=>_onChangeText("user",{name: text})}/>
                    <Input mode="flat" label={t("settings:email")} placeholder={profile.email || t("settings:enterEmail")}  errorMsg="limit riched" limit={30} _onChangeText={(text)=>_onChangeText("user",{email: text})}/>
                    <Input mode="flat" label={t("settings:phone")} placeholder={profile.phone || t("settings:enterphone")} keyboardType="numeric" errorMsg="limit riched" limit={10} _onChangeText={(text)=>_onChangeText("user",{phone: text})}/>
                </View>

                <Text style={{alignSelf:'flex-end'}} category="p" weight="bold">{t("settings:shopDetails")}</Text>
                <View style={{marginVertical:8}}>
                    <Input mode="flat" label={t("settings:storeName")} placeholder={store.storeName || t("settings:enterstoreName")}  errorMsg="limit riched" limit={30} _onChangeText={(text)=>_onChangeText("store",{storeName: text})}/>
                    {/* <Input mode="flat" label={t("settings:openingHours")} placeholder={store.openingHours || t("settings:openingHours")}  errorMsg="limit riched" limit={5} _onChangeText={_onChangeText}/> */}
                    <Input mode="flat" label={t("settings:address")} placeholder={store.address || t("settings:enterAddress")}  errorMsg="limit riched" limit={30} _onChangeText={(text)=>_onChangeText("store",{address: text})}/>
                </View>
                <View style={{flexDirection:'row', width:'100%', justifyContent:'space-around', paddingHorizontal:24, alignItems:'center'}}>
                    <Button style={{marginTop:16}} onPress={()=>signOut()} status="white" textStatus="" status="alert" style={{borderWidth:0.5,borderColor:Colors.ALERT}}>{t("common:actions:signOut")}</Button>
                    <Button style={{marginTop:16}} onPress={()=>onSave()} status="white" textStatus="hint" style={{borderWidth:0.5,borderColor:Colors.SUCCESS}}>{t("common:actions:save")}</Button>
                </View>
            </ScrollView>
        </Layout>
    )
}

const styles = StyleSheet.create({
    profileImage: {
        height:120, 
        width:120, 
        borderWidth:4, 
        borderColor:Colors.BLACK, 
        marginBottom:24, 
        flexDirection:'column', 
        justifyContent:'center', 
        alignItems:'center',
    },
    accountTabSection :{
        marginHorizontal:24,
        marginTop:24
    },
    header:{
        height:48, 
        paddingLeft:24, 
        textAlignVertical:'center', 
        backgroundColor:Colors.PRIMARY
    }
})


export default Settings
