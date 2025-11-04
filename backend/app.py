import os
import sys
from flask import Flask, jsonify

# Define the absolute, hardcoded path to the backend directory
BACKEND_DIR = r'E:\Eximius\backend'

# Initialize the Flask application
app = Flask(__name__) 

# --- API Route ---
@app.route('/api/health')
def health_check():
    return jsonify(status='ok', message='Backend is healthy'), 200

@app.route('/api/items')
def get_items():
    items = ["Eximius Item A", "Eximius Item B", "Eximius Item C"]
    # The JSON response must be a key-value pair, not just a list for a stable API
    return jsonify(items=items), 200

# --- CATCH-ALL ROUTE ---
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return jsonify(error="API Only. Route Not Found."), 404

if __name__ == '__main__':
    # We will use this block to run the internal unit tests one last time
    import unittest

    class TestAppRoutes(unittest.TestCase):
        def setUp(self):
            self.app = app.test_client()
            self.app.testing = True

        def test_1_api_health(self):
            response = self.app.get('/api/health')
            self.assertEqual(response.status_code, 200, "API Health check failed.")

        def test_2_api_items(self):
            response = self.app.get('/api/items')
            self.assertEqual(response.status_code, 200, "API Items route failed.")
            self.assertIn(b'Eximius Item B', response.data, "API Items response content incorrect.")

    print("Running FINAL BARE-BONES Internal Unit Tests...")
    loader = unittest.TestLoader()
    suite = loader.loadTestsFromTestCase(TestAppRoutes)
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)

    if not result.wasSuccessful():
        sys.exit(1) # Fail the process if tests fail
    
