import React from 'react'
import { Layout, Text, Header, Input, Button } from "_atoms";
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { View, Modal } from 'react-native';
import UserController from '../../Controllers/UserController';
import { AppContext } from "../../Controllers/Context";
import { Colors } from "_styles";
import isValidEmail from '../../Utils/EmailValidator';

const ErrorModal = (props) => {
    const {t, i18n} = useTranslation();
    return (
        <Modal transparent animationType="fade" visible={props.visible} onRequestClose={()=>props.closeHandler()}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <View style={{height:200, width:'80%', backgroundColor:Colors.WHITE, padding:24, paddingTop:40, flexDirection:"column", justifyContent:"space-between", borderRadius:10}}>
                    <Text style={{alignSelf: 'center', textAlign:'center', lineHeight:30}} category="p" weight="bold">{props.message}</Text>
                    <View style={{alignSelf:'center'}}>
                        <Button onPress={()=>props.closeHandler()}>{t("auth:gotIt")}</Button> 
                    </View>
                </View>
            </View>
        </Modal>
    );
}
const SignUp = ({navigation}) => {
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = React.useState({name:"", email:"", phone:"", password:""});
    const [showModal, setShowModal] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState("");
    const { signUp } = React.useContext(AppContext);
    
    const _onChangeText = (data) => {
        setUserInfo({...userInfo,...data});
    }

    const onSave = async () => {
        try {
            
            for (const k in userInfo) {
                if (/^\s*$/.test(userInfo[k])) {
                    const error = new Error(t(`auth:${k}IsRequired`));
                    error.name = "FormError";
                    throw error;
                }
                if(k==="email" && !isValidEmail(userInfo.email)){
                    const error = new Error(t(`auth:invalidEmail`));
                    error.name = "FormError";
                    throw error;
                }
                if (k==="password" && userInfo.password.length < 6 ) {
                    const error = new Error(t(`auth:invalidePassword`));
                    error.name = "FormError";
                    throw error;
                }
                if (k==="phone" && userInfo.phone.length !== 10 ) {
                    const error = new Error(t(`auth:invalidePhone`));
                    error.name = "FormError";
                    throw error;
                }
            }

            const response = await UserController.signup(userInfo);
            const {user} = response.data;
            if (!user || user === {}) {
                const error = new Error("Invalid user");
                error.name = "InvalideUser";
                throw error;
            }
            signUp(user);
        } catch (error) {
            switch (error?.name) {
                case "FormError":
                    setModalMessage(error.message);
                    break;
                case "ResponseError":
                    setModalMessage(t("auth:alreadyRegisted"));
                    break; 
                case "InvalideUser":
                    return console.error(error);
                default:
                    setModalMessage(t("auth:unknownError"));
                    break;
            }
            setShowModal(true);     
        }
    }

    const login = () => { navigation.navigate("logIn")}

    return (
        <Layout>
            <Header hideDrawer navigation={navigation}/>
            <Text style={{alignSelf: 'center', marginVertical:24}} category="h3" weight="bold">{t("auth:createNewAccount")}</Text>
            
            <View style={{minHeight:400}}>
                <Input containerStyle={{flex:1,marginRight:16}} mode="flat" label={t("auth:fullname")} placeholder={t("auth:fullname")} errorMsg="limit riched" limit={50} _onChangeText={(text)=>_onChangeText({"name" : text})}/>
                <Input containerStyle={{flex:1,marginRight:16}} mode="flat" label={t("auth:email")} placeholder={t("auth:email")}  errorMsg="limit riched" limit={50} _onChangeText={(text)=>_onChangeText({"email": text})}/>
                <Input containerStyle={{flex:1,marginRight:16}} mode="flat" label={t("auth:phone")} placeholder={t("auth:phone")} keyboardType="numeric" errorMsg="limit riched" limit={11} _onChangeText={(text)=>_onChangeText({"phone":text})}/>
                <Input containerStyle={{flex:1,marginRight:16}} secureTextEntry={true} mode="flat" label={t("auth:password")} placeholder={t("auth:password")}  errorMsg="limit riched" limit={50} _onChangeText={(text)=>_onChangeText({"password":text})}/>
            </View>
            <View style={{alignSelf:'center'}}>
                <Button onPress={onSave}>{t("auth:createAccount")}</Button> 
            </View>
            <View style={{alignSelf:'center', flexDirection:'row-reverse', marginVertical:24}}>
                <Text category="p" weight="bold">{t("auth:alreadyHaveAccount")}</Text>
                <Text style={{marginHorizontal:4}} category="p" weight="bold" status="success" onPress={login}>{t("auth:loginNow")}</Text>
            </View>
            { showModal && <ErrorModal visible={showModal} closeHandler={()=>setShowModal(false)} message={modalMessage}/>}
        </Layout>
    )
}

export default SignUp
