import { useEffect, useState } from "react";

interface CartItem {

  id: string;
  name: string;
  quantity: number;
  price: number;
}

function OrderCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(cartData);
    console.log("Cart contents:", cartData);
  };

  return (
    <div>
      <h1>Order Cart Page</h1>
      <p>
        {cart && cart.length > 0
          ? `You have ${cart.length} item(s) in your cart.`
          : "Your cart is empty."}
      </p>
    </div>
  );
}

export default OrderCart;
