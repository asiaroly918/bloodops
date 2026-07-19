Git Commit Message:
# BloodDrops - Blood Donation Management System

## Project Overview

BloodDrops is a full-stack MERN-based Blood Donation Management System that connects blood donors, recipients, volunteers, and administrators on a single platform.

The platform allows users to create blood donation requests, search for donors, manage donation activities, and support the platform through secure funding using Stripe payment integration.


feat: build registration page with imagebb avatar upload and district/upazila selector
feat: build login page with firebase auth and jwt token storage

---

## Features

### Authentication & Authorization

* JWT Authentication
* Secure Login & Registration
* Role-based Access Control
* Protected Routes
* Admin Route Protection
* Volunteer Route Protection

### Donor Features

* Create Donation Request
* Manage Donation Requests
* Edit Donation Requests
* View Request Details
* Profile Management

### Admin Features

* Manage All Users
* Manage Blood Donation Requests
* Block or Activate Users
* Role Management

### Volunteer Features

* Access Donation Management Features
* Assist in Donation Operations

### Funding System

* Stripe Payment Integration
* Secure Card Payment
* Funding History Storage
* Payment Intent Support
* Funding Records Saved in MongoDB

### Search & Public Features

* Search Donors by Blood Group
* Public Donation Requests Page
* Responsive Design

---

## Technologies Used

### Frontend

* React.js
* React Router
* Tailwind CSS
* DaisyUI
* Axios
* Stripe React SDK

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Stripe API

---

## Environment Variables

### Backend (.env)

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

STRIPE_SECRET_KEY=your_stripe_secret_key

### Frontend (.env)

VITE_IMGBB_API_KEY=your_imgbb_api_key

VITE_STRIPE_PUBLISHABLE_KEY=your_publishable_key

---

## Installation

### Backend

npm install

npm run dev

### Frontend

npm install

npm run dev

---

## Project Structure

Frontend

* Authentication
* Dashboard
* Funding System
* Protected Routes

Backend

* Models
* Controllers
* Routes
* JWT Middleware
* Stripe Integration

---

## Future Improvements

* Email Notification System
* Donation Request Approval Workflow
* Real-time Notifications
* Analytics Dashboard

---

## Developer

Developed by ASIA KHATUN ROLY

---

## Live Site

Add your frontend deployment link here.

---

## Backend API

Add your backend deployment link here.

---

## GitHub Repository

Client Repository:
Add your frontend GitHub repository link here.

Server Repository:
Add your backend GitHub repository link here.

# Funding Route Documentation

This route handles crowdfunding and donation tracking features for the application.

## Integration Setup
To use these routes in your main entry point file (e.g., `index.js` or `server.js`), register the router middleware:

```javascript
const fundingRoute = require('./routes/fundingRoute');
app.use('/api/funding', fundingRoute);