import { useState } from "react";
import api from "./api";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      await onLoginSuccess();
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login failed — check your email and password");
    }
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <h2>Welcome back</h2>
        <p style={{ color: "#5A6B5C", marginBottom: "20px" }}>
          Login to start shopping fresh.
        </p>
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
        <button onClick={handleLogin} style={styles.btn}>
          Login
        </button>
        <p style={{ marginTop: "14px", fontSize: "14px" }}>
          New here?{" "}
          <Link to="/register" style={{ color: "var(--green)" }}>
            Create an account
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
