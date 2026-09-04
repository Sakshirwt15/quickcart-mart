import { useState } from "react";
import api from "./api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", { name, email, password });
      alert("Account created! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed — email might already be in use.");
    }
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <h2>Create your account</h2>
        <p style={{ color: "#5A6B5C", marginBottom: "20px" }}>
          Join QuickCart Mart in seconds.
        </p>
        <input
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleRegister} style={styles.btn}>
          Sign Up
        </button>
        <p style={{ marginTop: "14px", fontSize: "14px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--green)" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  wrap: { display: "flex", justifyContent: "center", paddingTop: "40px" },
  card: {
    background: "white",
    border: "1px solid var(--border)",
    borderRadius: "14px",
    padding: "32px",
    width: "320px",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "12px",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    fontSize: "14px",
  },
  btn: {
    width: "100%",
    background: "var(--orange)",
    color: "white",
    padding: "12px",
    fontWeight: 600,
    borderRadius: "8px",
    marginTop: "4px",
  },
};
