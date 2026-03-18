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
    <div className='w-full pt-5 sm:pl-10 sm:pr-10'>
        {/* {Array.from(Array(26)).map(()=><div className='h-10 bg-amber-600'></div>)} */}
       <h1 className='text-2xl sm:text-4xl mb-5 sm:mb-10'>Explore the best of Nomad Community</h1>
       <div className='grid grid-cols-2 sm:grid-cols-4 gap-5'>
            {data?.map(node=><div key={node.id}>
                <img className='h-full rounded-2xl' src={getImageUrl(node.imageUrl)}/>
                {node.title}
            </div>)}
            {data?.map(node=><div key={node.id}>
                <img className='h-full rounded-2xl' src={getImageUrl(node.imageUrl)}/>
                {node.title}
            </div>)}
        </div>
    </div>
  )
}

export default Home