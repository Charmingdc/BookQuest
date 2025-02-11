import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BookIdProvider } from '@contexts/BookIdContext.tsx';
import Home from "./pages/Home";
import Preview from "./pages/BookPreview";
import "./App.css";


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
     <BookIdProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<h1>No page here</h1>} />
          <Route path="/home" element={<Home />} />
          <Route path="/book/:identifier" element={<Preview />} />
        </Routes>
      </BrowserRouter>
     </BookIdProvider>
    </QueryClientProvider>
  );
}

export default App;