import { MapPinned } from 'lucide-react'
import React from 'react'

type Props = {
    handletoggle:(moveTo:string)=>void
}

const Login = ({handletoggle}: Props) => {
    const handleSubmit=(e:React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')

        if (!email || !password) {
            return
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
        <form className='flex flex-col items-center gap-5' onSubmit={handleSubmit}>
            <input className='p-3 text-xl border-2 border-mist-800 rounded-2xl' name='email' type='email' placeholder='Enter Email'/>
            <input className='p-3 text-xl border-2 border-mist-800 rounded-2xl' name='password' type='password' placeholder='Enter Password'/>
            <button className='text-xl bg-mist-800 p-3 text-white rounded-2xl' type='submit'>Login</button>
        </form>

        <div>
            <p>Not a user?<span className='text-brand-secondary' onClick={()=>handletoggle('register')}>Register</span></p>
        </div>

    </div>
  )
}

export default Login