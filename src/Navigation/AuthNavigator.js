import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import SignUp from "_screens/Landing/SignUp";
import LogIn from "_screens/Landing/LogIn";

const AuthStackNavigator = createStackNavigator();

const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator headerMode="none">
            <AuthStackNavigator.Screen component={SignUp} name="signUp"/>
            <AuthStackNavigator.Screen component={LogIn} name="logIn"/>
        </AuthStackNavigator.Navigator>
    )
}

export default AuthNavigator;
