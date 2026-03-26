import { Form, Input, Button, message, Select } from "antd";
import AxiosConfig from "../../../Context/AxiosConfig";

function CreateCustomer() {
  const [form] = Form.useForm();

  interface CustomerFormValues {
    name: string;
    email: string;
    phone: string;
    company: string;
    logo: string;
    password: string;
    goods: string[];
  }

  interface CustomerData {
    CustomerId: number;
    Cus_Name: string;
    Cus_Email: string;
    Cus_PhoneNumber: string;
    Cus_CompanyName: string;
    Cus_Logo: string;
    Cus_Password: string;
    Purchase_Goods: string[];
  }

  const onFinish = async (values: CustomerFormValues): Promise<void> => {
    try {
      const customerData: CustomerData = {
        CustomerId: 1,
        Cus_Name: values.name,
        Cus_Email: values.email,
        Cus_PhoneNumber: values.phone,
        Cus_CompanyName: values.company,
        Cus_Logo: values.logo,
        Cus_Password: values.password,
        Purchase_Goods: values.goods,
      };

      const res = await AxiosConfig.post(
        "/customer/Customer_register",
        customerData
      );

      if (
        res.data && res.data.message ===
        "Customer registered successfully. Check your email for verification."
      ) {
        message.success("Customer registered successfully!");
        form.resetFields();
      } else {
        message.error("Failed to register customer");
      }
    } catch  {
      message.error("An error occurred while registering the customer");
    }
  };


    

  return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: 20, border: "solid gray 1px" , marginTop:"60px" }}>
      <h2
        style={{
          textAlign: "center",
          marginTop: "30px",
          marginBottom: "25px",
          fontSize: "28px",
          fontWeight: "600",
          letterSpacing: "0.5px",
          fontFamily: "revert-layer",
        }}
      >
        Register Customer
      </h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter customer name" }]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please enter valid email",
            },
          ]}
        >
          <Input placeholder="example@email.com" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <Input placeholder="+1-555-123-4567" />
        </Form.Item>

        <Form.Item
          label="Company Name"
          name="company"
          rules={[{ required: true, message: "Please enter company name" }]}
        >
          <Input placeholder="Innovista Ltd." />
        </Form.Item>

        <Form.Item
          label="Logo URL"
          name="logo"
          rules={[{ required: true, message: "Please provide logo URL" }]}
        >
          <Input placeholder="https://example.com/logo.png" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter password" }]}
        >
          <Input.Password placeholder="Enter secure password" />
        </Form.Item>

        <Form.Item
          label="Purchased Goods"
          name="goods"
          rules={[{ required: true, message: "Please select purchased goods" }]}
        >
          <Select mode="tags" placeholder="Select or add goods">
            <Select.Option value="Office Furniture">
              Office Furniture
            </Select.Option>
            <Select.Option value="Electronics">Electronics</Select.Option>
            <Select.Option value="Software">Software</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register Customer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateCustomer;
