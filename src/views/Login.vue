<script>
import { useAuthenticationStore } from "@/stores/auth";

export default {
  setup() {
    const store = useAuthenticationStore()
    return {
      store
    }
  },

  data() {
    return {
      email: '',
      password: ''
    }
  },
  name: "Login",

  methods: {
    loginSubmit() {
      this.store.loginUser(this.email, this.password)

      setTimeout(() => {
        this.store.isLogeddIn? this.$router.push( '/dashboard') : console.error('user is not authenticated')
      }, 500);
    }
  }
}

</script>

<template>
  <div class="container">
  <form class="form-container" @submit.prevent="loginSubmit">
    <!-- Email input -->
    <div class="form-outline mb-4">
      <input type="email" id="form1Example1" class="form-control" v-model="email"/>
      <label class="form-label" for="form1Example1">Email address</label>
    </div>

    <!-- Password input -->
    <div class="form-outline mb-4">
      <input type="password" id="form1Example2" class="form-control" v-model="password"/>
      <label class="form-label" for="form1Example2">Password</label>
    </div>

    <!-- 2 column grid layout for inline styling -->
    <div class="row mb-4">
      <div class="col d-flex justify-content-center">
        <!-- Checkbox -->
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="form1Example3" checked />
          <label class="form-check-label" for="form1Example3"> Remember me </label>
        </div>
      </div>

      <div class="col">
        <!-- Simple link -->
        <a href="#!">Forgot password?</a>
      </div>
    </div>

    <!-- Submit button -->
    <button type="submit" class="btn btn-primary btn-block">Sign in</button>
  </form>
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