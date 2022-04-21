<template>
  <q-page class="row items-center justify-evenly">
    <div class="container">
      <h3>Welcome to the Permissions API setup</h3>
      <h5>Please fill out all relevant content to create an admin account</h5>
      <form class="form-container" @submit.prevent="loginSubmit">
        <!-- Email input -->

        <q-input v-model="adminUser.name" label="Name"/>
        <q-input v-model="adminUser.email" label="Email"/>

        <q-input v-model="adminUser.password" type="password" label="Password"/>
        <q-input v-model="adminUser.passwordVerification" type="password" label="Verify Password"/>
        <span v-if="!passwordEquals" class="text-subtitle1 text-red">Please make sure your password matches</span>
        <!-- Submit button -->
        <div class="flex">
          <q-space />
          <q-btn :disable="!passwordEquals" color="green" @click="createAdminUser" icon="check" align="right" class="q-mt-md">Create account</q-btn>

        </div>
      </form>
    </div>
  </q-page>
</template>

<script lang="ts">
import axios from 'axios';
import {useAuthenticationStore} from 'stores/auth';


export default {
  name: 'WelcomeSetup',
  data() {
    const store = useAuthenticationStore();
    return {
      adminUser: {},
      store,
    }
  },
  methods: {
    createAdminUser() {
      axios.post(`${process.env.API_URL}/users/setup`,this.adminUser)
        .then((response) => {
          this.store.loginCreatedUser(response.data)
          this.$q.notify({type:'positive',message:'User has succesfully been created!'})
          this.$router.push({name:'home'})
        })
        .catch((error) => {
          for(const [key, err] of Object.entries(error.response.data)){
            this.$q.notify({type:'warning',message:err.toString()})
          }
        })
    },
  },
  computed: {
    passwordEquals() {
      return this.adminUser.password == this.adminUser.passwordVerification;
    }
  }

}
</script>
