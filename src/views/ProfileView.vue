<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <!-- your content -->
    <q-field>
      <q-input
        icon="ion-email"
        type="text"
        stack-label="Full Name"
        v-model="form.fullName" />

    </q-field>
    <q-field>
      <q-input
        icon="ion-email"
        type="email"
        stack-label="Firefly Address (temp)"
        v-model="form.email" />

    </q-field>
    <q-btn color="primary" icon="ion-checkmark">Save</q-btn>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        fullName: this.$store.getters.user.displayName,
        email: this.$store.getters.user.email
      }
    }
  }
}
</script>

<style lang="stylus">
</style>
