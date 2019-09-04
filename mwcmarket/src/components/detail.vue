<template>
  <div>
    <Header />
    <div class="position-relative pt-5 pb-4">
      <div
        v-if="this.$route.params.idolId == '1'"
        class="portfolio-image detail-01"
        style="z-index: -1;"
      ></div>
      <div
        v-else-if="this.$route.params.idolId == '2'"
        class="portfolio-image detail-02"
        style="z-index: -1;"
      ></div>
      <div
        v-else-if="this.$route.params.idolId == '3'"
        class="portfolio-image detail-03"
        style="z-index: -1;"
      ></div>
      <div
        v-else-if="this.$route.params.idolId == '4'"
        class="portfolio-image detail-04"
        style="z-index: -1;"
      ></div>
     
      <div class="pt-5 px-4 px-md-5">
        <div class="py-md-4 py-xl-5 mx-lg-5">
          <div class="portfolio-caption">
            <div v-if="this.$route.params.idolId == '1'" class="text-tiny t_white font-weight-400">
              스타벅스의 깔끔한 맛을 자랑하는 커피로,
              <br />스타벅스 파트너들이
              <br />가장 좋아하는 커피입니다.
            </div>
            <div
              v-else-if="this.$route.params.idolId == '2'"
              class="text-tiny t_white font-weight-400"
            >
              남녀노소 모두 좋아하는,
              <br />애플망고의 달콤함과 깊고 진한 치즈 케이크가 만나,
              <br />신선하고 상큼한 애플망고의 풍미
            </div>
            <div
              v-else-if="this.$route.params.idolId == '3'"
              class="text-tiny t_white font-weight-400"
            >
              푸르름이 가득한 여름 이야기,
              <br />가까운 신세계백화점에서 만나보세요
            </div>
            <div
              v-else-if="this.$route.params.idolId == '4'"
              class="text-tiny t_white font-weight-400"
            >
              SUPER DEVELOPER
              <br />SPECIAL PLANNER
              <br />GONJOY
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container px-3 my-4">
      <h1 class="f30 font-weight-700" v-for="e in products" :key="e.id">
        <span v-if="e.id == $route.params.idolId">{{e.name}}</span>
      </h1>
      <div class="flex">
        <div class="flex-box-70">
          <div class="f15 font-weight-400" v-for="e in products" :key="e.id">
            <p v-if="e.id == $route.params.idolId">{{e.desc}}</p>
          </div>
          <div class="layout-guide-box mt-4">
            <p class="font-weight-700" style="margin-bottom:5px;">
              유의사항
              <br />
            </p>
            <span>매장 별 재고 상황에 따라 구매가 어려운 경우에는 동일 가격 이상의 타 음료로 교환 가능합니다. 정식 판매처 외의 장소나 경로를 통하여 구매하거나 기타의 방법으로 보유하신 포인트는 정상적인 사용이 금지되거나 제한 될 수 있으니 주의 하시기 바랍니다.</span>
          </div>
        </div>
        <div class="flex-box-40" style="margin-left: 80px;">
          <div v-for="e in products" :key="e.id">
            <strong
              class="t_dgray f15 font-weight-400"
              v-if="e.id == $route.params.idolId"
            >{{e.message}}</strong>
          </div>
          <div v-for="e in products" :key="e.id">
            <strong
              id="money"
              class="f24 font-weight-700 mb4 t_purple"
              v-if="e.id == $route.params.idolId"
            >
              {{e.price}}
              <span class="f17 font-weight-700">&nbsp;포인트</span>
            </strong>
          </div>
          <div class="flex" style="margin-top: 15px;" v-for="e in products" :key="e.id">
            <button
              type="submit"
              class="button-submit flex-box-80"
              style="font-weight:400 !important;"
              v-on:click="purchase(e.id-1)"
              v-if="e.id == $route.params.idolId"
            >포인트로 상품구매</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
import { Config } from "../js/config";

export default {
  components: {
    Header
  },
  data() {
    return {
      database: {
        money: "100000",
        people: "14"
      },
      products: [
        {
          id: "1",
          name: "아이스 카페아메리카노 Tall",
          message: "리워드 포인트를 사용하여 원하는 상품을 구매하세요.",
          price: "4100",
          desc: `강렬한 에스프레소 샷에 시원한 물의 조화. 풍부하고 진한 농도의 에스프레소에 시원한 정수물을 더하여 스타벅스의 깔끔하고 강렬한 에스프레소를 부드럽지만 시원하게 즐기실 수 있는 커피입니다.`,
          like: "1"
        },
        {
          id: "2",
          name: "애플망고 치즈 설빙",
          message: "리워드 포인트를 사용하여 원하는 상품을 구매하세요.",
          price: "11900",
          desc: `남녀노소 모두 좋아하는 망고의 최상급 품질인 애플망고의 달콤함과 깊고 진한 치즈 케이크가 만나 신선하고 상큼한 애플망고의 풍미를 온전히 느낄 수 있는 제품`,
          like: "2"
        },
        {
          id: "3",
          name: "신세계상품권 모바일교환권",
          message: "리워드 포인트를 사용하여 원하는 상품을 구매하세요.",
          price: "100000",
          desc: `신세계백화점, 이마트는 물론 쇼핑/외식/레저 등 다양한 가맹점에서 폭넓게 사용하실 수 있는 품격 있는 선물, 신세계상품권을 소개합니다.`,
          like: "3"
        },
        {
          id: "4",
          name: "Gonjoy",
          message: "Gonjoy 월드투어 포토북 프로젝트에 참여해보세요!",
          price: "11900",
          desc: "",
          like: "4"
        }
      ]
    };
  },
  computed: {
    walletAddress() {
      return Config.walletAddress;
    },
    apiKey() {
      return Config.apiKey;
    },
    txActionName() {
      return Config.txActionName;
    },
    userName() {
      return Config.userName;
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.axios
        .get(`https://api.luniverse.net/tx/v1.0/histories?next=0`, {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "products-Type": `application/json`
          }
        })
        .then(response => {
          var l = parseInt(this.database.like.replace(/,/g, ""));
          var p = parseInt(this.database.people.replace(/,/g, ""));
          var m = parseInt(this.database.money.replace(/,/g, ""));
          var temp = response.data.data.histories.items.filter(
            valid =>
              valid.txStatus === "SUCCEED" &&
              ["funding", "like"].indexOf(valid.actionName) !== -1
          );
          temp.map(tx => {
            if (tx.actionName === "like") {
              l = l + 1;
            } else if (tx.actionName === "funding") {
              p = p + 1;
              m = m + 10000;
            }
          });
          l = l.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.database.like = l;
          p = p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.database.people = p;
          m = m.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.database.money = m;
        })
        .catch(() => {});
    },
    purchase(productId) {
      this.axios
        .post(
          `https://api.luniverse.net/tx/v1.0/transactions/${this.txActionName.transfer2MWCA}`,
          {
            from: {
              // userKey: "Gabriel",
              userKey: this.userName,
              walletType: "LUNIVERSE"
            },
            inputs: {
              receiverAddress: this.walletAddress.market,
              valueAmount: this.products[productId].price + '000000000000000000'
            }
          },
          {
            headers: {
              "api-key": this.apiKey
            }
          }
        )
        .then(() => {
          this.axios
            .post(
              `https://api.luniverse.net/tx/v1.0/transactions/${this.txActionName.purchaseItem}`,
              {
                from: {
                  userKey: "APIAddress",
                  walletType: "LUNIVERSE"
                },
                inputs: {
                  _userId: {
                    // userKey: "Gabriel",
                    userKey: this.userName,
                    walletType: "LUNIVERSE"
                  },
                  _itemId: 1,
                  _price: this.products[productId].price + '000000000000000000'
                }
              },
              {
                headers: {
                  Authorization: `Bearer ${this.apiKey}`
                }
              }
            )
            .then(() => {
              alert("구매 감사합니다.");
            })
            .catch(() => {
              alert("상품 구매에 실패하였습니다.");
            });
        })
        .catch(() => {
          alert("포인트 지불에 실패하였습니다.");
        });
    }
  }
};
</script>