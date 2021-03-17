import React from 'react';
import { View, ImageBackground, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text, Header, Input, Button, Icon } from "_atoms";
import { useTranslation } from 'react-i18next';
import { Colors } from '_styles';
import { setProfileInfo } from "_reducers";
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {AuthContext} from '../../Controllers/Context'

const HEADER_HEIGHT = 192;
const Settings = ({navigation}) => {
    const { image, name, email, phone, address, openingHours, storeName } = useSelector(state=>state.profile.profile);
    const dispatch = useDispatch();
    const { signOut } = React.useContext(AuthContext);
    
    const _onChangeText = (target, text) => {
        dispatch(setProfileInfo({target, data:text}))
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
    const onSave = (profileData) => {}

    const {t, i18n} = useTranslation();
    return (
        <Layout>
            <Header canGoBack navigation={navigation}/>
            <Text style={{alignSelf:'flex-end'}} category="h2" weight="bold">{t("screens:settings")}</Text>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical:16}}>
                <View style={[{height:HEADER_HEIGHT, flexDirection:'row',alignItems:'flex-start'}]}>
                    <View style={{flex:1,alignSelf:'center', alignItems:'center'}}>
                        <TouchableOpacity style={styles.profileImage} onPress={imageGalleryLaunch}>
                            {image.uri != "" ? <ImageBackground source={{uri: image.uri}} resizeMethod="resize" resizeMode="cover" style={{height:120, width:120}}/> : <Icon status="black" name="camera" type="Feather" size={40}/>}
                            
                        </TouchableOpacity>
                        <Text style={{opacity: 1}} status="black" category="h3">Shop Name</Text>
                    </View>
                </View>

                <Text style={{alignSelf:'flex-end'}} category="p" weight="bold">{t("settings:userProfile")}</Text>
                <View style={{marginVertical:8}}>
                    <Input mode="flat" label={t("settings:name")} placeholder={name || t("settings:enterName")}  errorMsg="limit riched" limit={30} _onChangeText={_onChangeText}/>
                    <Input mode="flat" label={t("settings:email")} placeholder={email || t("settings:enterEmail")}  errorMsg="limit riched" limit={30} _onChangeText={_onChangeText}/>
                    <Input mode="flat" label={t("settings:phone")} placeholder={phone || t("settings:enterphone")} keyboardType="numeric" errorMsg="limit riched" limit={10} _onChangeText={_onChangeText}/>
                </View>

                <Text style={{alignSelf:'flex-end'}} category="p" weight="bold">{t("settings:shopDetails")}</Text>
                <View style={{marginVertical:8}}>
                    <Input mode="flat" label={t("settings:storeName")} placeholder={storeName || t("settings:enterstoreName")}  errorMsg="limit riched" limit={30} _onChangeText={_onChangeText}/>
                    <Input mode="flat" label={t("settings:openingHours")} placeholder={openingHours || t("settings:openingHours")}  errorMsg="limit riched" limit={5} _onChangeText={_onChangeText}/>
                    <Input mode="flat" label={t("settings:address")} placeholder={address || t("settings:enterAddress")}  errorMsg="limit riched" limit={30} _onChangeText={_onChangeText}/>
                </View>
                <View style={{flexDirection:'row', width:'100%', justifyContent:'space-around', paddingHorizontal:24, alignItems:'center'}}>
                    <Button style={{marginTop:16}} onPress={()=>signOut()} status="white" textStatus="" status="alert" style={{borderWidth:0.5,borderColor:Colors.ALERT}}>{t("common:actions:signOut")}</Button>
                    <Button style={{marginTop:16}} onPress={()=>onSave(true)} status="white" textStatus="hint" style={{borderWidth:0.5,borderColor:Colors.SUCCESS}}>{t("common:actions:save")}</Button>
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
