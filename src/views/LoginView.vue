<template>
  <section @keyup.enter.prevent="login()">
    <div class="layout-padding">
      <form>
        <q-field>
          <q-input icon="ion-email" type="email" stack-label="Email Address" placeholder="Just click Login for dev purposes" v-model="email" />
        </q-field>
        <q-field>
          <q-input v-model="password" stack-label="Password" type="password">
          </q-input>
        </q-field>
        <q-field>
          <q-btn color="primary" icon="ion-person" @click.prevent="login()">Login</q-btn>
          <q-btn color="primary" icon="ion-person" @click="handleLogout()">Logout</q-btn>
          <q-btn outline color="primary" icon="ion-person-add"> Signup</q-btn>
          <q-btn outline color="primary" icon="ion-ios-loop"> Send Password Reset</q-btn>
          <q-btn outline color="primary" icon="ion-checkmark-round">Send Email Verification</q-btn>
        </q-field>
        <p class="status" v-if="isLoggedIn">Firefly Sign-in Status: {{userEmail}} online</p>
      </form>
    </div>
  </section>
</template>

<script>
import { attemptLogin } from 'src/firebase'
import { Toast } from 'quasar'
import { ERROR_LOGIN } from 'src/store/mutation-types'

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
    handleLogout () {
      this.$store.dispatch('logOut')
      this.isLoggedIn = false
    },
    login () {
      // TODO: for dev only, remove for production
      let email = 'sweetone06@gmail.com'
      let password = 'destroy'
      if (this.email && this.password) {
        email = this.email
        password = this.password
      }
      attemptLogin(email, password)
        .then((response) => {
          this.isLoggedIn = true
          this.userEmail = response.email
          Toast.create.positive({
            html: `Successfully Logged in!  <br />
              Welcome back ${this.userEmail}`,
            icon: 'ion-ios-checkmark'
          })
        }, (err) => {
          const errorMsg = err.message
          this.isLoggedIn = false
          this.$store.commit(ERROR_LOGIN, { errorMsg })
          this.errorMessage = this.$store.state.errors.login

          Toast.create.negative({
            html: this.errorMessage,
            icon: 'ion-android-hand'
          })
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.status
  margin-top 1em
</style>
