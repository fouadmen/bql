import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Dashboard from '_screens/Dashboard';
import Scan from '_screens/Scan';
import PriceBreakdown from '_screens/Scan/PriceBreakdown';
import Products from "_screens/Products";
import ProductDetail from "_screens/Products/ProductDetail";
import AddProduct from "_screens/Products/AddProduct";
import ProductPicture from "_screens/Products/ProductPicture";
import ImagePreview from "_screens/Products/ImagePreview";
import CaptureBarcode from "_screens/Products/CaptureBarcode";
import NewProductForm from "_screens/Products/NewProductForm";
import Settings from "_screens/Settings";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';
import { Icon } from "_atoms";

const AppStackNavigator = createDrawerNavigator();
const ScanningStack = createStackNavigator();
const ProductsStack = createStackNavigator();

const config = {
  animation: 'timing',
  config: {
    duration : 500
  },
};
const verticalInterpolation = {animationEnabled: true, gestureDirection:'vertical', cardStyleInterpolator : CardStyleInterpolators.forVerticalIOS, transitionSpec:{open: config, close: config}}
const horizotalInterpolation = {gestureDirection:'vertical', cardStyleInterpolator : CardStyleInterpolators.forHorizontalIOS}

const Scanning = () => {
  return (
    <ScanningStack.Navigator initialRouteName="Scan" headerMode="none">
      <ScanningStack.Screen name="Scan" component={Scan} />
      <ScanningStack.Screen name="breakdown" component={PriceBreakdown} options={verticalInterpolation}/>
    </ScanningStack.Navigator>
  );
}

const Products_ = () => {
  return (
    <ProductsStack.Navigator headerMode="none">
      <ProductsStack.Screen name="Products" component={Products}/>
      <ProductsStack.Screen name="Detail" component={ProductDetail} options={verticalInterpolation}/>
      <ProductsStack.Screen name="AddProduct" component={AddProduct} options={verticalInterpolation}/>
      <ProductsStack.Screen name="ProductPicture" component={ProductPicture} options={verticalInterpolation}/>
      <ProductsStack.Screen name="ImagePreview" component={ImagePreview} options={horizotalInterpolation}/>
      <ProductsStack.Screen name="CaptureBarcode" component={CaptureBarcode} options={horizotalInterpolation}/>
      <ProductsStack.Screen name="NewProductForm" component={NewProductForm} options={horizotalInterpolation}/>
    </ProductsStack.Navigator>
  );
}

const AppNavigator = ()=>{
    const {t, i18n} = useTranslation();
    return (
        <AppStackNavigator.Navigator drawerPosition="right"  headerMode="none">
          <AppStackNavigator.Screen options={{drawerLabel: t("screens:scan"), drawerIcon:()=><Icon name="barcode"/>}} name="Scanning" component={Scanning}/> 
          <AppStackNavigator.Screen options={{drawerLabel: t("screens:dashboard"), drawerIcon:()=><Icon name="shop" type="Entypo"/>}} name="Dashboard" component={Dashboard} /> 
          <AppStackNavigator.Screen options={{drawerLabel: t("screens:products"), drawerIcon:()=><Icon name="handbag" type="SimpleLineIcons"/>}} name="Products_" component={Products_} /> 
          {/* <AppStackNavigator.Screen options={{drawerLabel: t("screens:reports"), drawerIcon:()=><Icon name="file-chart-outline" type="MaterialCommunityIcons"/>}} name="Reports" component={Dashboard} />  */}
          <AppStackNavigator.Screen options={{drawerLabel: t("screens:settings"), drawerIcon:()=><Icon name="settings-sharp"/>}} name="Settings" component={Settings} /> 
          {/* <AppStackNavigator.Screen options={{drawerLabel: t("screens:info"), drawerIcon:()=><Icon name="information-circle-outline"/>}} name="Info" component={Dashboard} />  */}
        </AppStackNavigator.Navigator>
    )
}

export default AppNavigator;