# Django + React Full Stack Stock Prediction Portal

## 1. Overview

This is a full-stack web application that is build using React (Frontend) and Django (Backend). The portal allows users to:
- Register new accounts and log in securely using JWT authentication. 
-  Access a dashboard after log in where they can input a valid stock ticker for price prediction. 
- View the results and dynamically generated plots including stock price trends and moving averages. 

The core idea of the project is to demonstrate how to intergrate pre-trained machine learning models in Django with a modern frontend, connnected via axios. The project uses the in-built Django user model. 


## 2. Features

- **User Authentication** - Register a new user/account. Secure login with JWT access and refresh tockens. 
- **Stock prediction Dashboard** - Part of the protected view that is accessible only after login. Allows logged in user to input tickers and fetch prediction. Backend model processes the request and gerenerates predictions. 
- **Visualization** - Also part of the dashboard. Backend dynamically generates the plots using `matplotlib` library. React frontend displays the plots via the `<img /> ` tags. 
- **Error Handling** - Alerts and error messages for inavlid credentials, tickers, and failed requests.  - React + TailwindCSS.

## 3. Teck Stack 
**Backend (Django REST FRAMEWORK)**
- Django REST Framework for API endpoints.
- JWT Authentication (djangorestframework-simplejwt).
- Machine Learning model (pretrained LSTM model saved as keras) integration for stock predictions.
- Matplotlib for plot generation.

**Frontend (React + Vite)**
- React with Tailwind CSS for styling.
- Axios for making API requests to Django backend.
- React Router for navigation.

**Database**
- SQLite

**4. Project Structure**
stock-prediction-portal/
│
├── backend-drf/
│   ├── manage.py
│   ├── requirements.txt
│   ├── <Django project folder>/
│   ├── <prediction app>/
│   └── ... other Django files
│
├── frontend-react/
│   ├── src/
│   │   ├── pages/            # Login, Register, Dashboard
│   │   ├── components/       # shared UI elements
│   │   └── main.jsx / App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── README.md
├── .gitignore
├── dashboard-1.png           # Screenshots
├── dashboard.png
├── home.png
├── login.png
├── register.png


**5. Connecting React and Django with Axios**
**1. Authentication (Login Example)**

```
import axios from "axios";

const handleLogin = async (userData) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/v1/token/", userData);
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        console.log("Login successful");
        navigate("/dashboard");
    } catch (error) {
        console.error("Invalid Credentials");
        alert("Invalid username or password");
    }
};
```