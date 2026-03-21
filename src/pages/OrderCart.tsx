import { Button, Modal, Input, Form, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

interface DesignDetails {
  DesignID: number;
  Design_Name: string;
  Design_Image: string[];
  Design_Description: string;
  price?: number;
}

function OrderCart() {
  const [cart, setCart] = useState<number[]>([]);
  const [cardDetails, setCardDetails] = useState<DesignDetails[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientNumber, setClientNumber] = useState("");

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      fetchCardDetails();
    }
  }, [cart]);

  const loadCart = () => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(cartData);
  };

  const fetchCardDetails = async () => {
    try {
      const ids = cart.join(",");
      const response = await axios.get(
        `https://innovista-backend-hvt3.vercel.app/designs/DesignDetails?ids=${ids}`
      );
      setCardDetails(response.data);
    } catch (error) {
      console.error("Error fetching card details:", error);
    }
  };

  const removeDesign = (id: number) => {
    const updatedCart = cart.filter((item) => item !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    setCardDetails(cardDetails.filter((item) => item.DesignID !== id));
  };

  const openOrderDialog = () => {
    if (cart.length === 0) {
      message.error("Your cart is empty!");
      return;
    }
    setIsModalOpen(true);
  };

  const createOrder = async () => {
    if (!clientName || !clientEmail || !clientNumber) {
      message.error("Please fill all client details.");
      return;
    }

    const orderPayload = {
      Order_Status: "PENDING",
      Client_Name: clientName,
      Client_Email: clientEmail,
      Client_Number: clientNumber,
      Designs: cart.map((id) => ({ DesignID: id })),
    };

    try {
      const res = await axios.post(
        "https://innovista-backend-hvt3.vercel.app/order/createOrder",
        orderPayload
      );
      console.log("Order created successfully:", res.data);
      message.success("Order successfully created!");

      localStorage.removeItem("cart");
      setCart([]);
      setCardDetails([]);
      setIsModalOpen(false);
    } catch (error) {
      message.error("Failed to create order");
      console.error("Order creation error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          textAlign: "center",
          color: "gray",
          fontFamily: "revert-layer",
          fontSize: "30px",
          margin: "20px",
        }}
      >
        Order Cart
      </h1>

      <div
        style={{
          border: "2px solid black",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {cardDetails.map((design) => (
            <div
              key={design.DesignID}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                backgroundColor: "white",
              }}
            >
              <img
                src={design.Design_Image[0]}
                alt={design.Design_Name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <h2 style={{ marginTop: "10px" }}>{design.Design_Name}</h2>
              <p style={{ color: "#666" }}>{design.Design_Description}</p>

              {design?.price && (
                <p style={{ fontWeight: "bold" }}>Price: ₹{design.price}</p>
              )}

              <button
                onClick={() => removeDesign(design.DesignID)}
                style={{
                  marginTop: "10px",
                  backgroundColor: "red",
                  color: "white",
                  padding: "10px 15px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            style={{ backgroundColor: "blueviolet", color: "white" }}
            onClick={openOrderDialog}
          >
            Order
          </Button>
        </div>
      </div>

      {/* Order Dialog */}
      <Modal
        title="Place Your Order"
        open={isModalOpen}
        onOk={createOrder}
        onCancel={() => setIsModalOpen(false)}
        okText="Submit Order"
      >
        <Form layout="vertical">
          <Form.Item label="Client Name" required>
            <Input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Enter client name"
            />
          </Form.Item>

          <Form.Item label="Client Email" required>
            <Input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="Enter client email"
            />
          </Form.Item>

          <Form.Item label="Client Number" required>
            <Input
              value={clientNumber}
              onChange={(e) => setClientNumber(e.target.value)}
              placeholder="Enter client phone number"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default OrderCart;
