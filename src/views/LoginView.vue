<template>
  <!-- <q-modal ref="loginMenu"> -->
    <div class="layout-padding">
      <q-field>
        <q-input icon="ion-email" type="email" stack-label="Email Address" v-model="email" />
      </q-field>
      <q-field>
        <q-input v-model="password" stack-label="Password" type="password">
        </q-input>
      </q-field>
      <q-field>
        <q-btn color="primary" @click="close()">DEV CLOSE</q-btn>
        <q-btn color="primary" icon="ion-person" @click="login()"> Login</q-btn>
        <q-btn outline color="primary" icon="ion-person-add"> Signup</q-btn>
        <q-btn outline color="primary" icon="ion-ios-loop"> Send Password Reset</q-btn>
        <q-btn outline color="primary" icon="ion-checkmark-round">Send Email Verification</q-btn>
        <p class="status" v-if="isLoggedIn">Firefly Sign-in Status: {{userEmail}} online</p>
        <p v-if="!isLoggedIn && errorMessage">{{ errorMessage }}</p>
      </q-field>
    </div>
  <!-- </q-modal>   -->
</template>

<script>
import { attemptLogin } from '../firebase'

export default {
  data () {
    return {
      userEmail: '',
      errorMessage: '',
      isLoggedIn: false,
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      attemptLogin(this.email, this.password)
        .then((response) => {
          console.log(response)
          this.isLoggedIn = true
          this.userEmail = response.email
          this.errorMessage = ''
        })
        .catch((err) => {
          console.log(err)
          this.isLoggedIn = false
          this.errorMessage = err.message
          this.userEmail = ''
        })
    },
    close () {
      this.$router.push('/devices')
      this.$refs.loginMenu.close()
    }
  }
}
</script>

<style lang="stylus" scoped>
.status
  margin-top: 1em
</style>
