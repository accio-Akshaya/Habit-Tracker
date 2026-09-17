import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

function Navbar(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = ()=>{
        dispatch(logout());
        localStorage.removeItem("token");
        navigate("/login");
    };

    return(
        <div style={styles.navbar}>
            <h2 style={styles.logo}>Habit Tracker</h2>
            <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
            </button>
        </div>
    );
}
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "rgba(15, 23, 42, 0.6)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(20, 184, 166, 0.2)",
    color: "white",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  habit: {
    color: "#14b8a6",
  },
  logoutBtn: {
    background: "transparent",
    border: "1px solid #14b8a6",
    color: "#14b8a6",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Navbar;