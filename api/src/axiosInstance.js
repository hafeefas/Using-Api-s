 // axiosInstance.js
 import axios from 'axios';

 const instance = axios.create({
    header: {'Content-Policy': 'application/json', 'Access-Control-Allow-Origin': "https://localhost:3003"} , 
    params: { api_key:'Fb5Lhkj3yaMQJvkawOQbBCd0dVvlkueo'},// Set your API base URL
    withCredentials: true, // Enable sending cookies along with requests
 });

 export default instance;