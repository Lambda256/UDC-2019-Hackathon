<template>
  <div>
    <Header />
    <div class="pt-5"></div>
    <div class="container px-3">
      <div class="row justify-content-between">
        <div class="mb-3" style="margin-top: 6rem;">
          <h3>구매내역</h3>
        </div>
        <table class="tbl">
          <colgroup>
            <col style="width:20%" />
            <col style="width:40%" />
            <col style="width:10%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">일시</th>
              <th scope="col">항목</th>
              <th scope="col">금액</th>
            </tr>
          </thead>
          <tbody>
            <tr v-bind:key="`${i}`" v-for="(history, i) in History">
              <td scope="row">{{history.time}}</td>
              <td scope="row">{{history.product}}</td>
              <td scope="row">{{history.price}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
import { Config } from "../js/config";
import BigNumber from "bignumber.js";

export default {
  components: {
    Header
  },
  data() {
    return {
      balance: 0,
      isLoading: false,
      username: Config.userName + "님, 안녕하세요.",
      History: []
    };
  },
  computed: {
    walletAddress() {
      return Config.walletAddress;
    },
    mtSymbol() {
      return Config.mt.symbol;
    },
    stSymbol() {
      return Config.st.symbol;
    },
    apiKey() {
      return Config.apiKey;
    },
    userName() {
      return Config.userName;
    },
    txActionName() {
      return Config.txActionName;
    },
    products() {
      return [
        {
          id: "1",
          name: "아이스 카페아메리카노 Tall"
        },
        {
          id: "2",
          name: "애플망고 치즈 설빙"
        },
        {
          id: "3",
          name: "신세계상품권 모바일교환권"
        },
        {
          id: "4",
          name: "Gonjoy"
        }
      ];
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.axios
        .post(
          `https://api.luniverse.net/tx/v1.0/transactions/${this.txActionName.purchaseList}`,
          {
            from: {
              // userKey: "Gabriel",
              userKey: this.userName,
              walletType: "LUNIVERSE"
            },
            inputs: {
              _userId: {
                // userKey: "Gabriel",
                userKey: this.userName,
                walletType: "LUNIVERSE"
              }
            }
          },
          {
            headers: {
              "api-key": this.apiKey
            }
          }
        )
        .then(response => {
          var pIds = response.data.data.res[0];
          var pPrices = response.data.data.res[1];
          var pTimes = response.data.data.res[4];

          for (var i = 0; i < pIds.length; i++) {
            var date = new Date(pTimes[i] * 1000);

            this.History.push({
              time:
                date.getFullYear() +
                "-" +
                ("0" + date.getMonth()).substr(-2) +
                "-" +
                ("0" + date.getDate()).substr(-2) +
                " " +
                ("0" + date.getHours()).substr(-2) +
                ":" +
                ("0" + date.getMinutes()).substr(-2) +
                ":" +
                ("0" + date.getSeconds()).substr(-2),
              product: this.products[pIds[i] - 1].name,
              price: Math.trunc(BigNumber(pPrices[i]).div(BigNumber("10").pow(18)))
            });
          }
        })
        .catch(() => {});
    }
  }
};
</script>