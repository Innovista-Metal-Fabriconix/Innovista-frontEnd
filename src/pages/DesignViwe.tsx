import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button, Spin, Empty, message } from "antd";

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
  const category = params.get("category");

  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Axios instance (cleaner for future scaling)
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  });

  const fetchCategoryDetails = async (categoryName: string) => {
    setLoading(true);
    setError("");

    try {
      const { data } = await api.get(
        `/designs/byCategory?category=${categoryName}`
      );
      setDesigns(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load designs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) fetchCategoryDetails(category);
  }, [category]);

  // ✅ Better cart logic (prevent duplicates cleanly)
  const addToCart = (designID: string) => {
    try {
      const cart: string[] = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      if (cart.includes(designID)) {
        message.warning("Already in cart");
        return;
      }

      const updatedCart = [...cart, designID];
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      message.success("Added to cart 🛒");
    } catch (error) {
      console.error(error);
      message.error("Something went wrong");
    }
  };

  return (
    <div style={{
      margin: "30px "
    }}>
      <h1 style={{ textAlign: "center" }}>
        Designs Under Category
      </h1>

      <h2 style={{ color: "#1677ff", textAlign: "center" }}>
        ( {category || "No Category Selected"} )
      </h2>

      <div style={{ padding: "20px", maxWidth: "1200px", margin:"30px" }}>
        {loading && (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Spin size="large" />
          </div>
        )}
        {error && (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        )}

        {!loading && designs.length === 0 && !error && (
          <Empty description="No designs found" />
        )}

      </div>
      <div
        style={{
          marginTop: "30px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
          
        }}
      >
        {designs.map((design) => (
          <div
            key={design.DesignID}
            style={{
              background: "#fff",
              padding: "15px",
              borderRadius: "16px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              transition: "0.3s",
            }}
          >
            <img
              src={design.Design_Image?.[0]}
              alt={design.Design_Name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />

            <h3 style={{ marginTop: "10px" }}>
              {design.Design_Name}
            </h3>

            <p style={{ color: "#666", fontSize: "14px" }}>
              {design.Design_Description?.slice(0, 80)}...
            </p>

            {/* Categories */}
            <div style={{ marginTop: "10px" }}>
              {design.Categories?.map((cat) => (
                <span
                  key={cat}
                  style={{
                    background: "#f0f5ff",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    marginRight: "5px",
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Colors */}
            <div style={{ marginTop: "10px", display: "flex", gap: "6px" }}>
              {design.Design_Colors?.map((color) => (
                <div
                  key={color}
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: color,
                    border: "1px solid #ddd",
                  }}
                />
              ))}
            </div>

            {/* Sizes */}
            <p style={{ marginTop: "8px", fontSize: "13px" }}>
              Sizes: {design.Design_Sizes?.join(", ")}
            </p>

            {/* Blog */}
            {design.Design_BlogPosts?.length > 0 && (
              <a
                href={design.Design_BlogPosts[0]}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "13px", color: "#1677ff" }}
              >
                Read Blog →
              </a>
            )}

            {/* Date */}
            <p style={{ fontSize: "12px", color: "#999" }}>
              {new Date(
                design.Design_CreatedAt
              ).toLocaleDateString()}
            </p>

            <Button
              type="primary"
              block
              style={{ marginTop: "10px", borderRadius: "8px" }}
              onClick={() => addToCart(design.DesignID)}
            >
              Add to Cart
            </Button>
          </div>
        ))}

      </div>
    </div>
  );
}

export default DesignView;