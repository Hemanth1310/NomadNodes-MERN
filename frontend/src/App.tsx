import './App.css'
import { BrowserRouter } from 'react-router'
import Sidebar from './components/Layout/Sidebar'

function App() {

  return (
    <BrowserRouter>
      <div className='min-w-screen min-h-screen flex bg-gray-100'>
        <Sidebar/>
      </div>
    </BrowserRouter>
  )
}

export default App
