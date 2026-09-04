import { useEffect, useState } from "react";
import api from "./api";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCart = () => {
    api
      .get("/cart")
      .then((res) => setCart(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (itemId) => {
    try {
      await api.delete(`/cart/items/${itemId}`);
      loadCart();
    } catch (err) {
      console.error(err);
      alert("Could not remove item");
    }
  };

  const placeOrder = async () => {
    try {
      const res = await api.post("/orders");
      alert(`Order placed! Total: ₹${res.data.totalAmount}`);
      loadCart();
    } catch (err) {
      console.error(err);
      alert("Checkout failed — is your basket empty or are you logged in?");
    }
  };

  if (loading) return <p>Loading your basket...</p>;
  if (!cart || cart.items.length === 0)
    return <p>Your basket is empty. Go add some groceries! 🧺</p>;

  return (
    <div>
      <h2>Your Basket</h2>
      {cart.items.map((item) => (
        <div key={item.id} style={styles.row}>
          <div>
            <strong>{item.productName}</strong>
            <p style={{ margin: 0, color: "#5A6B5C" }}>
              ₹{item.price} × {item.quantity}
            </p>
          </div>
          <button onClick={() => removeItem(item.id)} style={styles.removeBtn}>
            Remove
          </button>
        </div>
      ))}
      <div style={styles.totalRow}>
        <strong>Total: ₹{cart.totalAmount}</strong>
      </div>
      <button onClick={placeOrder} style={styles.placeOrderBtn}>
        Place Order
      </button>
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
  removeBtn: {
    background: "#F4E3E0",
    color: "var(--orange)",
    padding: "6px 14px",
    borderRadius: "6px",
    fontWeight: 600,
    fontSize: "13px",
  },
  totalRow: { textAlign: "right", fontSize: "18px", margin: "16px 0" },
  placeOrderBtn: {
    width: "100%",
    background: "var(--green)",
    color: "white",
    padding: "14px",
    fontWeight: 700,
    fontSize: "16px",
    borderRadius: "10px",
  },
};
