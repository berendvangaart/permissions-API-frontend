<script>
import { useAuthenticationStore } from '../stores/auth';
import { useQuasar } from 'quasar';

export default {
  setup() {
    const store = useAuthenticationStore()
    return {
      store
    }
  },

  data() {
    const $q = useQuasar();
    return {
      loader:false,
      email: '',
      password: '',
      triggerWarning (message) {
        $q.notify({
          type: 'warning',
          message: message
        })
      },
    }
  },
  name: 'LoginPage',
  computed :{
    isDisabled() {
      return this.email.length < 5 && this.password.length < 5;
    }
  },
  methods: {
    loginSubmit() {
      if(!this.isDisabled) {
        this.loader = true;
        this.store.loginUser(this.email, this.password)
        setTimeout(() => {
          this.store.isLogeddIn ? this.$router.push('/index') : this.triggerWarning('Something unexpected happened');
          console.error('user is not authenticated')
          this.loader = false;
        }, 2000);
      } else {
        this.triggerWarning('Please fill out the login form');
      }
    }
  }
}

</script>

<template>
  <div class="container">
    <q-form autofocus class="form-container" @keydown.enter.prevent="loginSubmit">
      <!-- Email input -->
      <q-input v-model="email" label="Email"/>

      <q-input v-model="password" type="password" label="Password"/>

      <!-- Submit button -->
      <div class="flex">
        <q-btn disable color="red" icon="question_mark" align="right" class="q-mt-md">Forgot password</q-btn>
        <q-space />
        <q-btn color="green" :loading="loader" @click="loginSubmit" :disabled=isDisabled icon="check" align="right" class="q-mt-md">Sign in</q-btn>
      </div>
    </q-form>
  </div>
</template>


<style scoped lang="scss">

.container {
  margin-top: 300px;
  display: flex;
  justify-content: center;
}

.form-container {
  width: 450px;
}

.login {
  border: 1px solid black;
  border-radius: 5px;
  padding: 1.5rem;
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  .container-loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.3);
    img {
      width: 2rem;
      height: 2rem;
    }
  }

  form {
    display: flex;
    flex-flow: column;
    *:not(:last-child) {
      margin-bottom: 1rem;
    }
    input {
      padding: .5rem;
    }
    button {
      padding: .5rem;
      background-color: lightgray;
      border: 1px solid gray;
      border-radius: 3px;
      cursor: pointer;
      &:hover {
        background-color: lightslategray;
      }
    }
  }
}
</style>
