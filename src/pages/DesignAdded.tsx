import React, { useState } from "react";
import {
  Button,
  Card,
  Input,
  Form,
  Space,
  message,
} from "antd";
import AxiosConfig from "../Context/AxiosConfig";
import SidebarOFADmin from "../components/SidebarOFADmin";

// Removed unused Title destructuring
const { TextArea } = Input;

/* ✅ 1. Define Type */
interface DesignFormData {
  DesignID: number;
  Design_Name: string;
  Design_Image: string[];
  Design_Description: string;
  Categories: string[];
  Design_Colors: string[];
  Design_BlogPosts: string[];
  Design_Sizes: string[];
}

export default function DesignForm() {
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState<DesignFormData>({
    DesignID: 0,
    Design_Name: "",
    Design_Image: [],
    Design_Description: "",
    Categories: [],
    Design_Colors: [],
    Design_BlogPosts: [],
    Design_Sizes: [],
  });

  /* ✅ 2. Fix event type */
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "InnovistaImage");
    data.append("cloud_name", "dqabfysqj");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqabfysqj/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (!result.secure_url) {
        message.error("Upload failed");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        Design_Image: [...prev.Design_Image, result.secure_url],
      }));
    } catch {
      message.error("Upload error");
    }
  };

  /* ✅ 3. Fix index typing */
  const handleDeleteImage = (index: number) => {
    const updated = [...formData.Design_Image];
    updated.splice(index, 1);
    setFormData({ ...formData, Design_Image: updated });
  };

  /* ✅ 4. Strong typing for field */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof DesignFormData,
    index?: number
  ) => {
    if (index !== undefined) {
      const arr = [...(formData[field] as string[])];
      arr[index] = e.target.value;
      setFormData({ ...formData, [field]: arr });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const addArrayField = (field: keyof DesignFormData) => {
    const current = formData[field];

    if (Array.isArray(current)) {
      setFormData({
        ...formData,
        [field]: [...current, ""],
      });
    }
  };

  const handleSubmit = async () => {
    try {
      await AxiosConfig.post("/designs/create", formData);
      setSubmitted(true);

      setFormData({
        DesignID: 0,
        Design_Name: "",
        Design_Image: [],
        Design_Description: "",
        Categories: [],
        Design_Colors: [],
        Design_BlogPosts: [],
        Design_Sizes: [],
      });
    } catch {
      message.error("Error submitting design.");
    }
  };

  if (submitted) {
    return (
      <Card style={{ maxWidth: 600, margin: "40px auto", textAlign: "center" }}>
        <h2 style={{
          textAlign: "center",
          marginTop: "30px",
          marginBottom: "25px",
          fontSize: "28px",
          fontWeight: "600",
          letterSpacing: "0.5px",
          fontFamily: "revert-layer",
          color: "green"
        }}>
          🎉 Design Added Successfully!
        </h2>

        <Button type="primary" onClick={() => setSubmitted(false)}>
          Add Another
        </Button>
      </Card>
    );
  }

  return (
    <>
      <SidebarOFADmin />

      <Card style={{ maxWidth: 650, margin: "40px auto", marginBottom: "100px" }}>
        <h2
          style={{
            textAlign: "center",
            marginTop: "30px",
            marginBottom: "25px",
            fontSize: "28px",
            fontWeight: "600",
            letterSpacing: "0.5px",
            fontFamily: "revert-layer",
          }}
        >
          Add New Design
        </h2>
     

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Design Name">
            <Input
              value={formData.Design_Name}
              onChange={(e) => handleChange(e, "Design_Name")}
            />
          </Form.Item>

          <Form.Item label="Design Description">
            <TextArea
              rows={4}
              value={formData.Design_Description}
              onChange={(e) => handleChange(e, "Design_Description")}
            />
          </Form.Item>

          <Form.Item label="Upload Images">
            <Input type="file" onChange={handleImageUpload} />

            <Space direction="vertical" style={{ marginTop: 10 }}>
              {formData.Design_Image.map((img, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <img
                    src={img}
                    alt="Preview"
                    style={{
                      width: 120,
                      borderRadius: 8,
                      border: "1px solid #ddd",
                    }}
                  />
                  <Button
                    danger
                    type="primary"
                    size="small"
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                    }}
                    onClick={() => handleDeleteImage(i)}
                  >
                    X
                  </Button>
                </div>
              ))}
            </Space>
          </Form.Item>

          {(
            [
              "Categories",
              "Design_Colors",
              "Design_BlogPosts",
              "Design_Sizes",
            ] as (keyof DesignFormData)[]
          ).map((field) => (
            <Form.Item key={field} label={field.replace(/_/g, " ")}>
              <Space direction="vertical" style={{ width: "100%" }}>
                {(formData[field] as string[]).map((val, i) => (
                  <Input
                    key={i}
                    value={val}
                    placeholder={`Enter ${field}`}
                    onChange={(e) => handleChange(e, field, i)}
                  />
                ))}

                <Button
                  type="dashed"
                  block
                  onClick={() => addArrayField(field)}
                >
                  + Add {field}
                </Button>
              </Space>
            </Form.Item>
          ))}

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit Design
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}