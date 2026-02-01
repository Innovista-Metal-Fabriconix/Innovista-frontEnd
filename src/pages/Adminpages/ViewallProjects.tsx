import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Popconfirm, message, Image, Tooltip } from "antd";
import AxiosConfig from "../../Context/AxiosConfig";

function ViewallProjects() {
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState(null);


  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:4000/projects/getAllProjects"
      );
      setAllProjects(response.data.projects || []);
    } catch (err) {
      console.error(err);
      message.error("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const deleteProject = async (id: number) => {
    try {
      await AxiosConfig.delete(`/projects/deleteProject?ProjectID=${id}`);
      message.success("Project deleted successfully!");
      fetchProjects();
    } catch (err) {
      console.error(err);
      message.error("Failed to delete project.");
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "Project_Title",
      key: "Project_Title",
      width: 200,
    },
    {
      title: "Description",
      dataIndex: "Project_Description",
      key: "Project_Description",
      width: 250,
      ellipsis: true,
      render: (text, record) => (
        <Tooltip
          title={text}
          open={hoveredRow === record.ProjectID}
          placement="topLeft"
        >
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: "Images",
      dataIndex: "Project_Images",
      key: "Project_Images",
        width: 150,
      render: (images) =>
        images?.length ? (
          <div style={{ display: "flex", gap: 10 }}>
            {images.map((url, i) => (
              <Image
                key={i}
                src={url}
                width={50}
                height={50}
                style={{ objectFit: "cover", borderRadius: 6 }}
              />
            ))}
          </div>
        ) : (
          "No Images"
        ),
    },
    {
      title: "Location",
      dataIndex: "Location",
      key: "Location",
      width: 150,
    },
    {
      title: "Client Name",
      dataIndex: "Client_Name",
      key: "Client_Name",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "Client_Email",
      key: "Client_Email",
      width: 180,
    },
    {
      title: "Budget",
      dataIndex: "Budget",
      key: "Budget",
      width: 100,
      render: (value) => `$ ${value}`,
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Popconfirm
          title="Delete Project?"
          description="Are you sure you want to delete this project?"
          onConfirm={() => deleteProject(record.ProjectID)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 40 , textAlign: 'center' , fontSize: '18px' }}>
      <h2>All Projects</h2>

      <Table
        columns={columns}
        dataSource={allProjects}
        loading={loading}
        rowKey="ProjectID"
        bordered
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({
          onMouseEnter: () => setHoveredRow(record.ProjectID),
          onMouseLeave: () => setHoveredRow(null),
        })}
      />
    </div>
  );
}

export default ViewallProjects;
