import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "./api";

const getEmoji = (name) => {
  const n = name.toLowerCase();
  if (n.includes("apple")) return "🍎";
  if (n.includes("banana")) return "🍌";
  if (n.includes("tomato")) return "🍅";
  if (n.includes("potato")) return "🥔";
  if (n.includes("onion")) return "🧅";
  if (n.includes("orange")) return "🍊";
  if (n.includes("carrot")) return "🥕";
  if (n.includes("milk")) return "🥛";
  if (n.includes("bread")) return "🍞";
  return "🛒";
};

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    api.get("/products").then((res) => {
      const found = res.data.find((p) => p.id === parseInt(id));
      setProduct(found);
    });
  }, [id]);

  const addToCart = async () => {
    try {
      await api.post(
        `/cart/items?productId=${product.id}&quantity=${quantity}`,
      );
      alert(`Added ${quantity} × ${product.name} to your basket 🧺`);
    } catch (err) {
      console.error(err);
      alert("Please login first");
    }
  };

  if (!product) return <p>Loading product...</p>;

  return (
    <div>
      <Link to="/" style={{ color: "var(--green)", fontWeight: 600 }}>
        ← Back to Shop
      </Link>
      <div style={styles.wrap}>
        <div style={styles.imgBox}>{getEmoji(product.name)}</div>
        <div>
          <h1>{product.name}</h1>
          <p
            style={{ color: "var(--green)", fontSize: "24px", fontWeight: 700 }}
          >
            ₹{product.price}
          </p>
          <p style={{ color: "#5A6B5C" }}>Category: {product.category?.name}</p>
          <p
            style={{
              color:
                product.stockQuantity > 0 ? "var(--green)" : "var(--orange)",
              fontWeight: 600,
            }}
          >
            {product.stockQuantity > 0
              ? `${product.stockQuantity} in stock`
              : "Out of stock"}
          </p>

          <div style={styles.qtyRow}>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              style={styles.qtyBtn}
            >
              -
            </button>
            <span style={{ fontSize: "18px", fontWeight: 600 }}>
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              style={styles.qtyBtn}
            >
              +
            </button>
          </div>

          <button
            onClick={addToCart}
            style={styles.addBtn}
            disabled={product.stockQuantity === 0}
          >
            Add to Basket
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrap: { display: "flex", gap: "40px", marginTop: "24px", flexWrap: "wrap" },
  imgBox: {
    fontSize: "100px",
    background: "#F0F5EC",
    borderRadius: "16px",
    padding: "60px",
    textAlign: "center",
  },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    margin: "20px 0",
  },
  qtyBtn: {
    width: "36px",
    height: "36px",
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    fontSize: "18px",
    fontWeight: 700,
  },
  addBtn: {
    background: "var(--green)",
    color: "white",
    padding: "12px 32px",
    fontWeight: 700,
    borderRadius: "10px",
    fontSize: "15px",
  },
};
