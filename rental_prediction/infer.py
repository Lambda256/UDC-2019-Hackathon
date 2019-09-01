import joblib
import argparse
import numpy as np
import pandas as pd

#load saved model
filename = "xgb_mapo" 
prediction_model = joblib.load(filename)

parser = argparse.ArgumentParser(description='get model input.')

parser.add_argument('--station_id', type=int, help='station id')
parser.add_argument('--month', type=int, help='month')
parser.add_argument('--hour', type=int, help='0~23')
parser.add_argument('--temp', type=float, help='station id')
parser.add_argument('--wind_dir', type=float, help='0~360 (deg)')
parser.add_argument('--wind_speed', type=float, help='in m/s')
parser.add_argument('--precipitation', type=float, help='in mm')
parser.add_argument('--humidity', type=float, help='in percentage')
parser.add_argument('--day', type=int, help='0(mon)~6(sun)')

args = parser.parse_args()
day = [0,0,0,0,0,0,0]
day[args.day] = 1

input_key = ['대여소번호', '월', '대여시간', '기온(°C)', '풍향(deg)', '풍속(m/s)', '강수량(mm)', '습도(%)', '요일_0', '요일_1', '요일_2', '요일_3', '요일_4', '요일_5', '요일_6']
input_val = [args.station_id, args.month, args.hour, args.temp, args.wind_dir, args.wind_speed, args.precipitation, args.humidity, day[0], day[1], day[2], day[3], day[4], day[5], day[6]]
input_dict = {}
for i,key in enumerate(input_key):
    input_dict[key] = input_val[i]
inputs = pd.DataFrame(input_dict, index=[0])

print(prediction_model.predict(inputs)[0])