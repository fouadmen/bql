import React from 'react';
import { View } from 'react-native';
import Icon from './Icon';

const Header = ({navigation, first, style, canGoBack, hideDrawer, children }) => {
    return (
        <View style={[{backgroundColor:'#fff', marginVertical:8, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}, style]}>
            { canGoBack ? <Icon name={first ? "close" : "arrowleft"} type="AntDesign" status="primary" size={28} onPress={()=>navigation.goBack()}/> : <View/>}      
            { hideDrawer ? null : <Icon name="reorder-three-outline" status="primary" size={40} onPress={()=>navigation.toggleDrawer()}/> }      
            
        </View>
    )
}

export default Header;
