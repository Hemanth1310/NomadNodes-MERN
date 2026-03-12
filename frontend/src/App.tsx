import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Sidebar from './components/Layout/Sidebar'
import Home from './views/Home'

function App() {

  return (
    <BrowserRouter>
      <div className='min-w-screen min-h-screen md:flex bg-gray-100 ' >
        <Sidebar/>
        <div className="mt-24 md:mt-0 md:ml-24 md:w-full h-full">
          <Routes>
            <Route path='/' element={<Home/>}/>
          </Routes>
        </div>
       
      </div>
    </BrowserRouter>
  )
}

export default App
