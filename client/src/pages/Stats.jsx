import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";

function Stats() {
  const habits = useSelector((state) => state.habits.habits);

  const totalHabits = habits.length;

  const completedToday = habits.filter((habit) => {
    if (!habit.completedDates || habit.completedDates.length === 0) {
      return false;
    }

    const lastDate = new Date(
      habit.completedDates[habit.completedDates.length - 1],
    );

    const today = new Date();

    return lastDate.toDateString() === today.toDateString();
  }).length;

  const totalCompletions = habits.reduce((total, habit) => {
    return total + (habit.completedDates?.length || 0);
  }, 0);

  const bestStreak =
    habits.length > 0
      ? Math.max(...habits.map((habit) => habit.streak || 0))
      : 0;

  return (
    <div style={styles.layout}>
      <Sidebar />

      <div style={styles.main}>
        <div style={styles.wrapper}>
          <h1 style={styles.heading}>Statistics</h1>

          <p style={styles.subtitle}>
            Track your habit progress and consistency.
          </p>

          <div style={styles.grid}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Total Habits</h3>
              <p style={styles.cardValue}>{totalHabits}</p>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Completed Today</h3>
              <p style={styles.cardValue}>{completedToday}</p>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Total Completions</h3>
              <p style={styles.cardValue}>{totalCompletions}</p>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Best Streak 🔥</h3>
              <p style={styles.cardValue}>{bestStreak} days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#020617",
  },

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

  heading: {
    margin: "0",
    color: "#14b8a6",
    fontSize: "28px",
  },

  subtitle: {
    color: "#94a3b8",
    margin: "5px 0 30px",
    fontSize: "14px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
  },

  card: {
    padding: "25px",
    borderRadius: "16px",
    backgroundColor: "#0f172a",
    border: "1px solid #1e293b",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
  },

  cardTitle: {
    margin: "0 0 12px",
    color: "#94a3b8",
    fontSize: "14px",
  },

  cardValue: {
    margin: "0",
    color: "#14b8a6",
    fontSize: "32px",
    fontWeight: "700",
  },
};

export default Stats;