import React, { useEffect, useState } from "react";
import {
  Space,
  Table,
  Tag,
  Avatar,
  Spin,
  message,
  Popconfirm,
  Button,
} from "antd";
import type { TableProps } from "antd";
import AxiosConfig from "../../Context/AxiosConfig";
import { DeleteOutlined } from "@ant-design/icons";

interface AdminType {
  key: number;
  AdminId: number;
  Admin_Name: string;
  Admin_Email: string;
  Admin_Phone: string;
  Admin_Profile?: string;
}

const ManageAllAdmins: React.FC = () => {
  const [data, setData] = useState<AdminType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await AxiosConfig.get("/auth/getAllAdmins");

      const result = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      const formattedData = result.map((admin: AdminType, index: number) => ({
        ...admin,
        key: admin.AdminId || index,
      }));

      setData(formattedData);
    } catch {
      alert("Error fetching admins");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (adminId: number) => {
    try {
      await AxiosConfig.delete(`/auth/RemoveAdmin?adminId=${adminId}`);
      alert("Admin deleted successfully!");
      fetchAdmins();
    } catch {
      alert("Failed to delete admin");
    }
  };

  const columns: TableProps<AdminType>["columns"] = [
    {
      title: "Name",
      dataIndex: "Admin_Name",
      key: "Admin_Name",
      
    },
    {
      title: "Email",
      dataIndex: "Admin_Email",
      key: "Admin_Email",
    },
    {
      title: "Phone",
      dataIndex: "Admin_Phone",
      key: "Admin_Phone",
    },
    {
      title: "Profile",
      dataIndex: "Admin_Profile",
      key: "Admin_Profile",
      render: (profile) =>
        profile ? (
          <Avatar src={profile} />
        ) : (
          <Tag color="default">No Image</Tag>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure you want to delete this admin?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record.AdminId)}
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <Spin spinning={loading} tip="Loading admins...">
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
        Manage Admins
      </h2>
      <Table<AdminType>
        columns={columns}
        dataSource={data}
        rowKey="AdminId"
        pagination={{ pageSize: 5 }}
        style={{
          margin: "50px",
        }}
      />
    </Spin>
  );
};

export default ManageAllAdmins;
