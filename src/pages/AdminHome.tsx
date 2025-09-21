import AdminReAdminRegisterForm from "./AdminRegisterForm";
import PasswordReset from "../components/PasswordReset";
import LogoutButton from "../components/LogoutButton";
import ManageAllAdmins from "./ManageAllAdmins";
import SidebarOFADmin from "../components/SidebarOFADmin";

function AdminHome() {
  return (
    <>
      <SidebarOFADmin />
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
