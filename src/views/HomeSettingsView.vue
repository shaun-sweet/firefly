<template>
  <div class="layout-padding">
    <q-list no-border>
      <q-list-header>
        <h5>Owners</h5>
      </q-list-header>
      <q-item>
        <q-item-main class="owners" link dense multiline>
          <div class="owners-information">
            <div class="owner-name">Display Name: <span>{Shaun}</span></div>
            <div class="owner-email">Email: <span>{email@email.com}</span></div>
          </div>
        </q-item-main>
      </q-item>

      <q-item-separator />
    </q-list>

    <q-list no-border>
      <q-list-header>
        <h5>Guests</h5>
      </q-list-header>

      <q-item>
        <q-item-main class="guests" link dense multiline>
          <div class="guests-information">
            <div class="guests-name">Display Name: <span>{Shaun}</span></div>
            <div class="guests-email">Email: <span>{email@email.com}</span></div>
            <div class="guests-home-nickname">Home Nickname: <span>{Zach Priddys Firefly Home}</span></div>
          </div>
        </q-item-main>
        <q-item-side right>
          <div class="role-selector">
            <q-field>
              <q-select
              separator
              stack-label="Role"
              v-model="select"
              :options="selectOptions"
              />
            </q-field>
          </div>
        </q-item-side>
        <q-item-side right icon="ion-ios-trash-outline" />
      </q-item>

      <q-item-separator class="separator" />

      <q-item>
        <q-item-main class="guests" link dense multiline>
          <div class="guests-information">
            <div class="guests-name">Display Name: <span>{Amy}</span></div>
            <div class="guests-email">Email: <span>{email@email.com}</span></div>
            <div class="guests-home-nickname">Home Nickname: <span>{Zach Priddys Firefly Home}</span></div>
          </div>
        </q-item-main>
        <q-item-side right>
          <div class="role-selector">
            <q-field>
              <q-select
              separator
              float-label="Role"
              v-model="select"
              :options="selectOptions"
              />
            </q-field>
          </div>
        </q-item-side>
        <q-item-side right icon="ion-ios-trash-outline" />
      </q-item>
    </q-list>

    <q-list no-border>
      <q-list-header id="invite-to-home">
          <h5>Pending Invite(s)</h5>
          <q-btn small @click="$refs.inviteUserMenu.open()" outline class="button" color="primary" icon="ion-person-add"> Invite a Friend!</q-btn>
      </q-list-header>

      <q-item>
        <q-item-main class="owners" link dense multiline>
          <div class="owners-information">
            <div class="owner-name">Display Name: <span>{Shaun}</span></div>
            <div class="owner-email">Email: <span>{email@email.com}</span></div>
          </div>
        </q-item-main>
      </q-item>
      <q-item-separator class="separator" />

    </q-list>

    <q-modal maximized ref="inviteUserMenu">
      <q-modal-layout>
        <q-toolbar slot="header">
          <div class="q-toolbar-title">
            Invite a friend
          </div>
        </q-toolbar>
        <q-toolbar slot="footer">
          <div class="q-toolbar-title">
            Firefly Home Automation
          </div>
        </q-toolbar>
        <div class="layout-padding">
          <q-field>
            <q-input
              type="text"
              stack-label="Name"
              v-model="email" />
          </q-field>
          <q-field>
            <q-input
              type="email"
              stack-label="Email Address"
              v-model="email" />
          </q-field>
          <q-field>
            <q-input
              type="text"
              stack-label="Home Nickname"
              v-model="email" />
          </q-field>
          <q-select
          separator
          stack-label="Role"
          v-model="select"
          :options="selectOptions"
          />
          <q-btn color="primary" @click="$refs.inviteUserMenu.close()">Submit</q-btn>
          <q-btn outline @click="$refs.inviteUserMenu.close()">Close</q-btn>
        </div>
      </q-modal-layout>
    </q-modal>

  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      select: 'guest',
      selectOptions: [
        {
          label: 'Owner',
          value: 'owner'
        },
        {
          label: 'Guest',
          value: 'guest'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
#invite-to-home
  display flex
  .button
    margin-left 2em

.owners-information > div, .guests-information > div
  margin-bottom: .5em
  padding-left: 1em

.separator
  margin-left: 1em
</style>
