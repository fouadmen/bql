import React from 'react'
import { Layout, Text, Button, Header } from "_atoms";
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { redirect } from "_reducers";
import { Colors } from "_styles";

const Welcome = ({route, navigation}) => {
    const {t, i18n} = useTranslation();
    const {store} = route.params;
    const dispatch = useDispatch();
    React.useEffect(() => {
        navigation.addListener('beforeRemove',(e) => {
            e.preventDefault();
        })
    },[navigation]);
    const onNext = () => {
        dispatch(redirect({store}));
    }
    return (
        <Layout>
            <View style={{flex:0.9, justifyContent:'center' }}>
                <Header hideDrawer/>
                <Text style={{alignSelf: 'center', marginVertical:8}} category="h2" weight="bold">{t("onboarding:welcome")} !</Text>
                <Text style={{alignSelf: 'center', marginVertical:24}} category="h3" weight="bold">استفد من إمكانات تطبيق باقالة القوية لتبسيط أعمالك.</Text>
                <View　style={styles.cardsWrapper}>
                    <View style={styles.card}>
                        <Text category="p" weight="bold">{t("onboarding:catalog")}</Text>
                        <Text category="s2" weight="medium">{t("onboarding:catalogText")}</Text>
                    </View>

                    <View style={styles.card}>
                        <Text category="p" weight="bold">{t("onboarding:track")}</Text>
                        <Text category="s2" weight="medium">{t("onboarding:trackText")}</Text>
                    </View>

                    <View style={styles.card}>
                        <Text category="p" weight="bold">{t("onboarding:reports")}</Text>
                        <Text category="s2" weight="medium">{t("onboarding:reportsText")}</Text>
                    </View>
                </View>
            </View>
            <View style={{alignSelf:'center'}}>
                <Button onPress={onNext}>{t("common:actions:next")}</Button> 
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    cardsWrapper :{
        flexDirection:"column",
        justifyContent:'space-around',
        flex:0.7
    },
    card : {
        height:88,
        paddingHorizontal:20,
        paddingVertical:10,
        borderWidth:1,
        borderRadius:3,
        borderColor: Colors.GRAY_MEDIUM,
        justifyContent:'center'
    }
});

export default Welcome;
