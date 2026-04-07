import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import styles from "../cssModules/RequestQuotePage.module.css";

type ProjectType =
  | "Office Partition"
  | "Shopfront"
  | "Facade"
  | "Ceiling"
  | "Other";

type InteriorStyle = "Modern" | "Industrial" | "Corporate";

type QuoteFormState = {
  clientName: string;
  contactPerson: string;
  email: string;
  phone: string;
  clientWebsite: string;
  projectTitle: string;
  location: string;
  projectType: ProjectType;
  projectReferenceNumber: string;
  projectDescription: string;
  installationConditions: string;
  siteConstraints: string;
  standards: string;
  qualityExpectations: string;
  materialBrand: string;
  colorCode: string;
  additionalFeatures: string;
  interiorStyle: InteriorStyle;
  paymentConditions: string;
  budget: string;
  latestDeliveryDate: string;
  proposedVisitDates: string;
  siteAddress: string;
  googleMapsLink: string;
};

type FormErrors = Partial<Record<keyof QuoteFormState | "files", string>>;

const initialFormState: QuoteFormState = {
  clientName: "",
  contactPerson: "",
  email: "",
  phone: "",
  clientWebsite: "",
  projectTitle: "",
  location: "",
  projectType: "Office Partition",
  projectReferenceNumber: "",
  projectDescription: "",
  installationConditions: "",
  siteConstraints: "",
  standards: "",
  qualityExpectations: "",
  materialBrand: "",
  colorCode: "",
  additionalFeatures: "",
  interiorStyle: "Modern",
  paymentConditions: "",
  budget: "",
  latestDeliveryDate: "",
  proposedVisitDates: "",
  siteAddress: "",
  googleMapsLink: "",
};

const requiredLabels: Record<
  | "clientName"
  | "contactPerson"
  | "email"
  | "phone"
  | "projectTitle"
  | "location"
  | "projectDescription",
  string
> = {
  clientName: "Client Name",
  contactPerson: "Contact Person",
  email: "Email",
  phone: "Phone",
  projectTitle: "Project Title",
  location: "Location",
  projectDescription: "Project Description",
};

export default function RequestQuotePage() {
  const [bannerImage] = useState<string>(
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
  );
  const [form, setForm] = useState<QuoteFormState>(initialFormState);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const mergeFiles = (incomingFiles: File[]) => {
    setFiles((prev) => {
      const map = new Map<string, File>();
      [...prev, ...incomingFiles].forEach((file) => {
        const key = `${file.name}-${file.size}-${file.lastModified}`;
        map.set(key, file);
      });
      return Array.from(map.values());
    });
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof QuoteFormState]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (successMessage) setSuccessMessage("");
    if (submitError) setSubmitError("");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    mergeFiles(selectedFiles);
    if (errors.files) setErrors((prev) => ({ ...prev, files: "" }));
    if (successMessage) setSuccessMessage("");
    if (submitError) setSubmitError("");
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files ?? []).filter((file) => {
      const name = file.name.toLowerCase();
      return (
        file.type === "application/pdf" ||
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        name.endsWith(".pdf") ||
        name.endsWith(".jpg") ||
        name.endsWith(".jpeg") ||
        name.endsWith(".png")
      );
    });

    if (droppedFiles.length > 0) {
      mergeFiles(droppedFiles);
      if (errors.files) setErrors((prev) => ({ ...prev, files: "" }));
      if (successMessage) setSuccessMessage("");
      if (submitError) setSubmitError("");
    }
  };

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {};

    for (const [key, label] of Object.entries(requiredLabels)) {
      const fieldKey = key as keyof QuoteFormState;
      if (!form[fieldKey].trim()) {
        nextErrors[fieldKey] = `${label} is required.`;
      }
    }

    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (form.clientWebsite && !/^https?:\/\/.+/i.test(form.clientWebsite)) {
      nextErrors.clientWebsite = "Website must start with http:// or https://";
    }

    if (form.googleMapsLink && !/^https?:\/\/.+/i.test(form.googleMapsLink)) {
      nextErrors.googleMapsLink =
        "Google Maps link must start with http:// or https://";
    }

    if (form.projectDescription && form.projectDescription.trim().length < 20) {
      nextErrors.projectDescription =
        "Project description should be at least 20 characters.";
    }

    return nextErrors;
  };

  const resetForm = () => {
    setForm(initialFormState);
    setFiles([]);
    setErrors({});
    setSubmitError("");
    setSuccessMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError("");
    setSuccessMessage("");

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      files.forEach((file) => {
        formData.append("attachments", file);
      });

      const response = await fetch("https://dummy-api.com/rfq", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit request.");
      }

      setSuccessMessage("Request submitted successfully.");
      resetForm();
    } catch {
      setSubmitError("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className={styles.page}>
      <header className={styles.banner}>
        <img src={bannerImage} alt="Request quote banner" />
        <div className={styles.bannerOverlay} />
      </header>

      <section className={styles.intro}>
        <h1>Submit a New Client Order or Request for Quotation</h1>
        <p>
          Use this form to submit a new client order or request for quotation
          (RFQ). Please provide client details, project requirements, and upload
          any relevant drawings, sketches, or images. You may also include
          initial project estimation data if available.
        </p>
      </section>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <section className={styles.card}>
          <h2>1. Client Details</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label htmlFor="clientName">
                Client Name <span>*</span>
              </label>
              <input
                id="clientName"
                name="clientName"
                type="text"
                value={form.clientName}
                onChange={handleInputChange}
              />
              {errors.clientName && <small>{errors.clientName}</small>}
            </div>

            <div className={styles.field}>
              <label htmlFor="contactPerson">
                Contact Person <span>*</span>
              </label>
              <input
                id="contactPerson"
                name="contactPerson"
                type="text"
                value={form.contactPerson}
                onChange={handleInputChange}
              />
              {errors.contactPerson && <small>{errors.contactPerson}</small>}
            </div>

            <div className={styles.field}>
              <label htmlFor="email">
                Email <span>*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleInputChange}
              />
              {errors.email && <small>{errors.email}</small>}
            </div>

            <div className={styles.field}>
              <label htmlFor="phone">
                Phone <span>*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleInputChange}
              />
              {errors.phone && <small>{errors.phone}</small>}
            </div>

            <div className={styles.fieldFull}>
              <label htmlFor="clientWebsite">Client Website</label>
              <input
                id="clientWebsite"
                name="clientWebsite"
                type="url"
                placeholder="https://example.com"
                value={form.clientWebsite}
                onChange={handleInputChange}
              />
              {errors.clientWebsite && <small>{errors.clientWebsite}</small>}
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <h2>2. Project Details</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label htmlFor="projectTitle">
                Project Title <span>*</span>
              </label>
              <input
                id="projectTitle"
                name="projectTitle"
                type="text"
                value={form.projectTitle}
                onChange={handleInputChange}
              />
              {errors.projectTitle && <small>{errors.projectTitle}</small>}
            </div>

            <div className={styles.field}>
              <label htmlFor="location">
                Location <span>*</span>
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={form.location}
                onChange={handleInputChange}
              />
              {errors.location && <small>{errors.location}</small>}
            </div>

            <div className={styles.field}>
              <label htmlFor="projectType">Project Type</label>
              <select
                id="projectType"
                name="projectType"
                value={form.projectType}
                onChange={handleInputChange}
              >
                <option value="Office Partition">Office Partition</option>
                <option value="Shopfront">Shopfront</option>
                <option value="Facade">Facade</option>
                <option value="Ceiling">Ceiling</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="projectReferenceNumber">
                Project Reference Number
              </label>
              <input
                id="projectReferenceNumber"
                name="projectReferenceNumber"
                type="text"
                value={form.projectReferenceNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.fieldFull}>
              <label htmlFor="projectDescription">
                Project Description <span>*</span>
              </label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                rows={4}
                value={form.projectDescription}
                onChange={handleInputChange}
              />
              {errors.projectDescription && <small>{errors.projectDescription}</small>}
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <h2>3. Drawings and Images</h2>
          <div className={styles.grid}>
            <div className={styles.fieldFull}>
              <label htmlFor="attachments">Upload Files (PDF, JPG, PNG)</label>
              <label
                htmlFor="attachments"
                className={`${styles.dropZone} ${isDragging ? styles.dropZoneActive : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <span>Drag and drop files here, or click to browse</span>
                <span className={styles.dropHint}>Accepted: PDF, JPG, PNG</span>
              </label>
              <input
                ref={fileInputRef}
                id="attachments"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className={styles.hiddenInput}
              />
              {errors.files && <small>{errors.files}</small>}
              {files.length > 0 && (
                <ul className={styles.fileList}>
                  {files.map((file) => (
                    <li key={`${file.name}-${file.lastModified}`}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <h2>4. Technical Requirements</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label htmlFor="installationConditions">Installation Conditions</label>
              <textarea
                id="installationConditions"
                name="installationConditions"
                rows={3}
                value={form.installationConditions}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="siteConstraints">Site Constraints</label>
              <textarea
                id="siteConstraints"
                name="siteConstraints"
                rows={3}
                value={form.siteConstraints}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="standards">Standards</label>
              <input
                id="standards"
                name="standards"
                type="text"
                value={form.standards}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="qualityExpectations">Quality Expectations</label>
              <textarea
                id="qualityExpectations"
                name="qualityExpectations"
                rows={3}
                value={form.qualityExpectations}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <h2>5. Material and Design</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label htmlFor="materialBrand">Material Brand</label>
              <input
                id="materialBrand"
                name="materialBrand"
                type="text"
                value={form.materialBrand}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="colorCode">Color Code</label>
              <input
                id="colorCode"
                name="colorCode"
                type="text"
                value={form.colorCode}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="interiorStyle">Interior Style</label>
              <select
                id="interiorStyle"
                name="interiorStyle"
                value={form.interiorStyle}
                onChange={handleInputChange}
              >
                <option value="Modern">Modern</option>
                <option value="Industrial">Industrial</option>
                <option value="Corporate">Corporate</option>
              </select>
            </div>

            <div className={styles.fieldFull}>
              <label htmlFor="additionalFeatures">Additional Features</label>
              <textarea
                id="additionalFeatures"
                name="additionalFeatures"
                rows={3}
                value={form.additionalFeatures}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <h2>6. Commercial Details</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label htmlFor="budget">Budget</label>
              <input
                id="budget"
                name="budget"
                type="text"
                value={form.budget}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="latestDeliveryDate">Latest Delivery Date</label>
              <input
                id="latestDeliveryDate"
                name="latestDeliveryDate"
                type="date"
                value={form.latestDeliveryDate}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.fieldFull}>
              <label htmlFor="paymentConditions">Payment Conditions</label>
              <textarea
                id="paymentConditions"
                name="paymentConditions"
                rows={3}
                value={form.paymentConditions}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <h2>7. Site Visit</h2>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label htmlFor="proposedVisitDates">Proposed Visit Dates</label>
              <textarea
                id="proposedVisitDates"
                name="proposedVisitDates"
                rows={3}
                placeholder="Example: 2026-04-10, 2026-04-12"
                value={form.proposedVisitDates}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="googleMapsLink">Google Maps Link</label>
              <input
                id="googleMapsLink"
                name="googleMapsLink"
                type="url"
                placeholder="https://maps.google.com/..."
                value={form.googleMapsLink}
                onChange={handleInputChange}
              />
              {errors.googleMapsLink && <small>{errors.googleMapsLink}</small>}
            </div>

            <div className={styles.fieldFull}>
              <label htmlFor="siteAddress">Site Address</label>
              <textarea
                id="siteAddress"
                name="siteAddress"
                rows={3}
                value={form.siteAddress}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>

        <div className={styles.actions}>
          <button type="submit" className="submit-btn-red" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={resetForm}
            disabled={isSubmitting}
          >
            Reset
          </button>
        </div>

        {successMessage && <p className={styles.success}>{successMessage}</p>}
        {submitError && <p className={styles.error}>{submitError}</p>}
      </form>
    </article>
  );
}
