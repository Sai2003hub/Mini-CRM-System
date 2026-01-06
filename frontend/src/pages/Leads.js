import React, { useState, useEffect } from 'react';
import { getLeads, createLead,updateLead,deleteLead, convertLeadToDeal } from '../services/api';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'New',
  });
  const [convertAmount, setConvertAmount] = useState({});

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await getLeads();
      setLeads(response.data);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Validate phone number (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      alert('Phone number must be exactly 10 digits');
      return;
    }
    
    try {
      await createLead(formData);
      setFormData({ name: '', email: '', phone: '', status: 'New' });
      setShowForm(false);
      fetchLeads();
      alert('Lead created successfully!');
    } catch (error) {
      alert('Failed to create lead');
    }
  };

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      await updateLead(leadId, { status: newStatus });
      fetchLeads();
      alert('Lead status updated successfully!');
    } catch (error) {
      alert('Failed to update lead status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await deleteLead(id);
        fetchLeads();
        alert('Lead deleted successfully!');
      } catch (error) {
        alert('Failed to delete lead');
      }
    }
  };

  const handleConvert = async (leadId) => {
    const amount = convertAmount[leadId] || 0;
    try {
      await convertLeadToDeal(leadId, amount);
      fetchLeads();
      alert('Lead converted to deal successfully!');
    } catch (error) {
      alert('Failed to convert lead');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Leads</h1>
        <button onClick={() => setShowForm(!showForm)} style={styles.addButton}>
          {showForm ? 'Cancel' : '+ Add Lead'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            style={styles.input}
          />
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            style={styles.input}
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
          </select>
          <button type="submit" style={styles.submitButton}>Create Lead</button>
        </form>
      )}

      <div style={styles.leadsContainer}>
        {leads.length === 0 ? (
          <p>No leads found. Create your first lead!</p>
        ) : (
          leads.map((lead) => (
            <div key={lead._id} style={styles.leadCard}>
              <h3>{lead.name}</h3>
              <p>Email: {lead.email || 'N/A'}</p>
              <p>Phone: {lead.phone || 'N/A'}</p>
              <p>Status: <strong>{lead.status}</strong></p>
              
              {lead.status !== 'Converted' && (
                <>
                  <div style={styles.statusSection}>
                    <label style={styles.label}>Update Status:</label>
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                      style={styles.statusSelect}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                    </select>
                  </div>
                  
                  <div style={styles.convertSection}>
                    <input
                      type="number"
                      placeholder="Deal amount"
                      value={convertAmount[lead._id] || ''}
                      onChange={(e) => setConvertAmount({ ...convertAmount, [lead._id]: e.target.value })}
                      style={styles.amountInput}
                    />
                    <button onClick={() => handleConvert(lead._id)} style={styles.convertButton}>
                      Convert to Deal
                    </button>
                  </div>
                </>
              )}
              
              <button onClick={() => handleDelete(lead._id)} style={styles.deleteButton}>
                Delete
              </button>
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  form: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  leadsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  leadCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  statusSection: {
    marginTop: '15px',
    marginBottom: '10px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  statusSelect: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  convertSection: {
    marginTop: '10px',
    display: 'flex',
    gap: '10px',
  },
  amountInput: {
    flex: 1,
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  convertButton: {
    padding: '8px 15px',
    backgroundColor: '#ffc107',
    color: 'black',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    marginTop: '10px',
    padding: '8px 15px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Leads;