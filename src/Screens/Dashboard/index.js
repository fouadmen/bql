import React from 'react'
import { View, Image, FlatList, ScrollView  } from 'react-native';
import {Layout, Text, Header} from '_atoms';
import { useTranslation } from 'react-i18next';
import { Mixins } from '_styles';

const Grid = ({data, gridItem}) => {
    const style = {
        parent: {
            width: '100%',
            flexDirection: 'row', 
            flexWrap: 'wrap',
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#fff',
            padding:18
        },
        child: {
            width: '38%', 
            margin: '2%', 
            aspectRatio: 1,
            borderRadius:10,
            backgroundColor:'#fff',
            ...Mixins.boxShadow()
        }
    }
    return (
        <View style={[style.parent]}>
            {data.map((item)=>React.cloneElement(gridItem(),{item:item, style:style.child}))}        
        </View>
    ); 
}

const InventorySummeryItem = (props) => {
    const {t, i18n} = useTranslation();
    const defaultStyle = {
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    }
    return (
        <View style={[props.style, defaultStyle]} key={String(Math.random()*100)}>
            <Text category="h2" weight="bold">{props.item.count}</Text>
            <Text>{t(`dashboard:${props.item.title}`)}</Text>
        </View>
    )
}

const ProductItem = (props) => {
    const {t, i18n} = useTranslation();
    const defaultStyle = {
        flexDirection:'row-reverse',
        marginVertical:8,
        padding:4,
        borderRadius:10,
        backgroundColor:'#fff',
        ...Mixins.boxShadow()
    }
    return (
        <View style={[props.style, defaultStyle]}>
            <Image style={{height:64, width:64, borderRadius:10}} source={require(`../../Assets/images/omo.jpg`)}/>
            <View style={{flexDirection:'column', alignSelf:'center', marginHorizontal:4, alignItems:'flex-end'}}>
                
                <Text category="h3" weight="bold">{props.item.name}</Text>
                <Text>{t(`categories:${props.item.category}`)}</Text>
            </View>
        </View>
    )
}

const Card = (props) => {
    const {t, i18n} = useTranslation();
    const defaultStyle = {
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'space-evenly',
        marginHorizontal:8,
        paddingVertical:4,
        paddingHorizontal:8,
        borderRadius:10,
        backgroundColor:'#fff',
        ...Mixins.boxShadow(),
        width:120,
    }
    return (
        <View style={[props.style, defaultStyle]}>
            <Image style={{height:104, width:130, alignSelf:'center', borderRadius:4}} resizeMode="contain" source={require(`../../Assets/images/omo.jpg`)}/>
            <Text style={{padding:0}} category="s3" status="hint">{props.item.code}</Text>
            <Text category="p" weight="bold">{props.item.name}</Text>
            <Text category="s3" status="hint">{props.item.quantity}</Text>
        </View>
    )
}

const Dashboard = ({route, navigation}) => {
    const {t, i18n} = useTranslation();
    const dashboardItems = [
        {title: "products", count: 120, icon:''},
        {title: "categories", count: 13, icon:''},
        {title: "lowStock", count: 2, icon:''},
        {title: "sales", count: 1200, icon:''}
    ]
    const recentItems = [
        {
            id:"xx1",
            code:"9029389232",
            name:"OMO",
            category:'cleansers',
            image:"omo.jpg",
            sales:120,
            puchasePrice:4.5,
            sellPrice:5,
            quantity:110
        }
    ]
    return (
        <Layout>
            <Header canGoBack navigation={navigation}/>
            <Text category="h2" weight="bold">{t("screens:dashboard")}</Text>
            <ScrollView>
                <Text weight="bold" status="hint" style={{paddingHorizontal:24, height:32}}>{t("dashboard:inventorySummery")}</Text>
                <Grid
                    data = {dashboardItems}
                    gridItem = {()=><InventorySummeryItem/>}
                />
                <Text weight="bold" status="hint" style={{paddingHorizontal:24, height:32}}>{t("dashboard:recentItems")}</Text>
                <FlatList
                    data={recentItems}
                    renderItem={({item})=><Card item={item}/>}
                    keyExtractor={()=>String(Math.random()*100)}
                    contentContainerStyle={{backgroundColor:'#fff', paddingHorizontal:8, paddingVertical:16,flexGrow:1}}
                    nestedScrollEnabled={true}
                    horizontal
                />
            </ScrollView>
        </Layout>
    )
}

export default Dashboard
