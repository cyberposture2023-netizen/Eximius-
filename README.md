# Eximius Project

##  Overview

Eximius is a Python Flask web application designed to demonstrate a stable, functional API backend integrated with a simple vanilla JavaScript frontend.

This project uses a **Two-Server Architecture** for maximum stability, ensuring the API and frontend files run on separate, isolated processes, bypassing known environmental issues.

##  Technology Stack

* **Backend:** Python 3 + **Flask** (API-Only)
* **Frontend:** HTML5, CSS3, Vanilla JavaScript (Data consumption)
* **Dependencies:** \Flask-CORS\ (for cross-origin requests)
* **Project Location:** \E:\Eximius\ (Migrated for stability)

##  Getting Started (Two-Server Execution)

You must run the two following commands in separate terminals.

**Prerequisites:** Python installed, project in \E:\Eximius\.

### **Terminal 1: Launch Flask API (Port 5000)**

This serves the API (\/api/health\, \/api/items\).

\\\ash
E:
cd E:\Eximius\backend
.\.venv\Scripts\Activate.ps1
python app.py
\\\

### **Terminal 2: Launch Frontend File Server (Port 8000)**

This serves the HTML, CSS, and JS files.

\\\ash
E:
cd E:\Eximius\backend
python -m http.server 8000
\\\

### **Verification**

Access the application in your browser:

 **http://127.0.0.1:8000/templates/index.html**

##  API Endpoints

The Flask application provides the following endpoints on **Port 5000**:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| \GET\ | \/api/health\ | Simple health check. |
| \GET\ | \/api/items\ | Returns the placeholder list. |
