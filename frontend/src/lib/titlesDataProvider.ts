import { useMemo } from "react"
import { useNodes } from "./dataQueryHooks"


const useTitles = ()=>{
    const {data} = useNodes()
    const titles = useMemo(()=> data?.map(node=>node.title) ?? [], [data])
    return titles
}

export default useTitles