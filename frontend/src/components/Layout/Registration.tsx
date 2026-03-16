import React from 'react'

type Props = {
     handletoggle:(moveTo:string)=>void
}

const Registration = ({handletoggle}: Props) => {
   const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
         const formData = new FormData(e.target)
 
     }
   return (
     <div className='flex flex-col items-center gap-5'>
         <form className='flex flex-col items-center gap-5' onSubmit={handleSubmit}>
             <input type='email' placeholder='Enter Email'/>
             <input type='password' placeholder='Enter Password'/>
             <button type='submit'>Register</button>
         </form>
 
         <div>
             <p>Not a user?<span className='text-blue-600' onClick={()=>handletoggle('login')}>Login</span></p>
         </div>
 
     </div>
   )
}

export default Registration