import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpClient from './HttpClient';

const LOGIN_ROUTE = "/users/login";
const SIGNUP_ROUTE = "/users/signup";
const USERS_ROUTE = "/users";
class UserController {
    static async login({email, password}) {
        return new Promise(async (resolve, reject)=>{
            if (email && password) {
                HttpClient.post(LOGIN_ROUTE, {email, password}).then(res=>resolve(res)).catch(err=>reject(err));
            } else {
                reject(new Error("Invalid Credentials."))
            }
        })
    }

    static async signup(userInfo) {
        return new Promise((resolve, reject)=>{
            if (userInfo) {
                HttpClient.post(SIGNUP_ROUTE, userInfo).then(res=>resolve(res)).catch(err=>{reject(err)});
            } else {
                reject(new Error("Invalid Credentials."))
            }
        })
    }

    static async fetchUser() {
        this.id = await AsyncStorage.getItem("userId");
        this.token = await AsyncStorage.getItem("token");
        return new Promise((resolve, reject) => {
            HttpClient.get(`${USERS_ROUTE}/${this.id}`).then(res=>resolve(res.data.user)).catch(err=>reject(err));
        });
    }

    static async updateUser(userInfo) {
        this.id = await AsyncStorage.getItem("userId");
        this.token = await AsyncStorage.getItem("token");
        return new Promise((resolve, reject) => {
            if (userInfo) {
                HttpClient.put(`${USERS_ROUTE}/${this.id}`, userInfo).then(res=>resolve(res.data)).catch(err=>reject(err));
            } else {
                reject(new Error("Invalid Data."))
            }
            
        });
        
    }
}

export default UserController;