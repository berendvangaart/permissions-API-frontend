<template>
  <q-page class="row items-center justify-evenly">
    <div class="container">
      <h3>Welcome to the Permissions API setup</h3>
      <h5>Please fill out all relevant content to create an admin account</h5>
      <form class="form-container" @submit.prevent="loginSubmit">
        <!-- Email input -->

        <q-input v-model="newUser.name" label="Name"/>
        <q-input v-model="newUser.email" label="Email"/>

        <q-input v-model="newUser.password" type="password" label="Password"/>
        <q-input v-model="newUser.passwordVerification" type="password" label="Verify Password"/>
        <span v-if="!passwordEquals" class="text-subtitle1 text-red">Please make sure your password matches</span>
        <!-- Submit button -->
        <div class="flex">
          <q-space />
          <q-btn :disable="!passwordEquals" color="green" @click="loginSubmit" :disabled=isDisabled icon="check" align="right" class="q-mt-md">Create account</q-btn>

        </div>
      </form>
    </div>
  </q-page>
</template>

<script lang="ts">
import axios from 'axios';
import { useQuasar } from 'quasar'

export default {
  name: 'WelcomeSetup',
  data() {
    const $q = useQuasar()
    return {
      newUser: {},
      triggerSuccess (message) {
        $q.notify({
          type: 'info',
          message: message
        })
      },
      triggerWarning (message) {
        $q.notify({
          type: 'warning',
          message: message
        })
      },
    }
  },
  methods: {
    updateRole() {
      // Todo create role for this purpose
      axios.put(`${process.env.API_URL}/roles/` + this.roleId, this.role)
        .then((response) => {
          // todo create and return a logged in user
          this.triggerSuccess('Role has succesfully been updated')
        })
        .catch((error) => {
          this.triggerWarning(error.toString())
        })
    },
  },
  computed: {
    passwordEquals() {
      return this.newUser.password == this.newUser.passwordVerification;
    }
  }

}
</script>
