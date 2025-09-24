import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import Notification from "../pages/Adminpages/Notification";

function SidebarOFADmin() {
  return (
    <>
      <div style={{ color: "blue", marginTop: "10px" }}>
        <Link to="/admin-home">Go to Admin Home Page</Link> {" >"}
        <Link to="/DesignAdded">Go to Design Added Page</Link> {" >"}
        <Link to="/ViewAllDesigns">Go to View All Designs Page</Link>
        {" >"}
        <Link to="/CustomerManager">Go to Customer Manager Page</Link>
        {" >"}
        <Link to="/OrdermanageAdmin">Go to Order Manage Page</Link> {" >"}
        <Link to="/AdminFeedback">Go to Admin Feedback Page</Link>
        {" > "}
        <Notification/>
        <LogoutButton />
      </div>
    </>
  );
}

export default SidebarOFADmin;
