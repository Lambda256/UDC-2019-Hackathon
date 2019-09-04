<template>
    <v-row justify="center" >
        <v-col cols="10">
            <v-card>
            <v-row >
                <v-col >
                    <v-tabs >
                        <v-tab>Item One</v-tab>
                        <v-tab>Item Two</v-tab>
                        <v-tab>Item Three</v-tab>
                    </v-tabs>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="auto" md="6" sm="12">
                    <v-card>
                        <v-card-text>
                        <div class="headline mb-2">Unlimited music now</div>
                        Listen to your favorite artists and albums whenever and wherever, online and offline.
                        </v-card-text>

                        <v-card-actions>
                        <v-btn text>Listen Now</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="auto" md="6" sm="12">
                    <v-card>
                        <v-card-text>
                        <div class="headline mb-2">Unlimited music now</div>
                        Listen to your favorite artists and albums whenever and wherever, online and offline.
                        </v-card-text>

                        <v-card-actions>
                        <v-btn text>Listen Now</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="auto" md="6" sm="12">
                    <v-card>
                        <v-card-text>
                        <div class="headline mb-2">Unlimited music now</div>
                        Listen to your favorite artists and albums whenever and wherever, online and offline.
                        </v-card-text>

                        <v-card-actions>
                        <v-btn text>Listen Now</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="auto" md="6" sm="12">
                    <v-card>
                        <v-card-text>
                        <div class="headline mb-2">Unlimited music now</div>
                        Listen to your favorite artists and albums whenever and wherever, online and offline.
                        </v-card-text>

                        <v-card-actions>
                        <v-btn text>Listen Now</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="auto" md="6" sm="12">
                    <v-card>
                        <v-card-text>
                        <div class="headline mb-2">Unlimited music now</div>
                        Listen to your favorite artists and albums whenever and wherever, online and offline.
                        </v-card-text>

                        <v-card-actions>
                        <v-btn text>Listen Now</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="auto" md="6" sm="12">
                    <v-card>
                        <v-card-text>
                        <div class="headline mb-2">Unlimited music now</div>
                        Listen to your favorite artists and albums whenever and wherever, online and offline.
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
    created() {
        axios.get('http://localhost:3000/api/schedule')
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {

        })
    }
}
</script>