# Lead Management CRM Dashboard

A full‑stack Lead Management CRM built using **React, Node.js, Express, MySQL, Sequelize, Joi, React Hook Form, Yup, Axios, and Recharts**. The application supports lead tracking, notes timeline, filtering, status workflow updates, and analytics dashboard charts.

---

# Tech Stack

## Backend

- Node.js (>= 18.x recommended)
- Express.js
- MySQL (>= 8.x recommended)
- Sequelize ORM
- Joi (validation)
- dotenv
- cors

## Frontend

- React (Vite setup)
- Axios
- React Hook Form
- Yup
- Recharts

---

# Project Features

## Lead Management

- Create Lead
- View Leads
- Filter by Source
- Filter by Status
- Search by Name / Phone
- Sort by Created Date
- Sort by Budget
- Pagination Support
- Soft Delete Structure

## Lead Detail Page

- View Lead Information
- Update Lead Status
- Add Notes
- Notes Timeline with Timestamp

## Dashboard Analytics

- Total Leads KPI
- Conversion Rate KPI
- Leads by Source Pie Chart
- Status Distribution Bar Chart

---

# Installation Guide

## Step 1 — Clone Repository

```
git clone git@github.com:sam-mmy/Uptown-Spaces-Mini-CRM.git
cd project-folder
```

## OR

Open the unzipped project folder in Code Editor

---

# Backend Setup

Navigate to backend folder:

```
cd api
```

Install dependencies:

```
npm install
```

## Backend Dependencies Installed

```
express
sequelize
mysql2
cors
dotenv
joi
nodemon
```

---

# Frontend Setup

Navigate to frontend folder:

```
cd client
```

Install dependencies:

```
npm install
```

## Frontend Dependencies Installed

```
react
axios
react-hook-form
yup
@hookform/resolvers
recharts
```

---

# MySQL Database Setup

## Install MySQL (If not already installed)

### macOS (using Homebrew)

```bash
brew install mysql
brew services start mysql

Open MySQL CLI:
```

### Windows

Download MySQL Installer from:

https://dev.mysql.com/downloads/installer/

Run the installer

Select **MySQL Server**

Set a root password during installation

Complete the setup wizard

Verify installation using Command Prompt:

```bash
mysql --version

mysql -u root -p

```

Create database:

```

CREATE DATABASE lead_crm;
USE lead_crm;

```

---

# Create Leads Table

Run:

```

CREATE TABLE leads (

id INT AUTO_INCREMENT PRIMARY KEY,

name VARCHAR(255) NOT NULL,

phone VARCHAR(20) NOT NULL,

email VARCHAR(255),

budget DECIMAL(12,2),

location VARCHAR(255),

property_type ENUM('1BHK','2BHK','3BHK','4BHK','Plot'),

source ENUM('Facebook','Google','Referral'),

status ENUM('New','Contacted','Site Visit','Closed') DEFAULT 'New',

created_at TIMESTAMP NULL,

updated_at TIMESTAMP NULL,

deleted_at TIMESTAMP NULL

);

```

---

# Create Notes Table

Run:

```

CREATE TABLE notes (

id INT AUTO_INCREMENT PRIMARY KEY,

lead_id INT NOT NULL,

note TEXT NOT NULL,

created_at TIMESTAMP NULL,

updated_at TIMESTAMP NULL,

deleted_at TIMESTAMP NULL,

FOREIGN KEY (lead_id) REFERENCES leads(id)

);

```

---

# Environment Variables Setup

Create `.env` file inside backend folder:

```

PORT=5001

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=your_password

DB_NAME=lead_crm

```

Update credentials according to your local MySQL configuration.

---

# Running Backend Server

Inside `/api` folder:

```

npm start

```

Server runs on:

```

http://localhost:5001

```

---

# Running Frontend Server

Inside `/client` folder:

```

npm run dev

```

Frontend runs on:

```

http://localhost:5173

```

---

# API Endpoints

## Leads

```

POST /api/leads
GET /api/leads
GET /api/leads/:id
PUT /api/leads/:id/status

```

## Notes

```

POST /api/notes/:leadId
GET /api/notes/:leadId

```

## Dashboard

```

GET /api/dashboard

```

---

# Validation Layers

## Backend Validation

Implemented using Joi:

- Create Lead validation
- Add Note validation

## Frontend Validation

Implemented using Yup + React Hook Form:

- Create Lead form
- Add Note form

---

# Folder Structure

```

api/
config/
controllers/
routes/
models/
middlewares/
validations/
services/
utils/

client/
components/
pages/
services/
validations/
styles/

```

---

# Assumptions

The following implementation decisions were made based on the scope of the assignment document:

- Authentication (Login / Logout / Register) was not implemented as it was not part of the assignment requirements.

- Update and Delete operations for Notes were not implemented since the assignment only required adding and viewing notes.

- Delete Lead functionality was not implemented because it was not specified in the assignment scope. However, soft delete support is already included in the database schema (`deleted_at` column) for future extensibility.

- TypeScript was not used as the assignment did not specify a requirement for it.

- Database migrations were not implemented since the schema consists of only two tables and was created directly using SQL for simplicity.

- Lead status workflow is limited to the following stages as defined in the assignment:
  
```

New
Contacted
Site Visit
Closed

```
---

# Author

Samarth Bhosale

Full Stack Developer (MERN + MySQL)

```

```
