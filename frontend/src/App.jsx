import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
  });

  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);

  const API = "http://localhost:5000";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ REGISTER USER
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/users`, form);
      setUsers([res.data, ...users]);
      setForm({ name: "", email: "", password: "", phone: "", gender: "" });
      alert("✅ User Registered");
    } catch (err) {
      alert("❌ Registration Failed");
    }
  };

  // ✅ GET ALL USERS
  const getUsers = async () => {
    try {
      const res = await axios.get(`${API}/api/users`);
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ TOGGLE USER DETAILS (CLICK → SHOW, CLICK AGAIN → HIDE)
  const getUserDetail = async (id) => {
    try {
      if (selected && selected._id === id) {
        setSelected(null); // ✅ HIDE DETAILS
      } else {
        const res = await axios.get(`${API}/api/users/${id}`);
        setSelected(res.data); // ✅ SHOW DETAILS
      }
    } catch (err) {
      alert("❌ Detail load nahi ho rahi");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Jitendra Registration System</h1>

      <div style={styles.grid}>
        {/* ✅ REGISTER FORM */}
        <div style={styles.card}>
          <h2 style={styles.subHeading}>Register User</h2>

          <form onSubmit={submitForm}>
            <input style={styles.input} name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
            <input style={styles.input} type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
            <input style={styles.input} type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            <input style={styles.input} name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />

            <select style={styles.input} name="gender" value={form.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <button style={styles.button}>Submit</button>
          </form>
        </div>

        {/* ✅ USER LIST */}
        <div style={styles.card}>
          <h2 style={styles.subHeading}>Users</h2>

          <div style={{ maxHeight: "350px", overflowY: "auto" }}>
            {users.map((u) => (
              <div
                key={u._id}
                style={{
                  ...styles.userItem,
                  ...(selected && selected._id === u._id ? styles.activeUser : {}),
                }}
                onClick={() => getUserDetail(u._id)}
              >
                <b>{u.name}</b>
                <span style={styles.email}>{u.email}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ USER DETAILS */}
        <div style={styles.card}>
          <h2 style={styles.subHeading}>User Details</h2>

          {selected ? (
            <div>
              <p><b>Name:</b> {selected.name}</p>
              <p><b>Email:</b> {selected.email}</p>
              <p><b>Phone:</b> {selected.phone}</p>
              <p><b>Gender:</b> {selected.gender}</p>
              <p><b>Created:</b> {new Date(selected.createdAt).toLocaleString()}</p>
            </div>
          ) : (
            <p style={{ color: "#777" }}>Select any user to view details</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ✅ ✅ FINAL PROFESSIONAL STYLING */
const styles = {
  container: {
    minHeight: "100vh",
    background: "#f1f5f9",
    padding: "30px",
    fontFamily: "Arial",
  },

  heading: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "30px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "25px",
    maxWidth: "1200px",
    margin: "auto",
  },

  card: {
    background: "#fff",
    padding: "22px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },

  subHeading: {
    textAlign: "center",
    marginBottom: "15px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },

  userItem: {
    padding: "10px",
    marginBottom: "8px",
    background: "#f1f5f9",
    borderRadius: "6px",
    cursor: "pointer",
  },

  activeUser: {
    background: "#bae6fd",
  },

  email: {
    display: "block",
    fontSize: "12px",
    color: "#555",
  },
};

export default App;
