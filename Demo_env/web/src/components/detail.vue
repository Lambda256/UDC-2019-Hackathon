<template>
  <div>
    <!--<Header/>-->
    <div class="position-relative pt-5 pb-4">
      <div
          v-if="this.$route.params.idolId == '1'"
          class="portfolio-image detail-01"
          style="z-index: -1;"></div>
      <div
          v-else-if="this.$route.params.idolId == '2'"
          class="portfolio-image detail-02"
          style="z-index: -1;"></div>
      <div
          v-else-if="this.$route.params.idolId == '3'"
          class="portfolio-image detail-03"
          style="z-index: -1;"></div>
      <div
          v-else-if="this.$route.params.idolId == '4'"
          class="portfolio-image detail-04"
          style="z-index: -1;"></div>
      <div
          v-else-if="this.$route.params.idolId == '5'"
          class="portfolio-image detail-05"
          style="z-index: -1;"></div>
      <div
          v-else-if="this.$route.params.idolId == '6'"
          class="portfolio-image detail-06"
          style="z-index: -1;"></div>
      <div class="pt-5 px-4 px-md-5">
        <div class="py-md-4 py-xl-5 mx-lg-5">
          <div class="portfolio-caption">
            <div
                v-if="this.$route.params.idolId == '1'"
                class="text-tiny t_white font-weight-400">어떤 빵보다 부드러운 목소리,<br>어떤 잼보다 달콤한 목소리.<br>우리가 바로 브레드 앤 잼
            </div>
            <div
                v-else-if="this.$route.params.idolId == '2'"
                class="text-tiny t_white font-weight-400">신고할까요,<br>우리의 혼인신고.<br>LuniBaas
            </div>
            <div
                v-else-if="this.$route.params.idolId == '3'"
                class="text-tiny t_white font-weight-400">WHEREVER YOU ARE<br>WHEREVER YOU WANT<br>INTERN NET
            </div>
            <div
                v-else-if="this.$route.params.idolId == '4'"
                class="text-tiny t_white font-weight-400">SUPER DEVELOPER<br>SPECIAL PLANNER<br>GONJOY
            </div>
            <div
                v-else-if="this.$route.params.idolId == '5'"
                class="text-tiny t_white font-weight-400">SO SWEET BOYS<br>SPECIAL SWEET VOICE<br>FRONT ATTACK
            </div>
            <div
                v-else-if="this.$route.params.idolId == '6'"
                class="text-tiny t_white font-weight-400">냉동고를 준비하세요,<br> 당신의 고막이 녹아버릴지도 모르니까.<br> Morning Glory
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container px-3 my-4">
      <h1
          class="f30 font-weight-700"
          v-for="e in content"
          :key="e.id">
        <span v-if="e.id == $route.params.idolId">{{e.name}}</span>
      </h1>
      <div class="flex">
        <div class="flex-box-70">
          <div
              class="f15 font-weight-400"
              v-for="e in content"
              :key="e.id">
            <p v-if="e.id == $route.params.idolId">{{e.desc}}</p>
          </div>
          <div class="layout-guide-box mt-4">
            <p
                class="t_blue"
                style="margin-bottom:10px; line-height: 20px;">
              <span class="f13 font-weight-700">목표 금액</span> &nbsp;
              <span
                  v-for="e in content"
                  :key="e.id">
                <span v-if="e.id == $route.params.idolId">{{e.targetAmount}}</span>
              </span>
              <span class="f13 font-weight-700">펀딩기간</span> &nbsp;
              <span>24일</span>
            </p>
            <p
                class="font-weight-700"
                style="margin-bottom:5px;"> 목표금액이 모이면 데뷔에 가까워집니다.<br></p>
            <span>후원해주신 모든 분께 매주 관련 뉴스레터를 보내드립니다.</span>
          </div>
        </div>
        <div
            class="flex-box-40"
            style="margin-left: 80px;">
          <div
              v-for="e in content"
              :key="e.id">
            <strong
                class="t_dgray f15 font-weight-400"
                v-if="e.id == $route.params.idolId">{{e.message}}</strong>
          </div>
          <div>
            <strong
                id="money"
                class="f24 font-weight-700 mb4"
                v-bind:value="database">{{database.money}}
              <span class="f17 font-weight-700">&nbsp;원 펀딩</span>
            </strong>
          </div>
          <div>
            <strong
                id="money"
                class="f24 font-weight-700 mb4"
                v-bind:value="database">{{database.people}}
              <span class="f17 font-weight-700">&nbsp; 명의 서포터</span>
            </strong>
          </div>
          <div
              class="flex"
              style="margin-top: 15px;">
            <button
                type="submit"
                class="button-submit flex-box-80"
                style="font-weight:400 !important;"
                v-on:click="fund()">프로젝트 후원하기
            </button>
            <button
                type="submit"
                class="button-normal flex-box-20"
                v-bind:value="database"
                style="margin-left: 10px;"
                v-on:click="like()">
              <i class="fa fa-thumbs-up"></i>&nbsp;{{database.like}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Config} from '../js/config'

  export default {
    components: {},
    props: {
      walletConnector: {type: Object},
      accounts: {type: Array},
      privateKeyForDapp: {type: Buffer},
      signTransactionToWC: {type: Function},
      sendCustomRequest: {type: Function},
    },
    data() {
      return {
        database: {
          money: '100000',
          people: '14',
          like: '256'
        },
        content: [
          {
            id: '1',
            name: 'Bread N jem',
            message: 'Bread N Jem 데뷔 응원 프로젝트에 참여해보세요!',
            targetAmount: '7,700,000원 ㅣ ',
            desc: `‘브레드 앤 잼' 브레드, 앤, 잼 3명으로 구성된 혼성 그룹이다. 엄청난 댄스 실력을 겸비한 멤버 구성으로, 데뷔 전 부터 많은 관심을 받고 있다. 아시아를 넘어 북미, 유럽, 남미, 중동까지 진출할 계획을 갖고 있다. 월드 클래스 슈퍼스타가 되겠다는 포부를 갖고있으며 미국 빌보드, 영국 오피셜차트, 일본 오리콘, 아이튠즈, 스포티파이, 애플 뮤직 등 세계 유수의 차트에서 엄청난 성적을 기록할 것이라는 평가까지 나오고 있다.`,
          },
          {
            id: '2',
            name: 'LuniBaaS',
            message: 'LuniBaaS 앨범 응원 프로젝트에 참여해보세요!',
            targetAmount: '256,256,000원 ㅣ ',
            desc: `‘루니바스'는 켄, 말릭으로 구성된 남성 듀오 그룹이다. 알 수 없는 케미로 데뷔전 부터 탄탄한 팬덤을 보유하고 있다는 것이 특징이다. 독특한 점은 대체로 30-40대가 팬덤의 대다수를 이루고 있다는 점이다. 그리하여 ‘불혹을 훔치는 남자들'이라는 별명이 생겼을 정도이다. 앞으로의 다양한 국내외 활동 기대되는 그룹이다.`,
          },
          {
            id: '3',
            name: 'Intern net',
            message: 'Intern net 데뷔 앨범 제작 프로젝트에 참여해보세요!',
            targetAmount: '3,000,000원 ㅣ ',
            desc: `‘인턴넷'은 샴푸, 앤, 젬, 린다로 구성된 혼성 그룹이다. 현 시대에 빼놓고는 설명할 수 없는 internet을 모티브로 했으며, 언제 어디서나 생각나는 그룹이 되겠다는 의미를 담고있다. 대중들이 좋아할만한 솔직한 쉬운 멜로디와 사랑에 대한 현실적이면서 솔직한 노랫말 그리고 아크로바틱을 기반으로 한 동작이 큰 안무로 활동을 이어갈 계획이라고 밝혔으며 다양한 광고활동 또한 능히 감당할 수 있는 그룹이라고 자신있게 소개한다. 신인답지않은 여유로움을 가장 큰 매력으로 어필하고 있다.`,
          },
          {
            id: '4',
            name: 'Gonjoy',
            message: 'Gonjoy 월드투어 포토북 프로젝트에 참여해보세요!',
            targetAmount: '777,777,000원 ㅣ ',
            desc: `‘곤조이'는 곤조와 조이로 이루어진 2인조 혼성 그룹이다. 뚜렷한 포지션으로 각자의 매력을 뽐내는 것이 특징이다. 일상을 소재로 한 순수한 노랫말과 과한 꾸밈없는 하모니로 많은 이들에게 공감과 힐링을 선사할 수 있는 아티스트를 꿈꾼다. 특히나 보편적인 소재에 관한 노래가 아니라 일상의 사소한 순간을 포착해 그 곳에 감수성을 얹은 가사를 쓰기 때문에 더욱 기대를 받고있는 듀오다. (하지만 곤조는 래퍼다.)`,
          },
          {
            id: '5',
            name: 'Front attack',
            message: 'Front Attack 데뷔 응원 프로젝트에 참여해보세요!',
            targetAmount: '5,000,000원 ㅣ ',
            desc: `‘프론트 어택'은 프론트 엔터테인먼트에서 야심차게 준비한 남자 아이돌 그룹이다. 대표적 멤버로는 ‘디노'가 있다. (다른 멤버들은 차차 공개할 예정이라고 프론트 앤터에서는 밝혔다.) 데뷔 예정 앨범이 일부 선공개된 직후, 형용할 단어가 없는 명곡이라는 호평을 받고있으며 타이틀 곡으로는 ‘이러쿤 저러쿤' 과 ‘슈퍼 엔Jin’이 있다.
`,
          },
          {
            id: '6',
            name: 'Morning Glory',
            message: 'Morning Glory 스페셜 화보집 프로젝트에 참여해보세요!',
            targetAmount: '5,000,000원 ㅣ ',
            desc: `아침 햇살같이 상큼한 멜로디로 ‘제 2의 아이유'를 꿈꾸고 있는 떠오르는 보컬. 청아한 목소리와 알 수 없는 강인함이 돋보이는 신인이다. 비공식 앨범 활동은 두 차례 진행한 것으로 알려졌으며, 소규모의 공연도 여러번 진행한 실력파로 알려져있다. 앞으로 많은 대중들에게 사랑받을 아티스트로 성장할 것이라는 평가가 계속해서 이어지고 있다.`,
          },
        ]
      }
    },
    computed: {
      walletAddress() {
        return Config.walletAddress
      },
      apiKey() {
        return Config.dapp.apiKey
      },
      txActionName() {
        return Config.txActionName
      },
      userName() {
        return Config.userName
      }
    },
    mounted() {
      this.load()
    },
    methods: {
      load() {
        this.axios.get(`https://api.luniverse.net/tx/v1.0/histories?next=0`, {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': `application/json`
          },
        })
        .then((response) => {
          var l = parseInt(this.database.like.replace(/,/g, ""));
          var p = parseInt(this.database.people.replace(/,/g, ""));
          var m = parseInt(this.database.money.replace(/,/g, ""));
          var temp = response.data.data.histories.items.filter(
              valid => valid.txStatus === "SUCCEED" && [Config.txActionName.funding, Config.txActionName.like].indexOf(
                  valid.actionName) !== -1);
          temp.map(tx => {
            if (tx.actionName === Config.txActionName.like) {
              l = l + 1;
            } else if (tx.actionName === Config.txActionName.funding) {
              p = p + 1;
              m = m + 10000;
            }
          })
          l = l.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.database.like = l;
          p = p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.database.people = p;
          m = m.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.database.money = m;
        })
        .catch(() => {
        })
      },
      like() {
        if (this.walletConnector && this.walletConnector.connected) {
          let n = parseInt(this.database.like.replace(/,/g, ""));
          this.axios.post(`https://api.luniverse.net/tx/v1.0/transactions/${this.txActionName.like}`, {
                'from': this.walletAddress.pd,
                'inputs': {
                  'receiverAddress': this.walletAddress.user,
                  'valueAmount': '100000000000000000000'
                }
              },
              {
                headers: {
                  'api-key': this.apiKey,
                }
              }
          )
          .then(() => {
            alert('좋아요를 눌러주셔서 감사합니다!\n100IFT를 드려요!');
            n = n + 1;
            n = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this.database.like = n;
          })
          .catch(() => {
            alert('좋아요에 실패했습니다!')
          });
        } else {
          alert('로그인을 해주세요.');
        }
      },
      fund() {
        if (this.walletConnector && this.walletConnector.connected) {
          let m = parseInt(this.database.money.replace(/,/g, ""));
          let p = parseInt(this.database.people.replace(/,/g, ""));
          this.axios.post(`https://api.luniverse.net/tx/v1.0/transactions/${this.txActionName.funding}`, {
                'from': this.walletAddress.pd,
                'inputs': {
                  'receiverAddress': this.walletAddress.user,
                  'valueAmount': '1000000000000000000000'
                }
              },
              {
                headers: {
                  'api-key': this.apiKey,
                },
              })
          .then(() => {
            alert(`10,000원이 펀딩되었습니다.\n1,000IFT를 드려요!`);
            m = m + 10000;
            m = m.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this.database.money = m;
            p = p + 1;
            p = p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this.database.people = p;
          })
          .catch(() => {
            alert('Fund에 실패했습니다!');
          });
        } else {
          alert('로그인을 해주세요.');
        }
      }
    }
  }
</script>

