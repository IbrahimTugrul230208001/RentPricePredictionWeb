import joblib
import pandas as pd
import json
import sys

def predict_from_input(json_input):

    data = json.loads(json_input)

    location = data["location"]
    house_type = data["house_type"]
    area = float(data["area"])
    floor = data["floor"]

    # Load the model and datasets
    model = joblib.load('data/rent_price_model.pkl')
    df_modeling = pd.read_csv('data/modeling_data.csv')
    df_normal = pd.read_csv('data/ultimate_rent_price_dataset')

    # Preprocess data
    df_modeling.drop(columns=['Price', 'Area'], axis=1, inplace=True)
    df_new = pd.concat([df_normal, df_modeling])

    location_encoded = df_new.loc[df_new['Location'] == location, 'Location_Encoded'].values[0]
    floor_encoded = df_new.loc[df_new['Floor'] == floor, 'Floor_Encoded'].values[0]

    X = pd.DataFrame({
        'Area': [area],
        'House_Type': [house_type],
        'Location': [location],
        'Floor': [floor_encoded],
        'Location_Encoded': [location_encoded]
    })

    X[['Num_Halls', 'Num_Rooms']] = X['House_Type'].str.split('+', expand=True)
    X[['Num_Rooms', 'Num_Halls']] = X[['Num_Rooms', 'Num_Halls']].astype(float)
    X.drop('House_Type', axis=1, inplace=True)

    # Make prediction
    prediction = model.predict(X)[0]

    # Return the prediction as JSON
    return json.dumps({"prediction": prediction})


# Entry point for script execution
if __name__ == "__main__":
    json_input = sys.argv[1]  # Read input JSON passed from C#
    print(predict_from_input(json_input))
