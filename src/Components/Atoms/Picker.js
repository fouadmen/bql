import React from 'react'
import {Picker as Component} from '@react-native-picker/picker';

const Picker = (props) => {
    const [selectedItem, setSelectedItem] = React.useState("");
    const onValueChange = (val, idx) => {
        setSelectedItem(val)
        props.onSelect(val)
    }

    React.useEffect(()=>{
        setSelectedItem(props.data[0])
    },[])
    
    return (
        <Component
            selectedValue={selectedItem}
            style={[props.style, {height: 50, aspectRatio:2}]}
            onValueChange={onValueChange} mode={props.mode}>
            { Object.getOwnPropertyNames(props.data).map(key => (<Component.Item label={props.data[key]} value={key} key={String(Math.random()*10)} />)) }
        </Component>
    )
}

export default Picker
