import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from "react-helmet-async";
import React from 'react';
import { SearchProvider } from './context/searchContext.jsx';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <SearchProvider>
        <App />
        </SearchProvider>
    </BrowserRouter>
  </StrictMode>
)
