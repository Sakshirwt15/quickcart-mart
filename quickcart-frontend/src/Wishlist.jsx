import { useEffect, useState } from "react";
import api from "./api";

export default function Wishlist() {
  const [items, setItems] = useState([]);

  const load = () => {
    api
      .get("/wishlist")
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (productId) => {
    await api.delete(`/wishlist/${productId}`);
    load();
  };

  const addToCart = async (productId) => {
    try {
      await api.post(`/cart/items?productId=${productId}&quantity=1`);
      alert("Added to your basket 🧺");
    } catch (err) {
      console.error(err);
      alert("Please login first");
    }
  };

  if (items.length === 0)
    return (
      <p>Your wishlist is empty. Tap ❤️ on any product to save it here.</p>
    );

  return (
    <div>
      <h2>My Wishlist</h2>
      {items.map((item) => (
        <div key={item.id} style={styles.row}>
          <span>
            {item.productName} — ₹{item.price}
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => addToCart(item.productId)}
              style={styles.addBtn}
            >
              Add to Cart
            </button>
            <button
              onClick={() => remove(item.productId)}
              style={styles.removeBtn}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "white",
    border: "1px solid var(--border)",
    borderRadius: "10px",
    padding: "14px",
    marginBottom: "10px",
  },
  addBtn: {
    background: "var(--green)",
    color: "white",
    padding: "8px 14px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: 600,
  },
  removeBtn: {
    background: "#F4E3E0",
    color: "var(--orange)",
    padding: "8px 14px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: 600,
  },
};
