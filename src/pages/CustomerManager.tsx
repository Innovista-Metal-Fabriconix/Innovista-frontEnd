import React from "react";
import CreateCustomer from "../components/CustomerManager/CreateCustomer";
import SidebarOFADmin from "../components/SidebarOFADmin";

function CustomerManager() {
  return (
    <>
      <SidebarOFADmin />
      <CreateCustomer />
    </>
  );
}

export default CustomerManager;
