import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpClient from './HttpClient';

const STORE_ROUTE = "/stores";

class StoreController {
    //TODO : Use token instead
    static async fetchUserStore() {
        this.id = await AsyncStorage.getItem("userId");
        this.token = await AsyncStorage.getItem("token");

        return new Promise(async (resolve, reject) => {
            try {
                const res = await HttpClient.get(`${STORE_ROUTE}/user/${this.id}`);
                const { store } = res.data;
                resolve(store);
            } catch (error) {
                reject(error);
            }
        })
    }

    static async createStore(storeInfo) {
        return new Promise((resolve, reject) => {
            if(storeInfo) {
                HttpClient.post(STORE_ROUTE, storeInfo).then(res=>resolve(res.data.store)).catch(err=>{reject(err)});
            } else{
                reject("Invalide Store Info");
            }
        })
    }

    static async updateStore(storeInfo) {
        return new Promise((resolve, reject) => {
            if(storeInfo) {
                HttpClient.put(`${STORE_ROUTE}/${storeInfo.id}`, storeInfo)
                .then(res=>{
                    console.log(`${STORE_ROUTE}/${storeInfo.id}`);
                    resolve(res.data.store)
                }).catch(err=>{reject(err)});
            } else{
                reject("Invalide Store Info");
            }
        })
    }
    
}

export default StoreController;