<template>
<v-ons-page class="szTheme">

    <v-ons-toolbar>
        <div class="left">
            <v-ons-back-button modifier="material"></v-ons-back-button>
        </div>
        <div class="center">루니버스 뎁 토큰 추가</div>
        <div class="right"></div>
    </v-ons-toolbar>


    <v-ons-list style="margin-top:15px;">

        <QRInput name="chain" placeholder="체인 RPC 경로" v-model="chain"></QRInput>
        <QRInput name="chain" placeholder="뎁 토큰 컨트랙트 주소" v-model="con_addr"></QRInput>

        <v-ons-list-item style="padding-top:8px;">
            <v-ons-button modifier="large" @click="loadTokenInfo" v-bind:class="{'loading-ring':isLoading1,'dark': isDark}">토큰 정보 불러오기</v-ons-button>
        </v-ons-list-item>

        <div v-show="showInfo">
            <ons-list-header>토큰 정보</ons-list-header>

            <ons-list-item>
                <v-ons-input name="token_name" modifier="material underbar" placeholder="토큰 이름" float readonly :value="token_name"></v-ons-input>
            </ons-list-item>
            <ons-list-item>
                <div class="left">
                    <v-ons-input name="token_balance" modifier="material underbar" placeholder="토큰 수량" float readonly :value="token_balance_fmt"></v-ons-input>
                </div>
                <div class="right">
                    <v-ons-input name="token_symbol" modifier="material underbar" placeholder="토큰 심볼" float readonly :value="token_symbol"></v-ons-input>
                </div>
            </ons-list-item>
<!--
            <ons-list-item>
                <div class="center">다음엔 검색이 되도록 서버에 주소를 알려주기</div>
                <div class="right"><ons-switch></ons-switch></div>
            </ons-list-item>
-->
            <ons-list-item style="padding-top:8px;">
                <ons-button modifier="large" class="btn_done" @click="done" :disabled="isNotReady">토큰 추가</ons-button>
            </ons-list-item>
        </div>

    </v-ons-list>

</v-ons-page>
</template>

<script>
import C from '@/core/Constant.js'

export default {

props: ['account', 'token', 'exchange'],

data() {
    let coinId     = undefined;
    let coinName;
    let localName;
    let exchange   = undefined;
    let excConfirm = false;
    let pair       = undefined;
    let fiat       = this.$store.getters["price/userCurrency"];
    let imageUrl   = undefined;
    let tokenType  = C.tokenTypes.ERC20;
    let geco_id    = undefined;

    if (this.$props.token) {

        if (this.$props.token.names) {
            coinName  = this.$props.token.names['en'];
            localName = this.$props.token.names['ko'] || this.$props.token.name;
        }

        if (this.$props.exchange) {
            exchange = this.$props.exchange.exchange
            pair     = this.$props.exchange.market
            excConfirm = true

            //[TODO] 피아트 제대로 인식
            if (exchange == 'binance') {
                let targetFiat = pair.substr(-3).toUpperCase()
                if (targetFiat == 'BTC')  fiat = 'BTC';
                if (targetFiat == 'USDT') fiat = 'USD';
            }
        }

        if (this.$props.token.geco_id) {
            geco_id = this.$props.token.geco_id;
        }
    }

    return {
        isLoading1: false,
        isDark: (this.$props.token) ? true : false,

        con_addr: (this.$props.token) ?  this.$props.token.address : '',
        showInfo: (this.$props.token) ? true : false,

        token_name: coinName,
        token_symbol: (this.$props.token) ?  this.$props.token.symbol : '',
        token_decimal: (this.$props.token) ?  this.$props.token.decimal : '',

        token_balance: 0,
        token_localName: localName,
        token_chain: '',

        coin_id : coinId,
        coin_exchange  : exchange,
        coin_market    : pair,
        coin_exchangeConfirm: excConfirm,
        coin_fiat      : fiat,
        coin_thumb     : imageUrl,
        coin_geco_id   : geco_id
    }
},

computed: {
    token_balance_fmt() {
        return 0; //'ERROR' [TODO]
    },

    isNotReady() {
        return (!this.$data.token_symbol);
    }
},

mounted() {
    if (this.$props.token) {
        //self.querySelector("ons-button.btn_done").setAttribute("disabled", true);

        this.$core.luniWallet.getTokenBalance(
            this.$props.account.address, this.$data.con_addr)
        .then(result => {
            this.$data.token_balance = result;
        })
    }
},

methods: {

    loadTokenInfo() {
        if (this.$data.isLoading1) return;

        this.$data.isLoading1 = true

        this.$core.Validation.check(this, [
            { name:"con_addr", type:"required", msg:'주소는 필수입력 입니다.' },
            { name:"con_addr", type:"addr_eth", msg:'잘못된 컨트랙트 주소입니다.' }
        ]).then(success => {

            if (this.$data.token_chain && this.$core.luniWallet.provider != this.$data.token_chain)
                this.$core.luniWallet.setWeb3Provider(this.$data.token_chain);

            return this.$core.luniWallet.getTokenInfo(this.$props.account.address, this.$data.con_addr)
            .then(result => {
                console.log('reslut:', result);

                this.$data.showInfo = true
                this.$data.token_name    = result.name
                this.$data.token_symbol  = result.symbol
                this.$data.token_decimal = result.decimal
                this.$data.token_balance = result.balance
                this.$data.isDark = true
            }).catch(err => {
                this.$core.Notification.alert(err.message);
            })

        }).finally(done =>{
            this.$data.isLoading1 = false
        })

    },

    done() {
        console.log('chain:', this.$props.chain)

        this.$store.commit("coin/addCoin",{
            coin: {
                type:'LOCAL',
                tokenType: C.tokenTypes.LUX20,
                nick     : 'luniverse', //[TODO]
                parent   : this.$props.account.accountId,
                symbol   : this.$data.token_symbol,
                name     : this.$data.token_name,
                price    : 0,
                tags     : this.$props.account.accNick,
                contract : this.$data.con_addr,
                decimal  : this.$data.token_decimal || 18,
                balance  : this.$data.token_balance,
                address  : this.$props.account.address,
                Web3Rpc  : this.$props.token_chain || 'http://baas-rpc.luniverse.net:8545?lChainId=8253766290815603891'
                //name_local : this.$data.token_localName
                //thumbnail  : this.$data.coin_thumb,
                //geco_id    : this.$data.coin_geco_id,
                //match_id   : this.$data.coin_id,
                //market     : this.$data.coin_market,
                //exchange   : this.$data.coin_exchange,
                //exchangeConfirm: this.$data.coin_exchangeConfirm,
                //price_fiat : this.$data.coin_fiat
            },
            addHome: true
        })

        this.$core.goHome()

        setTimeout(()=>{
            this.$core.toast('추가 되었습니다.')
        },100)
    }

}
}
</script>

