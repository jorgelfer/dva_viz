# import libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
# import seaborn as sns

# load the dataset
df = pd.read_csv('west_oldeastconcat.csv')
# View the dataset
df.head()
DATA CLEANING
# View data info and shape
df.info()
df.shape
#check if there are any 'True' boolean statements in the duplicate function
# df.duplicated().value_counts()
df.duplicated(subset=['postID']).value_counts()

# df.isnull().values.any()
df.isnull().sum()
#year condition make 
# df.dropna(subset=['color', 'vehicle type'],axis=0,how='any',inplace=True)
# df["color"] = df["color"].fillna(0)
# df['vehicle type'] = df['vehicle type'].fillna(0)
#check the condition of the listed used cars 
fig,ax=plt.subplots(figsize=(10,6))
df.condition.value_counts().sort_values(ascending=False).plot(kind='bar')
plt.ylabel('Count')
plt.title('Distribution of condition of listed cars')
plt.grid(None)
modified_data = df.copy()
# Clean the 'condition' column to standardize values
modified_data['condition'] = modified_data['condition'].str.strip().str.lower()

def condition(row):
    if row['condition'] in ['excellent']:
        val = "excellent"
    elif row['condition'] in ['good', 'bon', 'assez bon', 'bueno']:
        val = "good"
    elif row['condition'] in ['like new', 'new', 'comme neuf', 'como nuevo']:
        val = "like new"
    elif row['condition'] in ['fair', '2010']:
        val = "fair"
    elif row['condition'] in ['salvage', '1970']:
        val = "salvage"
    else:
        val = "unknown"
    return val

modified_data['condition'] = modified_data.apply(condition, axis=1)
modified_data.isnull().sum()
cond_prob = pd.DataFrame(list(modified_data.condition.value_counts(normalize=True).items()), columns=['condition','prob'])
cond_prob
#substitute missing values in condition to random states based on their probabilities
modified_data.loc[modified_data.condition.isna(), 'condition'] = np.random.choice(cond_prob.condition, 
                                                size=modified_data.condition.isna().sum(),
                                                replace=True, 
                                                p=cond_prob.prob)
modified_data.isnull().sum()
modified_data.dropna(subset=['model', 'make year'],axis=0,how='any',inplace=True)
# modified_data.dropna(subset=['cylinder NO', 'drive'],axis=1,how='any',inplace=True)
modified_data.isnull().sum()
fig,ax=plt.subplots(figsize=(10,6))
modified_data.color.value_counts().sort_values(ascending=False).plot(kind='bar')
plt.ylabel('Count')
plt.title('Distribution of color of listed cars')
plt.grid(None)
def color(row):
    if row['color'] in ['white', 'Blanc', 'blanco', 'clean']:
        val = 'white'
    elif row['color'] in ['black', 'Noir']:
        val = 'black'
    elif row['color'] in ['silver', 'grey', 'Gris']:
        val = 'grey'
    elif row['color'] in ['blue', 'Bleu']:
        val = 'blue'
    elif row['color'] in ['yellow', 'Jaune']:
        val = 'yellow'
    elif row['color'] in ['red', 'Rou.']:
        val = 'red'
    elif row['color'] in ['green']:
        val = 'green'
    elif row['color'] in ['brown', 'Brun']:
        val = 'brown'
    elif row['color'] in ['orange']:
        val = 'orange'
    elif row['color'] in ['purple']:
        val = 'purple'
    elif row['color'] in ['custom']:
        val = 'custom'
    else:
        val = "unknown"
    return val

modified_data['color'] = modified_data.apply(color, axis=1)
modified_data.isnull().sum()
fig,ax=plt.subplots(figsize=(10,6))
modified_data['vehicle type'].value_counts().sort_values(ascending=False).plot(kind='bar')
plt.ylabel('Count')
plt.title('Distribution of color of listed cars')
plt.grid(None)
def vehicle_type(row):
    if row['vehicle type'] in ['SUV', 'VUS', 'offroad']:
        val = 'SUV'
    elif row['vehicle type'] in ['sedan', 'Berl.', 'sedÃ¡n']:
        val = 'sedan'
    elif row['vehicle type'] in ['À hayon', 'hatchback', 'wagon']:
        val = 'hatchback'
    elif row['vehicle type'] in ['coupe', 'Coupé']:
        val = 'coupe'
    elif row['vehicle type'] in ['truck', 'pickup', 'camiÃ³n']:
        val = 'pickup'
    elif row['vehicle type'] in ['van', 'bus']:
        val = 'van'
    elif row['vehicle type'] in ['minivan', 'minifourg.']:
        val = 'minivan'
    elif row['vehicle type'] in ['convertible']:
        val = 'convertible'
    elif row['vehicle type'] in ['other','44.826576']:
        val = 'other'
    else:
        val = "unknown"
    return val

modified_data['vehicle type'] = modified_data.apply(vehicle_type, axis=1)
modified_data.isnull().sum()
modified_data['model'].apply(lambda x: x.lower())

# define a function to split a name into first and last names
def split_name(name):
    return pd.Series(name.split(" ", 1))

# apply the split_name function to the "Name" column using apply()
modified_data[['make', 'model']] = modified_data['model'].apply(split_name)

# Remove non-numeric characters and convert to integer
modified_data['price'] = (
    modified_data['price']
    .str.replace(r'[^0-9]', '', regex=True)  # Remove all non-numeric characters
    .astype('Int64')  # Convert to integer
)
modified_data['price']
modified_data['postID'] = (
    modified_data['postID']
    .astype('Int64')  # Convert to integer
)
modified_data['odometer'] = (
    modified_data['odometer']
    .str.replace(r'[^0-9]', '', regex=True)  # Remove all non-numeric characters
    .astype('Int64')  # Convert to integer
)
print(modified_data['odometer'].dtype)
modified_data.dropna(subset=['color'],axis=0,how='any',inplace=True)
# modified_data.dropna(subset=['cylinder NO', 'drive'],axis=1,how='any',inplace=True)
modified_data.isnull().sum()
print(len(modified_data))
#save data file and load

modified_data.to_csv('vehicles2_rec.csv',index=False)