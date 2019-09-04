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
                    v-for="(game, i) in $store.state.games" 
                    :key = "i" 
                    cols="auto" 
                    md="6" 
                    sm="12"
                >
                    <v-card  class="mx-3">
                        <v-card-text>
                        <div class="headline mb-2">{{game.Place}}</div>
                        {{game.Time}}
                        {{typeof game.Time}}
                        </v-card-text>

                        <v-card-actions>
                        <v-btn text>Listen Now</v-btn>
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
        gameToday: []
    }),
    
    created() {
        //this.fetchData()
        axios.get('http://localhost:3000/api/schedule')
        .then(res => {
            console.log('dates/get')
            this.$store.state.games = res.data.slice()
        })
        .catch(err => {
            console.log(err)
            console.log('dates/error')
        })
    }, 
    watch: {
        picker: function(val, oldVal) {
            gameToday
        }
    }, 
    methods:{
        //datetimeToArray: function(str) 
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