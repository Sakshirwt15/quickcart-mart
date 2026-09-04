import api from "./api";

export default function Checkout() {
  const placeOrder = async () => {
    try {
      const res = await api.post("/orders");
      alert(`Order placed! Total: ₹${res.data.totalAmount}`);
    } catch (err) {
      console.error(err);
      alert("Checkout failed — is your basket empty or are you logged in?");
    }
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "40px" }}>
      <h2>Ready to checkout?</h2>
      <p style={{ color: "#5A6B5C", marginBottom: "20px" }}>
        Confirm your order below.
      </p>
      <button onClick={placeOrder} style={styles.btn}>
        Place Order
      </button>
    </div>
  );
}

const styles = {
  btn: {
    background: "var(--green)",
    color: "white",
    padding: "14px 32px",
    fontWeight: 700,
    fontSize: "16px",
    borderRadius: "10px",
  },
};
