import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

 const handleRegister = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      { name, email, password }
    );

    console.log(res.data); 

   
    localStorage.setItem("token", res.data.token);

    
    navigate("/dashboard");

  } catch (error) {
    console.log(error);
    alert("Register failed");
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.card}>

          <div style={styles.header}>
            <img src={logo} alt="logo" style={styles.logo} />
            <h2 style={styles.heading}>
              <span style={styles.habit}>Habit</span>
              <span style={styles.tracker}> Tracker</span>
            </h2>
          </div>

          <p style={styles.subText}>Start. Build. Stay Consistent</p>

          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          {/* Button */}
          <button onClick={handleRegister} style={styles.button}>
            Register
          </button>

          {/* Login redirect */}
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Already have an account?
            <button
              onClick={() => navigate("/")}
              style={styles.linkBtn}
            >
              Login
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100%",
    backgroundImage: "url('/src/assets/bg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
  },

  overlay: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: "rgba(15, 23, 42, 0.47)",
    padding: "20px",
    borderRadius: "14px",
    width: "280px",
    minHeight: "320px", // little extra for name field
    color: "white",
    backdropFilter: "blur(8px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    border: "2px solid rgba(16, 231, 206, 0.3)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "5px",
  },

  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0px",
  },

  logo: {
    width: "100px",
    height: "100px",
    margin: "0px",
    padding: "0px",
    display: "block",
  },

  heading: {
    textAlign: "center",
    margin: "0px",
    padding: "0px",
    fontSize: "22px",
    lineHeight: "1",
  },

  habit: {
    color: "#14b8a6",
    fontWeight: "bold",
  },

  tracker: {
    color: "white",
    fontWeight: "bold",
  },

  subText: {
    textAlign: "center",
    fontSize: "14px",
    color: "white",
    marginTop: "0px",
    marginBottom: "6px",
  },

  input: {
    width: "93%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#020617",
    color: "white",
  },

  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#14b8a6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "5px",
  },

  linkBtn: {
    marginLeft: "6px",
    color: "#14b8a6",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
};

export default Register;