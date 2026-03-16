import React, { useState } from 'react'
import Modal from './Modal'
import Login from './Login'
import Registration from './Registration'

type Props = {
    isOpen: boolean,
    onClose:()=>void
}

const AuthLayout = ({isOpen,onClose}: Props) => {
    const [activeTab,setActiveTab] = useState('login')
    const title = activeTab==='login'?"Login":'Register'
    const SelectedComponent = activeTab==='login'?Login:Registration
    
    const handleToggle = (moveTo:string)=>{
        setActiveTab(moveTo)
    }
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} >
        <SelectedComponent handletoggle={handleToggle}/>
    </Modal>
  )
}

export default AuthLayout