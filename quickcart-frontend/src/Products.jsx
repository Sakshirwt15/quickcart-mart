import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  if (n.includes("paneer")) return "🧀";
  if (n.includes("butter")) return "🧈";
  if (n.includes("curd")) return "🥣";
  if (n.includes("lays") || n.includes("kurkure") || n.includes("bhujia"))
    return "🥔";
  if (n.includes("oreo") || n.includes("biscuit")) return "🍪";
  if (n.includes("coca") || n.includes("cola")) return "🥤";
  if (n.includes("juice")) return "🧃";
  if (n.includes("red bull")) return "⚡";
  if (n.includes("water")) return "💧";
  if (n.includes("atta")) return "🌾";
  if (n.includes("rice")) return "🍚";
  if (n.includes("dal")) return "🫘";
  if (n.includes("oil")) return "🛢️";
  return "🛒";
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  const addToCart = async (productId) => {
    try {
      await api.post(`/cart/items?productId=${productId}&quantity=1`);
      alert("Added to your basket 🧺");
    } catch (err) {
      console.error(err);
      alert("Please login first");
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await api.post(`/wishlist/${productId}`);
      alert("Added to wishlist ❤️");
    } catch (err) {
      console.error(err);
      alert("Please login first");
    }
  };

  const categoryNames = [
    "All",
    ...new Set(products.map((p) => p.category?.name || "Other")),
  ];

  let filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || p.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (sortBy === "priceLow")
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "priceHigh")
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "nameAZ")
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const grouped = filtered.reduce((acc, p) => {
    const catName = p.category?.name || "Other";
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(p);
    return acc;
  }, {});

  return (
    <div>
      <h1 style={{ fontSize: "32px" }}>Farm-fresh, delivered fast</h1>
      <p style={{ color: "#5A6B5C", marginBottom: "20px" }}>
        Handpicked groceries from local stalls to your door.
      </p>

      <div style={styles.controls}>
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={styles.select}
        >
          {categoryNames.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={styles.select}
        >
          <option value="default">Sort: Default</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="nameAZ">Name: A-Z</option>
        </select>
      </div>

      {Object.keys(grouped).length === 0 && (
        <p>No products match your search.</p>
      )}

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} style={{ marginBottom: "36px" }}>
          <h2 style={styles.categoryTitle}>{category}</h2>
          <div style={styles.grid}>
            {items.map((p) => (
              <div key={p.id} style={styles.card}>
                <div style={styles.badge}>Fresh</div>
                <Link
                  to={`/product/${p.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div style={styles.imgBox}>
                    {p.imageUrl ? (
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      getEmoji(p.name)
                    )}
                  </div>
                  <h3 style={styles.name}>{p.name}</h3>
                </Link>
                <p style={styles.price}>₹{p.price}</p>
                <button onClick={() => addToCart(p.id)} style={styles.addBtn}>
                  Add to Basket
                </button>
                <button
                  onClick={() => addToWishlist(p.id)}
                  style={styles.wishlistBtn}
                >
                  ❤️ Wishlist
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  controls: {
    display: "flex",
    gap: "12px",
    marginBottom: "28px",
    flexWrap: "wrap",
  },
  searchInput: {
    flex: "1 1 220px",
    padding: "10px 14px",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    fontSize: "14px",
  },
  select: {
    padding: "10px 14px",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    fontSize: "14px",
    background: "white",
  },
  categoryTitle: {
    fontSize: "22px",
    marginBottom: "14px",
    color: "var(--green)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
    gap: "18px",
  },
  card: {
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: "14px",
    padding: "16px",
    position: "relative",
    textAlign: "center",
  },
  badge: {
    position: "absolute",
    top: "-10px",
    left: "-10px",
    background: "var(--yellow)",
    color: "var(--text)",
    fontSize: "11px",
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: "6px",
    transform: "rotate(-8deg)",
  },
  imgBox: {
    fontSize: "44px",
    background: "#F0F5EC",
    borderRadius: "10px",
    padding: "20px 0",
    marginBottom: "10px",
  },
  name: { fontSize: "15px", margin: "0 0 4px 0" },
  price: {
    fontWeight: 700,
    color: "var(--green)",
    fontSize: "17px",
    margin: "0 0 10px 0",
  },
  addBtn: {
    width: "100%",
    background: "var(--green)",
    color: "white",
    padding: "9px",
    fontWeight: 600,
    borderRadius: "8px",
  },
  wishlistBtn: {
    width: "100%",
    background: "transparent",
    color: "var(--orange)",
    padding: "6px",
    fontWeight: 600,
    fontSize: "13px",
    marginTop: "6px",
    border: "1px solid var(--orange)",
    borderRadius: "8px",
  },
};
