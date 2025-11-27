import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Tag, Typography } from "antd";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/projects/getAllProjects"
        );
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
    getProjectDuration();
  }, []);


  const getProjectDuration = (start?: string, end?: string | null) => {
    if (!start) return "";
    if (!end) return "Ongoing";

    console.log(`Calculating duration from start: ${start} to end: ${end}`);

    const startDate = dayjs(start);
    const endDate = dayjs(end);
    const diffMonths = endDate.diff(startDate, "month");

    console.log(`Project duration from ${startDate.format("YYYY-MM-DD")} to ${endDate.format("YYYY-MM-DD")}: ${diffMonths} months`);

    return `Completed in ${diffMonths} month${diffMonths > 1 ? "s" : ""}`;
  };

  return (
    <Row gutter={[16, 16]} style={{ padding: 15 }}>
      {projects.map((project) => (
        <Col xs={24} sm={12} md={12} lg={8} xl={6} key={project.ProjectID}>
          <Card
            hoverable
            cover={
              project.Project_Images && project.Project_Images.length > 0 ? (
                <img
                  alt={project.Project_Title}
                  src={project.Project_Images[0]}
                  style={{ height: 200, objectFit: "cover" }}
                />
              ) : null
            }
          >
            <Title level={4}>{project.Project_Title}</Title>
            <Paragraph ellipsis={{ rows: 3 }}>
              {project.Project_Description}
            </Paragraph>

            <div style={{ marginBottom: 12 }}>
              <Text strong>Client:</Text> {project.Client_Name} <br />
              <Text strong>Email:</Text> {project.Client_Email} <br />
              {project.Client_Company && (
                <>
                  <Text strong>Company:</Text> {project.Client_Company}
                  <br />
                </>
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Tag color="blue">📍 {project.Location}</Tag>
              <Tag color="green">${project.Budget.toLocaleString()}</Tag>
            </div>

            {project.Project_FinishedDate ? (
              <Tag color="geekblue" style={{ marginTop: 8 }}>
                {getProjectDuration(project.Project_CreatedAt, project.Project_FinishedDate)}
              </Tag>
            ) : (
              <Tag color="green" style={{ marginTop: 8 }}>
                Completed
              </Tag>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Projects;
