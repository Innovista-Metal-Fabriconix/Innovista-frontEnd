import { useState } from "react";
import {
  Button,
  Card,
  Input,
  Form,
  Space,
  DatePicker,
  InputNumber,
  message,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import SidebarOFADmin from "../../components/SidebarOFADmin";
import ViewallProjects from "./ViewallProjects";
import AxiosConfig from "../../Context/AxiosConfig";

// Removed unused Title destructuring
const { TextArea } = Input;

function AddProjects() {
  const [form] = Form.useForm();
  const [images, setImages] = useState<string[]>([]);

  const CLOUD_NAME = "dqabfysqj";
  const UPLOAD_PRESET = "InnovistaImage";

  const handleImageUpload = async (event: any, folderName: string) => {
    const file = event.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);
    data.append("cloud_name", CLOUD_NAME);
    data.append("Project_Folder", folderName);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (!result.secure_url) {
        message.error("Image upload failed");
        return;
      }

      setImages((prev) => [...prev, result.secure_url]);

      alert("Image uploaded successfully!");
    } catch {
      alert("Upload error");
    }
  };

  const removeImage = (url: string) => {
    setImages(images.filter((img) => img !== url));
  };

  const onFinish = async (values: any) => {
    const projectData = {
      ...values,
      Project_Images: images,
      Project_FinishedDate: values.Project_FinishedDate
        ? values.Project_FinishedDate.format("YYYY-MM-DD")
        : null,
    };

    try {
      await AxiosConfig.post("/projects/createProject", projectData);
      alert("Project created successfully!");
      form.resetFields();
      setImages([]);
    } catch {
      alert("Failed to create project");
    }
  };

  return (
    <>
      <SidebarOFADmin />

      <Card style={{ maxWidth: 700, margin: "60px auto", padding: 10}}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "28px",
            marginBottom:"10px",
            fontWeight: "600",
            letterSpacing: "0.5px",
            fontFamily: "revert-layer",
          }}
        >
          Add New Project
        </h2>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Project Title"
            name="Project_Title"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter project title" />
          </Form.Item>

          <Form.Item
            label="Project Description"
            name="Project_Description"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} placeholder="Enter project description" />
          </Form.Item>

          <Form.Item label="Upload Project Images">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "Project_Images")}
            />

            <div style={{ marginTop: 10 }}>
              {images.map((url) => (
                <div key={url} style={{ display: "flex", marginTop: 10 }}>
                  <img
                    src={url}
                    alt="Uploaded"
                    width={80}
                    height={80}
                    style={{ borderRadius: 5, marginRight: 10 }}
                  />
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeImage(url)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </Form.Item>

          <Form.Item
            label="Location"
            name="Location"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter project location" />
          </Form.Item>

          <Form.Item
            label="Client Name"
            name="Client_Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter client name" />
          </Form.Item>

          <Form.Item
            label="Client Email"
            name="Client_Email"
            rules={[{ required: true }, { type: "email" }]}
          >
            <Input placeholder="Enter client email" />
          </Form.Item>

          <Form.Item label="Client Number" name="Client_Number">
            <Input placeholder="Enter client number" />
          </Form.Item>

          <Form.Item label="Client Company" name="Client_Company">
            <Input placeholder="Enter client company" />
          </Form.Item>

          <Form.Item label="Project Finished Date" name="Project_FinishedDate">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Budget" name="Budget" rules={[{ required: true }]}>
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              placeholder="Enter budget"
              formatter={(value) => `RS .  ${value}`}
            />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "space-between" }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>

              <Button onClick={() => form.resetFields()}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <ViewallProjects />
    </>
  );
}

export default AddProjects;
