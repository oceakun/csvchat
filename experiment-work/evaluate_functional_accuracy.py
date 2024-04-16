import pandas as pd

def compare_columns_and_count_matches(csv_path, column_a, column_b):
    # Load the DataFrame from the specified CSV file
    df = pd.read_csv(csv_path)
    
    # Count the number of rows where the specified columns have the same value
    matches_count = (df[column_a] == df[column_b]).sum()
    
    return matches_count

# Example usage
csv_path = "./sample-queries.csv"  # Make sure to update this path to your actual CSV file
column_a = "golden_results"  # Update to your first column name
column_b = "mistral_generated_results"  # Update to your second column name
matching_rows_count = compare_columns_and_count_matches(csv_path, column_a, column_b)
print(f"Number of matching rows: {matching_rows_count}")
