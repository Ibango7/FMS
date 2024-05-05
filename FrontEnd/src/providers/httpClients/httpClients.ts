import axios, { AxiosRequestConfig, AxiosHeaders } from 'axios';

// Disable SSL certificate verification (NOT RECOMMENDED for production )
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const baseUri = process.env.NEXT_PUBLIC_BASE_URL;
const httpClient = axios.create({
  baseURL: baseUri,
  headers: {
    "Content-Type": "application/json",
  },
});


httpClient.interceptors.request.use(
    config =>{
        const token = localStorage.getItem('token');

        // Ensure that config.headers is initialized
        if(!config.headers) {
            config.headers = {} as AxiosHeaders
        }

        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },
    error =>{
        return Promise.reject(error)
    }
)

export { httpClient };
