import { useEffect, useState } from "react";
import AxiosConfig from "../Context/AxiosConfig";
import { jwtDecode } from "jwt-decode";

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
  const [formData, setFormData] = useState<Design | null>(null);

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

  const fetchTokendata = () => {
    try {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        const AdminID = jwtDecode(token).sub;
        return AdminID;
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading designs...</p>;
  }

  const handleDelete = (designId: number | string) => {
    if (!window.confirm("Are you sure you want to delete this design?")) return;

    AxiosConfig.delete(`/designs/deleteDesign?designId=${designId}`)
      .then(() => {
        setDesigns((prev) =>
          prev.filter((design) => design.DesignID !== designId)
        );
      })
      .catch((err) => {
        console.error("Error deleting design:", err);
      });
  };

  const handleEdit = (design: Design) => {
    setEditingDesign(design);
    setFormData({ ...design });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!formData) return;
    const { name, value } = e.target;

    if (
      [
        "Categories",
        "Design_Colors",
        "Design_Sizes",
        "Design_BlogPosts",
        "Design_Image",
      ].includes(name)
    ) {
      setFormData((prev) =>
        prev
          ? { ...prev, [name]: value.split(",").map((item) => item.trim()) }
          : null
      );
    } else {
      setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };

  const handleUpdate = () => {
    if (!formData) return;

    const payload = {
      DesignID: Number(formData.DesignID),
      Design_Name: formData.Design_Name,
      Design_Description: formData.Design_Description,
      Design_Image: formData.Design_Image || [],
      Categories: formData.Categories || [],
      Design_Colors: formData.Design_Colors || [],
      Design_BlogPosts: formData.Design_BlogPosts || [],
      Design_Sizes: formData.Design_Sizes || [],
    };

    console.log("Updating with payload:", payload);

    AxiosConfig.put("/designs/updateDesign", payload)
      .then(() => {
        setDesigns((prev) =>
          prev.map((d) => (d.DesignID === formData.DesignID ? payload : d))
        );
        setEditingDesign(null);
        setFormData(null);
      })
      .catch((err) => {
        console.error("Error updating design:", err.response?.data || err);
      });
  };

  return (
    <>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>
        View All Designs
      </h2>
      <div style={{ overflowX: "auto" }}>
        <table
          border={1}
          cellPadding="10"
          style={{ margin: "50px 10px", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Design Name</th>
              <th>Design Description</th>
              <th>Categories</th>
              <th>Design Colors</th>
              <th>Design Sizes</th>
              <th>Design Blog Posts</th>
              <th>Design Images</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {designs.map((design) => (
              <tr key={design.DesignID}>
                <td>{design.Design_Name}</td>
                <td>{design.Design_Description}</td>
                <td>{design.Categories?.join(", ")}</td>
                <td>
                  {design.Design_Colors?.map((color, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: color,
                        width: "30px",
                        height: "20px",
                        display: "inline-block",
                        marginRight: "5px",
                        border: "1px solid #ccc",
                      }}
                      title={color}
                    ></div>
                  ))}
                </td>
                <td>{design.Design_Sizes?.join(", ")}</td>
                <td>
                  {design.Design_BlogPosts?.map((link, idx) => (
                    <div key={idx}>
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        Blog {idx + 1}
                      </a>
                    </div>
                  ))}
                </td>
                <td>
                  {design.Design_Image?.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={design.Design_Name}
                      width="100"
                      style={{ margin: "5px", borderRadius: "8px" }}
                    />
                  ))}
                </td>
                <td>
                  <button
                    style={{
                      marginRight: "10px",
                      backgroundColor: "blue",
                      padding: "5px 10px",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                    }}
                    onClick={() => handleEdit(design)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    style={{
                      backgroundColor: "red",
                      padding: "5px 10px",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                    }}
                    onClick={() => handleDelete(design.DesignID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit form */}
        {editingDesign && formData && (
          <div
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              margin: "20px",
              borderRadius: "8px",
              background: "#f9f9f9",
            }}
          >
            <h3>Edit Design</h3>

            <label>
              Name:
              <input
                type="text"
                name="Design_Name"
                value={formData.Design_Name}
                onChange={handleChange}
              />
            </label>
            <br />

            <label>
              Description:
              <textarea
                name="Design_Description"
                value={formData.Design_Description}
                onChange={handleChange}
              />
            </label>
            <br />

            <label>
              Categories (comma separated):
              <input
                type="text"
                name="Categories"
                value={formData.Categories?.join(", ") || ""}
                onChange={handleChange}
              />
            </label>
            <br />

            <label>
              Colors (comma separated hex codes):
              <input
                type="text"
                name="Design_Colors"
                value={formData.Design_Colors?.join(", ") || ""}
                onChange={handleChange}
              />
            </label>
            <br />

            <label>
              Sizes (comma separated):
              <input
                type="text"
                name="Design_Sizes"
                value={formData.Design_Sizes?.join(", ") || ""}
                onChange={handleChange}
              />
            </label>
            <br />

            <label>
              Blog Posts (comma separated URLs):
              <input
                type="text"
                name="Design_BlogPosts"
                value={formData.Design_BlogPosts?.join(", ") || ""}
                onChange={handleChange}
              />
            </label>
            <br />

            <label>
              Images (comma separated URLs):
              <input
                type="text"
                name="Design_Image"
                value={formData.Design_Image?.join(", ") || ""}
                onChange={handleChange}
              />
            </label>
            <br />

            <button
              onClick={handleUpdate}
              style={{
                marginTop: "10px",
                backgroundColor: "green",
                padding: "5px 10px",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Save Changes
            </button>
            <button
              onClick={() => {
                setEditingDesign(null);
                setFormData(null);
              }}
              style={{
                marginLeft: "10px",
                backgroundColor: "gray",
                padding: "5px 10px",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ViewAllDesigns;
