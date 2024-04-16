import json
import csv

def extract_data_from_json(json_file, csv_file):
    # Open JSON file and load data
    with open(json_file, 'r') as file:
        data = json.load(file)
    
    # Extract questions and golden queries
    questions = list(data.keys())
    golden_queries = list(data.values())
    
    # Write data to CSV file
    with open(csv_file, 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['question', 'golden_query']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writeheader()
        for i in range(len(questions)):
            writer.writerow({'question': questions[i], 'golden_query': golden_queries[i]})

# Example usage
extract_data_from_json("./sample-queries.json", "./sample-queries.csv")
