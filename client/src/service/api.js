import axios from 'axios';

import { API_NOTIFICATION_MESSAGES,SERVICE_URLS } from '../constants/config';
import { getAccessToken, getType } from '../utils/common-utils';

export const API_URL ='http://localhost:8000';


const axiosInstance = axios.create({
    
    baseURL:API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    function(config){
        if(config.TYPE.params){
            config.params = config.TYPE.params
        }else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function(response) { 
       return processResponse(response);
    },
    function(error){
        return Promise.reject(processError(error));
    }
);

//if success -> return { isSuccess: true, data: object}
//if fail -> return{isFailure: true,status: string,msg: string,code: int}

const processResponse = (response) => {
    if (response?.status >= 200 && response?.status < 300){
        return{ isSuccess: true, data: response.data };
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.statusText || 'Request failed',
            code: response?.status
        };
    }
};

const processError = (error) =>{
    console.log('ERROR: ', error.toJSON());
    
    if (error.response){
        //request made and server responded with status code other then 200  
        console.log('ERROR IN RESPONSE: ',error.toJSON());
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        };
    }else if(error.request){
        // request made but no response was received(connectivity issue)
        console.log('ERROR IN REQUEST: ',error.toJSON());
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        };
    }else {
        // nither requset was made nor response was received 
        console.log('ERROR IN NETWORK: ',error.toJSON());
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkFailure,
            code: ""
        };
    }
};
  


const API = {};
const existingKeys = new Set();
//FOR-OF LOOP
for(const  [key, value] of  Object.entries(SERVICE_URLS)){
    if (existingKeys.has(key)) {
        console.warn(`Duplicate key detected: ${key}`); // Logs duplicate key
    }
    existingKeys.add(key); // Add key to the Set
    
    API[key]=(body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} :body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken()
            },
            TYPE : getType(value, body),
            onUploadProgress: function(progressEvent){
                if(showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },

            onDownloadProgress: function (progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            },
        })
    }

    // Example API call


    export { API };