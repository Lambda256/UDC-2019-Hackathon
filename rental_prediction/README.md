# xgboost regression (experimental model)

- 모델에 **`[ '대여소번호', '월', '대여시간', '요일', '기온(°C)', '풍향(deg)', '풍속(m/s)', '강수량(mm)', '습도(%)']` 를 입력으로 주면, 해당 시간의 예측한 대여건수를 출력**해준다.

    e.g. python3 infer.py --station_id 109 --month 10 --hour 16 --temp 20.0 --wind_dir 287.8 --wind_speed 2.4 --precipitation 0.0 --humidity 48.4 --day 0

- 모델 예측 값이 실제값과 다른 정도는 0.5-3 의 값의 범위를 가지는데, 평균적으로는 1.0대, **즉 평균적으로 한 대 정도의 오차가 난다.**
