import os
import json
import requests

# Get the issue number from the environment variable
issue_number = os.environ['GITHUB_EVENT_NUMBER']

# Make a request to the GitHub API to get the issue data
headers = {'Authorization': 'Bearer ' + os.environ['GITHUB_TOKEN']}
url = f'https://api.github.com/repos/{os.environ["GITHUB_REPOSITORY"]}/issues/{issue_number}'
response = requests.get(url, headers=headers)
data = response.json()

# Save the data to a JSON file in the Git directory
filename = f'issue-{issue_number}.json'
with open(filename, 'w') as file:
    json.dump(data, file)
