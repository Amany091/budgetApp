import axios from "axios";

let axiosInstance = null;

const createAxiosInstance = ()=>{
    if(!axiosInstance){
       axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                return Promise.reject(error)
            }
        )
    }
    return axiosInstance;
};

const request = async (method, url, options={})=>{
    const {body, params, config} = options;
    let finalURL = url;
    if(params){
        const queryString = new URLSearchParams(params).toString();
        finalURL = params? `${url}?${queryString}` : url;
    }

    try {
    const instance = createAxiosInstance();
    const response = await instance({
      method,
      url,
      data: body,
      params,
      ...config,
    });

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw error;
  }
}

export const get = (url, options) => request('GET', url, options);
export const post = (url, options) => request('POST', url, options);
export const put = (url, options) => request('PUT', url, options);
export const del = (url, options) => request('DELETE', url, options);