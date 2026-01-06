import React, { useState, useEffect } from 'react';
import { getDeals, updateDeal, deleteDeal } from '../services/api';

const Deals = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const response = await getDeals();
      setDeals(response.data);
    } catch (error) {
      console.error('Failed to fetch deals:', error);
    }
  };

  const handleStageChange = async (id, newStage) => {
    try {
      await updateDeal(id, { stage: newStage });
      fetchDeals();
      alert('Deal stage updated successfully!');
    } catch (error) {
      alert('Failed to update deal');
    }
  };

  const handleAmountChange = async (id, newAmount) => {
    try {
      await updateDeal(id, { amount: parseFloat(newAmount) });
      fetchDeals();
      alert('Deal amount updated successfully!');
    } catch (error) {
      alert('Failed to update deal');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await deleteDeal(id);
        fetchDeals();
        alert('Deal deleted successfully!');
      } catch (error) {
        alert('Failed to delete deal');
      }
    }
  };

  const getStageColor = (stage) => {
    const colors = {
      Open: '#007bff',
      Proposal: '#17a2b8',
      Negotiation: '#ffc107',
      Won: '#28a745',
      Lost: '#dc3545',
    };
    return colors[stage] || '#6c757d';
  };

  return (
    <div style={styles.container}>
      <h1>Deals</h1>

      <div style={styles.dealsContainer}>
        {deals.length === 0 ? (
          <p>No deals found. Convert some leads to deals!</p>
        ) : (
          deals.map((deal) => (
            <div key={deal._id} style={styles.dealCard}>
              <h3>{deal.title}</h3>
              <p style={styles.amount}>
                Amount: ₹{deal.amount?.toLocaleString() || 0}
              </p>
              
              <div style={styles.stageSection}>
                <span 
                  style={{
                    ...styles.stageBadge,
                    backgroundColor: getStageColor(deal.stage),
                  }}
                >
                  {deal.stage}
                </span>
              </div>

              <div style={styles.controls}>
                <select
                  value={deal.stage}
                  onChange={(e) => handleStageChange(deal._id, e.target.value)}
                  style={styles.select}
                >
                  <option value="Open">Open</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>

                <input
                  type="number"
                  placeholder="Update amount"
                  onBlur={(e) => {
                    if (e.target.value && e.target.value !== deal.amount.toString()) {
                      handleAmountChange(deal._id, e.target.value);
                    }
                  }}
                  style={styles.input}
                />
              </div>

              <button onClick={() => handleDelete(deal._id)} style={styles.deleteButton}>
                Delete
              </button>

              <p style={styles.date}>
                Created: {new Date(deal.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  dealsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  dealCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  amount: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#28a745',
    margin: '10px 0',
  },
  stageSection: {
    margin: '15px 0',
  },
  stageBadge: {
    display: 'inline-block',
    padding: '5px 15px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '15px',
  },
  select: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  input: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  deleteButton: {
    marginTop: '15px',
    padding: '8px 15px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
  date: {
    marginTop: '10px',
    fontSize: '12px',
    color: '#6c757d',
  },
};

export default Deals;