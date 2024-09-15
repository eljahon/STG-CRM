import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { PrimeReactProvider } from "primereact/api";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import App from "./App.tsx";
import { store } from "./store/store.ts";

import "primereact/resources/themes/lara-light-cyan/theme.css";

// import 'primereact/resources/themes/lara-light-teal/theme.css'; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; // flex
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./styles/main-styles.scss";
import { queryClient } from "./service/api";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PrimeReactProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <App />
            <ToastContainer />
          </QueryClientProvider>
        </Provider>
      </PrimeReactProvider>
    </BrowserRouter>
  </React.StrictMode>
);
