import { createContext, useContext, useEffect, useState } from "react";
// import { getCart } from "../api/axios";

const CartContext = createContext();
const Base_Url = import.meta.env.VITE_BACKEND_URL;

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchCart = async () => {
    const response = await fetch(`${Base_Url}/api/cart`);
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data =await response.json();
    setCartItems(data.items || []);
    setTotal(data.total || 0);
    console.log("data",data)
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCart();
  }, []);

  const addToCart = async (product) => {
    try {
      await fetch(`${Base_Url}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: product }),
      });
      console.log(product)
      fetchCart();
    } catch (error) {
      console.error("error while adding items", error);
    }
  };

  const removeItemFromCart = async (id) => {
    try {
      await fetch(`${Base_Url}/api/cart/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item_id: id }),
      });
      fetchCart();
    } catch (error) {
      console.error("Error while removing", error);
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) {
      await removeItemFromCart(id);
      return;
    }

    try {
      await fetch(`${Base_Url}/api/cart/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item_id: id, quantity }),
      });
      fetchCart();
    } catch (error) {
      console.error("error while updating cart", error);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setTotal(0);
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeItemFromCart,
        updateQuantity,
        cartItem,
        total,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-hooks/rules-of-hooks, react-refresh/only-export-components
export const userCart = () => useContext(CartContext);
