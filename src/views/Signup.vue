<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <!-- your content -->
    <q-field>
      <q-input
        type="text"
        stack-label="Email"
        v-model="form.email"
        :after="[
          {
            icon: 'ion-person-add'
          }        
        ]" 
      />
    </q-field>
    <q-field>
      <q-input
        type="password"
        stack-label="Password"
        v-model="form.password" 
        :after="[
          {
            icon: 'ion-locked'
          }        
        ]"
      />
    </q-field>
    <q-field>
      <q-input
        type="password"
        stack-label="Confirm Password"
        v-model="form.passConfirm"
        :after="[
          {
            icon: 'ion-locked'
          }        
        ]"
      />
    </q-field>
    <q-btn color="primary" icon="ion-checkmark">Sign up!</q-btn>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: '',
        passConfirm: ''
      }
    }
  },
  methods: {
    handleSignup () {
      console.log(this.$auth)
    }
  }
}
</script>

<style lang="stylus">
</style>
