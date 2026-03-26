import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function CustomerVerify() {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your account...");

  const queryParams = new URLSearchParams(location.search);
  const customerId = queryParams.get("customerId");

  useEffect(() => {
    if (!customerId) {
      setMessage("Invalid verification link.");
      return;
    }

    axios
      .post(`https://innovista-backend-hvt3.vercel.app/customer/verifyCustomer?customerId=${customerId}`)
      .then((res) => {
        if (res.data && res.data.message === "Email verified successfully") {
          setMessage("✅ You verified your account successfully!");
          setTimeout(() => navigate("/"), 2000);
        } else {
          setMessage("❌ Verification failed. Please try again.");
        }
        console.log("Verified Customer ID:", customerId);
      })
      .catch((error) => {
        console.error(error);
        setMessage("❌ Server error. Please try again later.");
      });
  }, [customerId, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-white rounded-2xl shadow-md text-center">
        <h1 className="text-xl font-semibold">{message}</h1>
      </div>
    </div>
  );
}

export default CustomerVerify;
