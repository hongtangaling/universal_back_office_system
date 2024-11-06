import axios from 'axios'
const baseUrl = '/api'

// react中的axios的二次封装

class HttpRequest{
    constructor(baseUrl){
        this.baseUrl = baseUrl
    }
    getInsideConfig(){
        const config = {
            baseUrl:this.baseUrl,
            header:{}
        }
        return config
    }
    request(options){
        options = {...this.getInsideConfig(),...options}
        //创建axios实例
        const instance = axios.create()
        // 实例拦截器的绑定
        this.interceptors(instance)
        return instance(options)
    }

    //axios拦截器封装
    interceptors(instance){
        //添加请求拦截器
        instance.interceptors.request.use(function (config){
            return config
        },function(error){
            return Promise.reject(error)
        });
        //添加响应拦截器
        instance.interceptors.response.use(function (response){
            return response
        },function(error){
            return Promise.reject(error)
        });
    }


}
export default new HttpRequest(baseUrl)