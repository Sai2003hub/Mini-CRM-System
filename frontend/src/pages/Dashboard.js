import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalDeals: 0,
    totalRevenue: 0,
    dealsByStage: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={styles.container}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1>Dashboard</h1>
      
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Total Leads</h3>
          <p style={styles.number}>{stats.totalLeads}</p>
        </div>
        
        <div style={styles.card}>
          <h3>Total Deals</h3>
          <p style={styles.number}>{stats.totalDeals}</p>
        </div>
        
        <div style={styles.card}>
          <h3>Total Revenue</h3>
          <p style={styles.number}>₹{stats.totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {stats.dealsByStage.length > 0 && (
        <div style={styles.stageSection}>
          <h2>Deals by Stage</h2>
          <div style={styles.stageGrid}>
            {stats.dealsByStage.map((stage) => (
              <div key={stage._id} style={styles.stageCard}>
                <h4>{stage._id}</h4>
                <p>Count: {stage.count}</p>
                <p>Total: ₹{stage.total.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  card: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  number: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#007bff',
    margin: '10px 0 0 0',
  },
  stageSection: {
    marginTop: '40px',
  },
  stageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginTop: '20px',
  },
  stageCard: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '6px',
    border: '1px solid #dee2e6',
  },
};

export default Dashboard;