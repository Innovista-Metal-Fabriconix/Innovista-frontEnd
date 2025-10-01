import ProjectDBackground from "../assets/Images/projectDetailsPage.jpg";
import { Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import type { GetProps } from "antd";
import { motion } from "framer-motion";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

function ProductDetails() {
  return (
    <>
      <div
        style={{
          position: "relative",
          height: "500px",
          backgroundImage: `url(${ProjectDBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.85))",
          }}
        ></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "800px",
            padding: "0 20px",
          }}
        >
          <Typography.Title
            level={1}
            style={{
              color: "#fff",
              fontSize: "56px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Product Details
          </Typography.Title>

          <Typography.Paragraph
            style={{
              color: "#f5f5f5",
              fontSize: "20px",
              lineHeight: "1.8",
              marginBottom: "30px",
            }}
          >
            Discover our extensive range of high-quality doors for residential
            and commercial projects. Crafted with precision, designed for
            durability, and made to transform your spaces.
          </Typography.Paragraph>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Search
              style={{
                width: 450,
                borderRadius: "30px",
                overflow: "hidden",
                boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
              }}
              placeholder="🔍 Search for products..."
              onSearch={onSearch}
              enterButton={<SearchOutlined />}
              size="large"
            />
          </motion.div>
        </motion.div>
      </div>
      <div style={{ padding: "40px", textAlign: "center" }}>
        <Typography.Title level={2}>Browse other categories</Typography.Title>
      </div>
    </>
  );
}

export default ProductDetails;
