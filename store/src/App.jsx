import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import ProductForm from "./Pages/ProductForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home />
    ),
    errorElement: <div>Error</div>,
  },
  {
    path: "/cart",
    element: (
      <Cart />
    ),
    errorElement: <div>Error</div>,
  },
  {
    path: "/add-products",
    element: (
      <ProductForm />
    ),
    errorElement: <div>Error</div>,
  },
])

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider
      // @ts-ignore
      value={colorMode}
    >
      <ThemeProvider
        // @ts-ignore
        theme={theme}
      >
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App;
