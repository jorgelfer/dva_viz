import sqlite3
import pandas as pd


csv_file = 'vehicles2_rec.csv'  # Replace with your CSV file name
df = pd.read_csv(csv_file)
df= df.drop(columns=['odometer'])
# df['odometer'] = (
#     df['odometer']
#     # .str.replace(r'[^0-9]', '', regex=True) 
#     .astype('Int64')  
# )
# print(df['odometer'].dtype)


df['latitude'] = pd.to_numeric(df['latitude'], errors='coerce').astype(float)
df['longitude'] = pd.to_numeric(df['longitude'], errors='coerce').astype(float)
# df['odometer'] = pd.to_numeric(df['odometer'], errors='coerce')

# SQLite database name
database_name = 'vehicles.db'

conn = sqlite3.connect(database_name)
cursor = conn.cursor()

cursor.execute("DROP TABLE IF EXISTS vehicles;")

cursor.execute('''
    CREATE TABLE vehicles (
        postID TEXT PRIMARY KEY,
        model TEXT,
        condition TEXT,
        `make year` INTEGER,
        `cylinder NO` INTEGER,
        drive TEXT,
        fuel TEXT,
        color TEXT,
        status TEXT,
        transmission TEXT,
        `vehicle type` TEXT,
        price REAL,
        city TEXT,
        make TEXT,
        description TEXT,
        url TEXT,
        pics TEXT,
        latitude FLOAT,
        longitude FLOAT
    )
''')


df.to_sql('vehicles', conn, if_exists='replace', index=False)

conn.commit()
conn.close()

print(f"Database '{database_name}' created and populated successfully with correct data types.")
