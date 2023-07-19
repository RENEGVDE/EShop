import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { CartProvider } from "./context/cart.context";
import { store } from "./store/store";

import "./index.scss";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </Provider>
);

// const rootElement = document.getElementById("root");

// ReactDOM.render(
//     <React.StrictMode>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     </React.StrictMode>,
//     rootElement
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
