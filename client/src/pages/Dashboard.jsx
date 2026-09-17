import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setHabits } from "../redux/habitSlice";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const dispatch = useDispatch();

  const habits = useSelector((state) => state.habits.habits);

  // Check whether the habit is completed today
  const isCompletedToday = (dates) => {
    if (!dates || dates.length === 0) {
      return false;
    }

    const lastDate = new Date(dates[dates.length - 1]);
    const today = new Date();

    return lastDate.toDateString() === today.toDateString();
  };

  // Fetch all habits
  const fetchHabits = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/habits",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setHabits(res.data));
    } catch (error) {
      console.log("Error fetching habits:", error);
    }
  };

  // Create habit
  const createHabit = async () => {
    if (!title.trim()) {
      alert("Please enter a habit");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/habits",
        {
          title: title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");

      fetchHabits();
    } catch (error) {
      console.log("Error creating habit:", error);
    }
  };

  // Complete habit
  const markComplete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/habits/${id}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchHabits();
    } catch (error) {
      console.log("Error completing habit:", error);
    }
  };

  // Delete habit
  const deleteHabit = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/habits/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchHabits();
    } catch (error) {
      console.log("Error deleting habit:", error);
    }
  };

  // Update habit
  const updateHabit = async (id) => {
    if (!editText.trim()) {
      alert("Habit title cannot be empty");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/habits/${id}`,
        {
          title: editText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditId(null);
      setEditText("");

      fetchHabits();
    } catch (error) {
      console.log("Error updating habit:", error);
    }
  };

  // Load habits when Dashboard opens
  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div style={styles.layout}>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard */}
      <div style={styles.main}>

        <div style={styles.wrapper}>

          {/* Header */}
          <div style={styles.header}>
            <div>
              <h1 style={styles.heading}>
                My Habits
              </h1>

              <p style={styles.subtitle}>
                Build consistency. Become better.
              </p>
            </div>

            <div style={styles.count}>
              {habits.length} Habits
            </div>
          </div>

          {/* Add Habit */}
          <div style={styles.inputBox}>

            <input
              type="text"
              placeholder="Enter a new habit..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  createHabit();
                }
              }}
              style={styles.input}
            />

            <button
              onClick={createHabit}
              style={styles.addButton}
            >
              + Add
            </button>

          </div>

          {/* Habit Cards */}
          <div>

            {habits.length === 0 ? (

              <div style={styles.empty}>
                <h3>No habits yet</h3>

                <p>
                  Add your first habit to get started.
                </p>
              </div>

            ) : (

              habits.map((habit) => {

                const completed = isCompletedToday(
                  habit.completedDates
                );

                return (
                  <div
                    key={habit._id}
                    style={{
                      ...styles.card,
                      ...(completed
                        ? styles.completedCard
                        : {}),
                    }}
                  >

                    {/* Edit Mode */}
                    {editId === habit._id ? (

                      <div style={styles.editBox}>

                        <input
                          value={editText}
                          onChange={(e) =>
                            setEditText(e.target.value)
                          }
                          style={styles.editInput}
                        />

                        <button
                          onClick={() =>
                            updateHabit(habit._id)
                          }
                          style={styles.saveButton}
                        >
                          Save
                        </button>

                        <button
                          onClick={() => {
                            setEditId(null);
                            setEditText("");
                          }}
                          style={styles.cancelButton}
                        >
                          Cancel
                        </button>

                      </div>

                    ) : (

                      <>
                        <h3 style={styles.title}>
                          {habit.title}
                        </h3>

                        <p style={styles.streak}>
                          🔥 Streak: {habit.streak} days
                        </p>
                      </>

                    )}

                    {/* Buttons */}
                    <div style={styles.buttons}>

                      {completed ? (

                        <button
                          style={styles.completedButton}
                          disabled
                        >
                          ✓ Completed
                        </button>

                      ) : (

                        <button
                          onClick={() =>
                            markComplete(habit._id)
                          }
                          style={styles.completeButton}
                        >
                          Complete
                        </button>

                      )}

                      <button
                        onClick={() => {
                          setEditId(habit._id);
                          setEditText(habit.title);
                        }}
                        style={styles.editButton}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteHabit(habit._id)
                        }
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                );
              })

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

const styles = {
  // Main layout
  layout: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#020617",
  },

  // Main content
  main: {
    flex: 1,
    padding: "30px",
    backgroundColor: "#020617",
    color: "white",
    boxSizing: "border-box",
  },

  wrapper: {
    maxWidth: "850px",
    margin: "0 auto",
  },

  // Header
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  heading: {
    margin: "0",
    color: "#14b8a6",
    fontSize: "28px",
  },

  subtitle: {
    margin: "5px 0 0",
    color: "#94a3b8",
    fontSize: "14px",
  },

  count: {
    color: "#14b8a6",
    border: "1px solid #14b8a6",
    padding: "8px 14px",
    borderRadius: "20px",
    fontSize: "13px",
  },

  // Add habit
  inputBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px",
    padding: "12px",
    borderRadius: "12px",
    backgroundColor: "#0f172a",
    border: "1px solid #1e293b",
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "7px",
    border: "1px solid #334155",
    backgroundColor: "#020617",
    color: "white",
    outline: "none",
  },

  addButton: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "7px",
    backgroundColor: "#14b8a6",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },

  // Habit card
  card: {
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "14px",
    backgroundColor: "#0f172a",
    border: "1px solid #1e293b",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
  },

  completedCard: {
    backgroundColor: "rgba(20, 184, 166, 0.12)",
    border: "1px solid #14b8a6",
  },

  title: {
    margin: "0 0 8px",
    color: "#f1f5f9",
    fontSize: "19px",
  },

  streak: {
    margin: "0 0 15px",
    color: "#f97316",
  },

  // Buttons
  buttons: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },

  completeButton: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "7px",
    backgroundColor: "#14b8a6",
    color: "white",
    cursor: "pointer",
  },

  completedButton: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "7px",
    backgroundColor: "#059669",
    color: "white",
  },

  editButton: {
    padding: "8px 14px",
    borderRadius: "7px",
    border: "1px solid #14b8a6",
    backgroundColor: "transparent",
    color: "#14b8a6",
    cursor: "pointer",
  },

  deleteButton: {
    padding: "8px 14px",
    borderRadius: "7px",
    border: "1px solid #ef4444",
    backgroundColor: "transparent",
    color: "#ef4444",
    cursor: "pointer",
  },

  // Edit
  editBox: {
    display: "flex",
    gap: "8px",
  },

  editInput: {
    flex: 1,
    padding: "9px",
    borderRadius: "7px",
    border: "1px solid #14b8a6",
    backgroundColor: "#020617",
    color: "white",
    outline: "none",
  },

  saveButton: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "7px",
    backgroundColor: "#14b8a6",
    color: "white",
    cursor: "pointer",
  },

  cancelButton: {
    padding: "8px 14px",
    border: "1px solid #475569",
    borderRadius: "7px",
    backgroundColor: "transparent",
    color: "#94a3b8",
    cursor: "pointer",
  },

  // Empty state
  empty: {
    textAlign: "center",
    padding: "50px",
    borderRadius: "14px",
    backgroundColor: "#0f172a",
    border: "1px dashed #334155",
    color: "#94a3b8",
  },
};

export default Dashboard;