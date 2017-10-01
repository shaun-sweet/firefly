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
        <p v-if="!isLoggedIn && errorMessage">{{ errorMessage }}</p>
      </form>
    </div>
  </section>
</template>

<script>
import { attemptLogin, logout, getUserHomes } from 'src/firebase'

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
      console.log('logging out')
      this.isLoggedIn = false
      logout()
      this.$store.commit('LOG_USER_OUT')
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
          const uid = response.uid
          const email = response.email
          const displayName = response.displayName
          this.$store.commit('SAVE_USER', { uid, email, displayName })
          getUserHomes(uid)
            .then((snap) => {
              this.$store.commit('SAVE_USER_HOMES', snap.val())
            })
          this.isLoggedIn = true
          this.userEmail = response.email
        }, (err) => {
          console.error(err)
          this.isLoggedIn = false
          this.errorMessage = err.message
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.status
  margin-top: 1em
</style>
