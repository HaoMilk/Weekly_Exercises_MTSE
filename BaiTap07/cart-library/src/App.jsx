import React from "react";
import { Button, useCart } from "../src"; 
import "./App.css";

function App() {
  const { cart, addItem, removeItem } = useCart();

  return (
    <div className="app">
      <h1>Giỏ hàng demo</h1>

      <div className="cart-actions">
        <Button onClick={() => addItem({ id: Date.now(), name: "Sản phẩm mới" })}>
          ➕ Thêm sản phẩm
        </Button>
      </div>

      {cart.length === 0 ? (
        <div className="cart-empty">Giỏ hàng trống</div>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name}</span>
              <Button onClick={() => removeItem(item.id)}>❌ Xóa</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
