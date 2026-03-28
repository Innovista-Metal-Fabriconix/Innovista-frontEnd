import {
  Button,
  Modal,
  Input,
  Form,
  message,
  Card,
  Row,
  Col,
  Typography,
  Empty,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;

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
  const [form] = Form.useForm();

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      fetchCardDetails();
    } else {
      setCardDetails([]);
    }
  }, [cart]);

  const loadCart = () => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(cartData);
  };

  const fetchCardDetails = async () => {
    try {
      const ids = cart.join(",");
      const { data } = await axios.get(
        `https://innovista-backend-hvt3.vercel.app/designs/DesignDetails?ids=${ids}`
      );
      setCardDetails(data);
    } catch (error) {
      message.error("Failed to load cart items");
    }
  };

  const removeDesign = (id: number) => {
    const updatedCart = cart.filter((item) => item !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    message.success("Item removed from cart");
  };

  const openOrderDialog = () => {
    if (!cart.length) {
      message.warning("Your cart is empty!");
      return;
    }
    setIsModalOpen(true);
  };

  const createOrder = async (values: any) => {
    const payload = {
      Order_Status: "PENDING",
      Client_Name: values.name,
      Client_Email: values.email,
      Client_Number: values.phone,
      Designs: cart.map((id) => ({ DesignID: id })),
    };

    try {
      await axios.post(
        "https://innovista-backend-hvt3.vercel.app/order/createOrder",
        payload
      );

      message.success("Order placed successfully!");
      localStorage.removeItem("cart");
      setCart([]);
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to create order");
    }
  };

  return (
    <div style={{ padding: "24px" , margin:"30px 0" }}>
      <Title level={2} style={{ textAlign: "center", color: "#555" , marginBottom:"30px" }}>
        Order Cart
      </Title>

      {cardDetails.length === 0 ? (
        <Empty description="No items in your cart" />
      ) : (
        <Row gutter={[16, 16]}>
          {cardDetails.map((design) => (
            <Col xs={24} sm={12} md={8} lg={6} key={design.DesignID}>
              <Card
                hoverable
                cover={
                  <img
                    src={design.Design_Image[0]}
                    alt={design.Design_Name}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                }
              >
                <Title level={5}>{design.Design_Name}</Title>
                <Text type="secondary">
                  {design.Design_Description}
                </Text>

                {design.price && (
                  <div style={{ marginTop: 10 }}>
                    <Text strong>Price: ₹{design.price}</Text>
                  </div>
                )}

                <Button
                  danger
                  block
                  style={{ marginTop: 12 }}
                  onClick={() => removeDesign(design.DesignID)}
                >
                  Remove
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <div style={{ textAlign: "center", marginTop: 30 ,marginBottom:"30px" }}>
        <Button type="primary" size="large" onClick={openOrderDialog}>
          Place Order
        </Button>
      </div>

      {/* Order Modal */}
      <Modal
        title="Place Your Order"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={createOrder}>
          <Form.Item
            label="Client Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter client name" />
          </Form.Item>

          <Form.Item
            label="Client Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="Enter client email" />
          </Form.Item>

          <Form.Item
            label="Client Number"
            name="phone"
            rules={[{ required: true, message: "Enter phone number" }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit Order
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default OrderCart;