import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Sidebar from './components/Layout/Sidebar'
import Home from './views/Home'
import Header from './components/Layout/Header'

function App() {

  return (
    <BrowserRouter>
      <div className='min-w-screen md:flex bg-mist-50 ' >
        <Sidebar/>
        <Header/>
        <div className="mt-22 ml-22 md:w-full box-border overflow-y-scroll">
          <Routes>
            <Route path='/' element={<Home/>}/>
          </Routes>
        </div>
       
      </div>
    </BrowserRouter>
  )
}

export default App
