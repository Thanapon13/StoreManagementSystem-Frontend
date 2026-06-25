import Router from "@/router/Router";
import ThemeContextProvider from "@/contexts/ThemeContext";
import AuthContextProvider from "@/contexts/AuthContext";
import CartContextProvider from "@/contexts/CartContext";

function App() {
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <CartContextProvider>
          <Router />
        </CartContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
