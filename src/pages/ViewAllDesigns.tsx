import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Image,
  Tag,
  Space,
  Modal,
  Form,
  Input,
  Typography,
  Spin,
  Popconfirm,
} from "antd";

import AxiosConfig from "../Context/AxiosConfig";
import SidebarOFADmin from "../components/SidebarOFADmin";

const { Title } = Typography;

interface Design {
  DesignID: number | string;
  Design_Name: string;
  Design_Description: string;
  Categories?: string[];
  Design_Colors?: string[];
  Design_Sizes?: string[];
  Design_BlogPosts?: string[];
  Design_Image?: string[];
}

function ViewAllDesigns() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDesign, setEditingDesign] = useState<Design | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetch("http://localhost:4000/designs/all")
      .then((res) => res.json())
      .then((data) => {
        setDesigns(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching designs:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = (designId: number | string) => {
    console.log(designId);

    AxiosConfig.delete("/designs/deleteDesign", {
      params: { designId },
    })
      .then(() => {
        setDesigns((prev) =>
          prev.filter(
            (design) => design.DesignID.toString() !== designId.toString()
          )
        );
      })
      .catch((err) => {
        console.error("Error deleting design:", err.response?.data || err);
      });
  };

  const handleEdit = (design: Design) => {
    setEditingDesign(design);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...design,
      Categories: design.Categories?.join(", "),
      Design_Colors: design.Design_Colors?.join(", "),
      Design_Sizes: design.Design_Sizes?.join(", "),
      Design_BlogPosts: design.Design_BlogPosts?.join(", "),
      Design_Image: design.Design_Image?.join(", "),
    });
  };

  const handleUpdate = () => {
    form.validateFields().then((values) => {
      const payload: Design = {
        ...values,
        DesignID: editingDesign?.DesignID || 0,
        Categories: values.Categories
          ? values.Categories.split(",").map((v: string) => v.trim())
          : [],
        Design_Colors: values.Design_Colors
          ? values.Design_Colors.split(",").map((v: string) => v.trim())
          : [],
        Design_Sizes: values.Design_Sizes
          ? values.Design_Sizes.split(",").map((v: string) => v.trim())
          : [],
        Design_BlogPosts: values.Design_BlogPosts
          ? values.Design_BlogPosts.split(",").map((v: string) => v.trim())
          : [],
        Design_Image: values.Design_Image
          ? values.Design_Image.split(",").map((v: string) => v.trim())
          : [],
      };

      AxiosConfig.put("/designs/updateDesign", payload)
        .then(() => {
          setDesigns((prev) =>
            prev.map((d) => (d.DesignID === payload.DesignID ? payload : d))
          );
          setIsModalVisible(false);
          setEditingDesign(null);
          form.resetFields();
        })
        .catch((err) => {
          console.error("Error updating design:", err.response?.data || err);
        });
    });
  };

  const columns = [
    {
      title: "Design Name",
      dataIndex: "Design_Name",
      key: "Design_Name",
    },
    {
      title: "Description",
      dataIndex: "Design_Description",
      key: "Design_Description",
    },
    {
      title: "Categories",
      dataIndex: "Categories",
      key: "Categories",
      render: (cats: string[]) =>
        cats?.map((c, idx) => <Tag key={idx}>{c}</Tag>),
    },
    {
      title: "Colors",
      dataIndex: "Design_Colors",
      key: "Design_Colors",
      render: (colors: string[]) =>
        colors?.map((color, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: color,
              width: 30,
              height: 20,
              display: "inline-block",
              marginRight: 5,
              border: "1px solid #ccc",
            }}
          />
        )),
    },
    {
      title: "Sizes",
      dataIndex: "Design_Sizes",
      key: "Design_Sizes",
      render: (sizes: string[]) => sizes?.join(", "),
    },
    {
      title: "Blog Posts",
      dataIndex: "Design_BlogPosts",
      key: "Design_BlogPosts",
      render: (links: string[]) =>
        links?.map((link, idx) => (
          <div key={idx}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              Blog {idx + 1}
            </a>
          </div>
        )),
    },
    {
      title: "Images",
      dataIndex: "Design_Image",
      key: "Design_Image",
      render: (imgs: string[]) =>
        imgs?.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt="Design"
            width={80}
            style={{ marginRight: 5, borderRadius: 6 }}
          />
        )),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: undefined, record: Design) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this design?"
            onConfirm={() => handleDelete(record.DesignID)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <SidebarOFADmin />
      <div style={{ padding: "20px" }}>
        <Title level={3} style={{ textAlign: "center" }}>
          View All Designs
        </Title>

        {loading ? (
          <Spin
            size="large"
            style={{ display: "block", margin: "50px auto" }}
          />
        ) : (
          <Table
            rowKey="DesignID"
            columns={columns}
            dataSource={designs}
            bordered
            pagination={{ pageSize: 5 }}
          />
        )}

        {/* Edit Modal */}
        <Modal
          title="Edit Design"
          open={isModalVisible}
          onOk={handleUpdate}
          onCancel={() => {
            setIsModalVisible(false);
            setEditingDesign(null);
            form.resetFields();
          }}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Design Name"
              name="Design_Name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="Design_Description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item label="Categories" name="Categories">
              <Input placeholder="Comma separated" />
            </Form.Item>

            <Form.Item label="Colors" name="Design_Colors">
              <Input placeholder="Comma separated hex codes" />
            </Form.Item>

            <Form.Item label="Sizes" name="Design_Sizes">
              <Input placeholder="Comma separated" />
            </Form.Item>

            <Form.Item label="Blog Posts" name="Design_BlogPosts">
              <Input placeholder="Comma separated URLs" />
            </Form.Item>

            <Form.Item label="Images" name="Design_Image">
              <Input placeholder="Comma separated URLs" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default ViewAllDesigns;
