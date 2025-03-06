import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./Redux/store"; 
import { Provider } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>

      <Provider store={store}>
        <App />
      </Provider>,
  </React.StrictMode>
);

reportWebVitals();

