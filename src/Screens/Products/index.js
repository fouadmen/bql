import React from 'react';
import { FlatList, View, Image, TouchableOpacity } from 'react-native';
import { Layout, Text, Header, Input, FAB, Icon, Divider } from "_atoms";
import { useTranslation } from 'react-i18next';
import { Colors } from '_styles';
import Fuse from 'fuse.js';

const fuseOptions = {
    isCaseSensitive: false,
    includeScore:true,
    threshold:0.4,
    keys: [
      "name",
      "barcode"
    ]
  };

const bottle = {name:'Bottle', purchasePrice:10, sellingPrice:12, image:require("../../Assets/images/bottle.jpg"), barcode:232423422, quantity:60}
const omo = {name:'OMO', purchasePrice:5.5, sellingPrice:6, image:require("../../Assets/images/omo.jpg"), barcode:232423411, quantity:10}
 
const ListItem = ({item, onPress})=>{
    const indicatorColor = item.quantity > 30 ? Colors.SUCCESS : item.quantity > 10 ? Colors.WARNING : Colors.ALERT
    return (
        <TouchableOpacity onPress={onPress} style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:8}}>
            <View style={{flexDirection:'row', flex:1, maxWidth:'70%'}}>
                <Image style={{height:56, width:56}} source={item.image} />
                <Text category="h4" weight="bold">{item.name}</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={{backgroundColor:indicatorColor, paddingHorizontal:8, paddingVertical:4, borderRadius:40}} status="white" weight="bold">{ item.quantity }</Text>
                <Icon name="chevron-forward" style={{marginLeft:8}}/>
            </View>
        </TouchableOpacity>
    );
}

const Products = ({navigation}) => {
    const init_data = [bottle,omo,bottle,omo,bottle,omo,bottle]
    const [data, setData] = React.useState(init_data);
    const fuse = new Fuse(init_data, fuseOptions);
    const {t, i18n} = useTranslation();

    const searchFilter= (text) => {
        var res = fuse.search(text).map(res=>res.item)
        setData(res.length > 0 ? res : init_data);
    }

    return (
        <Layout>
            <Header canGoBack navigation={navigation}/>
            <Text category="h2" weight="bold">{t("screens:products")}</Text>
            <Input _onChangeText={searchFilter} placeholder={t("search")}/>
            <FlatList
                data={data}
                renderItem = {({item})=><ListItem item={item} onPress={()=>navigation.navigate('Detail', {item})}/>}
                keyExtractor={()=>String(Math.random()*100)}
                style={{marginTop:24}}
                contentContainerStyle={{paddingBottom:24}}
                ItemSeparatorComponent={()=><Divider style={{marginVertical:8, marginLeft:56}}/>}
                showsVerticalScrollIndicator={false}
            />
            <FAB onPress={()=>navigation.navigate("ProductPicture")}/>
        </Layout>
    )
}

export default Products;
