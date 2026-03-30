import React, { useState } from "react";
import {
  Button,
  Card,
  Input,
  Form,
  Space,
  message,
  Select,
} from "antd";
import AxiosConfig from "../Context/AxiosConfig";
import SidebarOFADmin from "../components/SidebarOFADmin";
import { AxiosError } from "axios";


const { TextArea } = Input;
const { Option } = Select;

/* ✅ Categories List */
const CATEGORY_OPTIONS = [
  "Doors",
  "Windows",
  "Partition",
  "Shop Front",
  "Louvers",
  "Bathrooms",
  "Roof",
  "Tile Skirting",
  "Ladders",
  "Racks",
  "Wardrobe",
  "Pantry Cupboard",
];

/* ✅ Sizes */
const SIZE_OPTIONS = ["Small", "Medium", "Large"];

/* ✅ Type */
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
  const [submitted, setSubmitted] = useState(false);

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

  /* ✅ Image Upload */
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
        alert("Upload failed");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        Design_Image: [...prev.Design_Image, result.secure_url],
      }));
    } catch {
      alert("Upload error");
    }
  };

  const handleDeleteImage = (index: number) => {
    const updated = [...formData.Design_Image];
    updated.splice(index, 1);
    setFormData({ ...formData, Design_Image: updated });
  };

  /* ✅ Normal input */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof DesignFormData
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  /* ✅ Multi Select handler */
  const handleSelectChange = (
    value: string[],
    field: keyof DesignFormData
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  /* ✅ Dynamic fields (colors + blog only) */
  const addArrayField = (field: keyof DesignFormData) => {
    const current = formData[field];
    if (Array.isArray(current)) {
      setFormData({
        ...formData,
        [field]: [...current, ""],
      });
    }
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof DesignFormData,
    index: number
  ) => {
    const arr = [...(formData[field] as string[])];
    arr[index] = e.target.value;
    setFormData({ ...formData, [field]: arr });
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

    } catch (err) {
      const error = err as AxiosError;

      if (error.response) {
        const status = error.response.status;

        if (status === 400) {
          alert("Check All fields are fill correctly");

        } else if (status === 500) {
          alert("Internal server error");

        } else {
          alert("Error submitting design");

        }
      } else {
        message.error("Network error. Please try again.");
      }
    }
  };

  if (submitted) {
    return (
      <Card style={{ maxWidth: 600, margin: "40px auto", textAlign: "center" }}>
        <h2 style={{ color: "green" }}>
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

      <Card style={{ maxWidth: 650, margin: "40px auto" }}>
        <h2 style={{ textAlign: "center" }}>Add New Design</h2>

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

          {/* ✅ CATEGORY SELECT */}
          <Form.Item label="Categories">
            <Select
              mode="multiple"
              placeholder="Select Categories"
              value={formData.Categories}
              onChange={(val) => handleSelectChange(val, "Categories")}
            >
              {CATEGORY_OPTIONS.map((cat) => (
                <Option key={cat} value={cat}>
                  {cat}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* ✅ SIZE SELECT */}
          <Form.Item label="Design Sizes">
            <Select
              mode="multiple"
              placeholder="Select Sizes"
              value={formData.Design_Sizes}
              onChange={(val) => handleSelectChange(val, "Design_Sizes")}
            >
              {SIZE_OPTIONS.map((size) => (
                <Option key={size} value={size}>
                  {size}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Images */}
          <Form.Item label="Upload Images">
            <Input type="file" onChange={handleImageUpload} />

            <Space direction="vertical" style={{ marginTop: 10 }}>
              {formData.Design_Image.map((img, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <img src={img} style={{ width: 120 }} />
                  <Button
                    danger
                    size="small"
                    style={{ position: "absolute", top: 5, right: 5 }}
                    onClick={() => handleDeleteImage(i)}
                  >
                    X
                  </Button>
                </div>
              ))}
            </Space>
          </Form.Item>

          {/* Colors */}
          <Form.Item label="Design Colors">
            <Space direction="vertical" style={{ width: "100%" }}>
              {formData.Design_Colors.map((val, i) => (
                <Input
                  key={i}
                  value={val}
                  onChange={(e) =>
                    handleArrayChange(e, "Design_Colors", i)
                  }
                />
              ))}
              <Button onClick={() => addArrayField("Design_Colors")}>
                + Add Color
              </Button>
            </Space>
          </Form.Item>

          {/* Blog */}
          <Form.Item label="Blog Posts">
            <Space direction="vertical" style={{ width: "100%" }}>
              {formData.Design_BlogPosts.map((val, i) => (
                <Input
                  key={i}
                  value={val}
                  onChange={(e) =>
                    handleArrayChange(e, "Design_BlogPosts", i)
                  }
                />
              ))}
              <Button onClick={() => addArrayField("Design_BlogPosts")}>
                + Add Blog
              </Button>
            </Space>
          </Form.Item>

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