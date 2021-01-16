import React from 'react'
import {Picker as Component} from '@react-native-picker/picker';

const Picker = (props) => {
    const [selectedItem, setSelectedItem] = React.useState(props.data[0]);
    const onValueChange = (val, idx) => {
        setSelectedItem(val)
        props.onSelect(idx)
    }
    return (
        <Component
            selectedValue={selectedItem}
            style={[props.style, {height: 50, width: 50}]}
            onValueChange={}>
            {props.data.map(item => (<Component.Item label={item} value={item} />))}
        </Component>
    )
}

export default Picker
