import React from "react";
import CreateCustomer from "./CustomerManager/CreateCustomer";
import SidebarOFADmin from "../components/SidebarOFADmin";
import PreviewCustomer from "./CustomerManager/PreviewCustomer";

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
