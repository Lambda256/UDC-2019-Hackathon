## 스마트 공유 모빌리티 서비스, 타고벌자 (team VMO)

**타고벌자**는 스마트 공유 모빌리티를 위한 웹 서비스의 MVP입니다.



### Prerequisites

------

서버를 구동하기 위해 [nodeJS](https://nodejs.org/en/download/) 및 [python3](https://www.python.org/downloads/)가, 클라이언트로는 Chrome 브라우저가 필요합니다.

#### 

### Installation

------

npm 패키지 매니저를 이용해 nodJS 라이브러리를 설치합니다.

```bash
npm i
```

pip 패키지 매니저를 이용해 python3 라이브러리를 설치합니다.

```bash
pip3 install -r requirements.txt
```



### How it works

------

#### FL (federated learning)

블록체인을 이용한 탈중앙화된 모빌리티 예측 모델을 위한 프레임워크입니다.

FL 참여자들은 서로 데이터를 공개하지 않고 공통의 인공 신경망 모델을 학습시킬 수 있습니다.

현재 예측 모델은 tensorflow 기반의 간단한 인공 신경망으로 설계되어 있습니다.

- `node.py`, `block.py` 프레임워크를 위한 블록체인을 정의

- `model.py`: 프레임워크를 통해 학습시킬 인공 신경망 모델을 정의
  - input: `[ '대여소번호', '월', '대여시간', '요일', '기온(°C)', '풍향(deg)', '풍속(m/s)', '강수량(mm)', '습도(%)']` 
  - output: 해당 시간의 예측한 대여건수
  - 예측 정확도는 MAE를 기준으로 산정합니다.
    데모를 위한 MVP 모델(마포구 데이터에 대해 학습)의 MAE는 1.2, 즉 평균적으로 한 대 정도의 오차가 납니다.



#### inference

[need fix @luke]

- `arguments.py` 사용자의 transaction 중에 모빌리티 예측 필요한 transaction에 대해 인자들을 저장

- `inferencer.py` transaction을 하나씩 처리하면서 결과를 컨트랙트에 저장



#### relay

[need fix @luke]

FL을 위한 블록체인과 루니버스 사이드체인 간 relay를 위한 모듈입니다.





#### Frontend

프론트엔드 프레임워크로 [uikit](https://getuikit.com) 를 수정하여 사용하였으며, 지도 API 로는 [leaflet](https://leafletjs.com) 라이브러리를 사용했습니다. 

모바일 및 데스크톱 환경 모두 크롬 브라우저에 최적화 되어있습니다.

- `/index.html ` 메인화면 레이아웃

- `/public/js/function.js` 메인로직에 필요한 이벤트 핸들러 및 함수 정의

- `/public/js/txs.js` 루니버스 체인에 Tx를 전송하기 위한 API 함수 정의

- `public/src/stations.csv`  서울시 공용 자전거 따릉이의 대여소 정보

- `public/src/weather.csv` 마포구의 날씨 데이터



### Usage

------

최상위 디렉토리의 server.js를 통해 서버를 구동해 8089 포트에서 웹 서버를 실행합니다.

```bash
node server.js
```

크롬 브라우저를 실행, [localhost:8089](http://localhost:8089) 에 접속합니다.