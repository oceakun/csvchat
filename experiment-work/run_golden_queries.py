import pandas as pd
import sqlite3

def run_queries_and_update_results(csv_path):
    df = pd.read_csv(csv_path)
    
    if 'golden_results' not in df.columns:
        df['golden_results'] = None 
    
    for index, row in df.iterrows():
        print("index : ", index)
        query = row['golden_query']
        print("query : ", query)
        db_path = f"./database.sqlite"
        
        try:
            conn = sqlite3.connect(db_path)
            cursor = conn.cursor()
            
            cursor.execute(query)
            
            query_results = cursor.fetchall()
            
            conn.close()
            
            df.at[index, 'golden_results'] = str(query_results)
            
        except Exception as e:
            df.at[index, 'golden_results'] = "error"
            print(f"Error executing query for : {e}")
    
    df.to_csv(csv_path, index=False)

csv_path = "./sample-queries.csv"
run_queries_and_update_results(csv_path)
