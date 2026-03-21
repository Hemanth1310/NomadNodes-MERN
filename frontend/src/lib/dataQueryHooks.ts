import { useQuery } from "@tanstack/react-query"
import api from "./axiosConfig"
import type { Nodes } from "@/types"

const fetchAllNodes = async(): Promise<Nodes[]>  => {
    const {data} =await api.get('/api/publucRoutes/allNodes')
    return data.payload
}


export const useNodes = ()=>{
    return useQuery({
        queryKey:['nodes'],
        queryFn:fetchAllNodes
    })
}