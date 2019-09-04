import pandas as pd
import warnings
import os


def get_train_test(PATH="./data/realworld", getScalar=False):
    warnings.filterwarnings('ignore')

    """
    load data
    """
    # https://data.seoul.go.kr/dataList/datasetView.do?infId=OA-15245&srvType=F&serviceKind=1¤tPageNo=1&searchValue=&searchKey=null
    dirs = PATH + "/rentals"
    files = os.listdir(dirs)
    files = [file for file in files if '2018' in file]

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
        df = pd.read_pickle(PATH + '/dataframes/2018.pkl')
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
    df.to_pickle(PATH + '/dataframes/2018.pkl')
    # df.info(memory_usage='deep')

    unique_ids = sorted(list(df['대여소번호'].unique()))
    with open(PATH + '/stations/station_id.txt', 'w') as f:
        for unique_id in unique_ids:
            f.write('{}\n'.format(unique_id))

    """
    extract '마포구' only
    """
    stations = pd.read_csv(PATH + "/stations/stations.csv")
    # print(stations.head())

    rental_no = stations.groupby('구명')['대여소번호'].unique().loc['마포구']
    df = df[df['대여소번호'].isin(rental_no)]
    df = df.merge(stations[['대여소번호', '거치대수']], on='대여소번호')

    """
    load weather info
    """
    weather = pd.read_csv(PATH + '/weather/2018 마포 날씨.csv', encoding='cp949')
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
    # print(df.columns.values)
    # print(df.shape)

    """
    create data frame per station
    """
    df['대여소명'] = df['대여소명'].cat.remove_unused_categories()
    # print(df['대여소명'].value_counts())
    # print(len(df['대여소명'].value_counts().keys()))  # number of stations

    # add '대여소번호'
    input_cols = ['대여소번호', '월', '일', '대여시간', '요일', '거치대수',
                  '기온(°C)', '풍향(deg)', '풍속(m/s)', '강수량(mm)', '습도(%)']
    mapo = df.groupby(input_cols)['이동거리', '이동시간', '이용건수'].agg({
        "이동거리": 'mean',
        '이동시간': 'mean',
        "이용건수": 'sum'
    }).reset_index()
    # print(mapo.head())

    mapo.columns.values
    mapo = mapo.join(pd.get_dummies(mapo['요일'], prefix="요일"))
    # print(mapo.head())
    dayofweek = ["요일_"+str(i) for i in range(7)]  # 요일_0 is "월요일"
    features = ['대여소번호', '월', '대여시간',
                '기온(°C)', '풍향(deg)', '풍속(m/s)', '강수량(mm)', '습도(%)'] + dayofweek
    # TODO: '대여소번호' to one-hot-encoding
    # print(features)

    from sklearn.model_selection import train_test_split
    from sklearn.preprocessing import MinMaxScaler

    X_train, X_test, y_train, y_test = train_test_split(
        mapo[features], mapo['이용건수'], test_size=0.2, random_state=42)

    # to numpy array
    X_train, X_test, y_train, y_test =\
        X_train.to_numpy(), X_test.to_numpy(), y_train.to_numpy(), y_test.to_numpy()

    # normalization
    min_max_scaler = MinMaxScaler()
    min_max_scaler.fit(X_train)  # fitted = min_max_scaler.fit(X_train)
    # print(fitted.data_max_)
    X_train = min_max_scaler.transform(X_train)
    X_test = min_max_scaler.transform(X_test)

    if getScalar is True:
        return features, min_max_scaler
    else:
        return features, X_train, y_train, X_test, y_test


if __name__ == "__main__":
    features, X_train, y_train, X_test, y_test = get_train_test()

    """
    train & test
    """
    import tensorflow as tf

    # TODO: modified model with concatenate layer
    nn_model = tf.keras.models.Sequential([
        # input & first layer
        tf.keras.layers.Dense(
            64,
            input_shape=(len(features),),
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
            activation=tf.nn.relu)
    ])
    nn_model.compile(
        optimizer='adam',
        loss='mean_absolute_error',
        metrics=['mse'])

    # training
    # early stopping
    early_stopping = tf.keras.callbacks.EarlyStopping(
        monitor='loss', patience=20)  # loss is 'mae'

    nn_model.fit(
        X_train, y_train,
        epochs=1000,
        batch_size=32,
        callbacks=[early_stopping])

    # evalutation
    print(nn_model.evaluate(X_test, y_test))

    # preds = nn_model.predict(X_test)
    # for i, pred in enumerate(preds):
    #     print(pred[0], "\t", y_test[i], end="\r")
