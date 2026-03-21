import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "antd";

interface Design {
  DesignID: string;
  Design_Image: string[];
  Design_Name: string;
  Design_Description: string;
  Categories: string[];
  Design_Colors: string[];
  Design_Sizes: string[];
  Design_BlogPosts: string[];
  Design_CreatedAt: string;
}

function DesignView() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [designs, setDesigns] = useState<Design[]>([]);
  const category = params.get("category");

  const fetchCategoryDetails = async (categoryName: string) => {
    try {
      const response = await axios.get(
        `https://innovista-backend-hvt3.vercel.app/designs/byCategory?category=${categoryName}`
      );
      setDesigns(response.data);
    } catch (error) {
      console.error("Error fetching category details:", error);
    }
  };

  useEffect(() => {
    if (category) fetchCategoryDetails(category);
  }, [category]);


const AddtoCart = (designID: string) => {
  try {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");


    if (!cart.includes(designID)) {
      cart.push(designID);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Design added to cart!");
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "10px" }}>Designs Under Category</h1>
      <h2 style={{ color: "#007bff" }}>Selected Category: {category}</h2>

      {designs.length === 0 ? (
        <p style={{ marginTop: "20px", fontSize: "18px" }}>
          No designs found under this category.
        </p>
      ) : (
        <div
          style={{
            marginTop: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gridGap: "20px",
          }}
        >
          {designs.map((design) => (
            <div
              key={design.DesignID}
              style={{
                background: "#fff",
                padding: "15px",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={design.Design_Image[0]}
                alt={design.Design_Name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <h3 style={{ marginTop: "12px" }}>{design.Design_Name}</h3>

              <p style={{ fontSize: "15px", color: "#666" }}>
                {design.Design_Description}
              </p>

              <div style={{ marginTop: "10px" }}>
                <strong>Categories:</strong>
                <div
                  style={{
                    marginTop: "5px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {design.Categories.map((cat: string) => (
                    <span
                      key={cat}
                      style={{
                        background: "#e7f1ff",
                        padding: "5px 10px",
                        borderRadius: "20px",
                        fontSize: "13px",
                      }}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "12px" }}>
                <strong>Colors:</strong>
                <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                  {design.Design_Colors.map((color: string) => (
                    <div
                      key={color}
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        background: color,
                        border: "1px solid #ccc",
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "12px" }}>
                <strong>Available Sizes:</strong>
                <p>{design.Design_Sizes.join(", ")}</p>
              </div>

              {design.Design_BlogPosts.length > 0 && (
                <div style={{ marginTop: "12px" }}>
                  <strong>Related Blog:</strong>
                  <div>
                    {design.Design_BlogPosts.map((blog: string) => (
                      <a
                        key={blog}
                        href={blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "block",
                          color: "#007bff",
                          marginTop: "5px",
                        }}
                      >
                        {blog}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div
                style={{ marginTop: "12px", fontSize: "14px", color: "#555" }}
              >
                <strong>Created:</strong>{" "}
                {new Date(design.Design_CreatedAt).toLocaleDateString()}
              </div>
              <Button
                style={{
                  margin: "10px",
                }}
                onClick={() => AddtoCart(design.DesignID)}
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DesignView;
