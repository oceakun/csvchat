import sqlite3

def describe_database(database_file):
    # Connect to the SQLite database
    conn = sqlite3.connect(database_file)
    cursor = conn.cursor()

    # Get a list of all tables in the database
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()

    # Describe each table
    table_descriptions = {}
    for table in tables:
        table_name = table[0]
        cursor.execute(f"PRAGMA table_info({table_name});")
        columns = cursor.fetchall()
        column_names = [col[1] for col in columns]
        table_descriptions[table_name] = column_names

    # Close the connection
    conn.close()

    return table_descriptions

# Path to the SQLite database file
database_file = 'database.sqlite'

# Describe the database schema
schema_description = describe_database(database_file)

# Print the description
for table, columns in schema_description.items():
    print(f"Table: {table}")
    print(f"Columns: {', '.join(columns)}")
    print()
