import { useEffect, useState } from "react";
import api from "./api";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stockQuantity: "",
    categoryId: "",
    imageUrl: "",
  });
  const [error, setError] = useState("");

  const loadData = () => {
    api.get("/products").then((res) => setProducts(res.data));
    api.get("/categories").then((res) => setCategories(res.data));
    api
      .get("/admin/orders")
      .then((res) => setOrders(res.data))
      .catch(() => setError("You don't have admin access."));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddProduct = async () => {
    try {
      await api.post("/admin/products", {
        name: form.name,
        price: parseFloat(form.price),
        stockQuantity: parseInt(form.stockQuantity),
        category: { id: parseInt(form.categoryId) },
        imageUrl: form.imageUrl || null,
      });
      setForm({
        name: "",
        price: "",
        stockQuantity: "",
        categoryId: "",
        imageUrl: "",
      });
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to add product — are you logged in as an admin?");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/products/${id}`);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  if (error) return <p style={{ color: "var(--orange)" }}>{error}</p>;

  return (
    <div>
      <h2>Admin Panel</h2>

      <div style={styles.formCard}>
        <h3>Add New Product</h3>
        <input
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={styles.input}
        />
        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          style={styles.input}
        />
        <input
          placeholder="Stock quantity"
          type="number"
          value={form.stockQuantity}
          onChange={(e) => setForm({ ...form, stockQuantity: e.target.value })}
          style={styles.input}
        />
        <select
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          style={styles.input}
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          placeholder="Image URL (optional — paste from Unsplash/Pexels)"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          style={styles.input}
        />
        <p
          style={{
            fontSize: "12px",
            color: "#5A6B5C",
            marginTop: "-6px",
            marginBottom: "10px",
          }}
        >
          Tip: go to unsplash.com, search the product, right-click the image →
          "Copy image address", paste here.
        </p>
        <button onClick={handleAddProduct} style={styles.addBtn}>
          Add Product
        </button>
      </div>

      <h3 style={{ marginTop: "32px" }}>All Products</h3>
      {products.map((p) => (
        <div key={p.id} style={styles.row}>
          <span>
            {p.name} — ₹{p.price} ({p.stockQuantity} in stock)
          </span>
          <button onClick={() => handleDelete(p.id)} style={styles.deleteBtn}>
            Delete
          </button>
        </div>
      ))}

      <h3 style={{ marginTop: "32px" }}>All Orders</h3>
      {orders.length === 0 && <p>No orders yet.</p>}
      {orders.map((o) => (
        <div key={o.id} style={styles.row}>
          <span>
            Order #{o.id} — {o.status} — ₹{o.totalAmount}
          </span>
        </div>
      ))}
    </div>
  );
}

const styles = {
  formCard: {
    background: "white",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    padding: "20px",
    maxWidth: "400px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid var(--border)",
    borderRadius: "8px",
  },
  addBtn: {
    width: "100%",
    background: "var(--green)",
    color: "white",
    padding: "10px",
    fontWeight: 600,
    borderRadius: "8px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "white",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    padding: "10px 14px",
    marginBottom: "8px",
  },
  deleteBtn: {
    background: "#F4E3E0",
    color: "var(--orange)",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: 600,
  },
};
