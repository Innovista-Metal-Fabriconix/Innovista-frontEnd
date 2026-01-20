import React, { useEffect, useState } from "react";
import { Table, Tag, Image, Select, message } from "antd";
import AxiosConfig from "../../Context/AxiosConfig";
import XlfileGenerate from "./XlfileGenerate";

export const OrderStatus = {
  PENDING: "PENDING",
  SEND: "SEND",
  VIEWORDER: "VIEWORDER",
  COMPLETED: "COMPLETED",
} as const;

type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

type Order = {
  OrderID: number;
  Order_Date: string;
  Order_Status: OrderStatus;
  Client_Name: string;
  Client_Email: string;
  Customer?: {
    Cus_CompanyName?: string;
    Cus_Logo?: string;
    Purchase_Goods?: string[];
  };
  Designs?: any[];
  // Add other fields as needed
};

function ViewAllorder() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrder, setLoadingOrder] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await AxiosConfig.get("/order/getAllOrders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: number, status: OrderStatus) => {
    try {
      setLoadingOrder(orderId);
      await AxiosConfig.put(
        `/order/ChangeStates?orderId=${orderId}&Status=${status}`
      );

      setOrders((prev) =>
        prev.map((order) =>
          order.OrderID === orderId ? { ...order, Order_Status: status } : order
        )
      );

      message.success(`Status updated to ${status}!`);
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Failed to update status.");
    } finally {
      setLoadingOrder(null);
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return "orange";
      case "SEND":
        return "blue";
      case "VIEWORDER":
        return "purple";
      case "COMPLETED":
        return "green";
      default:
        return "gray";
    }
  };

  const columns = [
    {
      title: "Order Date",
      dataIndex: "Order_Date",
      key: "Order_Date",
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Status",
      dataIndex: "Order_Status",
      key: "Order_Status",
      render: (status: OrderStatus) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: "Client Name",
      dataIndex: "Client_Name",
      key: "Client_Name",
    },
    {
      title: "Client Email",
      dataIndex: "Client_Email",
      key: "Client_Email",
    },
    {
      title: "Company Name",
      dataIndex: ["Customer", "Cus_CompanyName"],
      key: "Cus_CompanyName",
    },
    {
      title: "Company Logo",
      dataIndex: ["Customer", "Cus_Logo"],
      key: "Cus_Logo",
      render: (logo: string) => <Image src={logo} width={50} />,
    },
    {
      title: "Purchase Goods",
      dataIndex: ["Customer", "Purchase_Goods"],
      key: "Purchase_Goods",
      render: (goods: string[]) => goods?.map((g, i) => <Tag key={i}>{g}</Tag>),
    },
    {
      title: "Design Names",
      dataIndex: "Designs",
      key: "Design_Names",
      render: (designs: any[]) =>
        designs?.map((item, i) => (
          <Tag key={i} color="blue">
            {item.Design?.Design_Name}{" "}
          </Tag>
        )),
    },
    {
      title: "Design Images",
      dataIndex: "Designs",
      key: "Design_Images",
      render: (designs: any[]) =>
        designs?.flatMap((item, i) =>
          (Array.isArray(item.Design?.Design_Image)
            ? item.Design.Design_Image
            : [item.Design.Design_Image]
          ).map((img: string, index: number) => (
            <Image
              key={`${i}-${index}`}
              src={img}
              width={70}
              style={{ marginRight: 8 }}
            />
          ))
        ),
    },
    {
      title: "Update Status",
      key: "action",
      render: (_: string, record: Order) => (
        <Select
          value={record.Order_Status}
          style={{ width: 160 }}
          loading={loadingOrder === record.OrderID}
          onChange={(value) =>
            updateOrderStatus(record.OrderID, value as OrderStatus)
          }
        >
          {Object.values(OrderStatus).map((status) => (
            <Select.Option key={status} value={status}>
              {status}
            </Select.Option>
          ))}{" "}
        </Select>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2
        style={{
          marginBottom: 10,
          textAlign: "center",
          fontSize: "24px",
          padding: "10px",
        }}
      >
        📦 All Orders{" "}
      </h2>

      <XlfileGenerate orders={orders} />

      <Table
        rowKey={(r) => r.OrderID}
        columns={columns}
        dataSource={orders}
        bordered
        scroll={{ x: true }}
      />
    </div>
  );
}

export default ViewAllorder;
