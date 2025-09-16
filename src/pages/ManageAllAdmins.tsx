import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Avatar, Spin, message } from 'antd';
import type { TableProps } from 'antd';
import AxiosConfig from '../Context/AxiosConfig';

interface AdminType {
  key: number;
  AdminId: number;
  Admin_Name: string;
  Admin_Email: string;
  Admin_Phone: string;
  Admin_Profile?: string;
  Admin_Password?: string;
}

const columns: TableProps<AdminType>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'AdminId',
    key: 'AdminId',
  },
  {
    title: 'Name',
    dataIndex: 'Admin_Name',
    key: 'Admin_Name',
  },
  {
    title: 'Email',
    dataIndex: 'Admin_Email',
    key: 'Admin_Email',
  },
  {
    title: 'Phone',
    dataIndex: 'Admin_Phone',
    key: 'Admin_Phone',
  },
  {
    title: 'Profile',
    dataIndex: 'Admin_Profile',
    key: 'Admin_Profile',
    render: (profile) =>
      profile ? (
        <Avatar src={profile} />
      ) : (
        <Tag color="default">No Image</Tag>
      ),
  },
  {
    title: 'Password',
    dataIndex: 'Admin_Password',
    key: 'Admin_Password',
    render: () => <Tag color="red">********</Tag>, // Always hidden
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a style={{ color: 'red' }}>Delete</a>
      </Space>
    ),
  },
];

const ManageAllAdmins: React.FC = () => {
  const [data, setData] = useState<AdminType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await AxiosConfig.get('/auth/getAllAdmins');

        if (response.status !== 200) throw new Error('Failed to fetch admins');

        // Handle both plain array and wrapped response
        const result = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];

        const formattedData = result.map((admin: AdminType, index: number) => ({
          ...admin,
          key: admin.AdminId || index,
        }));

        setData(formattedData);
      } catch (error: any) {
        console.error(error);
        message.error('Error fetching admins');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <Spin spinning={loading} tip="Loading admins...">
      <Table<AdminType>
        columns={columns}
        dataSource={data}
        rowKey="AdminId"
        pagination={{ pageSize: 5 }}
      />
    </Spin>
  );
};

export default ManageAllAdmins;
