import requests

response = requests.get("http://localhost:5000/applied-project")
print(response.json())  # Prints the API response in JSON format
