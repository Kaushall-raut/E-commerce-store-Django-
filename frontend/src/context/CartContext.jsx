import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existing = cartItem.find((item) => item.id === product.id);
    if (existing) {
      setCartItems(
        cartItem.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCartItems([...cartItem, { ...product, quantity: 1 }]);
    }
  };

  const removeItemFromCart = (id) => {
    setCartItems(cartItem.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems(
      cartItem.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  return (
    <CartContext.Provider
      value={{ addToCart, removeItemFromCart, updateQuantity ,cartItem}}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-hooks/rules-of-hooks, react-refresh/only-export-components
export const userCart = () => useContext(CartContext);
