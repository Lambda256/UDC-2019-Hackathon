<template>
  <div>
    <!--<Header />-->
    <div class="pt-5">
      <div class="mypage-img my-img"></div>
      <div class="py-5">
        <div class="wrapper py-xl-5">
          
          <div
              v-if="walletAddress.user"
              class="portfolio-caption">
            <div class="portfolio-caption t_white font-weight-500">
              <div
                  v-if="userInfo.name"
                  class="h1 mb4">{{userInfo.name}}
              </div>
              <div
                  v-if="!userInfo.name"
                  class="h1 mb4">{{walletAddress.user}}
              </div>
            </div>
            <div class="portfolio-caption t_white font-weight-500">{{balance}}
              <span class="h1 mb4">IFT
              </span>
            </div>
          </div>
          
          <div
              v-if="!accounts[0]"
              class="portfolio-caption">
            <div class="portfolio-caption t_white font-weight-500">
              <div class="h1 mb4">회원정보</div>
            </div>
            <!--<div class="portfolio-caption t_white font-weight-500">-->
            <!--<span class="h1 mb4">회원정보를 보시려면 로그인이 필요합니다.</span>-->
            <!--</div>-->
          </div>
        
        </div>
      </div>
    </div>
    <div class="container px-3">
      <div class="flex-row">
        
        <div
            class=""
            style="margin-top: 6rem;">
          <h3>UserInfo</h3>
        </div>
        <table class="tbl">
          <colgroup>
            <col style="width:20%">
            <col style="width:30%">
            <col style="width:30%">
            <col style="width:30%">
          </colgroup>
          <thead>
          <tr>
            <th scope="col">이름</th>
            <th scope="col">이메일(인증결과)</th>
            <th scope="col">휴대폰 번호(인증결과)</th>
            <th scope="col">생년월일</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="!userInfo.name">
            <td
                colspan="4"
                style="text-align: center;">
              로그인을 하신 후 개인정보 제공에 동의를 하시면 나타나게 됩니다.
            </td>
          </tr>
          <tr v-if="userInfo.name">
            <td scope="row">{{userInfo.name}}</td>
            <td>
              {{userInfo.email+" ("+ (userInfo.emailCrtfd ? "인증완료" : "인증안함") +")"}}
            </td>
            <td>
              {{userInfo.mobile+" ("+ (userInfo.mobileCrtfd ? "인증완료" : "인증안함") +")"}}
            </td>
            <td>
              {{userInfo.dateBirth}}
            </td>
          </tr>
          </tbody>
        </table>
        
        <div
            class="mb-3"
            style="margin-top: 6rem;">
          <h3>History</h3>
        </div>
        <table class="tbl">
          <colgroup>
            <col style="width:20%">
            <col style="width:40%">
            <col style="width:10%">
          </colgroup>
          <thead>
          <tr>
            <th scope="col">일시</th>
            <th scope="col">항목</th>
            <th scope="col">실행결과</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-bind:key="`${i}`"
              v-for="(history, i) in History">
            <td scope="row">{{history.time}}</td>
            <td>
              <time datetime="">{{history.name.toUpperCase()}}</time>
            </td>
            <td>
              <time
                  datetime=""
                  v-bind:style="{color: history.color}">{{history.status}}
              </time>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import {Config} from '../js/config';
  import BigNumber from 'bignumber.js';
  import eccrypto from "eccrypto";

  export default {
    components: {},
    props: {
      walletConnector: {type: Object},
      accounts: {type: Array},
      privateKeyForDapp: {type: Buffer},
      publicKeyForDapp: {type: Buffer},
      signTransactionToWC: {type: Function},
      sendCustomRequest: {type: Function},
    },
    data() {
      return {
        balance: 0,
        isLoading: false,
        username: Config.userName ? Config.userName + ' 님의 지갑' : '지갑',
        History: [],
        account: ""
      }
    },
    computed: {
      walletAddress() {
        return Config.walletAddress
      },
      mtSymbol() {
        return Config.mt.symbol
      },
      stSymbol() {
        return Config.st.symbol
      },
      apiKey() {
        return Config.dapp.apiKey
      },
      luniSignApiKey() {
        return Config.dapp.luniSignApiKey
      },
      txActionName() {
        return Config.txActionName
      },
      userInfo() {
        return Config.userInfo
      },
      isPaid() {
        return Config.isPaid
      }
    },
    mounted() {
      this.load();
      this.startInterval();
    },
    methods: {
      load() {
        this.axios.get(
            `https://api.luniverse.net/tx/v1.0/wallets/${this.walletAddress.user}/${this.mtSymbol}/${this.stSymbol}/balance`, {
              headers: {
                'Authorization': `Bearer ${this.apiKey}`,
              },
            })
        .then((response) => {
          this.balance = response.data.data.balance;
          this.balance = (BigNumber(this.balance)).div((BigNumber('10')).pow(18)).toFixed(5);
        })
        .catch(() => {
          this.balance = 0;
        });

        this.axios.get(`https://api.luniverse.net/tx/v1.0/histories?next=0`, {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': `application/json`
          },
        })
        .then((response) => {
          var temp = response.data.data.histories.items.filter(
              valid => (valid.txStatus === "SUCCEED" || valid.txStatus === "FAILED") && [Config.txActionName.funding,
                Config.txActionName.like, Config.txActionName.purchase].indexOf(valid.actionName) !== -1);
          temp.map(tx => this.History.push({time: tx.createdAt.substring(0, 10), name: tx.actionName, status: tx.txStatus}));
          this.History.map(history => {
            if (history.status === "SUCCEED") {
              history.color = "#00B580"
            } else if (history.status === 'FAILED') {
              history.color = "#F14E4E"
            }
          })
        })
        .catch(() => {
        })
      },
      startInterval() {
        this.interval1 = setInterval(() => {
          if (this.walletAddress.user !== "") {
            console.log("주소가 있습니다. ", this.walletAddress.user);  // eslint-disable-line
            this.apiFindUserInfo(this.walletAddress.user, this.publicKeyForDapp)
            .then(async response => {
              console.log("response : ", response);// eslint-disable-line
              const plaintext = await this.decryptingTheMsg(this.privateKeyForDapp,
                  this.convertObjHexToEncrypted(response.data.data.res));
              console.log("plaintext ", plaintext);// eslint-disable-line
              const getUserInfo = this.stringToJson(plaintext);
              console.log("getUserInfo ", getUserInfo);// eslint-disable-line
              
              Config.userInfo.name = getUserInfo.name;
              Config.userInfo.email = getUserInfo.email;
              Config.userInfo.emailCrtfd = getUserInfo.emailCrtfd;
              Config.userInfo.mobile = getUserInfo.mobile;
              Config.userInfo.mobileCrtfd = getUserInfo.mobileCrtfd;
              Config.userInfo.dateBirth = getUserInfo.dateBirth;


              this.$forceUpdate();
              if (!this.isPaid) {
                this.apiRewardTokenFromDapp(this.walletAddress.user);
                Config.isPaid = true;
              }
            })
            .catch(error => {
              console.log(error); // eslint-disable-line
            });
          } else {
            console.log("주소가 없습니다. ");  // eslint-disable-line
          }
        }, 3000);
      },
      stringToJson(str) {
        return JSON.parse(str);
      },
      convertBufferToHexString(byteArray) {
        return Array.from(byteArray, function (byte) {
          return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');
      },
      convertHexStringToBuffer(value) {
        return Buffer.from(value.replace("0x", ""), "hex");
      },
      decryptingTheMsg(_privateKey, _msg) {
        return eccrypto.decrypt(_privateKey, _msg);
      },
      convertObjHexToEncrypted(obj) {
        return {
          iv: this.convertHexStringToBuffer(obj[1]),
          ephemPublicKey: this.convertHexStringToBuffer(obj[2]),
          ciphertext: this.convertHexStringToBuffer(obj[3]),
          mac: this.convertHexStringToBuffer(obj[4])
        }
      },
      async apiFindUserInfo(userAddress, publicKeyForDapp) {
        return await this.axios.post(`https://api.luniverse.net/tx/v1.0/transactions/${this.txActionName.findOneUserInfo}`,
            {
              'from': userAddress,
              'inputs': {
                'userAddr': userAddress,
                'publicKey': this.convertBufferToHexString(publicKeyForDapp)
              }
            },
            {
              headers: {
                'Authorization': `Bearer ${this.luniSignApiKey}`,
              },
            });
      },
      async apiRewardTokenFromDapp(userAddress) {
        return await this.axios.post(`https://api.luniverse.net/tx/v1.0/transactions/${this.txActionName.rewardTokenFromDapp}`,
            {
              "inputs": {
                "receiverAddress": userAddress,
                "valueAmount": '10000000000000000000000'
              }
            },
            {
              headers: {
                'Authorization': `Bearer ${this.luniSignApiKey}`,
              },
            });
      }
    }
  }
</script>
