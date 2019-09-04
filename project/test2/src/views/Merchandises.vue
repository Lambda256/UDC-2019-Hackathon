<template>
    <div
    >
        <!--
        <v-row
            align="center"
            justify="center"
        >
        -->
        <v-row>
            <v-col
                v-for="item in $store.state.demoData"
                :key="item.id"
                cols=4
            >
                <v-card>
                    <v-img
                        :src="item.image"
                        class="white--text"
                        height="400px"
                    >
                    </v-img>

                    <v-card-text>
                        <p class="display-1 text--primary"> {{item.name}} </p>
                        <div> price: {{item.price}} </div>
                        <p> remaining: {{item.remaining}} </p>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            text
                            @click="test"
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
    </div>
</template>

<script>
import axios from "axios"

export default {
    methods: {
        test: function () {
            axios
            .get('https://reqres.in/api/users/2')
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
            .then( () => {
                console.log('test')
            })
        }
    }
}
</script>