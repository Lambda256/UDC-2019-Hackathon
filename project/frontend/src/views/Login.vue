<template>
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
          <v-toolbar-title>Login</v-toolbar-title>
          <div class="flex-grow-1"></div>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="id"
              name="id"
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
          <a @click= "$router.push({name: 'register'})"> 회원이 아니신가요? (가입하기) </a>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" @click="login({id, password})">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'
import {mapActions, mapState} from 'vuex'
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
      },
    },
    created() {
      let from = this.$route.params.name
      if(from !== 'login'){
        this.$store.state.beforeLogin = from
      }
    }
  }
</script>