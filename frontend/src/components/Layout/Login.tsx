import { useAuth } from '@/contexts/AuthContent'
import api from '@/lib/axiosConfig'
import { loginDetailSchema, userDataSchema } from '@/lib/typechecker'
import axios from 'axios'
import { MapPinned } from 'lucide-react'
import React, { useState } from 'react'

const  baseUrl = import.meta.env.VITE_API_URL

type Props = {
    handletoggle:(moveTo:string)=>void
    onClose:()=>void
}

const Login = ({handletoggle, onClose}: Props) => {
    const [errors,setErrors] = useState('')
    const {handleLogin} = useAuth()
    const handleSubmit=async(e:React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')
        setErrors('')
        if (!email || !password) {
            setErrors("Some of the fields are empty please enter and try again!")
            return
        }
        const results  = loginDetailSchema.safeParse({email,password})

        if(!results.success){
            setErrors(results.error.issues[0].message)
            return
        }

        try{
            const response = await api.post(`${baseUrl}/api/auth/login`,results.data)
            const parsedUserData  = userDataSchema.safeParse(response.data.payload)
            if(!parsedUserData.success){
                setErrors("Invalid Server Data, Please tryagain later!")
                return
            }
            localStorage.setItem('nomadToken',response.data.sessionToken)
            handleLogin(response.data.payload)
            onClose()
            
        }catch(error){
            if(axios.isAxiosError(error)){
                setErrors(error.response?.data.errorMessage)
            }
        }


    }
  return (
    <div className='flex flex-col items-center gap-5'>
        <div className='flex items-center'>
             <MapPinned
          className="shrink-0"
          size={40}
          color="#ff6a00"
        />
        <p className=" text-mist-800 text-2xl font-sans">
          NomadNodes
        </p>
        </div>
        <form className='flex flex-col w-full items-center gap-5 pr-5 pl-5' onSubmit={handleSubmit}>
            <input className='w-full  p-2 text-lg border-2 border-mist-800 rounded-2xl' name='email' type='email' placeholder='Enter Email'/>
            <input className='w-full p-2 text-lg border-2 border-mist-800 rounded-2xl' name='password' type='password' placeholder='Enter Password'/>
            {errors && <div className='text-sm font-light text-red-800'>{errors}</div>}
            <button className='text-xl bg-mist-800 p-2 w-full text-white rounded-2xl' type='submit'>Login</button>
        </form>

        <div>
            <p>Not a user?<span className='text-brand-secondary' onClick={()=>handletoggle('register')}>Register</span></p>
        </div>

    </div>
  )
}

export default Login