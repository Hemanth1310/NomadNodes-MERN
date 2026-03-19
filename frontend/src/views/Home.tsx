import Error from '@/components/fallback/Error'
import Loading from '@/components/fallback/Loading'
import { useNodes } from '@/lib/dataQueryHooks'
import getImageUrl from '@/lib/getImageUrl'
import type { Tag } from '@/types'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router'


const Home = () => {
    const {data , isLoading, isError, refetch, error} = useNodes()
    const [searchParams] = useSearchParams()
    const filteredNodes = useMemo(()=>{
        const search = searchParams.get('search') || ''
        const tags = searchParams.getAll('tag') as Tag[]

        return data?.filter((node)=>{
            const matchSearch = node.title.toLowerCase().includes(search.toLowerCase())
            const matchTags = tags.length === 0 || tags.some(t=>node.tags.includes(t))
            return matchSearch && matchTags
        }) ?? []

    },[searchParams, data])

    if(isLoading){
        return <Loading/>
    }

    if(isError){
        return <Error errorMessage={error.message} refetch={refetch}/>
    }
  return (
    <div className='w-full pt-5 sm:pl-10 sm:pr-10'>
        {/* {Array.from(Array(26)).map(()=><div className='h-10 bg-amber-600'></div>)} */}
       <h1 className='text-2xl sm:text-4xl mb-5 sm:mb-10'>Explore the best of Nomad Community</h1>
       <div className='grid grid-cols-2 sm:grid-cols-4 gap-5'>
            {filteredNodes?.map(node=><div className='flex flex-col gap-2' key={node.id}>
                <img className='h-full rounded-2xl' src={getImageUrl(node.imageUrl)}/>
                <div className='ml-2'>
                    <p className='font-medium'>{node.title}</p>
                    <p className='text-sm'>Tags: {node.tags.map((tag)=><span className='border rounded-2xl pr-1 pl-1 mr-1 text-xs'>{tag}</span>)}</p>
                </div>
            </div>)}
            {data?.map(node=><div className='flex flex-col gap-2' key={node.id}>
                <img className='h-full rounded-2xl' src={getImageUrl(node.imageUrl)}/>
                <div className='ml-2'>
                    <p className='font-medium'>{node.title}</p>
                    <p className='text-sm'>Tags: {node.tags.map((tag)=><span className='border rounded-2xl pr-1 pl-1 mr-1 text-xs'>{tag}</span>)}</p>
                </div>
            </div>)}
            {data?.map(node=><div className='flex flex-col gap-2' key={node.id}>
                <img className='h-full rounded-2xl' src={getImageUrl(node.imageUrl)}/>
                <div className='ml-2'>
                    <p className='font-medium'>{node.title}</p>
                    <p className='text-sm'>Tags: {node.tags.map((tag)=><span className='border rounded-2xl pr-1 pl-1 mr-1 text-xs'>{tag}</span>)}</p>
                </div>
            </div>)}
          
        </div>
    </div>
  )
}

export default Home