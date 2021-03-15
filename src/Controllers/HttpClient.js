import axios from "axios";

const API_BASE_URL = "http://10.0.2.2:8080/api";

const HttpClient = axios.create({
    baseURL : API_BASE_URL,
    headers : {
        'Content-Type': 'application/json',
    },
    timeout:2000
});

HttpClient.interceptors.response.use(
    response => response,
    error=>{
        
        if (error?.response) {
            error = new Error(error?.response.data.error);
            error.name = "ResponseError";
            return Promise.reject(error);
        }

        if(error?.request){
            error = new Error(error.request.data?.error);
            error.name = "RequestError";
            return Promise.reject(error);
        }
        
        console.error(error);
        error = new Error(error);
        error.name = "InternalError";
        return Promise.reject(error);
    }
)

export default HttpClient;