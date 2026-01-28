#!/usr/bin/env python3
"""
Backend API Testing for House of Blooms Inquiry System
Tests the inquiry endpoints for creating and retrieving customer inquiries.
"""

import requests
import json
import os
from datetime import datetime
import sys

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return None

BASE_URL = get_backend_url()
if not BASE_URL:
    print("ERROR: Could not get REACT_APP_BACKEND_URL from frontend/.env")
    sys.exit(1)

API_URL = f"{BASE_URL}/api"
print(f"Testing backend at: {API_URL}")

def test_create_inquiry_valid():
    """Test creating a new inquiry with valid data"""
    print("\n=== Testing POST /api/inquiries with valid data ===")
    
    inquiry_data = {
        "name": "Sarah Johnson",
        "email": "sarah.johnson@email.com", 
        "product": "Crochet Roses Bouquet",
        "message": "Hi! I'm interested in ordering a beautiful bouquet of 12 pink crochet roses for my daughter's birthday. Could you please let me know the pricing and availability? I need them by next Friday. Thank you!"
    }
    
    try:
        response = requests.post(f"{API_URL}/inquiries", json=inquiry_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response Data: {json.dumps(data, indent=2, default=str)}")
            
            # Verify response structure
            required_fields = ['id', 'name', 'email', 'message', 'timestamp', 'status']
            missing_fields = [field for field in required_fields if field not in data]
            
            if missing_fields:
                print(f"❌ FAIL: Missing required fields: {missing_fields}")
                return False
            
            # Verify data integrity
            if data['name'] != inquiry_data['name']:
                print(f"❌ FAIL: Name mismatch. Expected: {inquiry_data['name']}, Got: {data['name']}")
                return False
                
            if data['email'] != inquiry_data['email']:
                print(f"❌ FAIL: Email mismatch. Expected: {inquiry_data['email']}, Got: {data['email']}")
                return False
                
            if data['product'] != inquiry_data['product']:
                print(f"❌ FAIL: Product mismatch. Expected: {inquiry_data['product']}, Got: {data['product']}")
                return False
                
            if data['message'] != inquiry_data['message']:
                print(f"❌ FAIL: Message mismatch. Expected: {inquiry_data['message']}, Got: {data['message']}")
                return False
                
            if data['status'] != 'new':
                print(f"❌ FAIL: Status should be 'new', got: {data['status']}")
                return False
            
            print("✅ PASS: Inquiry created successfully with correct data")
            return True, data['id']
        else:
            print(f"❌ FAIL: Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ FAIL: Request failed: {e}")
        return False
    except Exception as e:
        print(f"❌ FAIL: Unexpected error: {e}")
        return False

def test_create_inquiry_missing_fields():
    """Test creating inquiry with missing required fields"""
    print("\n=== Testing POST /api/inquiries with missing required fields ===")
    
    # Test missing name
    inquiry_data = {
        "email": "test@email.com",
        "message": "Test message"
    }
    
    try:
        response = requests.post(f"{API_URL}/inquiries", json=inquiry_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 422:  # FastAPI validation error
            print("✅ PASS: Correctly rejected inquiry with missing name field")
            return True
        else:
            print(f"❌ FAIL: Expected status 422 for missing fields, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ FAIL: Request failed: {e}")
        return False
    except Exception as e:
        print(f"❌ FAIL: Unexpected error: {e}")
        return False

def test_get_inquiries():
    """Test retrieving all inquiries"""
    print("\n=== Testing GET /api/inquiries ===")
    
    try:
        response = requests.get(f"{API_URL}/inquiries", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Number of inquiries returned: {len(data)}")
            
            if isinstance(data, list):
                print("✅ PASS: Response is a list")
                
                if len(data) > 0:
                    # Check if sorted by timestamp (newest first)
                    inquiry = data[0]
                    required_fields = ['id', 'name', 'email', 'message', 'timestamp', 'status']
                    missing_fields = [field for field in required_fields if field not in inquiry]
                    
                    if missing_fields:
                        print(f"❌ FAIL: Missing fields in inquiry: {missing_fields}")
                        return False
                    
                    print(f"Sample inquiry: {json.dumps(inquiry, indent=2, default=str)}")
                    
                    # Check timestamp sorting if multiple inquiries
                    if len(data) > 1:
                        first_timestamp = datetime.fromisoformat(data[0]['timestamp'].replace('Z', '+00:00'))
                        second_timestamp = datetime.fromisoformat(data[1]['timestamp'].replace('Z', '+00:00'))
                        
                        if first_timestamp >= second_timestamp:
                            print("✅ PASS: Inquiries are sorted by timestamp (newest first)")
                        else:
                            print("❌ FAIL: Inquiries are not properly sorted by timestamp")
                            return False
                    
                    print("✅ PASS: Inquiries retrieved successfully")
                    return True
                else:
                    print("✅ PASS: Empty list returned (no inquiries yet)")
                    return True
            else:
                print(f"❌ FAIL: Response should be a list, got: {type(data)}")
                return False
        else:
            print(f"❌ FAIL: Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ FAIL: Request failed: {e}")
        return False
    except Exception as e:
        print(f"❌ FAIL: Unexpected error: {e}")
        return False

def test_multiple_inquiries():
    """Test creating multiple inquiries to verify sorting"""
    print("\n=== Testing multiple inquiry creation and sorting ===")
    
    inquiries = [
        {
            "name": "Emma Wilson",
            "email": "emma.wilson@email.com",
            "product": "Crochet Sunflowers",
            "message": "I'd love to order 6 bright yellow crochet sunflowers for my kitchen decor. What's the price?"
        },
        {
            "name": "Michael Chen",
            "email": "michael.chen@email.com", 
            "product": "Mixed Flower Arrangement",
            "message": "Looking for a mixed arrangement of crochet flowers for a wedding centerpiece. Need 10 pieces."
        }
    ]
    
    created_ids = []
    
    for i, inquiry_data in enumerate(inquiries):
        try:
            response = requests.post(f"{API_URL}/inquiries", json=inquiry_data, timeout=10)
            if response.status_code == 200:
                data = response.json()
                created_ids.append(data['id'])
                print(f"✅ Created inquiry {i+1}: {data['id']}")
            else:
                print(f"❌ FAIL: Failed to create inquiry {i+1}: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ FAIL: Error creating inquiry {i+1}: {e}")
            return False
    
    print(f"✅ PASS: Created {len(created_ids)} additional inquiries")
    return True

def check_backend_logs():
    """Check backend logs for email notification messages"""
    print("\n=== Checking backend logs for email notifications ===")
    
    try:
        import subprocess
        result = subprocess.run(
            ["tail", "-n", "50", "/var/log/supervisor/backend.out.log"],
            capture_output=True,
            text=True,
            timeout=10
        )
        
        if result.returncode == 0:
            log_content = result.stdout
            if "Email notification prepared" in log_content:
                print("✅ PASS: Email notification logging found in backend logs")
                # Extract relevant log lines
                lines = log_content.split('\n')
                email_lines = [line for line in lines if "Email notification" in line or "New inquiry created" in line]
                for line in email_lines[-5:]:  # Show last 5 relevant lines
                    print(f"  LOG: {line}")
                return True
            else:
                print("❌ FAIL: No email notification logging found in backend logs")
                print("Recent log content:")
                print(log_content[-500:])  # Show last 500 chars
                return False
        else:
            print(f"❌ FAIL: Could not read backend logs: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"❌ FAIL: Error checking logs: {e}")
        return False

def main():
    """Run all tests"""
    print("🌸 House of Blooms Backend API Testing 🌸")
    print("=" * 50)
    
    test_results = []
    
    # Test 1: Create inquiry with valid data
    result = test_create_inquiry_valid()
    if isinstance(result, tuple):
        test_results.append(result[0])
    else:
        test_results.append(result)
    
    # Test 2: Create inquiry with missing fields
    test_results.append(test_create_inquiry_missing_fields())
    
    # Test 3: Get all inquiries
    test_results.append(test_get_inquiries())
    
    # Test 4: Create multiple inquiries
    test_results.append(test_multiple_inquiries())
    
    # Test 5: Check email notification logs
    test_results.append(check_backend_logs())
    
    # Summary
    print("\n" + "=" * 50)
    print("🌸 TEST SUMMARY 🌸")
    passed = sum(test_results)
    total = len(test_results)
    
    print(f"Tests Passed: {passed}/{total}")
    
    if passed == total:
        print("✅ ALL TESTS PASSED - House of Blooms inquiry system is working correctly!")
        return True
    else:
        print("❌ SOME TESTS FAILED - Issues found in the inquiry system")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)