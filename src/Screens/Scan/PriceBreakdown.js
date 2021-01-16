import React from 'react'
import { FlatList, View } from 'react-native'
import { Header, Layout , Text, Button, Icon, Input } from "_atoms";
import { useTranslation } from 'react-i18next';
import { Colors } from '_styles';


const ListHeader = () => {
    const {t, i18n} = useTranslation();
    return (
        <View style={{flexDirection:'row-reverse', marginVertical:24}}>
            <Text style={{flex:3}} category="p" weight="bold" status="hint">{t("common:product")}</Text>
            <Text style={{flex:2}} category="p" weight="bold" status="hint">{t("common:quantity")}</Text>
            <Text style={{flex:1}} category="p" weight="bold" status="hint">{t("common:price")}</Text>
        </View>
    );
}

const ListFooter = (props) => {
    const {t, i18n} = useTranslation();
    const [paid, setPaid] = React.useState(0);
    return (
        <View style={{borderColor:Colors.GRAY_LIGHT, borderTopWidth:1, marginTop:24}}>
            <View style={{marginVertical:16, flexDirection:'row-reverse', justifyContent:'space-between'}}>
                <Text style={{flex:3, textAlign:'right'}} category="h3" weight="bold">{t("common:total")}</Text>
                <Text style={{flex:0.6, textAlign:'right'}} category="h3" weight="bold">{`${props.total} Dh`}</Text>
            </View>
            <View style={{marginVertical:8}}>
                <Text style={{flex:3, textAlign:'right'}} category="h3" weight="bold">{t("common:paid")}</Text>
                <Input placeholder='0' _onChangeText={(p)=>setPaid(p)} keyboardType="numeric"/>
            </View>
            <View style={{marginVertical:8, flexDirection:'row-reverse', justifyContent:'space-between'}}>
                <Text style={{flex:3, textAlign:'right'}} category="h3" weight="bold">{t("common:rest")}</Text>
                <Text style={{flex:0.6, textAlign:'right'}} category="h4" weight="bold">{`${paid - props.total} Dh`}</Text>
            </View>
        </View>
    );
}

const ListItem = ({item})=>{
    return (
        <View style={{flexDirection:'row-reverse', alignItems:'center', alignContent:"flex-end", marginVertical:8}}>
            <Text style={{flex:3, textAlign:'right'}} weight="medium" numberOfLines={1}>{item.name}</Text>
            <Text style={{flex:2, textAlign:'right'}} weight="medium">{item.quantity}</Text>
            <Text style={{flex:1, textAlign:'right'}} weight="medium">{`${item.price*item.quantity}`}</Text>
        </View>
    );
}

const PriceBreakdown = ({navigation}) => {
    const {t, i18n} = useTranslation();
    const data = [{name:"item 1", price:10, quantity:3},{name:"item name", price:10, quantity:3}]
    const total = data.reduce((a, b)=>a+b.price*b.quantity,0);
    return (
        <Layout>
            <Header first canGoBack navigation={navigation}/>
            <Text category="h2" weight="bold">{t("scan:priceBreakdown")}</Text>
            <FlatList
                data={data}
                renderItem={({item})=><ListItem item={item}/>}
                keyExtractor={()=>String(Math.random()*100)}
                ListHeaderComponent={()=><ListHeader/>}
                ListFooterComponent={()=><ListFooter total={total}/>}
            /> 
            <View style={{position:'absolute', bottom:30, alignSelf:'center'}}>
                <Button status="success" icon={()=><Icon status="white" name="checkmark-circle"/>}>{t("common:actions:validate")}</Button>
            </View> 
        </Layout>
    )
}

export default PriceBreakdown;
