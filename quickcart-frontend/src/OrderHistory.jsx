import { useEffect, useState } from "react";
import api from "./api";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = () => {
    api
      .get("/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const cancelOrder = async (orderId) => {
    try {
      await api.put(`/orders/${orderId}/cancel`);
      alert("Order cancelled");
      loadOrders();
    } catch (err) {
      console.error(err);
      alert("Could not cancel this order");
    }
  };

  const reorder = async (orderId) => {
    try {
      await api.post(`/orders/${orderId}/reorder`);
      alert("Items added back to your cart 🧺");
    } catch (err) {
      console.error(err);
      alert("Could not reorder");
    }
  };

  if (loading) return <p>Loading your orders...</p>;
  if (orders.length === 0) return <p>You haven't placed any orders yet.</p>;

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order.id} style={styles.card}>
          <div style={styles.headerRow}>
            <strong>Order #{order.id}</strong>
            <span
              style={{
                ...styles.status,
                background:
                  order.status === "CANCELLED" ? "#F4E3E0" : "var(--yellow)",
              }}
            >
              {order.status}
            </span>
          </div>
          <p style={{ color: "#5A6B5C", fontSize: "13px" }}>
            {new Date(order.createdAt).toLocaleString()}
          </p>
          <ul style={{ paddingLeft: "18px" }}>
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.productName} × {item.quantity} — ₹{item.priceAtPurchase}
              </li>
            ))}
          </ul>
          <p style={styles.total}>Total: ₹{order.totalAmount}</p>
          <div style={{ display: "flex", gap: "10px" }}>
            {order.status === "PLACED" && (
              <button
                onClick={() => cancelOrder(order.id)}
                style={styles.cancelBtn}
              >
                Cancel Order
              </button>
            )}
            <button onClick={() => reorder(order.id)} style={styles.reorderBtn}>
              Reorder
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "16px",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "4px",
  },
  status: {
    padding: "2px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: 700,
  },
  total: { fontWeight: 700, color: "var(--green)", margin: "8px 0" },
  cancelBtn: {
    background: "#F4E3E0",
    color: "var(--orange)",
    padding: "8px 14px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: 600,
  },
  reorderBtn: {
    background: "var(--green)",
    color: "white",
    padding: "8px 14px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: 600,
  },
};
