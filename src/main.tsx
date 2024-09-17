import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { PrimeReactProvider } from "primereact/api";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import App from "./App.tsx";
import { store } from "./store/store.ts";

// import "primereact/resources/themes/lara-light-cyan/theme.css";

// import 'primereact/resources/themes/lara-dark-amber/theme.css'; //theme
import 'primereact/resources/themes/lara-light-green/theme.css'; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex
import "react-toastify/dist/ReactToastify.css";
import './index.css'
import 'primereact/resources/primereact.css';
import '../styles/demo/Demos.scss';
import { queryClient } from "./service/api";
import { Provider } from "react-redux";
import {LayoutProvider} from "./layout/context/layoutcontext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PrimeReactProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
           <LayoutProvider>
             { <App />}
           </LayoutProvider>
            <ToastContainer />
          </QueryClientProvider>
        </Provider>
      </PrimeReactProvider>
    </BrowserRouter>
  </React.StrictMode>
);
