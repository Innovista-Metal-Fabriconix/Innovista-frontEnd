import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Image,
  Typography,
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
  const [loading, setLoading] = useState<boolean>(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  // Fetch customers with pagination
  const fetchCustomers = async (page = 1, limit = 10) => {
    try {
      setLoading(true);

      const response = await AxiosConfig.get("/customer/getAllCustomers", {
        params: { page, limit },
      });

      // Expected response:
      // { data: Customer[], total: number, page: number, limit: number }

      setCustomers(response.data.data);
      setTotal(response.data.total);
      setCurrentPage(response.data.page);
      setPageSize(response.data.limit);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(currentPage, pageSize);
  }, []);

  // Delete customer
  const handleDelete = async (customerId: number) => {
    try {
      await AxiosConfig.delete("/customer/deleteCustomer", {
        params: { customerId },
      });

      // Refetch current page after delete
      fetchCustomers(currentPage, pageSize);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  // Edit customer
  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);

    form.setFieldsValue({
      ...customer,
      Purchase_Goods: customer.Purchase_Goods?.join(", ") || "",
    });

    setIsModalVisible(true);
  };

  // Update customer
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
        Verify_State: editingCustomer?.Verify_State ?? false,
        Purchase_Goods: values.Purchase_Goods
          ? values.Purchase_Goods.split(",").map((item: string) => item.trim())
          : [],
      };

      await AxiosConfig.put("/customer/updateCustomer", updatedCustomer);

      setIsModalVisible(false);
      setEditingCustomer(null);
      form.resetFields();

      // Refetch current page after update
      fetchCustomers(currentPage, pageSize);
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
      render: (_: unknown, record: Customer) => (
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

      <Table
        rowKey="CustomerId"
        columns={columns}
        dataSource={customers}
        loading={loading}
        bordered
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          onChange: (page, limit) => {
            fetchCustomers(page, limit);
          },
        }}
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Customer"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingCustomer(null);
          form.resetFields();
        }}
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
