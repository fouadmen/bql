import React from 'react';
import { View, StyleSheet, Image, FlatList, Modal } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Layout, Text, Icon, Divider, Button, Input, Header } from "_atoms";
import { Camera } from "_organisms";
import { Colors } from "_styles";

const ListItem = ({item, onPress})=>{
    return (
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:8}}>
            <View style={{flexDirection:'row'}}>
                <Image style={{height:40, width:40}} source={item.image} />
                <Text weight="bold">{item.name}</Text>
            </View>
            <Text weight="bold">{`${item.price} x ${item.quantity}`}</Text>
            <Text weight="bold">{`${item.price*item.quantity} Dh`}</Text>
            <View style={{flexDirection:'row'}}>
                <Icon onPress={()=>onPress(item.barcode)} name="trash" size={20} status="alert" style={{marginLeft:8}}/>
            </View>
        </View>
    );
}

const QuantityModal = (props) => {
    const [quantity, setQuantity] = React.useState(1);
    const {t, i18n} = useTranslation();
    const _onChangeText = (q) => setQuantity(q);

    return (
        <Modal transparent animationType="fade" visible={props.visible} onRequestClose={()=>props.closeHandler()}>
            <View style={{height:164, width:"80%", backgroundColor:Colors.GRAY_LIGHT, borderRadius:8, position:'absolute', top:'45%',left:'10%', flexDirection:'column', alignItems:'center', padding:18 }}>
                <Text category="h4">Input quantity</Text>
                <Input focusable={true} _onChangeText={_onChangeText} placeholder='1' keyboardType="numeric"/>
                <View style={{flexDirection:'row', alignSelf:'center', marginTop:8, justifyContent:'space-between', width:96}}>
                    <Icon onPress={()=>props.closeHandler(null)} status="alert" name="close-circle" size={40}/>
                    <Icon onPress={()=>props.closeHandler({quantity})} status="success" name="checkmark-circle" size={40}/>
                </View>
            </View>
        </Modal>
    );
}

const hasObj = (arr, code) => arr.some(el => el.barcode === code)

const Scan = ({navigation}) => {
    const [data, setData] = React.useState([]);
    const [scanning, setScanning] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [barcode, setBarCode] = React.useState(null);

    const {t, i18n} = useTranslation();
    
    const startScanning = () => {
        // finishScanning();
        setScanning(true);    
    }

    const cancelScanning = () => {
        setScanning(false);    
        setData([]);
    }

    const finishScanning = () => {
        navigation.navigate("breakdown");
        setScanning(false);    
    }

    const onItemScan = (rawData) => {
        if (!showModal) {
            setBarCode(rawData.data)
            setShowModal(true);
        }        
    }

    const removeItem = (barcode) => {
        const newList = data.filter(item => item.barcode !== barcode)
        setData(newList);
    }

    const closeModal = (args) => {
        if (args && args.quantity>0) {
            if (hasObj(data, barcode)) {
                const updatedList = data;
                updatedList.forEach(item =>{
                    if (item.barcode === barcode) {
                        item.quantity = args.quantity;
                        return;
                    }
                });
                setData(updatedList);
            }else{
                const bottle = {name:'bottle', price:10, image:require("../../Assets/images/bottle.jpg"), barcode:barcode, quantity:args.quantity};
                setData([...data, bottle]);
            }  
        }
        setShowModal(false);
    }

    return (
        
        <Layout>
            <Header navigation={navigation}/>
            <View style={[styles.scanner, styles.scannerContent]}>
                {scanning ? <Camera onBarCodeRead={onItemScan}/> : <Text category="p" status="black">{t("scan:scannerLabel")}</Text>  }
            </View>
            <Text style={{marginTop:24}} category="p" status="black">{t("common:items")}</Text>
            <FlatList
                data={data}
                renderItem={({item})=><ListItem onPress={removeItem} item={item}/>}
                keyExtractor={()=>String(Math.random()*100)}
                style={{marginTop:24}}
                ItemSeparatorComponent={()=><Divider style={{ marginVertical:8}}/>}
                extraData={data}
                style={{marginBottom:80}}
            />
            <View style={{position:'absolute', bottom:30, alignSelf:'center'}}>
                {!scanning ? 
                    <Button onPress={startScanning} icon={()=><Icon status="white" name="barcode-outline"/>}>{t("common:actions:start")}</Button> 
                    :
                    <View style={{flexDirection:'row', alignSelf:'center'}}>
                        <Button onPress={cancelScanning} style={{marginRight:16}} status="alert" icon={()=><Icon status="white" name="close-circle"/>}>{t("common:actions:cancel")}</Button>
                        <Button onPress={finishScanning} status="success" icon={()=><Icon status="white" name="checkmark-circle"/>}>{t("common:actions:validate")}</Button>
                    </View>
                }
            </View>
            { showModal && <QuantityModal visible={showModal} closeHandler={closeModal} />}
        </Layout>
    )
}

const styles=StyleSheet.create({
    scanner : {
        height:180, 
        aspectRatio:1.8, 
        borderColor:'black', 
        borderRadius:10, 
        borderWidth:1.5, 
        backgroundColor:Colors.GRAY_MEDIUM,
        opacity:0.5,
        alignSelf:'center',
        zIndex:10,
        overflow:'hidden'
    },
    scannerContent:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:40
    },
    scanButton:{
        width:72,
        height:72,
        borderRadius:36,
        borderColor:Colors.GRAY_DARK, 
        borderWidth:1, 
        backgroundColor:Colors.GRAY_MEDIUM,
        alignItems:'center',
        justifyContent:'center',
    },
    button:{
        position:'absolute',
        bottom:32,
        alignSelf:'center'
    }
})

export default Scan
