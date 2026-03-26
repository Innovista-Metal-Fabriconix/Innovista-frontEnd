import { Link } from "react-router-dom";
import {
  HomeOutlined,
  PlusCircleOutlined,
  EyeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  MessageOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import LogoutButton from "./LogoutButton";
import Notification from "../pages/Adminpages/Notification";

function SidebarOFADmin() {
  return (
    <>
      <div
        style={{
          color: "#1f1f1f",
          display: "flex",
          justifyContent: "space-between", // LEFT items & RIGHT items split
          alignItems: "center",
          padding: "12px 20px",
          background: "#f0f2f5",
          borderRadius: "8px",
          marginTop: "15px",
          fontSize: "15px",
          fontWeight: 500,
          flexWrap: "wrap",
        }}
      >
        {/* LEFT SIDE LINKS */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/admin-home"
            style={{ display: "flex", alignItems: "center", gap: 5 }}
          >
            <HomeOutlined /> Admin Home
          </Link>

          <span style={{ color: "#999" }}>{">"}</span>

          <Link
            to="/DesignAdded"
            style={{ display: "flex", alignItems: "center", gap: 5 }}
          >
            <PlusCircleOutlined /> Add Design
          </Link>

          <span style={{ color: "#999" }}>{">"}</span>

          <Link
            to="/ViewAllDesigns"
            style={{ display: "flex", alignItems: "center", gap: 5 }}
          >
            <EyeOutlined /> View Designs
          </Link>

          <span style={{ color: "#999" }}>{">"}</span>

          <Link
            to="/CustomerManager"
            style={{ display: "flex", alignItems: "center", gap: 5 }}
          >
            <UserOutlined /> Customer Manager
          </Link>

          <span style={{ color: "#999" }}>{">"}</span>

          <Link
            to="/OrdermanageAdmin"
            style={{ display: "flex", alignItems: "center", gap: 5 }}
          >
            <ShoppingCartOutlined /> Orders
          </Link>

          <span style={{ color: "#999" }}>{">"}</span>

          <Link
            to="/AdminFeedback"
            style={{ display: "flex", alignItems: "center", gap: 5 }}
          >
            <MessageOutlined /> Feedback
          </Link>

          <span style={{ color: "#999" }}>{">"}</span>

          <Link
            to="/AddProjects"
            style={{ display: "flex", alignItems: "center", gap: 5 }}
          >
            <AppstoreAddOutlined /> Add Projects
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <Notification />

          <LogoutButton />
        </div>
      </div>
    </>
  );
}

export default SidebarOFADmin;
