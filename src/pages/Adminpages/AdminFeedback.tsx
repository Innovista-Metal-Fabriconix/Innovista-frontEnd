import { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Tag, Image } from "antd";
import axios from "axios";
import AxiosConfig from "../../Context/AxiosConfig";
import SidebarOFADmin from "../../components/SidebarOFADmin";

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all feedbacks
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:4000/feedback/allFeedbacks"
      );
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      message.error("Failed to load feedbacks");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await AxiosConfig.delete(`/feedback/deleteFeedback?feedbackId=${id}`);
      message.success("Feedback deleted successfully");
      fetchFeedbacks();
    } catch (error) {
      console.error("Error deleting feedback:", error);
      message.error("Failed to delete feedback");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Define table columns
  const columns = [
    {
      title: "Customer Name",
      dataIndex: ["Customer", "Cus_Name"],
      key: "Cus_Name",
    },
    {
      title: "Company",
      dataIndex: ["Customer", "Cus_CompanyName"],
      key: "Cus_CompanyName",
    },
    {
      title: "Rating",
      dataIndex: "Rating",
      key: "Rating",
      render: (rating: number) => (
        <Tag color={rating >= 4 ? "green" : "red"}>{rating} ⭐</Tag>
      ),
    },
    {
      title: "Comment",
      dataIndex: "Feed_back_comment",
      key: "Feed_back_comment",
    },
    {
      title: "Feedback Images",
      dataIndex: "Feed_Back_Images",
      key: "Feed_Back_Images",
      render: (images: string[]) =>
        images?.map((img, index) => (
          <Image
            key={index}
            src={img}
            width={60}
            height={60}
            style={{ marginRight: 8, objectFit: "cover" }}
          />
        )),
    },
    {
      title: "Design Name",
      dataIndex: ["Design", "Design_Name"],
      key: "Design_Name",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Popconfirm
          title="Are you sure to delete this feedback?"
          onConfirm={() => handleDelete(record.Feed_backId)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <SidebarOFADmin />
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>
        Admin Feedback Page
      </h2>
      <Table
        rowKey="Feed_backId"
        dataSource={feedbacks}
        columns={columns}
        loading={loading}
        bordered
      />
    </div>
  );
}

export default AdminFeedback;
