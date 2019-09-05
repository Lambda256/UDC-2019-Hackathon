<template>
    <v-row justify="center">
        <v-col cols = "12">
            <v-tabs
            center-active
            fixed-tabs
            v-on:change="changeData"
            >
                <v-tab
                    v-for="team in $store.state.Teams"
                    :key="team"
                >{{team}}</v-tab>
            </v-tabs>
        </v-col>

        <v-col
            v-for="item in $store.state.products"
            :key="item.Product_ID"
            cols="auto"
        >
            <v-card
                max-width="400px"
            >
                <v-img
                    :src="item.Image_Link"
                    class="white--text"
                    height="400px"
                >
                </v-img>

                <v-card-text>
                    <p class="display-1 text--primary"> {{item.Product_Name}} </p>
                    <div> price: {{item.Price}} </div>
                    <p> remaining: {{item.Remaining}} </p>
                </v-card-text>

                <v-card-actions>
                    <v-btn
                        text
                        @click="move(item)"
                    >
                        Buy
                    </v-btn>
                    <v-btn
                        text
                    >
                        Info
                    </v-btn>
                </v-card-actions>

            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import axios from "axios"

export default {
    data: () => ({
        dialog: false,
        e1:0,
        choise: 0
    }),
    created() {
        console.log('merchandise !')
        axios.get('http://localhost:3000/api/product', {params: {'start': 0, 'end': 20}})
        .then( res => {
            this.$store.state.products = res.data.slice()
            console.log(this.$store.state.products)
            console.log(this.$store.state.products[0].Product_ID)
            console.log(typeof this.$store.state.products[0].Product_ID)
        })
        .catch( err => {
            console.log('error to loading product')
        })
    },
    methods: {
        changeData: (number) => {
            console.log(number)
        },
        move(item) {
            let number = item.Product_ID
            this.$store.state.productToBuy = item
            let a = number.toString()
            
            this.$router.push({name: 'productinfo', params: {id: a}})
            //"$router.push({path:'merchandises/${item.Product_ID.toString()}'})"
            /*
           axios.post('http://localhost:3000/api/buyProduct', {
               headers: {
                   'token' : this.$store.state.token,
                   'walletAddress': this.$store.state.userInfo.address,
                   'productID': a
               }
           })
           .then( res => {
               console.log('ㅁㄴㅇㄹ success')
           })
           .catch( err => {
               console.log('ㅁㄴㅇㄹ error')
           })
           */
        }
    }
}
</script>