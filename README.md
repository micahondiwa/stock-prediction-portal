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
│   ├── accounts/migrations/__init__.py
│   ├── accounts/admin.py
│   ├── accounts/apps.py
│   ├── accounts/models.py
│   ├── accounts/serializers.py
│   ├── accounts/tests.py
│   ├── accounts/views.py
│   ├── api/migrations/__init__.py
│   ├── api/migrations/admin.py
│   ├── api/migrations/apps.py
│   ├── api/migrations/models.py
│   ├── api/migrations/serializers.py
│   ├── api/migrations/tests.py
│   ├── api/migrations/urls.py
│   ├── api/migrations/utils.py
│   ├── api/migrations/views.py
│   ├── media/ # Stores generated plots
│   ├── stock_prediction_main/asgi.py
│   ├── stock_prediction_main/settings.py
│   ├── stock_prediction_main/urls.py
│   ├── stock_prediction_main/wsgi.py
│   ├── keras_model.keras
│   ├── manage.py
│   ├── requirements.txt
│
├── frontend-react/
│   ├── src/
│   │   ├── assets/  
│   │   │         ├──css/ style.css  
│   │   │         ├──images/logo.png        
│   │   ├── components/
│   │   │         ├──dashboard/Dashboard.jsx 
│   │   │         ├── Button.jsx
│   │   │         ├── Footer.jsx
│   │   │         ├── Header.jsx
│   │   │         ├── Login.jsx
│   │   │         ├── Main.jsx
│   │   │         ├── Register.jsx
│   │   └── App.css
│   │   └── App.jsx
│   │   └── AuthProvider.jsx
│   │   └── axiosInstance.jsx
│   │   └── main.jsx
│   │   └── PrivateRoute.jsx
│   │   └── PublicRoute.jsx
│   └── index.html
│   ├── package.json
│   ├── package.lock.json
│   └── vite.config.js
│
├── README.md
├── .gitignore
├── Resources/
│   ├── stock_prediction_using_LSTM.ipynb
│   ├── register.png
│   ├── dashboard.png
│   ├── dashboard-1.png
```

**5. Connecting React and Django with Axios**
**A. Authentication (Login Example)**

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

**B. Fetching Predictions from Backend**
```
const handlePrediction = async () => {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.post(
            "http://127.0.0.1:8000/api/v1/predict/",
            { ticker },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        setPrediction(response.data.prediction);
        setPlots({
            plot: `data:image/png;base64,${response.data.plot_img}`,
            dma100: `data:image/png;base64,${response.data.plot_100_dma}`,
            dma200: `data:image/png;base64,${response.data.plot_200_dma}`,
        });

    } catch (error) {
        console.error("Prediction request failed", error);
        alert("Enter the correct ticker.");
    }
};

```

**C. Displaying Plots in React**
```
{plots.plot && <img src={plots.plot} alt="Stock Plot" />}
{plots.dma100 && <img src={plots.dma100} alt="100 DMA Plot" />}
{plots.dma200 && <img src={plots.dma200} alt="200 DMA Plot" />}

```

**6. Setup Instructions**
```git clone ...``
**Backend**
```
cd backend-drf
python -m venv env
source env/bin/activate   # Windows: env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
The django backend runs at ```http://127.0.0.1:8000/.```
**Frontend**
```
cd frontend-react
npm install
npm run dev
```

The frontend runs ar ```http://localhost:5173/```