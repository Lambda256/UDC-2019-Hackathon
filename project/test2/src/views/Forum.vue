<template>

      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <div class="flex-grow-1"></div>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      :href="source"
                      icon
                      large
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>Source</span>
                </v-tooltip>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      large
                      href="https://codepen.io/johnjleider/pen/pMvGQO"
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-codepen</v-icon>
                    </v-btn>
                  </template>
                  <span>Codepen</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    type="text"
                    v-model = "id"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    v-model= "password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="primary" @click="login({id, password})">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
import axios from 'axios'
import {mapActions} from 'vuex'
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      id: '',
      password: '',
    }),
    methods: {
      ...mapActions(['login']),
      test: function() {
        axios.get('http://localhost:3000/api/')
        .then(res => {
          console.log(res)
        })
        .catch(() => {
          console.log("error")
        })
        .then( () => {
          alert('test')
        })
      }
    }
  }
</script>