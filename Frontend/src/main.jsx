import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from "react-helmet-async";
import React from 'react';
import { SearchProvider } from './context/searchContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <SearchProvider>
        <App />
        </SearchProvider>
    </BrowserRouter>
  </StrictMode>
)
