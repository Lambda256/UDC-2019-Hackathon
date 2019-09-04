<template>
    <v-row justify="center">
        <v-col cols = "12">
            <v-tabs
            center-active
            >
                <v-tab
                    v-for="team in $store.state.Teams"
                    :key="team"
                    v-bind="teamNow"
                >{{team}}</v-tab>
            </v-tabs>
        </v-col>
            <v-col
                v-for="item in $store.state.demoData"
                :key="item.id"
                cols="auto"
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
</template>

<script>
import axios from "axios"

export default {
    methods: {
        test: function () {
            axios
            .get('http://localhost:3000/api/product')
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