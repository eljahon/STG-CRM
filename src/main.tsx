import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import { PrimeReactProvider } from "primereact/api";
import { BrowserRouter } from "react-router-dom";
import App from './App.tsx'
import './index.css'
import 'primereact/resources/themes/lara-light-teal/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PrimeReactProvider>
        <App />
        <ToastContainer />
      </PrimeReactProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
