import React, { useEffect, useState } from "react";
import { Table, Tag, Image, Select, message, Button } from "antd";
import AxiosConfig from "../../Context/AxiosConfig";

export const OrderStatus = {
  PENDING: "PENDING",
  SEND: "SEND",
  VIEWORDER: "VIEWORDER",
  COMPLETED: "COMPLETED",
} as const;
type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

function ViewAllorder() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<Record<number, OrderStatus>>({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await AxiosConfig.get("/order/getAllOrders");
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleSelectChange = (orderId: number, status: OrderStatus) => {
    setSelectedStatuses((prev) => ({ ...prev, [orderId]: status }));
  };

  const handleSubmitStatus = async (orderId: number) => {
    const status = selectedStatuses[orderId];
    if (!status) {
      message.warning("Please select a status before submitting.");
      return;
    }

    try {
      await AxiosConfig.put(`/order/ChangeStates?orderId=${orderId}&Status=${status}`);
      message.success("Order status updated!");
      setOrders((prev) =>
        prev.map((order) =>
          order.OrderID === orderId ? { ...order, Order_Status: status } : order
        )
      );
      setSelectedStatuses((prev) => {
        const copy = { ...prev };
        delete copy[orderId];
        return copy;
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      message.error("Failed to update order status.");
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
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: "Status",
      dataIndex: "Order_Status",
      key: "Order_Status",
      render: (status: OrderStatus) => <Tag color={getStatusColor(status)}>{status}</Tag>,
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
      render: (logo: string) => <Image src={logo} alt="logo" width={50} />,
    },
    {
      title: "Purchase Goods",
      dataIndex: ["Customer", "Purchase_Goods"],
      key: "Purchase_Goods",
      render: (goods: string[]) => goods?.map((g, i) => <Tag key={i}>{g}</Tag>),
    },
    {
      title: "Design Name",
      dataIndex: ["Designs", 0, "Design", "Design_Name"],
      key: "Design_Name",
    },
    {
      title: "Design Image",
      dataIndex: ["Designs", 0, "Design", "Design_Image"],
      key: "Design_Image",
      render: (images: string[]) =>
        images?.map((src, i) => <Image key={i} src={src} alt="design" width={70} />),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Select
            value={selectedStatuses[record.OrderID] ?? record.Order_Status}
            style={{ width: 150 }}
            onChange={(value) => handleSelectChange(record.OrderID, value as OrderStatus)}
          >
            {Object.values(OrderStatus).map((status) => (
              <Select.Option key={status} value={status}>
                {status}
              </Select.Option>
            ))}
          </Select>
          <Button type="primary" onClick={() => handleSubmitStatus(record.OrderID)}>
            Submit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>All Orders</h2>
      <Table
        rowKey={(record) => record.OrderID}
        columns={columns}
        dataSource={orders}
        bordered
        scroll={{ x: true }}
      />
    </div>
  );
}

export default ViewAllorder;
