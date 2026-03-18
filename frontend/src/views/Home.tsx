import Error from '@/components/fallback/Error'
import Loading from '@/components/fallback/Loading'
import { useNodes } from '@/lib/dataQueryHooks'
import getImageUrl from '@/lib/getImageUrl'


const Home = () => {
    const {data , isLoading, isError, refetch, error} = useNodes()

    if(isLoading){
        return <Loading/>
    }

    if(isError){
        return <Error errorMessage={error.message} refetch={refetch}/>
    }

  return (
    <div className='w-full grid grid-cols-3 gap-5'>
        {/* {Array.from(Array(26)).map(()=><div className='h-10 bg-amber-600'></div>)} */}
       {data?.map(node=><div key={node.id}>
        <img className='h-full' src={getImageUrl(node.imageUrl)}/>
        {node.title}
       </div>)}
        
    </div>
  )
}

export default Home