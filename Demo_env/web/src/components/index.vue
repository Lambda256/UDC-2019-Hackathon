<template>
<div>
  <!--<Header/>-->
  <div class="position-relative pt-9">
    <div class="wrapper"><h1>LuniverStar K</h1></div>
    <div class="title">원하는 그룹을 선택하고 응원해보세요 !</div>
  </div>
  <section class="site-home-scene">
    <div class="inner-container">
        <div class="row">
          <router-link class="col-sm-6 col-lg-4 p-4" :to="{ name: 'detail', params: {idolId: 1} }">
            <img src="@/assets/img2/avatars/breadnjem.png" class="photo5" alt>
            <div class="progress-wrap">
              <div style="display: flow-root">
                <span class="pl-2 t_white f15 font-weight-700 left">목표금액 7,700,000원</span>
                <span class="pr-2 t_white f15 font-weight-700 right">77% 달성</span>
              </div>
              <div class="progress progress-striped">
                <div class="progress-bar"></div>
              </div>
            </div>
            <div style="display: flow-root;">
              <span class="font-weight-700 mb-2" style="margin-top: -20px; float: left;">Bread N Jem</span>
              <span class="t_gry2 small mb-3" style="margin-top: -20px; float: left;"> &nbsp;ㅣ&nbsp;front entertainment</span>
            </div>
            <div class="t_gry3 small" style=" text-align: left; margin-top: -10px;">
              ‘브레드 앤 잼' 브레드, 앤, 잼 3명으로 구성된 혼성 그룹이다. 엄청난 댄스 실력을 겸비한 멤버 구성으로, 데뷔 전 부터 많은 관심을 받고 있다.
            </div>
          </router-link>

          <router-link class="col-sm-6 col-lg-4 p-4" :to="{ name: 'detail', params: {idolId: 2} }">
            <img src="@/assets/img2/avatars/lunibaas.png" class="photo5" alt>
            <div class="progress-wrap">
              <div style="display: flow-root">
                <span class="pl-2 t_white f15 font-weight-700 left">목표금액 256,256,000원</span>
                <span class="pr-2 t_white f15 font-weight-700 right">255% 달성</span>
              </div>
              <div class="progress progress-striped">
                <div class="progress-bar"></div>
              </div>
            </div>
            <div style="display: flow-root;">
              <span class="font-weight-bold mb-2" style="margin-top: -20px; float: left;">LuniBaaS</span>
              <span class="t_gry2 small mb-3" style="margin-top: -20px; float: left;"> &nbsp;ㅣ&nbsp;Woori entertainment</span>
            </div>
            <div class="t_gry3 small" style=" text-align: left; margin-top: -10px;">
              ‘루니바스'는 켄, 말릭으로 구성된 남성 듀오 그룹이다. 알 수 없는 케미로 데뷔전 부터 탄탄한 팬덤을 보유하고 있다는 것이 특징이다.
            </div>
          </router-link>

          <router-link class="col-sm-6 col-lg-4 p-4" :to="{ name: 'detail', params: {idolId: 3} }">
            <img src="@/assets/img2/avatars/test.jpg" class="photo5" alt>
            <div class="progress-wrap">
              <div style="display: flow-root">
                <span class="pl-2 t_white f15 font-weight-700 left">목표금액 3,000,000원</span>
                <span class="pr-2 t_white f15 font-weight-700 right">20% 달성</span>
              </div>
              <div class="progress progress-striped">
                <div class="progress-bar"></div>
              </div>
            </div>
            <div style="display: flow-root;">
              <span class="font-weight-bold mb-2" style="margin-top: -20px; float: left;">Intern net</span>
              <span class="t_gry2 small mb-3" style="margin-top: -20px; float: left;"> &nbsp;ㅣ&nbsp;JP entertainment</span>
            </div>
            <div class="t_gry3 small" style=" text-align: left; margin-top: -10px;">
              ‘인턴넷'은 샴푸, 앤, 젬, 린다로 구성된 혼성 그룹이다. 현 시대에 빼놓고는 설명할 수 없는 internet을 모티브로 했으며, 언제 어디서나 생각나는 그룹이 되겠다는 의미를 담고있다.
            </div>
          </router-link>

          <router-link class="col-sm-6 col-lg-4 p-4" :to="{ name: 'detail', params: {idolId: 4} }">
            <img src="@/assets/img2/avatars/gonjoy.png" class="photo5" alt>
            <div class="progress-wrap">
              <div style="display: flow-root">
                <span class="pl-2 t_white f15 font-weight-700 left">목표금액 777,777,000원</span>
                <span class="pr-2 t_white f15 font-weight-700 right">59% 달성</span>
              </div>
              <div class="progress progress-striped">
                <div class="progress-bar"></div>
              </div>
            </div>
            <div style="display: flow-root;">
              <span class="font-weight-700 mb-2" style="margin-top: -20px; float: left;">Gonjoy</span>
              <span class="t_gry2 small mb-3" style="margin-top: -20px; float: left;"> &nbsp;ㅣ&nbsp;Never entertainment</span>
            </div>
            <div class="t_gry3 small" style=" text-align: left; margin-top: -10px;">
              ‘곤조이'는 곤조와 조이로 이루어진 2인조 혼성 그룹이다. 뚜렷한 포지션으로 각자의 매력을 뽐내는 것이 특징이다.
            </div>
          </router-link>

          <router-link class="col-sm-6 col-lg-4 p-4" :to="{ name: 'detail', params: {idolId: 5} }">
            <img src="@/assets/img2/avatars/frontattack.jpg" class="photo5" alt>
            <div class="progress-wrap">
              <div style="display: flow-root">
                <span class="pl-2 t_white f15 font-weight-700 left">목표금액 5,000,000원</span>
                <span class="pr-2 t_white f15 font-weight-700 right">57% 달성</span>
              </div>
              <div class="progress progress-striped">
                <div class="progress-bar"></div>
              </div>
            </div>
            <div style="display: flow-root;">
              <span class="font-weight-700 mb-2" style="margin-top: -20px; float: left;">Front attack</span>
              <span class="t_gry2 small mb-3" style="margin-top: -20px; float: left;"> &nbsp;ㅣ&nbsp;Martin entertainment</span>
            </div>
            <div class="t_gry3 small" style=" text-align: left; margin-top: -10px;">
              ‘프론트 어택'은 프론트 엔터테인먼트에서 야심차게 준비한 남자 아이돌 그룹이다. 대표적 멤버로는 ‘디노'가 있다. (다른 멤버들은 차차 공개할 예정이라고 프론트 앤터에서는 밝혔다.)
            </div>
          </router-link>
          
          <router-link class="col-sm-6 col-lg-4 p-4" :to="{ name: 'detail', params: {idolId: 6} }">
            <img src="@/assets/img2/avatars/morningglory.png" class="photo5" alt>
            <div class="progress-wrap">
              <div style="display: flow-root">
                <span class="pl-2 t_white f15 font-weight-700 left">목표금액 5,000,000원</span>
                <span class="pr-2 t_white f15 font-weight-700 right">107% 달성</span>
              </div>
              <div class="progress progress-striped">
                <div class="progress-bar"></div>
              </div>
            </div>
            <div style="display: flow-root;">
              <span class="font-weight-700 mb-2" style="margin-top: -20px; float: left;">Morning Glory</span>
              <span class="t_gry2 small mb-3" style="margin-top: -20px; float: left;"> &nbsp;ㅣ&nbsp;Alpha entertainment</span>
            </div>
            <div class="t_gry3 small" style=" text-align: left; margin-top: -10px;">
              아침 햇살같이 상큼한 멜로디로 ‘제 2의 아이유'를 꿈꾸고 있는 떠오르는 보컬. 청아한 목소리와 알 수 없는 강인함이 돋보이는 신인이다.
            </div>
          </router-link>
          <div style="height: 80px;"> &nbsp;</div>
        </div>
    </div>
  </section>
</div>
</template>

<script>
export default {
  components: {
  },
  props: {
    walletConnector: {type: Object},
    accounts: {type: Array},
    privateKeyForDapp: {type: Buffer},
    signTransactionToWC: {type: Function},
    sendCustomRequest: {type: Function},
  },
}
</script>

<style scoped>
  .position-relative{
    background-color: #1B2733 !important;
    height: 390px;
  }
  .inner-container{
    padding-top: 60px !important;
  }

</style>
