[![license](https://img.shields.io/badge/license-MIT-black)](https://opensource.org/licenses/MIT)
![version](https://img.shields.io/badge/version-v0.3.1-orange.svg)
[![node](https://img.shields.io/badge/node-%3E%3D8.9.4-yellow.svg)](https://nodejs.org/en/)   
[![python](https://img.shields.io/badge/python-3.6.8-blue)](https://www.python.org)

# 스마트 공유 모빌리티 서비스, 타고벌자

![title](https://github.com/eric-yoo/mobicrypt/blob/master/images/phone.png)

* Team VMO

## Prerequisites

서버를 구동하기 위해 [nodeJS](https://nodejs.org/en/download/) 및 [python3](https://www.python.org/downloads/)가, 클라이언트로는 Chrome 브라우저가 필요합니다.

### Installation

npm 패키지 매니저를 이용해 nodeJS 라이브러리를 설치합니다.

```bash
npm i
```

pip 패키지 매니저를 이용해 python3 라이브러리를 설치합니다.

```bash
pip3 install -r requirements.txt
```

## How it works

### FL (Federated Learning)

![PPDL](https://github.com/eric-yoo/mobicrypt/blob/master/images/PPDL.png)

모빌리티 예측 모델을 탈중앙화된 환경에서 학습하고 수행할 수 있는, 탈중앙하된 인공신경망 모델입니다. FL 참여자들은 서로 데이터를 공개하지 않고 공통의 인공 신경망 모델을 학습시킬 수 있습니다(Privacy Preserving Deep Learning, PPDL).

현재 예측 모델은 tensorflow 기반의 간단한 인공 신경망으로 설계되어 있습니다.

- `node.py`, `block.py`: 프레임워크를 위한 블록체인을 정의

- `model.py`: 프레임워크를 통해 학습시킬 인공 신경망 모델을 정의
  - input: `[ '대여소번호', '월', '대여시간', '요일', '기온(°C)', '풍향(deg)', '풍속(m/s)', '강수량(mm)', '습도(%)']` 
  - output: 해당 시간 대여소의 수요 예측
  - 예측 정확도는 MAE(Mean Absolute Error)를 기준으로 산정합니다. 데모를 위한 MVP 모델(마포구 데이터에 대해 학습)의 MAE는 1.2, 즉 평균적으로 한 대 정도의 높은 정확도를 보입니다.
  
- `main.py`: FL-chain을 초기화하고 블록을 생성합니다. `arguments.py`를 통해 수행 시 인자를 설정할 수 있습니다.
  - `--preTrain=0`: Genesis Block부터 다시 생성합니다.
  - `--preTrain=n` where n > 0: n번째 Block부터 다시 생성합니다.
  - `--preTrain=-1`: 가장 최신 블록에서부터 이어 체인을 형성합니다.
  
```
python FL/main.py --nodes=5 --round=1000 --globalSet=10000 --preTrain=-1
```

### Inference

스마트 컨트랙트에 등록된 inference 요청을 수집, 수행하고 결과를 스마트 컨트랙트에 등록합니다.

- `inferencer.py`: 스마트 컨트랙트에 등록된 inference를 하나씩 처리합니다. 스마트 컨트랙트를 호출하는 연속적인 동작들은 이전 요청이 성공적으로 처리되었음을 확인한 후 다음 step으로 넘어갑니다.

```
python inference/inferencer.py
```

### Relay

FL을 위한 블록체인과 루니버스 사이드체인 간 relay를 위한 모듈입니다.

- `relayer.py`: relay를 수행하는 relayer를 동작합니다. FL-chain의 길이와 relay 된 정보의 길이를 비교해, 스마트 컨트랙트에 업데이트 정보를 보내거나 대기합니다.

```
python relay/relayer.py
```

### Simulation

![simul](https://github.com/eric-yoo/mobicrypt/blob/master/images/simul.png)

시뮬레이션을 통해 합리적인 대여요금 및 인센티브 제도를 찾습니다.

- `agent.py`: 시뮬레이션에 참여하는 사용자(user)를 정의합니다.

- `environment.py`: 시뮬레이션의 환경을 정의합니다.

- `mechanisms.py`: 시뮬레이션하고자 하는 인센티브 지급의 여러 방법론을 정의합니다.

- `visualization.py`: 시뮬레이션 결과를 시각화합니다.

- `main.py`: 시뮬레이션을 수행합니다.

```
python simulation/main.py --mechanism=2 --defaultFee=200
```

### Frontend

프론트엔드 프레임워크로 [uikit](https://getuikit.com) 를 수정하여 사용하였으며, 지도 API 로는 [leaflet](https://leafletjs.com) 라이브러리를 사용했습니다. 

모바일 및 데스크톱 환경 모두 크롬 브라우저에 최적화 되어있습니다.

- `/index.html`: 메인화면 레이아웃

- `/public/js/function.js`: 메인로직에 필요한 이벤트 핸들러 및 함수 정의

- `/public/js/txs.js`: 루니버스 체인에 Tx를 전송하기 위한 API 함수 정의

- `public/src/stations.csv`: 서울시 공용 자전거 따릉이의 대여소 정보

- `public/src/weather.csv`: 마포구의 날씨 데이터


#### Usage

최상위 디렉토리의 server.js를 통해 서버를 구동해 8089 포트에서 웹 서버를 실행합니다.

```bash
node server.js
```

크롬 브라우저를 실행, [localhost:8089](http://localhost:8089) 에 접속합니다.
