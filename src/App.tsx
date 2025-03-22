import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BookIdProvider } from '@contexts/BookIdContext.tsx';


import Loader from '@components/helper/Loader.tsx';
const PageNotFound = lazy(() => import('@components/helper/PageNotFound'));
const Landing = lazy(() => import('./pages/Landing'));
const Signup = lazy(() => import('./pages/Signup'));
const Home = lazy(() => import('./pages/Home'));
const Preview = lazy(() => import('./pages/BookPreview'));
const Search = lazy(() => import('./pages/Search'));
const Favourite = lazy(() => import('./pages/Favourite'));


import "./App.css";
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
     <BookIdProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={
           <Suspense fallback={<Loader />}>
             <PageNotFound />
           </Suspense>
          } />
          
          <Route path="/" element={
           <Suspense fallback={<Loader />}>
             <Landing />
           </Suspense>
          } />
          
          <Route path="/signup" element={
           <Suspense fallback={<Loader />}>
             <Signup />
           </Suspense>
          } />
          
          <Route path="/home" element={
           <Suspense fallback={<Loader/>}>
             <Home />
           </Suspense>
          } />
          
          <Route path="/book/:identifier" element={
           <Suspense fallback={<Loader/>}>
             <Preview />
           </Suspense>
          } />
          
          <Route path="/search" element={
           <Suspense fallback={<Loader />}>
            <Search />
           </Suspense>
          } />
          
          <Route path="/favourite" element={
           <Suspense fallback={<Loader />}>
            <Favourite />
           </Suspense>
          } />
        </Routes>
      </BrowserRouter>
     </BookIdProvider>
    </QueryClientProvider>
  );
}

export default App;