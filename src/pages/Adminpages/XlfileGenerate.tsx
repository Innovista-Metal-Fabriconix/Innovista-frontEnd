import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface Design {
  Design_Name?: string;
  Design_Image?: string | string[];
}

interface DesignItem {
  Design?: Design;
}

interface Customer {
  Cus_CompanyName?: string;
  Cus_Logo?: string;
  Purchase_Goods?: string[];
}

interface Order {
  OrderID: string;
  Order_Date: string;
  Order_Status: string;
  Client_Name: string;
  Client_Email: string;
  Customer?: Customer;
  Designs?: DesignItem[];
}

interface XlfileGenerateProps {
  orders: Order[];
}

export default function XlfileGenerate({ orders }: XlfileGenerateProps) {
  const downloadExcel = () => {
    if (!orders || orders.length === 0) return;

    const excelData = orders.flatMap((order: Order) =>
      order.Designs?.map((designItem: DesignItem) => ({
        OrderID: order.OrderID,
        OrderDate: new Date(order.Order_Date).toLocaleString(),
        OrderStatus: order.Order_Status,
        ClientName: order.Client_Name,
        ClientEmail: order.Client_Email,
        CompanyName: order.Customer?.Cus_CompanyName || "",
        CompanyLogo: order.Customer?.Cus_Logo || "",
        PurchaseGoods: order.Customer?.Purchase_Goods?.join(", ") || "",
        DesignName: designItem.Design?.Design_Name || "",
        DesignImages: Array.isArray(designItem.Design?.Design_Image)
          ? designItem.Design.Design_Image.join(", ")
          : designItem.Design?.Design_Image || "",
      }))
    );


    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    const excelBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, `AllOrders_${new Date().toISOString()}.xlsx`);
  };

  return (
    <button
      onClick={downloadExcel}
      style={{
        padding: "10px 15px",
        background: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        marginBottom: "15px",
        fontSize: "16px",
      }}
    >
      📥 Download Excel{" "}
    </button>
  );
}
