
import Loading from '@/components/fallback/Loading'
import { useAuth } from '@/contexts/AuthContent'
import { Navigate, Outlet } from 'react-router'


const ProtectedRoutes = () => {
    const {userDetails,isAuthLoading}  = useAuth()

    if(isAuthLoading){
        return <Loading/>
    }

    if(userDetails){
        return <Outlet/>
    }else{
    return <Navigate to='/' replace/>
  }
  
}

export default ProtectedRoutes