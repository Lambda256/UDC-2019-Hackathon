<template>
    <div> {{userInfo.name}}님 환영합니다. </div>
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