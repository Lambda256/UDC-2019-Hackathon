import pandas as pd
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import warnings
import os

warnings.filterwarnings('ignore')
mpl.rcParams['axes.unicode_minus'] = False
plt.rcParams["font.family"] = 'NanumGothicCoding'

if __name__ == "__main__":
    """
    load data
    """
    # https://data.seoul.go.kr/dataList/datasetView.do?infId=OA-15245&srvType=F&serviceKind=1¤tPageNo=1&searchValue=&searchKey=null
    files = os.listdir("./data/rentals")
    files = [file for file in files if '2018' in file]
    # print(files)

    column_types = {
        '대여일자': 'datetime64[ns]',
        '대여시간': 'int32',
        '대여소번호': 'category',
        '대여소명': 'category',
        '대여구분코드': 'category',
        '성별': 'category',
        '연령대코드': 'category',
        '이용건수': 'int32',
        '운동량': 'float32',
        '탄소량': 'float32',
        '이동거리': 'int32',
        '이동시간': 'int32',
    }

    try:
        df = pd.read_pickle('data/dataframes/2018.pkl')
    except:
        df = pd.DataFrame()

        total = len(files)
        for i, file in enumerate(files, 1):
            print("%d/%d loaded..." % (i, total))

            formatter = file.split('.')[1]
            if formatter == 'xlsx':
                _df = pd.read_excel(dirs + file,
                                    dtype=column_types,)
            elif formatter == 'csv':
                _df = pd.read_csv(dirs + file,
                                  dtype=column_types,
                                  parse_dates=['대여일자'],
                                  encoding='utf-8',
                                  )
            df = pd.concat([df, _df])

    df['대여소명'] = df['대여소명'].astype('category')
    df.to_pickle('data/dataframes/2018.pkl')
    # df.info(memory_usage='deep')

    unique_ids = sorted(list(df['대여소번호'].unique()))
    with open('data/station_id.txt', 'w') as f:
        for unique_id in unique_ids:
            f.write('{}\n'.format(unique_id))

    """
    extract '마포구' only
    """
    stations = pd.read_csv("./data/stations/stations.csv")
    # print(stations.head())

    rental_no = stations.groupby('구명')['대여소번호'].unique().loc['마포구']
    df = df[df['대여소번호'].isin(rental_no)]
    df = df.merge(stations[['대여소번호', '거치대수']], on='대여소번호')

    """
    load weather info
    """
    weather = pd.read_csv('data/2018 마포 날씨.csv', encoding='cp949')
    weather['일시'] = weather['일시'].astype('datetime64[ns]')
    weather['월'] = weather['일시'].dt.month
    weather['일'] = weather['일시'].dt.day
    weather['대여시간'] = weather['일시'].dt.hour
    # print(weather.info())
    # print(weather.head())

    df['월'] = df['대여일자'].dt.month
    df['일'] = df['대여일자'].dt.day
    df['요일'] = df['대여일자'].dt.dayofweek
    df = df.merge(weather, on=['월', '일', '대여시간'])
    # print(df.head())
    print(df.columns.values)
    print(df.shape)

    """
    create data frame per station
    """
    df['대여소명'] = df['대여소명'].cat.remove_unused_categories()
    # print(df['대여소명'].value_counts())
    # print(len(df['대여소명'].value_counts().keys()))  # number of stations

    # extract 'Hongdae' only
    hongdae = df[df['대여소명'] == ' 홍대입구역 2번출구 앞']
    cols = ['월', '일', '대여시간', '요일', '거치대수',
            '기온(°C)', '풍향(deg)', '풍속(m/s)', '강수량(mm)', '습도(%)']

    hongdae = hongdae.groupby(cols)['이동거리', '이동시간', '이용건수'].agg({
        "이동거리": 'mean',
        '이동시간': 'mean',
        "이용건수": 'sum'
    }).reset_index()
    # print(hongdae.head())

    # print(hongdae.columns.values)
    hongdae = hongdae.join(pd.get_dummies(hongdae['요일'], prefix="요일"))
    hongdae.head()
    dayofweek = ["요일_"+str(i) for i in range(7)]
    features = ['월', '대여시간', '기온(°C)', '풍향(deg)',
                '풍속(m/s)', '강수량(mm)', '습도(%)'] + dayofweek
    print(features)

    """
    train & test
    """
    from sklearn.model_selection import train_test_split
    from sklearn.preprocessing import MinMaxScaler

    X_train, X_test, y_train, y_test = train_test_split(
        hongdae[features], hongdae['이용건수'], test_size=0.2, random_state=42)

    # print(X_train.shape)
    # print(X_test.shape)
    # print(y_train.shape)
    # print(y_test.shape)

    """
    neural network model
    """
    # TODO: normalization

    import tensorflow as tf

    X_train, X_test, y_train, y_test =\
        X_train.to_numpy(), X_test.to_numpy(), y_train.to_numpy(), y_test.to_numpy()

    min_max_scaler = MinMaxScaler()
    fitted = min_max_scaler.fit(X_train)
    # print(fitted.data_max_)
    X_train = min_max_scaler.transform(X_train)
    X_test = min_max_scaler.transform(X_test)

    # TODO: modified model with concatenate layer
    nn_model = tf.keras.models.Sequential([
        # input & first layer
        tf.keras.layers.Dense(
            64,
            input_shape=(14,),
            activation=tf.nn.relu,
            kernel_initializer='he_normal'),
        tf.keras.layers.Dropout(0.5),
        
        # hidden layer
        tf.keras.layers.Dense(
            64,
            activation=tf.nn.relu,
            kernel_initializer='he_normal'),
        tf.keras.layers.Dropout(0.5),

        # output layer
        tf.keras.layers.Dense(
            1,
            activation='linear')
    ])
    nn_model.compile(
        optimizer='adam',
        loss='mean_absolute_error',
        metrics=['mse'])

    nn_model.fit(X_train, y_train, epochs=1000, batch_size=32)
    print(nn_model.evaluate(X_test, y_test))

    # 요일_0 == 월요일
    # preds = nn_model.predict(X_test)
    # for i, pred in enumerate(preds):
    #     print(pred[0], "\t", y_test[i], end="\r")
