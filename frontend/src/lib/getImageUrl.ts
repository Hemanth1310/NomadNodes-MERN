
const baseURL = import.meta.env.VITE_API_URL

const getImageUrl = (path:string) =>{

    return baseURL+'/images/'+path
}

export default getImageUrl