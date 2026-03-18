import { useQuery } from "@tanstack/react-query"
import api from "./axiosConfig"
import type { Nodes } from "@/types"

const baseUrl  = import.meta.env.VITE_API_URL

const fetchAllNodes = async(): Promise<Nodes[]>  => {
    const {data} =await api.get(`${baseUrl}/api/publucRoutes/allNodes`)
    return data.payload
}


export const useNodes = ()=>{
    return useQuery({
        queryKey:['nodes'],
        queryFn:fetchAllNodes
    })
}