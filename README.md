# UDC 2019 Hackathon with Luniverse

## 블록체인 DApp 개발에 도전하세요.

PC시대에서 모바일시대로 패러다임이 전환되면서 어플리케이션의 시대가 열렸고,
앞으로는 블록체인의 시대가 열릴 것이라고 믿습니다.
하지만 아직 서비스 그 자체로 이용자에게 선택 받는 DApp은 거의 없고,
여전히 블록체인과 암호화폐의 실용성과 유용성에 대한 의문을 갖는 분들도 많습니다.

UDC와 루니버스는 이런 물음에 답하는 개발자를 만나고자 ‘루니버스와 함께하는 UDC 해커톤’을 마련했습니다.
블록체인 DApp을 쉽게 개발할 수 있게 도와주는 블록체인 서비스 플랫폼인
루니버스를 이용하여 DApp 개발에 도전하시기 바랍니다.

### Luniverse 란?
#### LUNIVERSE BLOCKCHAIN SERVICE PLATFORM

안전하고 확장성 있는 체인을 기반으로 블록체인 서비스 개발 및 운영에 필요한 모든 환경을 편리하고 안전하게 제공합니다.

[루니버스 둘러보기](https://www.luniverse.io)

## 총 상금 50,000,000원의 기회!

- 1등: 3,000만원 (1팀)
- 2등: 1,000만원 (1팀)
- 3등: 500만원 (2팀)
- 인기상: 100만원 상당 기념품 (1팀)

*해커톤에 참가신청만 해도 100 루니버스 크레딧 증정!*

## 행사개요

- 참가대상: 해커톤에 관심 있는 개인 혹은 팀 (2~5명)
- 참가비용: 별도 비용 없음
- 진행방식: 서류 심사 후 본선 진행

## 심사기준

### 예선심사기준

- 주제 부합성: 루니버스 활용을 얼마나 잘 하였는가	
- 창의성/혁신성: 문제를 명확히 제시하고 얼마나 참신하게 풀어냈는가	
- 활용성: 실생활에 어떻게 접목되고, 효과적으로 전달될 수 있는가

### 본선심사기준

- 기술성: 기술적 로드맵이 잘 구성 되었는가	
- 완성도: 계획안에 담긴 내용이 다 구현되었는가	
- 사업성: 서비스의 효용과 가치가 충분히 전달되었는가


## 본선 프로젝트

1. [인타임](https://github.com/Lambda256/UDC-2019-Hackathon/tree/intime)
2. [타타타](https://github.com/Lambda256/UDC-2019-Hackathon/tree/tatata)
3. [루니사인](https://github.com/Lambda256/UDC-2019-Hackathon/tree/lunisign)
4. [리겜](https://github.com/Lambda256/UDC-2019-Hackathon/tree/regam)
5. [블카](https://github.com/Lambda256/UDC-2019-Hackathon/tree/blcar)
6. [시공조아](https://github.com/Lambda256/UDC-2019-Hackathon/tree/sigong)
7. [중고로운평화나라](https://github.com/Lambda256/UDC-2019-Hackathon/tree/joonggoroun)
8. [마이워크체인](https://github.com/Lambda256/UDC-2019-Hackathon/tree/myworkchain)
9. [이어줄개](https://github.com/Lambda256/UDC-2019-Hackathon/tree/linkdog)
10. [해시마켓](https://github.com/Lambda256/UDC-2019-Hackathon/tree/hashgon)
11. [진실의입](https://github.com/Lambda256/UDC-2019-Hackathon/tree/mouthoftruth)
12. [VMO](https://github.com/Lambda256/UDC-2019-Hackathon/tree/vmo)

## Contract deploy API

### Contracts [/be/chains/contracts]
#### Contract 등록 [POST /be/chains/{chainId}/contracts]
Chain에 Smart Contract를 배포하기 위한 소스코드/바이트코드를 등록하기 위한 API (`Account Token` 필요, 개발자도구 네트워크 탭 참조)

##### URI Parameters
- **chainId**: `1234` (string, required) - (고유값) Chain ID

##### Request Example (application/json)
```
+ Headers

  Authorization: Bearer ACCOUNT_TOKEN

+ Attributes
  + name: `LuvToken` (string, required) - Contract 이름
  + description: `Luniverse Token` (string) - 설명
  + filename: `LuvToken.sol` (string) - Contract 파일명
  + sourcecode: `pragma solidity ^0.4.18; ...` (string) - Solidity Sourcecode (compiled 필드를 지정할 경우 필요없음)
  + compiled (object) - Solidity Compiled Payload (sourcode 필드가 지정된 경우 무시됨)
      + LuvToken (object) - 컴파일된 Contract Payload
          + abi (array[object]) - ABI
          + bytecode: `6080604052348015610010576000...` (string) - Bytecode
      + SolToken (object) - 컴파일된 Contract Payload
          + abi  (array[object]) - ABI
          + bytecode: `6080604052348015610010576000...` (string) - Bytecode
  + constructorName: `LuvToken` (string) - 배포할 Contract의 Constructor 이름 (sourcode 혹은 compiled에 포함된 Contract만 허용)
  + constructorParams (object) - Constructor Parameter (Key-Value 형태의 Object)
  + optimizer (object) - (Optional) Optimzier Settings
      + enabled: `true` (boolean) - Optimizer 활성화 여부
      + runs: `200` (number) - Optimize 실행 횟수
```

##### Response 200 (application/json)
```
+ Attributes (object)
  + result: true (boolean) - 성공여부
  + data (object) - 응답결과
    + contract (object) - 등록된 Contract
      + contractId: `4321` (string) - (고유값) Contract ID
      + chainId: `1234` (string) - Chain ID
      + name: `LuvToken` (string) - Contract 이름
      + description: `Luniverse Token` (string) - 설명
      + contractAddress: `0x10f9ce6fac576a5f13ff9..` (string, nullable) - Contract Address
      + status: `SIGN-REQUIRED` (enum[string]) - Status
        `REVIEW-REQUIRED`: 리뷰필요 (SA가 등록했을 경우 최초 상태)
        `REVIEW-REJECT`: 리뷰 Reject (MA에 의해서 SA가 올린 컨트랙 리뷰가 Reject 됐을 경우)
        `SIGN-REQUIRED`: RawTx 서명필요 (MA가 업로드 했을 경우 최초 상태, SA가 업로드 후 MA가 승인했을 경우)
        `SIGNED`: 서명완료 (자동으로 Chain으로 배포될 예정인 상태)
        `DEPLOYING`: 배포중
        `DEPLOY-FAILED`: 배포실패
        `DEPLOYED`: 배포완료

        + Members
          + `REVIEW-REQUIRED` - 리뷰필요
          + `REVIEW-REJECT` - 리뷰 Reject
          + `SIGN-REQUIRED` - RawTx 서명필요
          + `SIGNED` - 서명완료
          + `DEPLOYING` - 배포중
          + `DEPLOY-FAILED` - 배포실패
          + `DEPLOYED` - 배포완료
```

#### Contract 배포(서명) [POST /be/chains/{chainId}/contracts/{contractId}/deploy]
Chain으로 Contract를 배포(서명)하기 위한 API (`Account Token` 필요, 개발자도구 네트워크 탭 참조)

```
RawTx의 요청과 SignedTx의 전송은 동일한 Endpoint로 이루어집니다.
파라미터로 입력하는 `ownerAddress`에 따라서 PKMS에 등록된 Wallet Address일 경우 RawTx를 반환하지 않고,
대리서명 후 바로 SignedTx를 생성하여 Chain에 Contract Deploy 요청을 합니다.

`ownerAddress`를 PKMS에 등록된 Wallet Address로 지정하는 경우 `rawTx`를 반환하지 않고,
`signedTx`를 인자로 전송할 필요가 없습니다.

`ownerAddress`를 지정하지 않거나, PKMS에 등록되어 있지 않은 Wallet Address로 지정하는 경우
`signedTx`가 인자로 전송되지 않은 요청에 대해서 서버는 `rawTx`를 반환하고,
클라이언트에서 해당 Private Key로 직접 서명 후 동일한 Endpoint로 `signedTx`를 함께 전송해야 합니다.

Contract 목록 조회 API를 통하여 배포 성공 여부를 확인해야 합니다.
```

```
**202 Error**

Private Key 서명이 필요한 경우 반환됩니다. 반환되는 `rawTx` 필드를 서명 후 `signedTx` 필드에 다시 요청해 주세요.
```

##### URI Parameters
- chainId: `1234` (string, required) - Chain ID
- contractId: `4321 (string, required) - Contract ID

##### Request Example (application/json)
```
+ Headers

  Authorization: Bearer ACCOUNT_TOKEN

+ Attributes
  + ownerAddress: `0x008aeeda4d805471df9b2a5b0f38a0c3bcba786b` (string) - Contract Owner Address (미입력시 배포 요청하는 계정의 Wallet Address로 지정됨)
  + signedTx: `f8728201c280833d09008080a4a...` (string) - SignedTx
```

##### Response 200 (application/json)
```
+ Attributes (object)
  + result: true (boolean) - 성공여부
```

##### Response 202 (application/json)
```
+ Attributes (object)
  + result: true (boolean) - 성공여부
  + data (object) - 응답결과
    + from: `0x008aeeda4d805471df9b2a5b0f38a0c3bcba786b` (string, nullable) - 서명이 필요한 Wallet Address
    + rawTx (object) - 서명이 필요한 Raw Tx
      + from: `0x6d3780ea80c2bd2999750c1b55a13a1082f` (string) - from
      + nonce: `0x1c2` (string) - nonce
      + data: `0xa0712d680000000000000000000000000000000000000000000000000000000000000064` (string) - data
      + gasLimit: `0x3d0900` (string) - gasLimit
      + gasPrice: `0x0` (string) - gasPrice
```
