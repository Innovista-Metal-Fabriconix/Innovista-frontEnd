import { useState } from "react";
import { Button, Modal, Card } from "antd";

import AdminReAdminRegisterForm from "../AdminRegisterForm";
import PasswordReset from "../../components/PasswordReset";
import ManageAllAdmins from "./ManageAllAdmins";
import SidebarOFADmin from "../../components/SidebarOFADmin";

function AdminHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openResetModal = () => setIsModalOpen(true);
  const closeResetModal = () => setIsModalOpen(false);

  return (
    <>
      <SidebarOFADmin />

      {/* Top Header + Reset Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
          paddingRight: "25px",
        }}
      >
        <Button
          type="primary"
          onClick={openResetModal}
          style={{
            padding: "10px 28px",
            fontSize: "15px",
            borderRadius: "8px",
            background: "#1677ff",
          }}
        >
          Reset Password
        </Button>
      </div>

      {/* Popup Modal */}
      <Modal
        title="Reset Your Password"
        open={isModalOpen}
        onCancel={closeResetModal}
        footer={null}
        centered
      >
        <PasswordReset />
      </Modal>
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
        Create Admin
      </h2>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <Card
          style={{
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            marginBottom: "40px",
            border: "1px solid #e2e2e2",
            background: "#ffffff",
          }}
        >
          <AdminReAdminRegisterForm />
        </Card>
      </div>
      <ManageAllAdmins />
    </>
  );
}

export default AdminHome;
