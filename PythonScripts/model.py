# views.py
import joblib
import pandas as pd


def rent_price_prediction(request):
    prediction = None

    if request.method == "POST":
        location = request.POST.get("district")
        house_type = request.POST.get("house_type")
        area = float(request.POST.get("area"))
        floor = request.POST.get("floor")

        prediction = make_prediction(location, house_type, area, floor)
    
    return render(request, 'rent_price_prediction.html', {'prediction': prediction})

def make_prediction(location, house_type, area, floor):
    model = joblib.load('data/rent_price_model.pkl')
    df_modeling = pd.read_csv('data/modeling_data.csv')
    df_normal = pd.read_csv('data/ultimate_rent_price_dataset')
    
    df_modeling.drop(columns=['Price', 'Area'], axis=1)
    df_new = pd.concat([df_normal, df_modeling])  # Concatenation requires list or tuple
    
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

    prediction = model.predict(X)
    return prediction
