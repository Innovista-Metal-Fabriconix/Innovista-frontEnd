import React, { useEffect, useState } from "react";
import { Badge, Modal, List, Button } from "antd";
import { BellOutlined } from "@ant-design/icons";
import AxiosConfig from "../../Context/AxiosConfig";

// Define Notification type
interface NotificationItem {
  id: string;
  Notifications_Title: string;
  Notifications_Body: string;
  Date_Timestamp?: string; // ISO string from backend
  isRead: boolean;
  [key: string]: any;
}

function Notification() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Fetch notifications
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await AxiosConfig.get("/Notification/getalerts", {
        withCredentials: true, // if cookie auth
      });
      setNotifications(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Open modal
  const openModal = () => {
    fetchNotifications();
    setVisible(true);
  };

  // Mark as read
  const handleView = async (id: string): Promise<void> => {
    try {
      await AxiosConfig.post(`/Notification/markAsRead?NotificationsID=${id}`);
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    
      <div
        onClick={openModal}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "12px",
          border: "1px solid #f0f0f0",
          borderRadius: "8px",
          width: "60px",
          height: "60px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
        }}
      >
        <Badge
          count={notifications.filter((n) => !n.isRead).length || 0}
          overflowCount={99} // handles big numbers like 100+
          size="small"
        >
          <BellOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
        </Badge>
      </div>

      {/* Modal */}
      <Modal
        title="Notifications"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <List
          loading={loading}
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  onClick={() => handleView(item.NotificationsID)}
                  disabled={item.isRead}
                >
                  {item.isRead ? "Viewed" : "View"}
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={item.Notifications_Title}
                description={
                  <>
                    <div>{item.Notifications_Body}</div>
                    {item.Date_Timestamp && (
                      <div style={{ fontSize: "12px", color: "gray" }}>
                        {new Date(item.Date_Timestamp).toLocaleString()}
                      </div>
                    )}
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
}

export default Notification;
