import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Image,
  Typography,
  Spin,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Card,
  Popconfirm,
} from "antd";
import AxiosConfig from "../../../Context/AxiosConfig";

const { Title } = Typography;

type Customer = {
  CustomerId: number;
  Cus_Name: string;
  Cus_Email: string;
  Cus_PhoneNumber: string;
  Cus_CompanyName: string;
  Cus_Logo: string;
  Cus_Password: string;
  Verify_State: boolean;
  Purchase_Goods?: string[];
};

function PreviewCustomer() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await AxiosConfig.get("/customer/getAllCustomers");
        setCustomers(response.data); // API should return array of customers
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (customerId: number) => {
    try {
      await AxiosConfig.delete(
        `/customer/deleteCustomer?customerId=${customerId}`
      );
      setCustomers(customers.filter((c) => c.CustomerId !== customerId));
      alert("Customer deleted successfully");
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    form.setFieldsValue({
      ...customer,
      Purchase_Goods: customer.Purchase_Goods?.join(", ") || "",
    });
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();

      const updatedCustomer: Customer = {
        CustomerId: editingCustomer?.CustomerId ?? 0,
        Cus_Name: values.Cus_Name,
        Cus_Email: values.Cus_Email,
        Cus_PhoneNumber: values.Cus_PhoneNumber,
        Cus_CompanyName: values.Cus_CompanyName,
        Cus_Logo: values.Cus_Logo,
        Cus_Password: editingCustomer?.Cus_Password ?? "",
        Purchase_Goods: values.Purchase_Goods
          ? values.Purchase_Goods.split(",").map((item: string) => item.trim())
          : [],
        Verify_State: editingCustomer?.Verify_State ?? false,
      };

      console.log("Updating customer:", updatedCustomer);

      await AxiosConfig.put(`/customer/updateCustomer`, updatedCustomer);

      setCustomers((prev) =>
        prev.map((c) =>
          c.CustomerId === updatedCustomer.CustomerId ? updatedCustomer : c
        )
      );

      setIsModalVisible(false);
      setEditingCustomer(null);
      form.resetFields();
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  const columns = [
    {
      title: "Customer ID",
      dataIndex: "CustomerId",
      key: "CustomerId",
    },
    {
      title: "Name",
      dataIndex: "Cus_Name",
      key: "Cus_Name",
    },
    {
      title: "Email",
      dataIndex: "Cus_Email",
      key: "Cus_Email",
    },
    {
      title: "Phone",
      dataIndex: "Cus_PhoneNumber",
      key: "Cus_PhoneNumber",
    },
    {
      title: "Company",
      dataIndex: "Cus_CompanyName",
      key: "Cus_CompanyName",
    },
    {
      title: "Logo",
      dataIndex: "Cus_Logo",
      key: "Cus_Logo",
      render: (url: string) => (
        <Image
          src={url}
          alt="Company Logo"
          width={50}
          height={50}
          style={{ objectFit: "contain" }}
          preview={false}
        />
      ),
    },
    {
      title: "Purchase Goods",
      dataIndex: "Purchase_Goods",
      key: "Purchase_Goods",
      render: (goods: string[]) =>
        goods?.length ? goods.join(", ") : <Tag color="default">None</Tag>,
    },
    {
      title: "Verified",
      dataIndex: "Verify_State",
      key: "Verify_State",
      render: (verified: boolean) =>
        verified ? (
          <Tag color="green">Verified</Tag>
        ) : (
          <Tag color="red">Not Verified</Tag>
        ),
    },

    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Customer) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this customer?"
            onConfirm={() => handleDelete(record.CustomerId)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
      <Title level={3}>Customer List</Title>
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          rowKey="CustomerId"
          columns={columns}
          dataSource={customers}
          bordered
          pagination={{ pageSize: 5 }}
        />
      )}

      <Modal
        title="Edit Customer"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleUpdate}
        okText="Save Changes"
      >
        <Card bordered={false}>
          <Form form={form} layout="vertical">
            <Form.Item
              name="Cus_Name"
              label="Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="Cus_Email"
              label="Email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="Cus_PhoneNumber" label="Phone">
              <Input />
            </Form.Item>
            <Form.Item name="Cus_CompanyName" label="Company">
              <Input />
            </Form.Item>
            <Form.Item name="Cus_Logo" label="Logo URL">
              <Input />
            </Form.Item>
            <Form.Item name="Purchase_Goods" label="Purchase Goods">
              <Input placeholder="Comma separated values" />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </div>
  );
}

export default PreviewCustomer;
