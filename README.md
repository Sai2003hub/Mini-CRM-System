# Mini CRM System

A full-stack Customer Relationship Management (CRM) application built with the MERN stack. This system helps sales teams manage leads, convert them to deals, track deal stages, and view real-time analytics.

## 🚀 Features

### User Authentication
- Secure user registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes and user-specific data

### Lead Management
- Create, read, update, and delete leads
- Track lead status (New, Contacted, Qualified, Converted)
- Email and phone number validation
- Convert qualified leads to deals

### Deal Management
- Manage sales deals with multiple stages (Open, Proposal, Negotiation, Won, Lost)
- Update deal amounts and stages
- Track deal creation dates
- Delete deals

### Dashboard Analytics
- View total leads count
- View total deals count
- Track total revenue (from Won deals only)
- Breakdown of deals by stage with counts and totals

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Context API** - State management

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/mini-zoho-crm.git
cd mini-zoho-crm
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file in backend directory
touch .env
```

Add the following to your `.env` file:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

```bash
# Start the backend server
node server.js
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
mini-zoho-crm/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Lead.js
│   │   └── Deal.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── lead.js
│   │   └── deal.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   ├── Leads.js
    │   │   └── Deals.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Leads
- `GET /api/leads` - Get all leads (authenticated)
- `POST /api/leads` - Create a new lead
- `PUT /api/leads/:id` - Update a lead
- `DELETE /api/leads/:id` - Delete a lead

### Deals
- `GET /api/deals` - Get all deals (authenticated)
- `POST /api/deals` - Create a new deal
- `POST /api/deals/convert/:leadId` - Convert lead to deal
- `PUT /api/deals/:id` - Update a deal
- `DELETE /api/deals/:id` - Delete a deal
- `GET /api/deals/stats/dashboard` - Get dashboard statistics

## 🔐 Authentication Flow

1. User registers with name, email, and password
2. Password is hashed using bcrypt before storing
3. User logs in with email and password
4. Backend verifies credentials and generates JWT token
5. Token is stored in localStorage on the frontend
6. Token is sent with every API request in Authorization header
7. Backend middleware verifies token and allows/denies access

## 💡 Key Features Explained

### Lead to Deal Conversion
When a lead is qualified and ready for sales:
1. User clicks "Convert to Deal" and enters deal amount
2. System creates a new deal with title "Deal - [Lead Name]"
3. Lead status is updated to "Converted"
4. Deal appears in the Deals page and dashboard statistics

### Revenue Calculation
- Only deals with stage "Won" are counted as revenue
- Other stages (Open, Proposal, Negotiation, Lost) are not counted
- This follows standard accounting practices where revenue is only recognized when deals close

### Multi-tenancy
- Each user has their own isolated data
- Users can only view and manage their own leads and deals
- Data isolation is enforced through MongoDB owner field queries

## 🚀 Usage

1. **Register** a new account or **Login** with existing credentials
2. Navigate to **Leads** page to create and manage leads
3. Update lead status as you progress (New → Contacted → Qualified)
4. **Convert** qualified leads to deals with monetary values
5. View and update deals in the **Deals** page
6. Track progress on the **Dashboard** with real-time analytics

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT tokens with 1-hour expiration
- Protected API routes requiring authentication
- User-specific data access (owner-based queries)
- Input validation for email and phone numbers

## 🌟 Future Enhancements

- Role-based access control (Admin vs Sales Rep)
- Advanced analytics with charts and graphs
- Email integration for automated communication
- Search and filter functionality
- Export data to CSV/PDF
- Real-time updates with WebSockets
- Activity timeline for leads and deals

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Your Name
- GitHub: [@Sai2003hub](https://github.com/Sai2003hub)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/saiakshaya-r/)

## 📧 Contact

For any queries or suggestions, please reach out at saiakshaya2003@gmail.com

