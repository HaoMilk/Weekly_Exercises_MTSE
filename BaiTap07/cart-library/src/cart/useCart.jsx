import { useState } from "react";

export default function useCart() {
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const updateItem = (id, newItem) => {
    setCart((prev) => prev.map((i) => (i.id === id ? newItem : i)));
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  return { cart, addItem, updateItem, removeItem };
}
