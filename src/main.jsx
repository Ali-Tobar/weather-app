// Import React's rendering tools.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./app/store";
// Load global styles and the main app component.
import "./index.css";
import App from "./App.jsx";

// Set the font used by Material UI components.
const theme = createTheme({
  typography: {
    fontFamily: '"IBM", sans-serif',
  },
});

// Render the app inside the root element from index.html.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
