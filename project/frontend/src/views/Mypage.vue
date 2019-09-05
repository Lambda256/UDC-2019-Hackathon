<template>
<div>
    <div> {{userInfo.name}}님 환영합니다. </div>
    <div> {{userInfo.address}} </div>
</div>

</template>

<script>
import {mapState} from 'vuex'
export default {
    data: () => ({
        
    }),
    computed: {
        ...mapState(['userInfo'])
    },
    created() {
        console.log(this.$store.state.userInfo)
    }
}
</script>