import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.sidebar}>

      {/* Logo */}
      <div>
        <h2 style={styles.logo}>
          <span style={styles.habit}>Habit</span>
          <span style={styles.tracker}> Tracker</span>
        </h2>

        <div style={styles.line}></div>

        {/* Menu */}
        <div style={styles.menu}>

          <button
            style={styles.activeLink}
            onClick={() => navigate("/dashboard")}
          >
            🏠
            <span>Dashboard</span>
          </button>

          <button
            style={styles.link}
            onClick={() => navigate("/dashboard")}
          >
            ✓
            <span>My Habits</span>
          </button>

          <button
            style={styles.link}
            onClick={()=> navigate("/stats")}
          >
            📊
            <span>Stats</span>
          </button>

        </div>
      </div>

      {/* Logout */}
      <button
        style={styles.logout}
        onClick={handleLogout}
      >
        ↪ Logout
      </button>

    </div>
  );
}

const styles = {
  sidebar: {
    width: "230px",
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    borderRight: "1px solid #1e293b",
    padding: "25px 15px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  logo: {
    textAlign: "center",
    margin: "5px 0 20px",
    fontSize: "21px",
  },

  habit: {
    color: "#14b8a6",
    fontWeight: "700",
  },

  tracker: {
    color: "#f1f5f9",
    fontWeight: "700",
  },

  line: {
    height: "1px",
    backgroundColor: "#1e293b",
    marginBottom: "20px",
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  link: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "transparent",
    color: "#94a3b8",
    textAlign: "left",
    fontSize: "14px",
    cursor: "pointer",
  },

  activeLink: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "rgba(20, 184, 166, 0.12)",
    color: "#14b8a6",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },

  logout: {
    width: "100%",
    padding: "11px",
    border: "1px solid rgba(239, 68, 68, 0.4)",
    borderRadius: "8px",
    backgroundColor: "rgba(239, 68, 68, 0.08)",
    color: "#ef4444",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default Sidebar;