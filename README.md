# Campus Lost & Found - Frontend

## 📖 Overview
This repository contains the **frontend source code** for the Campus Lost and Found Portal. The web application provides the user interface for students and administrators to interact with the platform, report lost items, find found items, and manage community content.

> ⚠️ **Note:** This project consumes the APIs provided by the **Campus Lost & Found - Backend** and is currently under development.

---

## ✨ Features & Pages

### 🔐 Authentication
- Login & Registration pages  
- Email verification flow for campus members  
- Protected routes for authenticated users  

### 📝 Lost & Found Feed
- Main dashboard to view recent lost and found item posts  
- Advanced search and filtering by category, location, and keywords  

### ➕ Submit Post
- Dedicated form to submit new lost or found items  
- Support for **image uploads**  

### 💡 Matching Suggestions
- Page displaying automatically suggested matches for a user's lost items  

### 💬 Messaging Interface
- Real-time chat interface for secure communication about matched items  

### 👨‍💻 Admin Panel
- Dashboard for administrators to moderate posts  
- View all submitted items and flagged content  
- Tools to approve, edit, or delete posts  
- Analytics dashboard for platform usage statistics  

---

## 🛠️ Tech Stack (Proposed)
- **Framework:** React  
- **Styling:** Tailwind CSS  
- **State Management:** React Context API / Redux Toolkit  
- **Routing:** React Router  
- **API Communication:** Axios  
- **Build Tool:** Vite / Create React App  

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)  
- npm or yarn  

### Installation & Setup
```bash
# Clone the repository
git clone https://github.com/jitabhsin/CampusManagement-frontend.git

# Navigate to project directory
cd CampusManagement-frontend

# Install dependencies
npm install
