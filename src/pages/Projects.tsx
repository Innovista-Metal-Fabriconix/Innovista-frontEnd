import { useState, useEffect } from "react";
import { Card, Row, Col, Tag, Typography, Image, Pagination, Spin } from "antd";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import AxiosConfig from "../Context/AxiosConfig";

dayjs.extend(duration);

const { Title, Paragraph, Text } = Typography;

interface Project {
  ProjectID: number;
  Project_Title: string;
  Project_Description: string;
  Project_Images?: string[];
  Project_CreatedAt?: string;
  Location: string;
  Client_Name: string;
  Client_Email: string;
  Client_Number?: string;
  Client_Company?: string;
  Project_FinishedDate?: string | null;
  Budget: number;
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Preview state
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [previewIndex, setPreviewIndex] = useState(0);

  // Pagination state (same pattern as admin table)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8); // cards per page
  const [total, setTotal] = useState(0);

  // Fetch projects with pagination
  const fetchProjects = async (page = 1, limit = 8) => {
    try {
      setLoading(true);

      const response = await AxiosConfig.get("/projects/getAllProjects", {
        params: { page, limit },
      });

      // Expected: { data, total, page, limit }
      setProjects(response.data.data);
      setTotal(response.data.total);
      setCurrentPage(response.data.page);
      setPageSize(response.data.limit);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(currentPage, pageSize);
  }, []);

  // Image preview
  const openPreview = (images: string[], index: number) => {
    setPreviewImages(images);
    setPreviewIndex(index);
    setPreviewVisible(true);
  };

  const getProjectDuration = (start?: string, end?: string | null) => {
    if (!start) return "";
    if (!end) return "Ongoing";

    const startDate = dayjs(start);
    const endDate = dayjs(end);
    const diffMonths = endDate.diff(startDate, "month");

    return `Completed in ${diffMonths} month${diffMonths > 1 ? "s" : ""}`;
  };

  return (
    <>
      {/* Hidden Preview Group */}
      <Image.PreviewGroup
        preview={{
          visible: previewVisible,
          current: previewIndex,
          onVisibleChange: (vis) => setPreviewVisible(vis),
        }}
      >
        {previewImages.map((img, i) => (
          <Image key={i} src={img} style={{ display: "none" }} />
        ))}
      </Image.PreviewGroup>

      <div
        style={{
          width: "100%",
          overflowX: "hidden",
          padding: 15,
          paddingBottom: 60,
          paddingTop: 40,
        }}
      >
        {loading ? (
          <div style={{ textAlign: "center", padding: 50 }}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            <Row gutter={[16, 16]}>
              {projects.map((project) => (
                <Col
                  xs={24}
                  sm={12}
                  md={12}
                  lg={8}
                  xl={6}
                  key={project.ProjectID}
                  style={{ display: "flex", paddingBottom: 20 }}
                >
                  <Card
                    hoverable
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      overflow: "hidden",
                    }}
                    cover={
                      project.Project_Images?.[0] ? (
                        <img
                          src={project.Project_Images[0]}
                          alt={project.Project_Title}
                          style={{
                            width: "100%",
                            height: 200,
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            openPreview(project.Project_Images || [], 0)
                          }
                        />
                      ) : null
                    }
                  >
                    <div style={{ flex: 1, overflow: "hidden" }}>
                      <Title level={5} style={{ marginBottom: 5 }}>
                        {project.Project_Title}
                      </Title>

                      <Paragraph
                        ellipsis={{ rows: 3 }}
                        style={{ fontSize: 13, marginBottom: 10 }}
                      >
                        {project.Project_Description}
                      </Paragraph>

                      <div style={{ marginBottom: 12, fontSize: 13 }}>
                        <Text strong>Client:</Text> {project.Client_Name} <br />
                        <Text strong>Email:</Text> {project.Client_Email} <br />
                        {project.Client_Company && (
                          <>
                            <Text strong>Company:</Text>{" "}
                            {project.Client_Company}
                            <br />
                          </>
                        )}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                          gap: 5,
                          marginBottom: 10,
                        }}
                      >
                        <Tag color="blue">📍 {project.Location}</Tag>
                        <Tag color="green">
                          ${project.Budget.toLocaleString()}
                        </Tag>
                      </div>

                      {project.Project_FinishedDate ? (
                        <Tag color="geekblue">
                          {getProjectDuration(
                            project.Project_CreatedAt,
                            project.Project_FinishedDate
                          )}
                        </Tag>
                      ) : (
                        <Tag color="green">Completed</Tag>
                      )}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            <div style={{ textAlign: "center", marginTop: 30 }}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={total}
                showSizeChanger
                pageSizeOptions={["4", "8", "12", "16"]}
                onChange={(page, limit) => {
                  fetchProjects(page, limit);
                }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Projects;
