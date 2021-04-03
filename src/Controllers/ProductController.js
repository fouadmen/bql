import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpClient from './HttpClient';

const PRODUCT_ROUTE = "/stores/products";

class ProductController {
    //TODO : Use token instead
    static async fetchProduct(productBarcode) {
        this.id = await AsyncStorage.getItem("userId");
        this.token = await AsyncStorage.getItem("token");

        return new Promise(async (resolve, reject) => {
            try {
                const res = await HttpClient.get(`${PRODUCT_ROUTE}/${productBarcode}`);
                const { product } = res.data;
                resolve(product);
            } catch (error) {
                reject(error);
            }
        })
    }

    static async createProduct(productInfo) {
        return new Promise((resolve, reject) => {
            if(productInfo) {
                HttpClient.post(PRODUCT_ROUTE, productInfo).then(res=>{
                    resolve(res.data.product)
                }).catch(err=>{reject(err)});
            } else {
                reject("Unknown Error Happened.");
            }
        })
    }
    
}

export default ProductController;