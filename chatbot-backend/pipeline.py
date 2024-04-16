import pandas as pd
from dotenv import load_dotenv
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_community.llms import CTransformers
import psycopg2

load_dotenv()

dbname = '' #add db name here
user = '' #add db username here
password = '' #add db password here
host = '' #add db host here
port=5432    

llm1=CTransformers(model="../models/mistral-7b-instruct-v0.2.Q4_K_M.gguf", 
                    model_type="mistral", config={"temperature":0.01, "context_length":4096, "max_new_tokens":4000})
template1 = """
Write a SQL Query given the table name {Table} and columns as a list {Columns} for the given question : 
{question}.
Do not generate any additional text to describe the query.
Do not generate the Question or the table name or the column names.
Only generate the sql query by following the sql syntax.
"""
prompt1 = PromptTemplate(template=template1, input_variables=["Table","question","Columns"])

def get_sql(tble,question,cols):
    llm_chain = LLMChain(prompt=prompt1, 
                        llm=llm1
                        )
    response= llm_chain.invoke({"Table" : tble,"question" :question, "Columns" : cols})
    if 'text' in response:
        # print("Text:", response['text'])
        return response['text']
    # else:
    #     print("type : ", type(response))



llm2=CTransformers(model="../models/mistral-7b-instruct-v0.2.Q4_K_M.gguf", 
                    model_type="mistral", config={"temperature":0.01, "context_length":4096, "max_new_tokens":4000})

template2 = """
Given a CSV file named {file_name} containing information about female actresses who won an Oscar during the last 100 years, and the following column names: {column_names}, please identify the columns and type of chart indicated in the command provided below.

Command:

{command}

Instructions:

1. Identify the columns mentioned in the command.
2. Determine the type of chart requested.
3. Provide a list of identified columns and the type of chart as output.

Additional Notes:

- Output should only include the identified columns and the type of chart (e.g., histogram, line plot, bar chart, etc.).
- Avoid generating any additional information beyond the requested list of columns and chart type.
- Ensure to handle any ambiguities or unclear instructions in the command.
"""

prompt2 = PromptTemplate(template=template2, input_variables=["file_name","column_names", "command"])

def get_actionable_parameters(file_name, column_names , command):
    llm_chain = LLMChain(prompt=prompt2, llm=llm2)
    response= llm_chain.invoke({"file_name" : file_name,"column_names" : column_names, "command" : command})
    print("response : ", response)
    if 'text' in response:
        print("Text:", response['text'])
        return response['text']
    else:
        print("type : ", type(response))
        print(response)


def clean_sql_query(query: str) -> str:
    cleaned_query = query.strip()
    if cleaned_query.startswith("```sql"):
        cleaned_query = cleaned_query[len("```sql"):].strip()
    if cleaned_query.endswith("```"):
        cleaned_query = cleaned_query[:-len("```")].strip()    
    cleaned_query = cleaned_query.replace("\n", " ").strip()
    return cleaned_query

def execute_query_on_table(sql_query, dbname, user, password, host, port):
    try:
        conn = psycopg2.connect(dbname=dbname, user=user, password=password, host=host, port=port)
        cur = conn.cursor()
        cur.execute(sql_query)
        rows = cur.fetchall()
        conn.commit()
        return rows
        
    except (Exception, psycopg2.DatabaseError) as error:
        print(f"Error executing query: {error}")
        
    finally:
        if conn is not None:
            cur.close()
            conn.close()


def text_pipeline(tbl_name, question,clmn_names):
    generated_query = get_sql(tbl_name, question, clmn_names)
    cleaned_query = clean_sql_query(generated_query)
    print("cleaned_query : ", cleaned_query)
    final_response = execute_query_on_table(cleaned_query, dbname, user, password, host, port)

    # final_response = get_final_response(question, context_for_phase_2)
    return final_response

def chart_pipeline(file_name, column_names , command):
    actionable_param = get_actionable_parameters(file_name, column_names , command)
    return actionable_param