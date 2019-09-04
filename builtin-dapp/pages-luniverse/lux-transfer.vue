<template>
<v-ons-page class="szTheme">

    <v-ons-toolbar>
        <div class="left"><v-ons-back-button modifier="material"></v-ons-back-button></div>
        <div class="center">루니버스 토큰 전송</div>
    </v-ons-toolbar>

    <div id="tranferPanel">
        <ons-list>
            <ons-list-header>{{nick}}에 있는 {{tokenName}} 을 이체합니다.</ons-list-header>

            <ons-list-item>
                <v-ons-input name="receiver" modifier="material underbar" placeholder="수신자 계정주소 입력" float v-model="receiver"></v-ons-input>
            </ons-list-item>

            <ons-list-item>
                <div class="left" style="padding-top:0;"><!--
                    <ons-button disabled>등록된 주소 불러오기</ons-button>
                -->
                </div>
                <div class="right" style="padding-top:0;padding-right:0;">
                    <ons-button class="dark" @click="paste">붙여넣기</ons-button>&nbsp;&nbsp;<ons-button class="dark" @click="qr">QR 스캔</ons-button>
                </div>
            </ons-list-item>

            <ons-list-header>전송할 수량 <span style="float:right;margin-right:15px;">잔고 {{balance_fmt}} {{symbol}}</span></ons-list-header>
            <ons-list-item>
                <v-ons-input name="amount" placeholder="수량" modifier="material underbar" maxlength="20" float ref="v1" @keyup="unitUpdate"></v-ons-input>
                <span>{{symbol}}</span>
            </ons-list-item>

            <ons-list-item style="margin-top:10px;">
                <v-ons-input name="amount_local" placeholder="금액" modifier="material underbar" maxlength="20" float ref="v2" @keyup="unitUpdate"></v-ons-input>
                <span>KRW</span>
            </ons-list-item>

            <div class="hide" style="width:100%;margin-bottom:20px;margin-top:30px;">
                <ons-list-item>
                    <v-ons-input name="gasprice" modifier="material underbar" placeholder="전송 수수료 (Gas Price)" float v-model="gas_price"></v-ons-input>
                    <span>GWEI</span>
                </ons-list-item>
                <ons-list-item>
                    <v-ons-input name="gaslimit" modifier="material underbar" placeholder="수수료 소모 제한 (Gas Limit)" float v-model="gas_limit"></v-ons-input>
                </ons-list-item>
            </div>

            <ons-list-item style="margin-top:20px;">
                <ons-button modifier="large" @click="send" v-bind:class="{'loading-ring':isLoading}">이체하기</ons-button>
            </ons-list-item>
        </ons-list>
    </div>

</v-ons-page>
</template>

<script>
import C from '@/core/Constant.js'

export default {

props: ['target'],

data() {

    let decimal = (this.$props.target.decimal == undefined) ? 0 : this.$props.target.decimal;

    return {
        isLoading: false,
        showManualFee: false,
        selectedFee: 1,

        balance: this.$props.target.balance,
        symbol:  this.$props.target.symbol,
        decimal: decimal,
        contract: this.$props.target.contract,

        receiver: '',
        amount: '',
        amount_local: '',
        gas_price: 0,
        gas_limit: 25000,

        fee_low_gwei: 3,
        fee_avg_gwei: 5,
        fee_fast_gwei: 10,

        nick: this.$props.target.nick,
        tokenName: this.$props.target.name
    };
},

created() {
},

mounted() {
    this.$data.gas_limit = (this.$data.symbol == 'ETH')? 22000 : 60000;
},

computed: {
    balance_fmt() {
        return this.$core.price.targetFormat2(this.$props.target, 'balance')
    }
},

methods: {

    unitUpdate($event) {

        let mode = ($event.srcElement.name == 'amount')
        let v1 = this.$refs.v1.$el
        let v2 = this.$refs.v2.$el
        let cValue = null

        //[TODO] 가격 캐쉬에서 심볼에 맞는 가격을 찾아와서 붙이기
        let local_price = 0;

        if (this.$data.symbol == "ETH") {
            local_price = this.$store.state.price.keyCurrency.ETH;
        }

        if (mode) {
            if (v1.value == ".") v1.value = "0.";

            cValue = (parseFloat(v1.value.replace(/,/g,'')) * local_price).toFixed(0)+''
            v2.value = this.$core.price.comma(cValue)
            v1.value = this.$core.price.comma(v1.value)
            v1.focus()

        } else {
            if (v2.value == ".") v2.value = "0.";

            cValue = (parseFloat(v2.value.replace(/,/g,'')) / local_price)
            cValue = (cValue === Infinity) ? 0 : cValue.toFixed(5)+'';
            v1.value = this.$core.price.comma(cValue)
            v2.value = this.$core.price.comma(v2.value)
            v2.focus()
        }

        if (v1.value == 'NaN') v1.value = '';
        if (v2.value == 'NaN') v2.value = '';
    },

    selectFee(index) {
        this.$data.selectedFee = index;
        if (index == 0) this.$data.gas_price = this.$data.fee_low_gwei;
        if (index == 1) this.$data.gas_price = this.$data.fee_avg_gwei;
        if (index == 2) this.$data.gas_price = this.$data.fee_fast_gwei;
    },

    selectFeeTab(index) {
        this.$data.showManualFee = (index == 1);
    },

    paste() {
        this.$core.Clipboard.paste(text => { this.$data.receiver = text })
    },

    qr() {
        this.$core.QRCode.scan(true, (err, url)=>{ this.$data.receiver = url })
    },

    send_method() {
        let accInfo = this.$store.getters["coin/account"](this.$props.target.parent)

        //[TODO] encPriv 없이도 그냥 넘어올수 있다.
        if (accInfo.encPrivKey == undefined && accInfo.exportedNFC == true) {

            this.$core.NFC.read().then(data =>{

                let addrHead = data.substr(0, 8)
                let spData = data.split(":")

                if (accInfo.address.substr(0, 8) != addrHead) {
                    this.$core.alert("다른 카드 입니다.")

                } else {
                    this.$core.luniWallet.addPrivateKeyToSign( accInfo.address, {
                        key:   spData[1],
                        nonce: spData[2]
                    })

                    this.send_eth().then((k)=>{
                        this.$core.luniWallet.removePrivateKey( accInfo.address )
                    })
                }

            }).catch(err=>{
                if (err == "NFC_DISABLED")
                    this.$core.alert("휴대폰의 NFC 기능이 꺼져있습니다.")
                else
                    this.$core.alert(err)
            })

        } else {
            this.$core.luniWallet.addPrivateKeyToSign( accInfo.address, accInfo.encPrivKey )
            this.send_eth()
        }
    },

    send_eth() {

        let sendFunc

        //if (this.$data.symbol == 'ETH') {
        //    sendFunc = this.$core.luniWallet.sendEth.bind( this.$core.luniWallet );
        //} else {
            sendFunc = this.$core.luniWallet.sendToken.bind(
                this.$core.luniWallet,
                this.$data.contract
            )
        //}

        let successFunc = (result)=>{

            this.$store.commit("coin/editCoin", {
                id: this.$props.target.id,
                lastTxResult: (result.status == true) ? 'success' : 'fail'
            })

            this.$core.toast("전송이 완료 되었습니다.", {timeout: 3000})
            this.$core.Notification.vibrate([100,30,100])

            this.$data.receiver = '';
            this.$data.amount = '';
            this.$data.amount_local = '';

            console.log('sended:', Date.now());
        }

        return sendFunc(
            this.$props.target.address,
            this.$data.receiver,
            parseInt(parseFloat(this.$data.amount) * Math.pow(10, this.$data.decimal)),
            0,
            parseInt(this.$data.gas_limit),
            successFunc,
            (err)=>{
                this.$data.isLoading = false
            }
        ).then( txid => {

            this.$data.isLoading = false

            this.$store.commit("coin/editCoin", {
                id: this.$props.target.id,
                lastTx: txid,
                lastTxResult: 'success',
                lastTxTime: Date.now()
            })

            this.$core.alert("트랜젝션이 발송되었습니다.").then(()=>{
                this.$core.pop()
                this.$core.toast("TXID: "+txid.substr(0,13)+'...', {timeout: 3000})
            })

            // 루니버스는 TXID 리턴이후에 receipt를 반환하지 않음..
            //setTimeout(()=>{
            //    this.$core.luniWallet.getReceipt(txid).then(receipt =>{
             //       if (receipt.status)
             //           successFunc(receipt);
             //   })
            //}, 3000)
        })
    },

    send() {

        if (this.$data.isLoading) return;
        this.$data.isLoading = true

        let children = this.$store.getters["coin/children"](this.$props.target.parent)
        let m = children.find(i => i.symbol == 'ETH' && i.type == 'LOCAL')

        //if (m.balance == 0) {
            //this.$core.alert("이더리움 계정에 수수료를 지불할 잔고가 없습니다.")
            //this.$data.isLoading = false
            //return
        //}

        let bal = this.$core.price.setDecimal(this.$data.balance, this.$data.decimal)

        this.$data.amount = this.$refs.v1.$el.value

        this.$core.Validation.check(this, [
            { name: 'receiver', type:'required', msg:'주소를 입력하세요.'},
            { name: 'receiver', type:'addr_eth', msg:'잘못된 입금주소입니다.'},
            { name: 'amount',   type:'required', msg:'수량을 입력하세요'},
            { name: 'amount',   type:'number',   msg:'수량은 숫자만 입력 되어야 합니다.'},
            { name: 'amount',   type:'under',    msg:'수량이 잔고보다 많습니다.', value: bal }
        ]).then(success => {

            return this.$core.confirm("전송 하시겠습니까?").then( res=>{
                if (res == 1)
                    this.send_method()
                else
                    this.$data.isLoading = false;
            })

        }).catch(e => {
            this.$data.isLoading = false
        })
    }

}
};
</script>