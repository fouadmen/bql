import React from 'react';
import {View, StyleSheet} from 'react-native'
import { Colors } from "_styles";

const Layout = ({ children, style, header })=>{
    return (
        <View style={StyleSheet.flatten([styles.layout, style])}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    layout:{
        flex:1,
        flexDirection:'column',
        backgroundColor:Colors.WHITE,
        paddingHorizontal:24
    }
})
/**
 * 
 * @param {{children: Component, style: Object}} props 
 */
export default Layout;
