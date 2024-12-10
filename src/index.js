import { createRoot } from "react-dom/client";
import App from "./App";
import React from "react";
import logo from './assets/logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { PacientsProvider } from '../src/contextos/pacientsContext';

const root = createRoot(document.querySelector("#root"));

root.render(
    <React.StrictMode>
        <div id='logo'>
            <img src={logo} alt='logomarcar' />
        </div>
        <PacientsProvider>
            <App />
        </PacientsProvider>
    </React.StrictMode>
);
