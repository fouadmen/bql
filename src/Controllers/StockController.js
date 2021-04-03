import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpClient from './HttpClient';

const STOCK_ROUTE = "/stores/stocks";

class StockController {
    //TODO : Use token instead
    static async fetchStock(stockBarcode) {
        this.id = await AsyncStorage.getItem("userId");
        this.token = await AsyncStorage.getItem("token");

        return new Promise(async (resolve, reject) => {
            try {
                const res = await HttpClient.get(`${PRODUCT_ROUTE}/${stockBarcode}`);
                const { stock } = res.data;
                resolve(stock);
            } catch (error) {
                reject(error);
            }
        })
    }

    static async createStock(stockInfo, storeId) {
        return new Promise((resolve, reject) => {
            if(stockInfo) {
                HttpClient.post(`/stores/${storeId}/stocks/`, stockInfo).then(res=>{
                    resolve(res.data.stock)
                }).catch(err=>{reject(err)});
            } else {
                reject("Unknown Error Happened.");
            }
        })
    }
    
}

export default StockController;