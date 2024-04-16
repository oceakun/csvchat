import pandas as pd
from dotenv import load_dotenv
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_community.llms import CTransformers

load_dotenv()

llm=CTransformers(model="../models/capybarahermes-2.5-mistral-7b.Q4_K_M.gguf", 
                    model_type="mistral", config={"temperature":0.01, "context_length":4096, "max_new_tokens":4000})
template = """
Write a SQL Query given the table name {Table} and columns as a list {Columns} for the given question : 
{question}.
Do not generate any additional text to describe the query.
Do not generate the Question or the table name or the column names.
Only generate the sql query by following the sql syntax.
"""
prompt = PromptTemplate(template=template, input_variables=["Table","question","Columns"])

def get_sql(tble,question,cols):
    llm_chain = LLMChain(prompt=prompt, 
                        llm=llm
                        )
    response= llm_chain.invoke({"Table" : tble,"question" :question, "Columns" : cols})
    if 'text' in response:
        print("Text:", response['text'])
        return response['text']
    else:
        print("type : ", type(response))
        print(response)

def process_and_update_spider_data(csv_path):
    df = pd.read_csv(csv_path, nrows=100)
    
    if 'capybarahermes_generated_query' not in df.columns:
        df['capybarahermes_generated_query'] = None
    
    for index, row in df.iterrows():
        print("Processing index:", index)
        
        if pd.isna(row['capybarahermes_generated_query']):
            question = row['question']
            tble = "Salaries"
            cols = ["Id","EmployeeName","JobTitle","BasePay","OvertimePay","OtherPay","Benefits","TotalPay","TotalPayBenefits","Year","Notes","Agency","Status"]
            generated_query = get_sql(tble,question,cols)
            print("Generated query:", generated_query)
            df.at[index, 'capybarahermes_generated_query'] = generated_query
            df.to_csv(csv_path, index=False)
        else:
            print(f"Skipping index {index}, query already generated.")
    

    df.to_csv(csv_path, index=False)

csv_path = "./sample-queries.csv"  # Update the path as necessary
process_and_update_spider_data(csv_path)
