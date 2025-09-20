import AdminReAdminRegisterForm from "./AdminRegisterForm";
import PasswordReset from "../components/PasswordReset";
import LogoutButton from "../components/LogoutButton";
import ManageAllAdmins from "./ManageAllAdmins";
import { Link } from "react-router-dom";

function AdminHome() {
  return (
    <>
    <div>
      <Link to="/DesignAdded">Go to Design Added Page</Link> {" >"}
      
    </div>
      <h1
        style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}
      >
        Admin Home Page
      </h1>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <LogoutButton />
        <PasswordReset />
        <h2
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          Create Admin
        </h2>
        <AdminReAdminRegisterForm />
        <ManageAllAdmins />
      </div>
    </>
  );
}

export default AdminHome;
