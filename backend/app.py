import os
import sys
from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy # NEW
from flask_migrate import Migrate # NEW

# Define the absolute, hardcoded path to the backend directory
BACKEND_DIR = r'E:\Eximius_Working\backend'

# --- DATABASE CONFIGURATION ---
basedir = os.path.abspath(os.path.dirname(__file__))
# Use three slashes for absolute path on Windows when using SQLite
DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db') 

# Initialize the Flask application
app = Flask(__name__) 

# Configure Flask
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # Recommended setting

# Initialize Extensions
db = SQLAlchemy(app) # NEW
migrate = Migrate(app, db) # NEW

# Configure CORS (still needed for when we run the actual server)
CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:8000"}})

# --- API Route ---
@app.route('/api/health')
def health_check():
    return jsonify(status='ok', message='Backend is healthy'), 200

@app.route('/api/items')
def get_items():
    """Returns the count of Users in the database for verification."""
    
    # Count how many users exist in the database (should be 0 for now)
    user_count = db.session.scalar(db.select(db.func.count(User.id)))
    
    # Return the count as proof of successful database connection and query
    response_data = {
        "message": "Database connection verified.",
        "user_count": user_count,
        "note": "Next step is to add initial data."
    }
    return jsonify(response_data), 200

def catch_all(path):
    return jsonify(error="API Only. Route Not Found."), 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)




