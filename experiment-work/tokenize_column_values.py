import pandas as pd
import re

def tokenize_column_values_with_special_chars(csv_path, source_column, new_column):
    df = pd.read_csv(csv_path)
    pattern = r'\w+|[^\w\s]'
    
    df[new_column] = df[source_column].apply(lambda x: re.findall(pattern, str(x)))
    
    df.to_csv(csv_path, index=False)

csv_path = "./sample-queries.csv" 
source_column = "golden_query"  
new_column = "golden_tokens" 
tokenize_column_values_with_special_chars(csv_path, source_column, new_column)