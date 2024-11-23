import sqlite3
from flask import Flask, request, jsonify, abort, send_from_directory
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import pandas as pd
import numpy as np
from flask_cors import CORS

app = Flask(__name__, static_folder="static")
CORS(app)
DATABASE = 'vehicles.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  
    return conn

# Load and preprocess dataset from SQLite
def load_data_from_db():
    conn = get_db_connection()
    df = pd.read_sql_query("SELECT * FROM vehicles", conn)
    print(df.columns)
    # print(df.columns)
    conn.close()
    return df.dropna()

df = load_data_from_db()
print(len(df))
df.to_csv('Finalfrombackend.csv',index=False)

# Preprocess and label encode the data
label_data = df.loc[:, ['postID', 'model', 'condition', 'make year', 'cylinder NO', 'drive', 'fuel', 
                        'color', 'status', 'transmission', 'vehicle type', 'price', 'city', 'make']]

label_model = LabelEncoder()
label_condition = LabelEncoder()
label_drive = LabelEncoder()
label_fuel = LabelEncoder()
label_color = LabelEncoder()
label_status = LabelEncoder()
label_transmission = LabelEncoder()
label_vehicle_type = LabelEncoder()
label_city = LabelEncoder()
label_make = LabelEncoder()

label_data['model'] = label_model.fit_transform(label_data['model'])
label_data['condition'] = label_condition.fit_transform(label_data['condition'])
label_data['drive'] = label_drive.fit_transform(label_data['drive'])
label_data['fuel'] = label_fuel.fit_transform(label_data['fuel'])
label_data['color'] = label_color.fit_transform(label_data['color'])
label_data['status'] = label_status.fit_transform(label_data['status'])
label_data['transmission'] = label_transmission.fit_transform(label_data['transmission'])
label_data['vehicle type'] = label_vehicle_type.fit_transform(label_data['vehicle type'])
label_data['city'] = label_city.fit_transform(label_data['city'])
label_data['make'] = label_make.fit_transform(label_data['make'])

# Feature importance calculation
X = df[['make', 'color', 'vehicle type']].copy()
y = df['price']

X.loc[:, 'make'] = label_make.fit_transform(X['make'])
X.loc[:, 'color'] = label_color.fit_transform(X['color'])
X.loc[:, 'vehicle type'] = label_vehicle_type.fit_transform(X['vehicle type'])

model = RandomForestRegressor(random_state=25)
model.fit(X, y)

importance = model.feature_importances_
feature_importance = pd.DataFrame({
    'Feature': X.columns,
    'Importance': importance
}).sort_values(by='Importance', ascending=False)

print(feature_importance)
###################

def recommend(make, color_group, type_group, price_range, year, state):
    

    data = df.loc[
        (df['color'] == color_group) &
        (df['vehicle type'] == type_group) &
        (df['price'] <= price_range) &
        (df['make year'] >= year)
    ]
    data.reset_index(level=0, inplace=True)
    # print(data.isna().sum()) 
    # data.loc[:, 'make'] = data['make'].astype(str).replace(r'[^a-zA-Z\s]',"NAA", regex=True)
    # data.loc[:, 'color'] = data['color'].astype(str).replace(r'[^a-zA-Z\s]',"NAA", regex=True)
    # data.loc[:, 'vehicle type'] = data['vehicle type'].astype(str).replace(r'[^a-zA-Z\s]',"NAA", regex=True)

    # print(data['make'].isna().sum())  # Ensure no NaN values remain
    # print(data['color'].isna().sum())
    # print(data['vehicle type'].isna().sum())

    # # Ensure the data types are correct
    # print(data['make'].dtype)
    # print(data['color'].dtype)
    # print(data['vehicle type'].dtype)

    

    # Initialize TfidfVectorizer
    tf = TfidfVectorizer(analyzer='word', ngram_range=(1, 1), min_df=1, stop_words='english')


    tfidf_make = tf.fit_transform(data['model'])
    query_make_vector = tf.transform([make])
    sim_make = cosine_similarity(query_make_vector, tfidf_make).flatten()

    tfidf_color = tf.fit_transform(data['color'])
    query_color_vector = tf.transform([color_group])
    sim_color = cosine_similarity(query_color_vector, tfidf_color).flatten()

    tfidf_type = tf.fit_transform(data['vehicle type'])
    query_type_vector = tf.transform([type_group])
    sim_type = cosine_similarity(query_type_vector, tfidf_type).flatten()

    # Status weight
    data['status_weight'] = data['status'].apply(lambda x: 0.5 if x.lower() == 'clean' else 0.1)

    # Make importance for exact match boost
    data['make_match'] = data['make'].apply(lambda x: 1.0 if x.lower() == make.lower() else 0.0)

    # Location importance
    state_coor = {
        'GA': {'latitude': 33.753746, 'longitude': -84.386330},
        'FL': {'latitude': 27.725, 'longitude': -83.83333},
        'TN': {'latitude': 35.83333, 'longitude': -85.98333},
        'AL': {'latitude': 32.591667, 'longitude': -86.674995},
        'SC': {'latitude': 33.624995, 'longitude': -80.8801},
        'CL': {'latitude': 37.26665, 'longitude': -119.2833},
    }
    latitude = state_coor.get(state, {'latitude': 44.9666, 'longitude': -103.7666})['latitude']
    longitude = state_coor.get(state, {'latitude': 44.9666, 'longitude': -103.7666})['longitude']

    data['distance'] = np.sqrt(
        (data['latitude'] - latitude)**2 + (data['longitude'] - longitude)**2
    ) + 0.001
    data['location_value'] = 1.0 / data['distance']

    # Define weights
    weight_make = 5 
    weight_color = 0.5
    weight_type = 0.5
    weight_status = 0.3
    location_importance = 1.5
    exact_match_boost = 10 

    # debug info
    # print('model:', sim_make)
    # print('color:', sim_color)
    # print('type:', sim_type)
    # print('status:', data['status_weight'])
    # print('location:', data['location_value'])
    # print('make match:', data['make_match'])


    # Calculate similarity score
    data['similarity_score'] = (
        (weight_make * sim_make) +
        (exact_match_boost * data['make_match']) +  # Boost exact matches
        (weight_color * sim_color) +
        (weight_type * sim_type) +
        (location_importance * data['location_value']) +
        (weight_status * data['status_weight'])
    )

    # Sort by similarity score
    data = data.sort_values(by='similarity_score', ascending=False)

    # Fetch images
    data['pics'] = data['pics'].apply(
        lambda pics: [
            f"http://127.0.0.1:5000/images/{pic.strip().replace('.jpg', '')}" 
            for pic in pics.split(",")
        ] if isinstance(pics, str) else []
    )

    # Return selected fields
    rec = data[[
        'postID', 'price', 'make', 'model', 'vehicle type', 'make year', 'condition', 'fuel',
        'status', 'transmission', 'color', 'city', 'description', 'url', 'pics',
        'latitude', 'longitude', 'similarity_score']].head(500)

    return rec



def predict(make, color_group, type_group, year):
    conn = get_db_connection()
    data = pd.read_sql_query("SELECT * FROM vehicles", conn)
    conn.close()

    le_make = LabelEncoder()
    le_color = LabelEncoder()
    le_type = LabelEncoder()
    le_year = LabelEncoder()

    try:
        data['make_encoded'] = le_make.fit_transform(data['make'])
        data['color_encoded'] = le_color.fit_transform(data['color'])
        data['type_encoded'] = le_type.fit_transform(data['vehicle type'])
        data['year_encoded'] = le_year.fit_transform(data['make year'])

        X = data[['make_encoded', 'color_encoded', 'type_encoded', 'year_encoded']]
        y = data['price']

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        rf = RandomForestRegressor(random_state=42, n_estimators=200, min_samples_split=2, min_samples_leaf=4, max_features='sqrt',max_depth=20)
        rf.fit(X_train, y_train)

        input_data = np.array([[le_make.transform([make])[0],
                                le_color.transform([color_group])[0],
                                le_type.transform([type_group])[0],
                                le_year.transform([year])[0]]])
        predicted_price = rf.predict(input_data)
        return int(predicted_price[0])
    except Exception as e:
        abort(400, description=f"Error during prediction: {e}")

@app.route('/api/recommend/<string:make>/<string:color_group>/<string:type_group>/<int:price_range>/<int:year>/<string:state>', methods=['GET'])
def recommend_cars_url(make, color_group, type_group, price_range, year,state):
    try:
        recommendations = recommend(make, color_group, type_group, price_range, year, state)
        return jsonify(recommendations.to_dict(orient='records')), 200
    except Exception as e:
        abort(500, description=f"Error during recommendation: {e}")

@app.route('/api/predict/<string:make>/<string:color_group>/<string:type_group>/<int:year>', methods=['GET'])
def predict_price_url(make, color_group, type_group, year):
    try:
        predicted_price = predict(make, color_group, type_group, year)
        return jsonify({"predicted_price": predicted_price}), 200
    except Exception as e:
        abort(500, description=f"Error during prediction: {e}")


# images
@app.route('/images/<filename>', methods=['GET'])
def get_image(filename):
    try:
        return send_from_directory("img/", f"{filename}.jpg")
    except Exception as e:
        abort(404, description=f"Image not found: {e}")

if __name__ == '__main__':
    print("[INFO] Starting Flask server...")
    app.run(debug=True)
