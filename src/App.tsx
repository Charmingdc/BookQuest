import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import BookPreview from './pages/BookPreview';
import './App.css'

function App() {
  return (
   <BrowserRouter>
     <Routes>
       <Route path='*' element={<h1> No page here </h1>} />
       <Route path='/home' 
         element={<Home />} />
       <Route path='/book/:identifier' 
         element={<BookPreview />} />
     </Routes>
   </BrowserRouter>
  )
}

export default App
