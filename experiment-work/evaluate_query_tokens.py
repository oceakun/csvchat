# import pandas as pd
# import ast

# def compare_token_lists_case_insensitive(csv_path, column_a, column_b):
#     df = pd.read_csv(csv_path)
    
#     match_count = 0

#     for index, row in df.iterrows():
#         tokens_a = [token.lower() for token in ast.literal_eval(row[column_a])]
#         tokens_b = [token.lower() for token in ast.literal_eval(row[column_b])]
        
#         set_a = set(tokens_a)
#         set_b = set(tokens_b)
        
#         if set_a.issubset(set_b):
#             match_count += 1
    
#     return match_count

# # Example usage:
# csv_path = "sample-queries.csv"  # Specify the path to your CSV file
# column_a = "golden_tokens"  # The name of the first column containing the list of tokens
# column_b = "mistral_tokens"  # The name of the second column containing the list of tokens
# matching_count = compare_token_lists_case_insensitive(csv_path, column_a, column_b)
# print(f"Number of matching rows: {matching_count}")


import pandas as pd
import ast

def save_non_matching_rows(csv_path, column_a, column_b, output_csv):
    df = pd.read_csv(csv_path)
    non_matching_rows = []

    for index, row in df.iterrows():
        tokens_a = [token.lower() for token in ast.literal_eval(row[column_a])]
        tokens_b = [token.lower() for token in ast.literal_eval(row[column_b])]
        
        set_a = set(tokens_a)
        set_b = set(tokens_b)
        
        if not set_a.issubset(set_b):
            non_matching_rows.append({
                'question': row['question'],
                'golden_query': row['golden_query'],
                'capybarahermes_generated_query': row['capybarahermes_generated_query'],
                'golden_tokens': row['golden_tokens'],
                'mistral_tokens': row['mistral_tokens']
            })
    
    non_matching_df = pd.DataFrame(non_matching_rows)
    non_matching_df.to_csv(output_csv, index=False)

# Example usage:
csv_path = "sample-queries.csv"  # Specify the path to your CSV file
column_a = "golden_tokens"  # The name of the first column containing the list of tokens
column_b = "mistral_tokens"  # The name of the second column containing the list of tokens
output_csv = "mistral_non_matching_tokens.csv"  # Specify the output CSV file
save_non_matching_rows(csv_path, column_a, column_b, output_csv)