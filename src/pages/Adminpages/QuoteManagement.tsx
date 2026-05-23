import { useEffect, useState } from "react";
import SidebarOFADmin from "../../components/SidebarOFADmin";
import AxiosConfig from "../../Context/AxiosConfig";

type QuoteFile = {
  id: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  driveViewUrl: string;
};

type QuoteSubmission = {
  id: string;
  createdAt: string;
  clientName: string;
  email: string;
  phone: string;
  projectTitle: string;
  location: string;
  projectType: string;
  projectDescription: string;
  files: QuoteFile[];
};

type QuoteResponse = {
  data: QuoteSubmission[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

function QuoteManagement() {
  const [submissions, setSubmissions] = useState<QuoteSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await AxiosConfig.get<QuoteResponse>(
          `/quote/admin/submissions?page=${page}&limit=20`,
        );

        setSubmissions(response.data.data || []);
        setTotalPages(response.data.totalPages || 1);
      } catch {
        setError("Failed to load quote submissions.");
      } finally {
        setLoading(false);
      }
    };

    loadSubmissions();
  }, [page]);

  return (
    <>
      <SidebarOFADmin />
      <div style={{ maxWidth: 1180, margin: "24px auto", padding: "0 16px" }}>
        <h2 style={{ marginBottom: 16 }}>Quote Submissions</h2>

        {loading ? <p>Loading submissions...</p> : null}
        {error ? <p style={{ color: "#c62828" }}>{error}</p> : null}

        {!loading && !error && submissions.length === 0 ? (
          <p>No quote submissions found.</p>
        ) : null}

        {!loading && !error && submissions.length > 0 ? (
          <div style={{ display: "grid", gap: 14 }}>
            {submissions.map((submission) => (
              <article
                key={submission.id}
                style={{
                  border: "1px solid #dbe3ee",
                  borderRadius: 12,
                  padding: 16,
                  background: "#fff",
                }}
              >
                <p style={{ margin: "0 0 8px", color: "#516273" }}>
                  {new Date(submission.createdAt).toLocaleString()}
                </p>
                <h3 style={{ margin: "0 0 8px" }}>{submission.projectTitle}</h3>
                <p style={{ margin: "0 0 6px" }}>
                  <strong>Client:</strong> {submission.clientName}
                </p>
                <p style={{ margin: "0 0 6px" }}>
                  <strong>Email:</strong> {submission.email}
                </p>
                <p style={{ margin: "0 0 6px" }}>
                  <strong>Phone:</strong> {submission.phone}
                </p>
                <p style={{ margin: "0 0 10px" }}>
                  <strong>Location:</strong> {submission.location || "N/A"}
                </p>
                <p style={{ margin: "0 0 10px", whiteSpace: "pre-wrap" }}>
                  {submission.projectDescription}
                </p>

                <div>
                  <strong>Files:</strong>
                  {submission.files.length === 0 ? (
                    <span> No files uploaded.</span>
                  ) : (
                    <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                      {submission.files.map((file) => (
                        <li key={file.id}>
                          <a
                            href={file.driveViewUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            {file.originalName}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : null}

        <div
          style={{
            marginTop: 18,
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page <= 1 || loading}
          >
            Previous
          </button>
          <span>
            Page {page} of {Math.max(1, totalPages)}
          </span>
          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page >= totalPages || loading}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default QuoteManagement;
