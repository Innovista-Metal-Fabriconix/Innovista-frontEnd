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
  OrderID: string;
  Order_Date: string;
  Order_Status: OrderStatus;
  Client_Name: string;
  Client_Email: string;
  Customer?: {
    Cus_CompanyName?: string;
    Cus_Logo?: string;
    Purchase_Goods?: string[];
  };
  Designs?: {
    Design?: {
      Design_Name?: string;
      Design_Image?: string | string[];
    };
  }[];
};

function ViewAllorder() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [loadingOrder, setLoadingOrder] = useState<string | null>(null);

  // Fetch orders with pagination
  const fetchOrders = async (page = 1, limit = 10) => {
    try {
      setLoading(true);

      const response = await AxiosConfig.get("/order/getAllOrders", {
        params: { page, limit },
      });

      // Expected response:
      // { data: Order[], total: number, page: number, limit: number }

      setOrders(response.data.data);
      setTotal(response.data.total);
      setCurrentPage(response.data.page);
      setPageSize(response.data.limit);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage, pageSize);
  }, []);

  // Update order status
  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      setLoadingOrder(orderId);
      await AxiosConfig.put(`/order/ChangeStates?orderId=${orderId}&Status=${status}`);
      message.success(`Status updated to ${status}!`);
      // Refetch current page after update (industry standard)
      fetchOrders(currentPage, pageSize);
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
      render: (logo: string) => (logo ? <Image src={logo} width={50} /> : "-"),
    },
    {
      title: "Purchase Goods",
      dataIndex: ["Customer", "Purchase_Goods"],
      key: "Purchase_Goods",
      render: (goods: string[]) =>
        goods?.length ? (
          goods.map((g, i) => <Tag key={i}>{g}</Tag>)
        ) : (
          <Tag color="default">None</Tag>
        ),
    },
    {
      title: "Design Names",
      dataIndex: "Designs",
      key: "Design_Names",
      render: (designs: Order["Designs"]) =>
        designs?.map((item, i) => (
          <Tag key={i} color="blue">
            {item.Design?.Design_Name}
          </Tag>
        )),
    },
    {
      title: "Design Images",
      dataIndex: "Designs",
      key: "Design_Images",
      render: (designs: Order["Designs"]) =>
        designs?.flatMap((item, i) =>
          (item.Design
            ? Array.isArray(item.Design.Design_Image)
              ? item.Design.Design_Image
              : [item.Design.Design_Image]
            : []
          )
            .filter((img): img is string => typeof img === "string" && !!img)
            .map((img, index) => (
              <Image
                key={`${i}-${index}`}
                src={img}
                width={70}
                style={{ marginRight: 8 }}
              />
            )),
        ),
    },
    {
      title: "Update Status",
      key: "action",
      render: (_: unknown, record: Order) => (
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
          ))}
        </Select>
      ),
    },
  ];

  return (
    <div style={{ padding: 20, marginTop: "20px" }}>
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
        All Orders
      </h2>

      <XlfileGenerate orders={orders} />

      <Table
        rowKey={(r) => r.OrderID}
        columns={columns}
        dataSource={orders}
        loading={loading}
        bordered
        scroll={{ x: true }}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          onChange: (page, limit) => {
            fetchOrders(page, limit);
          },
        }}
      />
    </div>
  );
}

export default ViewAllorder;
