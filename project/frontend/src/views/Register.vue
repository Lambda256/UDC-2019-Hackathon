<template>
    <v-row justify="center">
        <v-col sm="12" md="8" lg="6" xl="4">
            <v-card>
                <v-card-text>
                    <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
                <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Name"
                required
                ></v-text-field>

                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="password"
                    :append-icon="show ? 'visibility' : 'visibility_off'"
                    :rules="[rules.required, rules.min]"
                    :type="show ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show = !show"
                    ></v-text-field>

                    <v-text-field
                    v-model="address"
                    label="Address"
                    ></v-text-field>

                    <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="submit"
                    >
                    회원가입
                    </v-btn>
                </v-form>
                </v-card-text>
            </v-card>
            
        </v-col>
    </v-row>
</template>
<script>
import axios from 'axios'

export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
      lazy: false,
      show: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
      },
      password: '',
      address: ''
    }),
    methods: {
        submit () {
            axios.post('http://localhost:3000/api/signup', {
                'name': this.name,
                'password': this.password,
                'email': this.email,
                'place': this.address
            })
            .then(res => {
                console.log('register-response: ', res)
            })
            .catch(err => {
                console.log('register/error')
            })
        }
    }
}
</script>