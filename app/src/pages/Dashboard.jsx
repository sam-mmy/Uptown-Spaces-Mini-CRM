import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#2563eb", "#10b981", "#f59e0b"];

function Dashboard() {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await getDashboardStats();
      setStats(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) return null;

  return (
    <div className="page-container">

      <h2>Dashboard</h2>

      {/* ROW 1 → KPI CARDS */}

      <div className="dashboard-kpi-row">

        <div className="dashboard-kpi-card">
          <p>Total Leads</p>
          <h1>{stats.totalLeads}</h1>
        </div>

        <div className="dashboard-kpi-card">
          <p>Conversion Rate</p>

          <h1
            style={{
              color:
                stats.conversionRate > 30
                  ? "#10b981"
                  : stats.conversionRate > 10
                  ? "#f59e0b"
                  : "#ef4444"
            }}
          >
            {stats.conversionRate}%
          </h1>

        </div>

      </div>


      {/* ROW 2 → PIE CHART FULL WIDTH */}

      <div className="dashboard-chart-card">

        <h3>Leads by Source</h3>

        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={stats.leadsBySource}
              dataKey="count"
              nameKey="source"
              outerRadius={110}
              label
            >
              {stats.leadsBySource.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>


      {/* ROW 3 → BAR CHART FULL WIDTH */}

      <div className="dashboard-chart-card">

        <h3>Status Distribution</h3>

        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={stats.statusDistribution}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="status" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar dataKey="count">

              {stats.statusDistribution.map((entry, index) => (

                <Cell
                  key={index}
                  fill={
                    entry.status === "Closed"
                      ? "#10b981"
                      : entry.status === "Contacted"
                      ? "#f59e0b"
                      : "#2563eb"
                  }
                />

              ))}

            </Bar>

          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default Dashboard;