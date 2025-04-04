import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import Loader from "@components/helper/Loader.tsx";

// Providers
import { AuthProvider } from "@contexts/AuthContext.tsx";
import { BookIdProvider } from "@contexts/BookIdContext.tsx";

// Protected and Public Routes components
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import PublicRoute from "./routes/PublicRoute.tsx";

import "./App.css";


const routes = [
  { 
   path: "*", component: lazy(() => import("@components/helper/PageNotFound"))
   },
  { 
   path: "/", component: lazy(() => import("./pages/Landing")) 
   
  },
  { 
   path: "/signup", component: lazy(() => import("./pages/Signup"))
   },
  {
   path: "/login", component: lazy(() => import("./pages/Login"))
  },

  // Protected Routes
  {
    path: "/home", component: lazy(() => import("./pages/Home")), protected: true,
  },
  {
    path: "/book/:identifier", component: lazy(() => import("./pages/BookPreview")), protected: true,
  },
  {
    path: "/search", component: lazy(() => import("./pages/Search")), protected: true,
  },
  {
    path: "/favourite", component: lazy(() => import("./pages/Favourite")), protected: true,
  },
  {
    path: "/setting", component: lazy(() => import("./pages/Setting")), protected: true
  },
];

const queryClient = new QueryClient();

const App = () => {
  return (
   <QueryClientProvider client={queryClient}>
    <AuthProvider>
     <BookIdProvider>
       <BrowserRouter>
         <Routes>
          {routes.map(({ path, component: Component, protected: isProtected }) => (
            <Route 
             key={path} 
             path={path} 
             element={
              <Suspense fallback={<Loader />}>
              {isProtected ? (
                <ProtectedRoute>
                  <Component />
                </ProtectedRoute>
               ) : (
                <PublicRoute>
                  <Component />
                </PublicRoute>
               )}
             </Suspense>} />
           ))}
         </Routes>
       </BrowserRouter>

       <Toaster
         richColors 
         closeButton
         position="top-center"
         toastOptions={{
          duration: 3000 
       }} />
     </BookIdProvider>
    </AuthProvider>
   </QueryClientProvider>
  );
};

export default App;