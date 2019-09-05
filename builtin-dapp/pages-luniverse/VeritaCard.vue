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
        
        myStyle: {
            height: (57+'px'),   // [TODO] Line 이거 합체 필요
        }
    }
},

mounted() {

    this.$emit('setHeight', 57); // [TODO] Line Height Contanst

},

methods: {
    getData() {

    },

    enter() {
        this.$core.push({component: "builtin-verita-detail", animation:'slide',
            props:{ target: this.$data.target }
        })
    }
}

}
</script>
