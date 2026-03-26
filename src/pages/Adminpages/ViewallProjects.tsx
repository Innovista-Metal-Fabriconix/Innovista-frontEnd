import { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Image, Tooltip } from "antd";
import AxiosConfig from "../../Context/AxiosConfig";

type Project = {
  ProjectID: number;
  Project_Title: string;
  Project_Description: string;
  Project_Images: string[];
  Location: string;
  Client_Name: string;
  Client_Email: string;
  Budget: number;
};

function ViewallProjects() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Pagination state (industry standard)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  // Fetch projects with pagination
  const fetchProjects = async (page = 1, limit = 10) => {
    try {
      setLoading(true);

      const response = await AxiosConfig.get("/projects/getAllProjects", {
        params: { page, limit },
      });
      setAllProjects(response.data.data);
      setTotal(response.data.total);
      setCurrentPage(response.data.page);
      setPageSize(response.data.limit);
    } catch (err) {
      console.error(err);
      message.error("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(currentPage, pageSize);
  }, []);

  // Delete project
  const deleteProject = async (id: number) => {
    try {
      await AxiosConfig.delete("/projects/deleteProject", {
        params: { ProjectID: id },
      });

      message.success("Project deleted successfully!");

      // Refetch current page after delete
      fetchProjects(currentPage, pageSize);
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
      render: (text: string, record: Project) => (
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
      width: 180,
      render: (images: string[]) =>
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
          <span>No Images</span>
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
      width: 120,
      render: (value: number) => `RS.  ${value}`,
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_: unknown, record: Project) => (
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
    <div style={{ padding: 40, textAlign: "center", fontSize: "18px" }}>
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
        All Projects
      </h2>

      <Table
        columns={columns}
        dataSource={allProjects}
        loading={loading}
        rowKey="ProjectID"
        bordered
        onRow={(record) => ({
          onMouseEnter: () => setHoveredRow(record.ProjectID),
          onMouseLeave: () => setHoveredRow(null),
        })}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          onChange: (page, limit) => {
            fetchProjects(page, limit);
          },
        }}
      />
    </div>
  );
}

export default ViewallProjects;
