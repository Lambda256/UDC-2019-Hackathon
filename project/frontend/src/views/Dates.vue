<template>
    <v-row justify="center" >
        <v-col cols="12">
            <v-card>
            <v-row justify = "center">
                <v-date-picker
                v-model="picker"
                locale="ko-KR"
                @change="change"
                ></v-date-picker>
            </v-row>
            <v-row justify="center">
                <v-col  
                    v-for="(game, i) in $store.state.gameToday" 
                    :key = "i" 
                    cols="auto" 
                    md="6" 
                    sm="12"
                >
                    <v-card  class="mx-3">
                        <v-card-text>
                        <div class="headline mb-2">{{game.Team1}} vs {{game.Team2}}</div>
                        <div> 장소: {{game.Place}} </div>
                        <div> 시간: {{game.Time.substr(5,2)}}:{{game.Time.substr(8,2)}}
                        </v-card-text>

                        <v-card-actions>
                        <v-btn text @click=" next(game)"> 예매하기 </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        picker: new Date().toISOString().substr(0, 10),
        pickerMonth: picker.substr(5,2),
        pickerDay: picker.substr(8,2),
        month: new Date().toISOString().substr(5, 2),
        day: new Date().toISOString().substr(8, 2),
    }),
    
    created() {
        //this.fetchData()
        axios.get('http://localhost:3000/api/schedule')
        .then(res => {
            console.log('dates/get')
            this.$store.state.games = res.data.slice()
            let month = new Date().toISOString().substr(5, 2)
            let day = new Date().toISOString().substr(8, 2)
            let m = this.$store.state.games.filter(function(g) {
                var monthS = g.Time.substr(5,2)
                var dayS = g.Time.substr(8,2)
                return (day==dayS && month==monthS)
            })
            this.$store.state.gameToday = m.slice()
        })
        .catch(err => {
            console.log(err)
            console.log('dates/error')
        })
    }, 
    methods:{
        change () {
            let month = this.picker.substr(5,2)
            let day = this.picker.substr(8,2)
            let m = this.$store.state.games.filter(function(g) {
                var monthS = g.Time.substr(5,2)
                var dayS = g.Time.substr(8,2)
                return (day==dayS && month==monthS)
            })
            console.log(m[0])
            this.$store.state.gameToday = m.slice()
        },
        next(game) {
            this.$store.state.gameToSee = game
            this.$router.push({name: 'ticketinfo'})
        }
    }
    /*
    methods:{
        fetchData () {
            axios.get('http://localhost:3000/api/schedule')
            .then(res => {
                console.log('dates/get')
                this.allGames = res.data.slice()
                console.log(allGames.length)
            })
            .catch(err => {
                console.log(err)
                console.log('dates/error')
            })
        }
    }
    */
}
</script>