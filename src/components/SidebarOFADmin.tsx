import React from "react";
import { Link } from "react-router-dom";

function SidebarOFADmin() {
  return (
    <>
      <div style={{ color: "blue", marginTop: "10px" }}>
        <Link to="/admin-home">Go to Admin Home Page</Link> {" >"}
        <Link to="/DesignAdded">Go to Design Added Page</Link> {" >"}
        <Link to="/ViewAllDesigns">Go to View All Designs Page</Link>
        {" >"}
        <Link to="/CustomerManager">Go to Customer Manager Page</Link>
      </div>
    </>
  );
}

export default SidebarOFADmin;
