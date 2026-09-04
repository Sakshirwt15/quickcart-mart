import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Products from "./Products";
import Cart from "./Cart";
import OrderHistory from "./OrderHistory";
import Admin from "./Admin";
import api from "./api";
import ProductDetails from "./ProductDetails";
import Wishlist from "./Wishlist";

function NavBar({ user, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>
        🥬 QuickCart Mart
      </Link>
      <nav style={styles.nav}>
        <Link to="/" style={styles.navLink}>
          Shop
        </Link>
        <Link to="/cart" style={styles.navLink}>
          Cart
        </Link>
        <Link to="/orders" style={styles.navLink}>
          My Orders
        </Link>
        <Link to="/wishlist" style={styles.navLink}>
          Wishlist
        </Link>
        {user?.role === "ADMIN" && (
          <Link to="/admin" style={styles.navLink}>
            Admin
          </Link>
        )}

        {user ? (
          <div style={{ position: "relative" }}>
            <button onClick={() => setOpen(!open)} style={styles.profileBtn}>
              👤 {user.name}
            </button>
            {open && (
              <div style={styles.dropdown}>
                <p style={{ margin: "0 0 4px 0", fontWeight: 600 }}>
                  {user.name}
                </p>
                <p
                  style={{
                    margin: "0 0 10px 0",
                    fontSize: "12px",
                    color: "#5A6B5C",
                  }}
                >
                  {user.email}
                </p>
                <button onClick={onLogout} style={styles.logoutBtn}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" style={styles.loginBtn}>
              Login
            </Link>
            <Link to="/register" style={styles.signupBtn}>
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <NavBar user={user} onLogout={handleLogout} />
      <main style={styles.main}>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={<Login onLoginSuccess={fetchUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 40px",
    background: "var(--green)",
    color: "white",
  },
  logo: {
    fontFamily: "Fraunces, serif",
    fontSize: "22px",
    fontWeight: 700,
    textDecoration: "none",
    color: "white",
  },
  nav: { display: "flex", gap: "20px", alignItems: "center" },
  navLink: { textDecoration: "none", color: "white", fontWeight: 500 },
  loginBtn: {
    textDecoration: "none",
    color: "white",
    fontWeight: 600,
    padding: "8px 14px",
  },
  signupBtn: {
    textDecoration: "none",
    background: "var(--orange)",
    color: "white",
    padding: "8px 18px",
    borderRadius: "8px",
    fontWeight: 600,
  },
  profileBtn: {
    background: "rgba(255,255,255,0.15)",
    color: "white",
    padding: "8px 14px",
    borderRadius: "8px",
    fontWeight: 600,
  },
  dropdown: {
    position: "absolute",
    top: "44px",
    right: 0,
    background: "white",
    color: "var(--text)",
    borderRadius: "10px",
    padding: "14px",
    width: "180px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
  },
  logoutBtn: {
    width: "100%",
    background: "#F4E3E0",
    color: "var(--orange)",
    padding: "8px",
    borderRadius: "6px",
    fontWeight: 600,
  },
  main: { maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" },
};
