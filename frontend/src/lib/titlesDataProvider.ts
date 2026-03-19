import { useNodes } from "./dataQueryHooks"


const useTitles = ()=>{
    const {data} = useNodes()
    const titles = data?.map(node=>node.title)
    return titles
}

export default useTitles