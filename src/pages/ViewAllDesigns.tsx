import { useEffect, useState } from "react";

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

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading designs...</p>;
  }

  return (
    <>
      <h2
        style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}
      >
        View All Designs
      </h2>
      <div style={{ overflowX: "auto" }}>
        <table
          border={1}
          cellPadding="10"
          style={{ margin: "50px 10px ", borderCollapse: "collapse" }}
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
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    style={{
                      marginRight: "10px",
                      backgroundColor: "red",
                      padding: "5px 10px",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewAllDesigns;
