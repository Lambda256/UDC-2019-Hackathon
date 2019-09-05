<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container-fluid px-3">
      <router-link
          class="navbar-brand text-big font-weight-700 line-height-1 py-3"
          :to="{ name: 'home' }">LuniverStarK
      </router-link>
      
      <div
          class="navbar-collapse"
          id="landing-navbar-collapse">
        <div class="navbar-nav align-items-lg-center ml-lg-4">
          <router-link
              class="nav-link font-weight-700"
              :class="{selected: $route.path.indexOf('product') !== -1}"
              :to="{ name: 'product' }">Product(LEOA)
          </router-link>
          <router-link
              class="nav-link font-weight-700"
              :class="{selected: $route.path.indexOf('products') !== -1}"
              :to="{ name: 'products' }">Products(REOA)
          </router-link>
        </div>
        <div class="navbar-nav align-items-lg-center ml-auto">
          <div class="nav-item">
            
            <button
                v-if="!walletConnector || walletConnector && !walletConnector.connected"
                class="btn btn-outline-white btn-round"
                v-on:click="walletConnectInit()">
              <i
                  v-if="compUserName"
                  class="fa fa-user" />
              {{"로그인"}}
            </button>
            
            <router-link
                v-if="walletConnector && walletConnector.connected"
                class="btn btn-outline-white btn-round"
                :to="{ name: 'my' }">
              <i
                  v-if="compUserName"
                  class="fa fa-user" />
              <p class="ellips">{{accounts[0]}}</p>
            </router-link>
            
            <button
                v-if="walletConnector && walletConnector.connected"
                class="btn btn-outline-white"
                v-on:click="logout()">
              <p class="ellips_btn">{{"로그아웃"}}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import {Config} from '../js/config';

  export default {
    components: {},
    props: {
      walletConnectInit: {type: Function},
      accounts: {type: Array},
      wcConnected: {type: Boolean},
      walletConnector: {type: Object}
    },
    data() {
      return {
        username: Config.userName ? Config.userName + ' 님' : 'My Page',
      }
    },
    computed: {
      compUserName() {
        return Config ? Config.userName : false
      }
    },
    created: function () {
      if (this.walletConnector && !this.walletConnector.connected) {
        localStorage.removeItem('walletconnect');
      } // eslint-disable-line
    },
    methods: {
      logout: function () {
        if (this.walletConnector) {
          this.walletConnector.killSession();
          Config.walletAddress.user = "";
        }
      }
    }
  }
</script>


<style scoped>
  .ellips {
    overflow: hidden;
    white-space: nowrap;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    width: 100px;
    margin-bottom: 0;
    line-height: 10px;
    display: inline-block;
  }
  
  .ellips_btn {
    overflow: hidden;
    white-space: nowrap;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    width: 60px;
    margin-bottom: 0;
    line-height: 13px;
    display: inline-block;
  }
</style>
