import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import './App.css'

function App() {
  return (
   <BrowserRouter>
     <Routes>
       <Route path='*' element={<h1> No page here </h1>} />
       <Route path='/home' element={<Home />} />
     </Routes>
   </BrowserRouter>
  )
}

export default App
