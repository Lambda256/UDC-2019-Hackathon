<template>
    <v-row justify="center"> 
        <v-col sm="12" md="8" lg="6" xl="4">
            <v-card>
                <v-card-title>경기정보: {{$store.state.gameToSee.Team1}} vs {{$store.state.gameToSee.Team2}} </v-card-title>
            </v-card>
            <v-card v-for="(ticket, i) in $store.state.tickets" :key = "i">
                <v-card-text>
                    <p >위치: {{ticket.Seat}}, 가격: {{ticket.Price}} </p>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        text
                        @click="buyTicket(ticket)"
                    >
                        Buy
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-col cols="12" v-for="(ticket, i) in $store.state.tickets" :key = "i">
            {{ticket.Seat}}.
        </v-col>
    </v-row>
</template>

<script>
import axios from 'axios'
export default {
    data: () => ({
        
    }),
    methods: {
        buyTicket(ticket) {
            console.log('ticket bought')
            axios.get('http://localhost:3000/api/buyTicket',{
                headers: {
                   'token' : this.$store.state.token,
                   'walletAddress': this.$store.state.userInfo.address,
                   'productID': ticket.Ticket_ID
               }
            })
            .then( res => {
               console.log('ㅁㄴㅇㄹ success')
           })
           .catch( err => {
               console.log('ㅁㄴㅇㄹ error')
           })
        }
    },
    created () {
        console.log('ticket')
        axios.get('http://localhost:3000/api/ticket', {
            params: {
                'place': this.$store.state.gameToSee.Place,
                'time': this.$store.state.gameToSee.Time
            }
        })
        .then( res => {
            this.$store.state.tickets = res.data.slice()
            console.log('good')
            console.log(this.$store.state.tickets.length)
        })
        .catch( err => {
            console.log('not good')
        })
    },
}
</script>