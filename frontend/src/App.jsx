import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", gender: "" });
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);

  const API = "http://localhost:5000";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${API}/api/users`, form);
    setUsers([res.data, ...users]);
    setForm({ name: "", email: "", password: "", phone: "", gender: "" });
  };

  const getUsers = async () => {
    const res = await axios.get(`${API}/api/users`);
    setUsers(res.data);
  };

  // Updated Toggle Logic
  const getUserDetail = async (id) => {
    if (selected && selected._id === id) {
      setSelected(null); // hide details if clicked again
    } else {
      const res = await axios.get(`${API}/api/users/${id}`);
      setSelected(res.data);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div style={styles.container}>

      <h1 style={styles.heading}>Welcome to Jitendra Registration System</h1>

      <div style={styles.wrapper}>
        
        {/* ------- Register Card -------- */}
        <form onSubmit={submitForm} style={styles.card}>
          <h2 style={styles.subHeading}>Register User</h2>

          <input style={styles.input} name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
          <input style={styles.input} name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
          <input style={styles.input} name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
          <input style={styles.input} name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />

          <select style={styles.input} name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <button style={styles.button}>Submit</button>
        </form>


        {/* ------- User List Card -------- */}
        <div style={styles.card}>
          <h2 style={styles.subHeading}>Users</h2>

          <div style={{ maxHeight: "350px", overflowY: "auto" }}>
            {users.map((u) => (
              <div
                key={u._id}
                style={{
                  ...styles.userItem,
                  ...(selected && selected._id === u._id ? styles.selectedUser : {}),
                }}
                onClick={() => getUserDetail(u._id)}
              >
                {u.name}
                <span style={styles.email}>{u.email}</span>
              </div>
            ))}
          </div>
        </div>


        {/* ------- Details Card -------- */}
        <div style={styles.card}>
          <h2 style={styles.subHeading}>User Details</h2>

          {selected ? (
            <div>
              <p><b>Name:</b> {selected.name}</p>
              <p><b>Email:</b> {selected.email}</p>
              <p><b>Phone:</b> {selected.phone}</p>
              <p><b>Gender:</b> {selected.gender}</p>
              <p><b>Created At:</b> {new Date(selected.createdAt).toLocaleString()}</p>
            </div>
          ) : (
            <p style={{ color: "#777" }}>Click on a user to view complete details</p>
          )}
        </div>
      </div>
    </div>
  );
}


/* ------------ Styling ------------- */
const styles = {
  container: {
    fontFamily: "Inter, sans-serif",
    backgroundColor: "#f1f5f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
    overflowX: "hidden",
  },

  heading: {
    textAlign: "center",
    marginBottom: "40px",
    fontSize: "32px",
    fontWeight: "700",
    color: "#111827",
  },

  wrapper: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: "1200px",
  },

  card: {
    width: "330px",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0px 4px 18px rgba(0,0,0,0.1)",
  },

  subHeading: {
    marginBottom: "15px",
    fontSize: "21px",
    fontWeight: "600",
    color: "#111827",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    transition: "0.2s",
  },

  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "5px",
    fontSize: "16px",
  },

  userItem: {
    padding: "10px",
    borderBottom: "1px solid #e5e7eb",
    cursor: "pointer",
    transition: "0.2s",
  },

  selectedUser: {
    backgroundColor: "#e0f2fe",
    borderRadius: "6px",
  },

  email: {
    display: "block",
    fontSize: "12px",
    color: "#6b7280",
  },
};

export default App;
