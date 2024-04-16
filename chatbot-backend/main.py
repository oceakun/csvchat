from fastapi import FastAPI, File, Request, UploadFile, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from typing import List, Tuple
import csv
import psycopg2
from pipeline import text_pipeline, chart_pipeline

app = FastAPI()

origins = [
    "http://localhost:3000","http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

dbname = '' #add db name here
user = '' #add db username here
password = '' #add db password here
host = '' #add db host here


def create_table_from_csv(csv_file, dbname, user, password, host='localhost', port=5432) -> Tuple[str, List[str]]:
    table_name = csv_file.lower().replace(' ', '_').replace('.csv', '')

    conn = psycopg2.connect(dbname=dbname, user=user, password=password, host=host, port=port)
    cur = conn.cursor()

    with open(csv_file, 'r', newline='') as file:
        reader = csv.reader(file)
        header = next(reader)
        data_types = ['VARCHAR' for _ in header]

        for row in reader:
            for i, value in enumerate(row):
                if value.isdigit():
                    data_types[i] = 'INTEGER'
                elif value.replace('.', '', 1).isdigit():
                    data_types[i] = 'FLOAT'

        header_modified = [col.lower().replace(' ', '_').replace('(', '').replace(')', '').replace('-', '_') for col in header]

        sql_create_table = f"CREATE TABLE {table_name} ("
        for col, data_type in zip(header_modified, data_types):
            sql_create_table += f"{col.lower().replace(' ', '_')} {data_type}, "
        sql_create_table = sql_create_table[:-2]
        sql_create_table += ");"

        cur.execute(sql_create_table)

        file.seek(0)  
        next(reader) 
        insert_sql = f"INSERT INTO {table_name} ({', '.join(header_modified)}) VALUES ({', '.join(['%s']*len(header_modified))})"
        for row in reader:
            cur.execute(insert_sql, row)

    conn.commit()
    cur.close()
    conn.close()

    return table_name, header_modified


@app.post("/upload-file/")
async def create_upload_file(file: UploadFile = File(...)):
    if file.content_type != "text/csv":
        raise HTTPException(status_code=400, detail="Only CSV files are allowed.")
    
    with open(file.filename, "wb") as buffer:
        buffer.write(await file.read())
    
    try:
        table_name, column_names = create_table_from_csv(file.filename, dbname, user, password)
        return {"table_name": table_name, "column_names": column_names}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/run-pipeline/")
async def run_pipeline(request: Request):
    data = await request.json()
    table_name = data.get("table_name")
    question = data.get("question")
    column_names = data.get("column_names")
    if not all([table_name, question, column_names]):
        raise HTTPException(status_code=400, detail="table_name, question, and column_names are required")
    
    try:
        response = text_pipeline(table_name, question, column_names)
        print("response : ", response)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/run-chart-pipeline/")
async def run_chart_pipeline(request: Request):
    data = await request.json()
    file_name = data.get("file_name")
    command = data.get("command")
    column_names = data.get("column_names")
    if not all([file_name, column_names, command]):
        raise HTTPException(status_code=400, detail="file_name, column_names, and command are required")
    
    try:
        response = chart_pipeline(file_name, column_names, command)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))