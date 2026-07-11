import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SidebarOFADmin from "../../components/SidebarOFADmin";
import AxiosConfig from "../../Context/AxiosConfig";
import styles from "../../cssModules/QuoteManagement.module.css";

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
  contactPerson?: string | null;
  email: string;
  phone: string;
  clientWebsite?: string | null;
  projectTitle: string;
  location: string;
  projectType: string;
  projectReferenceNumber?: string | null;
  projectDescription: string;
  installationConditions?: string | null;
  siteConstraints?: string | null;
  standards?: string | null;
  qualityExpectations?: string | null;
  materialBrand?: string | null;
  colorCode?: string | null;
  additionalFeatures?: string | null;
  interiorStyle?: string | null;
  paymentConditions?: string | null;
  budget?: string | null;
  latestDeliveryDate?: string | null;
  proposedVisitDates?: string | null;
  siteAddress?: string | null;
  googleMapsLink?: string | null;
  files: QuoteFile[];
};

type QuoteResponse = {
  data: QuoteSubmission[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

const shortText = (value: string, maxLength = 120) =>
  value.length > maxLength ? `${value.slice(0, maxLength).trim()}...` : value;

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatDate = (value: string) =>
  new Date(value).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });

function QuoteManagement() {
  const [submissions, setSubmissions] = useState<QuoteSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

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

  useEffect(() => {
    if (!selectedId && submissions.length > 0) {
      setSelectedId(submissions[0].id);
    }
  }, [submissions, selectedId]);

  const filteredSubmissions = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return submissions;

    return submissions.filter((submission) => {
      const haystack = [
        submission.clientName,
        submission.projectTitle,
        submission.projectType,
        submission.location,
        submission.email,
        submission.phone,
        submission.projectDescription,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [search, submissions]);

  const selectedSubmission =
    filteredSubmissions.find((submission) => submission.id === selectedId) ||
    filteredSubmissions[0] ||
    null;

  return (
    <>
      <SidebarOFADmin />
      <section className={styles.pageShell}>
        <div className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Admin / Quote Submissions</p>
            <h1>Quote submissions dashboard</h1>
            <p>
              Review submissions in a compact table view. Select one to inspect
              the full request in the detail panel below.
            </p>
          </div>
          <div className={styles.heroStats}>
            <div>
              <span>Total submissions</span>
              <strong>{submissions.length}</strong>
            </div>
            <div>
              <span>Visible</span>
              <strong>{filteredSubmissions.length}</strong>
            </div>
          </div>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search client, project title, location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button type="button" className={styles.filterBtn}>
            Filter
          </button>
        </div>

        {loading ? (
          <p className={styles.status}>Loading submissions...</p>
        ) : null}
        {error ? <p className={styles.error}>{error}</p> : null}

        {!loading && !error && filteredSubmissions.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No quote submissions found.</h3>
            <p>New requests will appear here once users submit the form.</p>
          </div>
        ) : null}

        {!loading && !error && filteredSubmissions.length > 0 ? (
          <div className={styles.tableCard}>
            <div className={styles.tableHeader}>
              <div>Client & Project</div>
              <div>Project Type</div>
              <div>Location</div>
              <div>Submitted On</div>
              <div>Budget</div>
              <div>Files</div>
              <div>Actions</div>
            </div>

            <div className={styles.tableBody}>
              {filteredSubmissions.map((submission) => {
                const isSelected = selectedSubmission?.id === submission.id;

                return (
                  <button
                    key={submission.id}
                    type="button"
                    className={`${styles.tableRow} ${isSelected ? styles.tableRowActive : ""}`}
                    onClick={() => setSelectedId(submission.id)}
                  >
                    <div className={styles.clientCell}>
                      <div className={styles.avatar}>
                        {submission.clientName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <strong>{submission.clientName}</strong>
                        <span>{shortText(submission.projectTitle, 32)}</span>
                        <small>{submission.email}</small>
                        <small>{submission.phone}</small>
                      </div>
                    </div>
                    <div>
                      <span className={styles.tag}>
                        {submission.projectType}
                      </span>
                    </div>
                    <div>{submission.location || "—"}</div>
                    <div>{formatDate(submission.createdAt)}</div>
                    <div>{submission.budget || "—"}</div>
                    <div>{submission.files.length} files</div>
                    <div className={styles.actionsCell}>
                      <Link
                        to={`/AdminQuotes/${submission.id}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={styles.viewMoreBtn}
                        onClick={(e) => e.stopPropagation()}
                      >
                        View More
                      </Link>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className={styles.tableFooter}>
              <span>
                Showing {filteredSubmissions.length} of {submissions.length}{" "}
                entries
              </span>
              <div className={styles.paginationBar}>
                <button
                  type="button"
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={page <= 1 || loading}
                  className={styles.pageBtn}
                >
                  ‹
                </button>
                <span className={styles.pageIndicator}>{page}</span>
                <button
                  type="button"
                  onClick={() =>
                    setPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={page >= totalPages || loading}
                  className={styles.pageBtn}
                >
                  ›
                </button>
              </div>
              <span>
                {page * 20 > submissions.length
                  ? submissions.length
                  : page * 20}{" "}
                / page
              </span>
            </div>
          </div>
        ) : null}

        {!loading && !error && selectedSubmission ? (
          <div className={styles.detailCard}>
            <div className={styles.detailTopBar}>
              <div className={styles.detailIdentity}>
                <div className={styles.avatarLarge}>
                  {selectedSubmission.clientName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2>{selectedSubmission.clientName}</h2>
                  <div className={styles.detailMetaRow}>
                    <span>{selectedSubmission.email}</span>
                    <span>{selectedSubmission.phone}</span>
                    <span>{formatDate(selectedSubmission.createdAt)}</span>
                  </div>
                </div>
              </div>
              <Link
                to={`/AdminQuotes/${selectedSubmission.id}`}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.viewMoreBtn}
              >
                Open full details
              </Link>
            </div>

            <div className={styles.detailGrid}>
              <section>
                <h3>Project overview</h3>
                <div className={styles.twoColList}>
                  <div>
                    <span>Project title</span>
                    <strong>{selectedSubmission.projectTitle}</strong>
                  </div>
                  <div>
                    <span>Project type</span>
                    <strong>{selectedSubmission.projectType}</strong>
                  </div>
                  <div>
                    <span>Location</span>
                    <strong>{selectedSubmission.location || "—"}</strong>
                  </div>
                  <div>
                    <span>Reference</span>
                    <strong>
                      {selectedSubmission.projectReferenceNumber || "—"}
                    </strong>
                  </div>
                </div>
              </section>

              <section>
                <h3>Requirements</h3>
                <div className={styles.twoColList}>
                  <div>
                    <span>Budget</span>
                    <strong>{selectedSubmission.budget || "—"}</strong>
                  </div>
                  <div>
                    <span>Latest delivery</span>
                    <strong>
                      {selectedSubmission.latestDeliveryDate || "—"}
                    </strong>
                  </div>
                  <div>
                    <span>Interior style</span>
                    <strong>{selectedSubmission.interiorStyle || "—"}</strong>
                  </div>
                  <div>
                    <span>Proposed visit dates</span>
                    <strong>
                      {selectedSubmission.proposedVisitDates || "—"}
                    </strong>
                  </div>
                </div>
              </section>

              <section className={styles.fullWidthSection}>
                <h3>Project description</h3>
                <p>{selectedSubmission.projectDescription}</p>
              </section>

              <section>
                <h3>Technical</h3>
                <div className={styles.detailStack}>
                  <div>
                    <span>Installation conditions</span>
                    <strong>
                      {selectedSubmission.installationConditions || "—"}
                    </strong>
                  </div>
                  <div>
                    <span>Site constraints</span>
                    <strong>{selectedSubmission.siteConstraints || "—"}</strong>
                  </div>
                  <div>
                    <span>Standards</span>
                    <strong>{selectedSubmission.standards || "—"}</strong>
                  </div>
                  <div>
                    <span>Quality expectations</span>
                    <strong>
                      {selectedSubmission.qualityExpectations || "—"}
                    </strong>
                  </div>
                </div>
              </section>

              <section>
                <h3>Site & commercial</h3>
                <div className={styles.detailStack}>
                  <div>
                    <span>Site address</span>
                    <strong>{selectedSubmission.siteAddress || "—"}</strong>
                  </div>
                  <div>
                    <span>Google maps</span>
                    <strong>{selectedSubmission.googleMapsLink || "—"}</strong>
                  </div>
                  <div>
                    <span>Payment conditions</span>
                    <strong>
                      {selectedSubmission.paymentConditions || "—"}
                    </strong>
                  </div>
                  <div>
                    <span>Additional features</span>
                    <strong>
                      {selectedSubmission.additionalFeatures || "—"}
                    </strong>
                  </div>
                </div>
              </section>

              <section className={styles.fullWidthSection}>
                <h3>Attachments</h3>
                {selectedSubmission.files.length === 0 ? (
                  <p className={styles.muted}>No files uploaded.</p>
                ) : (
                  <div className={styles.filePillRow}>
                    {selectedSubmission.files.map((file) => (
                      <a
                        key={file.id}
                        href={file.driveViewUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={styles.filePill}
                      >
                        <strong>{file.originalName}</strong>
                        <span>{formatSize(file.sizeBytes)}</span>
                      </a>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}

export default QuoteManagement;
