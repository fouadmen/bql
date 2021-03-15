import HttpClient from './HttpClient';

LOGIN_ROUTE = "/users/login";
SIGNUP_ROUTE = "/users/signup";

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
}

export default UserController;