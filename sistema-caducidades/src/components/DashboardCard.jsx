// src/components/DashboardCard.jsx
export default function DashboardCard({ title, value, color }) {
  return (
    <div className="dashboard-card">
      <h3>{title}</h3>
      <div className="value" style={{ color }}>{value}</div>
    </div>
  );
}
