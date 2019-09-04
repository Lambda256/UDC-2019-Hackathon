<template>
  <HelloWorld />
</template>

<script>
import HelloWorld from '../components/HelloWorld';

export default {
  components: {
    HelloWorld,
  },
  created() {
    //console.log(this.$store.state.isLogin)
  }
};
</script>
