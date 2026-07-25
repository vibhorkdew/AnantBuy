import ReactDOM from "react-dom/client";

import App from "./App";

import {
  ThemeProvider,
  createTheme
} from "@mui/material/styles";

import {
  AuthProvider
} from "./context/AuthProvider";

import "./index.css";

const darkTheme =
  createTheme({

    palette: {

      mode: "dark",

      primary: {
        main: "#f59e0b"
      },

      background: {

        default: "#020617",

        paper: "#0f172a"
      }
    },

    typography: {

      fontFamily:
        "'Poppins', sans-serif"
    }
  });

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <ThemeProvider theme={darkTheme}>

    <AuthProvider>

      <App />

    </AuthProvider>

  </ThemeProvider>

);
