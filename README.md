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
- Using cors to allow request from react frontend

**Frontend (React + Vite)**
- React with Tailwind CSS for styling.
- Axios for making API requests to Django backend.
- React Router for navigation.

**Database**
- SQLite

## 4. Machine Learning Model (LSTM)

The stock prediction engine is powered by a Long Short-Term Memory (LSTM) neural network built with TensorFlow/Keras. The full code for data retrieval, EDA and model training is available in the [Resources](Resources) folder. 
**Model Architecture**

## 5. Project Structure
```
stock-prediction-portal/
│
├── backend-drf/
│   ├── accounts/
│   │   ├── migrations/         # Auto-generated migrations only
│   │   │   └── __init__.py
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── tests/
│   │   │   ├── __init__.py
│   │   │   └── test_accounts.py
│   │   └── utils.py (if needed)
│   │
│   ├── api/
│   │   ├── migrations/         # Auto-generated migrations only
│   │   │   └── __init__.py
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── utils.py
│   │   ├── tests/
│   │   │   ├── __init__.py
│   │   │   └── test_api.py
│   │
│   ├── media/                  # Stores generated plots, predictions, etc.
│   │
│   ├── stock_prediction_main/  # Django project settings
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   ├── keras_model.keras       # Pre-trained ML model
│   ├── manage.py
│   ├── requirements.txt
│
├── frontend-react/
│   ├── src/
│   │   ├── assets/  
│   │   │   ├── css/style.css  
│   │   │   └── images/logo.png        
│   │   ├── components/
│   │   │   ├── dashboard/Dashboard.jsx 
│   │   │   ├── Button.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Main.jsx
│   │   │   ├── Register.jsx
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── AuthProvider.jsx
│   │   ├── axiosInstance.jsx
│   │   ├── main.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── PublicRoute.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── Resources/
│   ├── notebooks/
│   │   └── stock_prediction_using_LSTM.ipynb
│   ├── images/
│   │   ├── register.png
│   │   ├── dashboard.png
│   │   └── dashboard-1.png
│
├── README.md
├── .gitignore
```

## 6. Connecting React and Django with Axios

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

**D. Important/Notable Settings**  in settings.py
- Using [```python-decouple```](https://pypi.org/project/python-decouple/) to load senstive variables like ```SECRET_KEY``` and ```DUBUG```:
```
from decouple import config
SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=False, cast=bool)
```
- Enabling [```corsheaders```](https://pypi.org/project/django-cors-headers/) middleware so that the React frontend can call Django APIs:
```
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    ...
    "corsheaders.middleware.CorsMiddleware",
]

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173'
]
```

- Setting up DRF with [JWT](https://www.django-rest-framework.org/api-guide/authentication/) authentication:
```
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

```
- Configuring expiry time for the both access and refresh tokens: 
```
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=15),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}
```
The above seetings means that The frontend must store access & refresh tokens (usually in localStorage or httpOnly cookies). Tokens expire every 15 minutes; frontend should refresh before expiry.

- Static and media files locations:
```
STATIC_URL = 'static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```
The ```media``` location handles file uploads, including the plots generated.

- Including base directory for the database:
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```
## 7. Contributing
Contributions are welcome including fixing bugs, improving documentation, adding new features or training a new model. 

**How to Contribute**
1. Fork the repository
2. Create a feature branch:
```
git checkout -b feature/your-feature-name
```
3. Commit your changes
```
git commit -m "feat: add new feature"
````
4. Push to your fork

```
git push origin feature/your-feature-name
````
5. Open a Pull Request to the main branch

**Contribution Guidelines**

-  Follow [PEP8](https://peps.python.org/pep-0008/) style for Python code and standard React conventions for frontend.
- Add/update documentation where needed.
- Ensure all tests pass before submitting a pull request.
- For major changes, please open an issue first to discuss what you’d like to change.

## 8. Setup Instructions

```
git clone https://github.com/micahondiwa/stock-prediction-portal.git
```
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

**Manage Environment Variables:**

- **Backend env**: Create a ```.env``` file at the project root (same level as manage.py file). Use [djecrety](https://djecrety.ir/) to generate a django secret key. Store the key as ```SECRET_KEY``` inside the .env file. Also set ```DEBGU=TRUE``` inside the .env file. 

- **Frontent env**: Create a ```.env``` file at the root of the frontend-react folder. Set the backend root and the base api as ```VITE_BACKEND_BASE_API=http://127.0.0.1:8000/api/v1``` and ```VITE_BACKEND_ROOT=http://127.0.0.1:8000/```. 

**Train Your Own Model**

- You can train your own model. A starter code (jupyter Notebook) is available on the [Resources](Resources). The default code saves the trained model in the [Resources](Resources) folder. Therefore, without changing that, you will need to manually copy your trained model to the backend directory - same root folder as the manage.py file. 

**Bonus**
- Use [Toptal](https://www.toptal.com/developers/gitignore) to generate a .gitignore file for react and django. 

**Contributors**
- [Micah Ondiwa](https://github.com/micahondiwa)
