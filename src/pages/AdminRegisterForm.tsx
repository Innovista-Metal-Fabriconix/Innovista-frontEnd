import React, { useState } from "react";
import { Button, Form, Input, Upload, message, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import AxiosConfig from "../Context/AxiosConfig";

const AdminRegisterForm: React.FC = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const uploadImageToCloudinary = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "InnovistaImage");
    data.append("cloud_name", "dqabfysqj");

    try {
      setUploading(true);

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqabfysqj/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const cloudinaryData = await res.json();

      if (cloudinaryData.url) {
        setImageUrl(cloudinaryData.url);
        message.success("Image uploaded successfully!");
        form.setFieldsValue({ Admin_Profile: cloudinaryData.url });
      } else {
        throw new Error("Image upload failed");
      }
    } catch {
      message.error("Image upload error!");
    } finally {
      setUploading(false);
    }
  };

  type Adminvalues = {
    Admin_Name: string;
    Admin_Email: string;
    Admin_Phone: string;
    Admin_Profile: string;
  };

  const onFinish = async (values: Adminvalues) => {
    try {
      const response = await AxiosConfig.post("/auth/register", {
        Admin_Name: values.Admin_Name,
        Admin_Email: values.Admin_Email,
        Admin_Phone: values.Admin_Phone,
        Admin_Profile: imageUrl,
      });

      message.success("Admin Registered Successfully!");
      form.resetFields();
      setImageUrl(null);
      console.log("Success:", response);
    } catch {
      message.error("Registration failed!");
    }
  };

  return (

    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name="Admin_Name"
        label="Admin Name"
        rules={[{ required: true, message: "Please input Admin Name!" }]}
      >
        <Input placeholder="Enter admin name" />
      </Form.Item>

      <Form.Item
        name="Admin_Email"
        label="Admin Email"
        rules={[
          { type: "email", message: "Invalid email format!" },
          { required: true, message: "Please input Admin Email!" },
        ]}
      >
        <Input placeholder="Enter admin email" />
      </Form.Item>

      <Form.Item
        name="Admin_Phone"
        label="Admin Phone"
        rules={[{ required: true, message: "Please input Admin Phone!" }]}
      >
        <Input placeholder="Enter phone number" />
      </Form.Item>

      {/* IMAGE UPLOAD */}
      <Form.Item label="Admin Profile Image">
        <Upload
          beforeUpload={(file) => {
            uploadImageToCloudinary(file);
            return false; // stop default upload
          }}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />} loading={uploading}>
            {uploading ? "Uploading..." : "Upload Image"}
          </Button>
        </Upload>

        {imageUrl && (
          <img
            src={imageUrl}
            style={{
              width: 120,
              marginTop: 15,
              borderRadius: 10,
              border: "1px solid #ddd",
            }}
            alt="uploaded"
          />
        )}
      </Form.Item>

      <Form.Item name="Admin_Profile" hidden>
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block style={{ marginTop: "10px" }}>
          Register Admin
        </Button>
      </Form.Item>
    </Form>

  );
};

export default AdminRegisterForm;
