import * as React from 'react';
import ApptNavigator from './AppNavigator';
import AuthNavigator from "./AuthNavigator";
import { useSelector } from 'react-redux';
import { AuthContext } from '../Controllers/Context';
import { ActivityIndicator, View } from "react-native";
import { logIn as logInAction, signOut as signOutAction, signUp as signUpAction, retreiveToken } from "_reducers";
import { useDispatch } from 'react-redux';
import { Colors } from "_styles";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingScreen = () => (
  <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    <ActivityIndicator size="large" color={Colors.PRIMARY}/>
  </View>
  );

const RootNavigator = ()=>{
  const {token, id, isLoading} = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  const contextValue = React.useMemo(() => ({
    signUp : async (user) => {
      try {
        await AsyncStorage.setItem("token", user.id);
        dispatch(signUpAction({id : user.id, token: user.id}));
      } catch (error) {
        console.error(error);
      }
    },
    signIn: async (user) => {    
      try {
        await AsyncStorage.setItem("token", user.id);
        dispatch(logInAction({id : user.id, token: user.id}));
      } catch (error) {
        console.error(error);
      }
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem("token");
        dispatch(signOutAction({id : null, token: null}));
      } catch (error) {
        console.error(error);
      }
    }
  }));

  React.useEffect(() => {
    setTimeout(async () => {
      var token = null;
      try {
        token = await AsyncStorage.getItem("token");
      } catch (error) {
        console.error(error);
      };
      return dispatch(retreiveToken({token}));
    }, 500)
  },[]);

  if (isLoading) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {token ? <ApptNavigator/> : <AuthNavigator/>}
    </AuthContext.Provider>
  )
}

export default RootNavigator;