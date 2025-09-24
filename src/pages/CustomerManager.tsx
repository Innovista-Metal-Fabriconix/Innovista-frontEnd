import React from "react";
import CreateCustomer from "./Adminpages/CustomerManager/CreateCustomer";
import SidebarOFADmin from "../components/SidebarOFADmin";
import PreviewCustomer from "./Adminpages/CustomerManager/PreviewCustomer";

function CustomerManager() {
  return (
    <>
      <SidebarOFADmin />
      <CreateCustomer />
      <PreviewCustomer />
    </>
  );
}

export default CustomerManager;
