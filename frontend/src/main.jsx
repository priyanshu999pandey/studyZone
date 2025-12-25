import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import AppContextProvider from "./context/AppContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <AppContextProvider>
        <div className="daral">
          <App />
        </div>
      </AppContextProvider>
    </Provider>
    <Toaster position="top-right" reverseOrder={false} />
  </BrowserRouter>
);
