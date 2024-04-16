import pandas as pd

def keep_first_n_records(input_csv, n=2000):
    # Read the input CSV file
    df = pd.read_csv(input_csv)

    # Keep only the first n records
    df = df.head(n)

    # Overwrite the input CSV file with the modified DataFrame
    df.to_csv(input_csv, index=False)

# Example usage:
input_csv = "Salaries.csv"
keep_first_n_records(input_csv)
