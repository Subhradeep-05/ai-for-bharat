import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import "./Graphs.css";

const Graphs = () => {
  // Service Usage Data
  const serviceData = [
    { name: "Document Services", value: 75, color: "#FF9933" },
    { name: "Schema Information", value: 60, color: "#138808" },
    { name: "AI Assistance", value: 85, color: "#000080" },
    { name: "Payment Services", value: 45, color: "#FFB366" },
    { name: "Complaints", value: 55, color: "#4CAF50" },
    { name: "Information", value: 70, color: "#1A237E" },
  ];

  // Regional Adoption Data
  const regionalData = [
    { name: "North", usage: 35, growth: 12 },
    { name: "South", usage: 28, growth: 15 },
    { name: "East", usage: 22, growth: 18 },
    { name: "West", usage: 15, growth: 10 },
    { name: "Central", usage: 25, growth: 14 },
  ];

  // Monthly Growth Data
  const growthData = [
    { month: "Jan", users: 500, queries: 1200 },
    { month: "Feb", users: 750, queries: 1800 },
    { month: "Mar", users: 1100, queries: 2500 },
    { month: "Apr", users: 1500, queries: 3200 },
    { month: "May", users: 2000, queries: 4000 },
    { month: "Jun", users: 2500, queries: 5200 },
  ];

  // Language Distribution Data
  const languageData = [
    { name: "Hindi", value: 40, color: "#FF9933" },
    { name: "English", value: 25, color: "#138808" },
    { name: "Tamil", value: 10, color: "#000080" },
    { name: "Telugu", value: 8, color: "#FFB366" },
    { name: "Bengali", value: 7, color: "#4CAF50" },
    { name: "Others", value: 10, color: "#1A237E" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className="tooltip-value"
              style={{ color: entry.color }}
            >
              {entry.dataKey}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="graphs-section" id="graphs">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge">
            <span className="badge-dot"></span>
            Analytics Dashboard
          </div>
          <h2 className="section-title">
            Data-Driven <span>Insights</span>
          </h2>
          <p className="section-description">
            Real-time analytics and insights showing the impact of AI on
            government services.
          </p>
        </motion.div>

        <motion.div
          className="graphs-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Service Usage Chart */}
          <motion.div className="graph-card" variants={itemVariants}>
            <div className="graph-header">
              <h3 className="graph-title">Service Usage Distribution</h3>
              <div className="graph-badge">Live</div>
            </div>
            <div className="graph-content">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={serviceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#666" fontSize={12} />
                  <YAxis
                    stroke="#666"
                    fontSize={12}
                    label={{
                      value: "Usage %",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="value"
                    name="Usage Percentage"
                    radius={[10, 10, 0, 0]}
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="graph-footer">
              <div className="graph-stats">
                <div className="stat-item">
                  <div className="stat-value">85%</div>
                  <div className="stat-label">Highest Usage</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">45%</div>
                  <div className="stat-label">Lowest Usage</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Regional Adoption */}
          <motion.div className="graph-card" variants={itemVariants}>
            <div className="graph-header">
              <h3 className="graph-title">Regional Adoption</h3>
              <div className="graph-badge trend">+15%</div>
            </div>
            <div className="graph-content">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={regionalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="usage"
                    name="Adoption %"
                    stroke="#FF9933"
                    fill="url(#colorUsage)"
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF9933" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#FF9933" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="graph-footer">
              <div className="graph-stats">
                <div className="stat-item">
                  <div className="stat-value">35%</div>
                  <div className="stat-label">North India</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">+18%</div>
                  <div className="stat-label">East Growth</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Growth Trend */}
          <motion.div className="graph-card" variants={itemVariants}>
            <div className="graph-header">
              <h3 className="graph-title">Monthly Growth Trend</h3>
              <div className="graph-badge success">↑ 42%</div>
            </div>
            <div className="graph-content">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="users"
                    name="Users (in 1000s)"
                    stroke="#000080"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="queries"
                    name="Queries (in 1000s)"
                    stroke="#138808"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="graph-footer">
              <div className="graph-stats">
                <div className="stat-item">
                  <div className="stat-value">+250%</div>
                  <div className="stat-label">User Growth</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">+333%</div>
                  <div className="stat-label">Query Growth</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Language Distribution */}
          <motion.div className="graph-card" variants={itemVariants}>
            <div className="graph-header">
              <h3 className="graph-title">Language Distribution</h3>
              <div className="graph-badge">12 Languages</div>
            </div>
            <div className="graph-content">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={languageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {languageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="graph-footer">
              <div className="graph-stats">
                <div className="stat-item">
                  <div className="stat-value">40%</div>
                  <div className="stat-label">Hindi</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">25%</div>
                  <div className="stat-label">English</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Insights */}
        <motion.div
          className="insights-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="insight-card">
            <div className="insight-icon">📈</div>
            <h4 className="insight-title">Exponential Growth</h4>
            <p className="insight-text">
              300% increase in platform adoption in 6 months
            </p>
          </div>
          <div className="insight-card">
            <div className="insight-icon">🎯</div>
            <h4 className="insight-title">High Engagement</h4>
            <p className="insight-text">
              85% of users return weekly for services
            </p>
          </div>
          <div className="insight-card">
            <div className="insight-icon">🌍</div>
            <h4 className="insight-title">Pan-India Reach</h4>
            <p className="insight-text">
              Services accessed from 98% of Indian districts
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Graphs;
