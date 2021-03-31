import * as React from 'react';
import AppNavigator from './AppNavigator';
import AuthNavigator from "./AuthNavigator";
import { useSelector } from 'react-redux';
import { AppContext } from '../Controllers/Context';
import { logIn as logInAction, signOut as signOutAction, signUp as signUpAction, retreiveToken } from "_reducers";
import { useDispatch } from 'react-redux';
import { LoadingActivity } from "_organisms";
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootNavigator = ()=>{
  const {token, id, isLoading} = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  const contextValue = React.useMemo(() => ({
    signUp : async (user) => {
      try {
        await AsyncStorage.setItem("token", user.token || user.id);
        await AsyncStorage.setItem("userId", user.id);
        dispatch(signUpAction({id : user.id, token: user.id}));
      } catch (error) {
        console.error(error);
      }
    },
    signIn: async (user) => {    
      try {
        await AsyncStorage.setItem("token", user.token || user.id);
        await AsyncStorage.setItem("userId", user.id);
        dispatch(logInAction({id : user.id, token: user.id }));
      } catch (error) {
        console.error(error);
      }
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("userId");
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
      dispatch(retreiveToken({token}));
    }, 500)
  },[]);

  if (isLoading) {
    return (
      <LoadingActivity />
    )
  }

  return (
    <AppContext.Provider value={contextValue}>
      { token ? <AppNavigator/> : <AuthNavigator/>}
    </AppContext.Provider>
  )
}

export default RootNavigator;