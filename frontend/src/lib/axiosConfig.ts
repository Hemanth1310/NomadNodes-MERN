import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL
const api = axios.create({
    baseURL:apiUrl,
    headers:{
        "Content-Type":"application/json",
    }
})

//Add Auth Bearer token if it exists

api.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('nomadToken')

        if(token){
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }

)

export default api