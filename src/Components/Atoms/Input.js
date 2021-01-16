import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Icon from './Icon';
import Text from './Text';
import {Colors, Typography} from '_styles';
import { useTranslation } from 'react-i18next';


const Input = ({placeholder, style, containerStyle, backHandler, _onChangeText, leftComponent, rightComponent, multiline, forwardRef, keyboardType, focusable, label, mode, limit, errorMsg, editable, textAlign, val}) => {
  const [value, setValue] = React.useState(val ? val : '');
  const [borderColor, setBorderColor] = React.useState(Colors.GRAY_MEDIUM);
  const [raiseErr, setRaiseErr] = React.useState(false);
  
  const {t, i18n} = useTranslation();

  const inputRef = React.createRef();
  const clearInput = ()=> {
    _onChangeText ? _onChangeText(nextValue) : null;
    setValue('');
  }

  React.useEffect(()=>{
    if(focusable)
      inputRef.current.focus()
  },[])
  
  const onChangeText = (nextValue)=>{
    if (limit && nextValue.length>=limit){
      setBorderColor(Colors.ALERT)
      setRaiseErr(true);
      return;
    }
    if (limit) {
      setRaiseErr(false);
      setBorderColor(Colors.BASIC_TEXT_COLOR);
    }
    _onChangeText ? _onChangeText(nextValue) : null;
    setValue(nextValue);
  }

  if (forwardRef) {
    forwardRef((text)=>setValue(text));
  }

  return (
    mode === "outlined" || !mode ? 
      <View style={[styles.container, containerStyle]}>
        { leftComponent ? leftComponent : <Icon style={{marginRight:-6}} name="chevron-left" type="Feather" onPress={backHandler ? backHandler : null}/> }
        
          
          <TextInput
            ref={inputRef}
            style={StyleSheet.flatten([styles.input, style])}
            value={value}
            placeholderTextColor={Colors.TEXT_HINT_COLOR}
            placeholder={placeholder}
            onChangeText={onChangeText}
            multiline={multiline}
            textAlignVertical="top"
            textAlign={ textAlign ? textAlign : i18n.language === "ar" ? "right" : "left"}
            keyboardType={keyboardType}
          /> 
          
        
        {/* {rightComponent ? rightComponent : <Icon name="close" onPress={clearInput}/> }    */}
      </View>

    :
      <View style={[containerStyle, {marginVertical:4}]}>
          <Text weight="bold" category="s1" status="hint">{label}</Text>
          <TextInput
              onChangeText={onChangeText}
              value={value}
              placeholder={placeholder}
              style={{borderBottomWidth:1, borderBottomColor:borderColor, padding:2, fontSize:16, fontWeight:'bold', marginBottom:4}}
              numberOfLines={1}
              keyboardType={keyboardType}
              editable={editable}
              textAlign={i18n.language === "ar" ? "right" : "left"}
          />
          <Text category="s2" status={raiseErr ? "alert" : "white"}>{errorMsg}</Text>
      </View>
    
  );
};

const styles = StyleSheet.create({
  container:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    borderRadius:15,
    backgroundColor:'#EDEDED',
    paddingHorizontal:16,
    marginTop:16,
  },
  input: {
    borderColor:'#EDEDED',
    backgroundColor:'#EDEDED',
    flex:1,
    marginLeft:8,
    fontSize:20,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.TEXT_BASIC_COLOR,
    
  }
});  

export default Input
