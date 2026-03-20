import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Sidebar from './components/Layout/Sidebar'
import Home from './views/Home'
import Header from './components/Layout/Header'
import ProtectedRoutes from './MiddleWare/ProtectedRoutes'
import Uploads from './views/Uploads'

function App() {

  return (
    <BrowserRouter>
      <div className='min-w-screen min-h-screen md:flex bg-mist-50 ' >
        <Sidebar/>
        <Header/>
        <div className="mt-22 ml-22 md:w-full box-border overflow-y-scroll p-3">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route element={<ProtectedRoutes/>}>
              <Route path='/uploads' element={<Uploads/>}/>
            </Route>
          </Routes>
        </div>
       
      </div>
    </BrowserRouter>
  )
}

export default App
