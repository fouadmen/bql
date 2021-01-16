import React from 'react'
import {Text} from '_atoms';
import { Colors } from "_styles";
const Header = ({children}) => {
    const headerStyle = {
        height:48, 
        paddingHorizontal:24, 
        textAlignVertical:'center', 
        backgroundColor:Colors.PRIMARY,
    }
    return (
        <Text status="white" category="h2" weight="bold" style={[headerStyle, {zIndex:10}]}>{children}</Text>
    )
}
/**
 * 
 * @param {{children:Component}} props 
 */
export default Header
