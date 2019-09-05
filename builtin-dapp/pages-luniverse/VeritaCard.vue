<template>
<Block class="Dominance" :class="themeClass" @click="enter" :style="myStyle">
    <div class="background"></div>

    <div class="handle"><i class="fal fa-bars"></i></div>

    <div class="left middle" style="display:table;">
        <div style="margin-right:25px;">새로운 소식</div>
        <div> <b style="font-size:16px">돌격대 후기가 등록되었어요!</b></div>
    </div>

</Block>
</template>

<script>
import C from '@/core/Constant.js'

export default {

props: ['id'],

data() {

    let target = this.$store.getters["xapp/app"](this.$props.id)
    if (target == undefined)
        console.error("[Fortune] Not fount matched xapp id ", this.$props.id)

    let themeClass = []
    if (target.theme && target.theme.split)
        target.theme.split(",").forEach(i => themeClass.push(i) )
    else
        themeClass.push( 'theme-verita' )

    return {
        themeClass,
        version : '1.0',
        target  : target,
        domi_btc: '',
        domi_eth: '',
        domi_xrp: '',
        total_cap: '',

        myStyle: {
            height: (57+'px'),   // [TODO] Line 이거 합체 필요
        }
    }
},

mounted() {

    this.$emit('setHeight', 57); // [TODO] Line Height Contanst
/*
    this.$core.Scheduler.addTask({
        id        : this.$props.id,
        type      : 'APP',
        name      : 'CryptoDominance',
        func      : this.getData.bind(this),
        online    : true,
        delay     : 100,
        duration  : 60*1000
    })
*/
},

methods: {
    getData() {
/*
        axios.get("https://api.coingecko.com/api/v3/global")
        .then(res => {
            if (res.data && res.data.data) {
                this.$data.domi_btc = '<b style="font-size:16px">BTC</b><br>'+this.$core.price.preset(res.data.data.market_cap_percentage.btc, 'percent_plain')
                this.$data.domi_eth = '<b style="font-size:16px">ETH</b><br>'+this.$core.price.preset(res.data.data.market_cap_percentage.eth, 'percent_plain')
                this.$data.domi_xrp = '<b style="font-size:16px">XRP</b><br>'+this.$core.price.preset(res.data.data.market_cap_percentage.xrp, 'percent_plain')

                let t = this.$core.price.parse(
                    res.data.data.total_market_cap.krw, 'KRW')
                this.$data.total_cap = t.largeCut().short().symbol().html();
            }

        })
*/
    },

    enter() {
        this.$core.push({component: "builtin-verita-detail", animation:'slide',
            props:{ target: this.$data.target }
        })
    }
}

}
</script>
