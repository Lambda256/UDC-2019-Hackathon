<template>
    <v-row justify = "center">
        <v-col  sm="12" md="8" lg="6" xl="4">
            <v-card>
                <v-img
                    :src="$store.state.productToBuy.Image_Link"
                    class="white--text"
                    height="400px"
                >
                </v-img>
                <v-card-text>
                    <p class="display-1 text--primary"> {{$store.state.productToBuy.Product_Name}} </p>
                    <div> price: {{$store.state.productToBuy.Price}} </div>
                    <p> remaining: {{$store.state.productToBuy.Remaining}} </p>
                    <p class="display-1 text--primary"> 구매하시겠습니까? </p>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        text
                        @click="buyProduct($store.state.productToBuy)"
                    >
                        Buy
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data: () => ({
        
    }),
    created() {
        console.log(this.$route)
        console.log(this.$router)
    },
    methods: {
        buyProduct(item) {
            let number = item.Product_ID
            axios.post('http://localhost:3000/api/buyProduct', {
               headers: {
                   'token' : this.$store.state.token,
                   'walletAddress': this.$store.state.userInfo.address,
                   'productID': number
               }
           })
           .then( res => {
               console.log('ㅁㄴㅇㄹ success')
           })
           .catch( err => {
               console.log('ㅁㄴㅇㄹ error')
           })
        }
    }
}
</script>