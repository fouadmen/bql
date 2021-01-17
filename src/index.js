// import React from 'react';
// 

// import store from '_redux';

// const App = ()=>
//   <StoreProvider store={store}>
//     <Navigator />
//   </StoreProvider>

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { I18nextProvider } from 'react-i18next';
import i18n from "_localization";
import RootNavigator from '_navigation';
import { Provider as StoreProvider } from 'react-redux';
import store from '_store';

const App = () => {
    return (
        <StoreProvider store={store}>
            <NavigationContainer>
                <I18nextProvider i18n={ i18n }>
                    <RootNavigator />
                </I18nextProvider>
            </NavigationContainer>
        </StoreProvider>
    )
}


export default App;