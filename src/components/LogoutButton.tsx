import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Button } from "antd";
import axios from "axios";

function LogoutButton() {
  const [userID, setUserID] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      const decodedToken: string = jwtDecode(token);
      setUserID(decodedToken.sub);
      console.log(decodedToken.sub);
    }
  }, []);

  const handleLogout = async () => {
    try {
      console.log(userID);
      await axios.post(`http://localhost:4000/auth/logout?adminId=${userID}`);
      sessionStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      alert("Logout successful");
      navigate("/admin-login", { replace: true });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      style={{
        backgroundColor: "#ff4d4f",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      LogOut
    </Button>
  );
}

export default LogoutButton;
