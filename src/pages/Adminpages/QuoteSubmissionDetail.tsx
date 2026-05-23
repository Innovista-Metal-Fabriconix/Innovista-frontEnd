import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SidebarOFADmin from "../../components/SidebarOFADmin";
import AxiosConfig from "../../Context/AxiosConfig";
import styles from "../../cssModules/QuoteSubmissionDetail.module.css";

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

const formatDate = (value: string) =>
  new Date(value).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

function QuoteSubmissionDetail() {
  const { quoteId } = useParams<{ quoteId: string }>();
  const [submission, setSubmission] = useState<QuoteSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSubmission = async () => {
      if (!quoteId) {
        setError("Missing quote submission id.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const response = await AxiosConfig.get<QuoteSubmission>(
          `/quote/admin/submissions/${quoteId}`,
        );
        setSubmission(response.data);
      } catch {
        setError("Failed to load the quote submission details.");
      } finally {
        setLoading(false);
      }
    };

    loadSubmission();
  }, [quoteId]);

  return (
    <>
      <SidebarOFADmin />
      <section className={styles.pageShell}>
        <div className={styles.topBar}>
          <div>
            <p className={styles.eyebrow}>Admin / Quote Detail</p>
            <h1>Submission details</h1>
          </div>
          <Link to="/AdminQuotes" className={styles.backLink}>
            Back to submissions
          </Link>
        </div>

        {loading ? (
          <p className={styles.status}>Loading submission...</p>
        ) : null}
        {error ? <p className={styles.error}>{error}</p> : null}

        {!loading && !error && submission ? (
          <article className={styles.card}>
            <div className={styles.headerCard}>
              <div>
                <p className={styles.cardMeta}>
                  {formatDate(submission.createdAt)}
                </p>
                <h2>{submission.projectTitle}</h2>
                <p>{submission.projectDescription}</p>
              </div>
              <div className={styles.headerStats}>
                <span>{submission.projectType}</span>
                <span>{submission.files.length} file(s)</span>
                <span>{submission.location || "N/A"}</span>
              </div>
            </div>

            <div className={styles.detailGrid}>
              <section>
                <h3>Client information</h3>
                <ul>
                  <li>
                    <span>Client</span>
                    <strong>{submission.clientName}</strong>
                  </li>
                  <li>
                    <span>Contact person</span>
                    <strong>{submission.contactPerson || "—"}</strong>
                  </li>
                  <li>
                    <span>Email</span>
                    <strong>{submission.email}</strong>
                  </li>
                  <li>
                    <span>Phone</span>
                    <strong>{submission.phone}</strong>
                  </li>
                  <li>
                    <span>Website</span>
                    <strong>{submission.clientWebsite || "—"}</strong>
                  </li>
                </ul>
              </section>

              <section>
                <h3>Project information</h3>
                <ul>
                  <li>
                    <span>Location</span>
                    <strong>{submission.location}</strong>
                  </li>
                  <li>
                    <span>Project type</span>
                    <strong>{submission.projectType}</strong>
                  </li>
                  <li>
                    <span>Reference</span>
                    <strong>{submission.projectReferenceNumber || "—"}</strong>
                  </li>
                  <li>
                    <span>Interior style</span>
                    <strong>{submission.interiorStyle || "—"}</strong>
                  </li>
                  <li>
                    <span>Budget</span>
                    <strong>{submission.budget || "—"}</strong>
                  </li>
                  <li>
                    <span>Latest delivery date</span>
                    <strong>{submission.latestDeliveryDate || "—"}</strong>
                  </li>
                </ul>
              </section>

              <section>
                <h3>Technical requirements</h3>
                <ul>
                  <li>
                    <span>Installation conditions</span>
                    <strong>{submission.installationConditions || "—"}</strong>
                  </li>
                  <li>
                    <span>Site constraints</span>
                    <strong>{submission.siteConstraints || "—"}</strong>
                  </li>
                  <li>
                    <span>Standards</span>
                    <strong>{submission.standards || "—"}</strong>
                  </li>
                  <li>
                    <span>Quality expectations</span>
                    <strong>{submission.qualityExpectations || "—"}</strong>
                  </li>
                  <li>
                    <span>Material brand</span>
                    <strong>{submission.materialBrand || "—"}</strong>
                  </li>
                  <li>
                    <span>Color code</span>
                    <strong>{submission.colorCode || "—"}</strong>
                  </li>
                </ul>
              </section>

              <section>
                <h3>Commercial and site info</h3>
                <ul>
                  <li>
                    <span>Additional features</span>
                    <strong>{submission.additionalFeatures || "—"}</strong>
                  </li>
                  <li>
                    <span>Payment conditions</span>
                    <strong>{submission.paymentConditions || "—"}</strong>
                  </li>
                  <li>
                    <span>Proposed visit dates</span>
                    <strong>{submission.proposedVisitDates || "—"}</strong>
                  </li>
                  <li>
                    <span>Site address</span>
                    <strong>{submission.siteAddress || "—"}</strong>
                  </li>
                  <li>
                    <span>Google Maps link</span>
                    <strong>{submission.googleMapsLink || "—"}</strong>
                  </li>
                </ul>
              </section>
            </div>

            <section className={styles.filesSection}>
              <h3>Files</h3>
              {submission.files.length === 0 ? (
                <p>No files uploaded.</p>
              ) : (
                <div className={styles.fileGrid}>
                  {submission.files.map((file) => (
                    <a
                      key={file.id}
                      href={file.driveViewUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={styles.fileCard}
                    >
                      <strong>{file.originalName}</strong>
                      <span>{file.mimeType}</span>
                      <span>{formatSize(file.sizeBytes)}</span>
                    </a>
                  ))}
                </div>
              )}
            </section>
          </article>
        ) : null}
      </section>
    </>
  );
}

export default QuoteSubmissionDetail;
