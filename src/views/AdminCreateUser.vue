<script setup lang="ts">
import {createNewUser} from "@/admin/create/user";
import {storeToRefs} from "pinia";

const counterStore = createNewUser();
const {name, nameCheck, password, passCheck, email, emailCheck, maxLength} = storeToRefs(counterStore)
</script>

<template>
  <main>
    <h2>Create new user</h2>

    <form>
      <div class="input-group mb-3" >
        <h4>User name:</h4>
        <input
            type="text"
            class="form-control"
            aria-label="Username"
            aria-describedby="basic-addon1"
            v-model.trim="name"
            :maxlength="maxLength"
        />
      </div>
      <h4>{{nameCheck}}</h4>
      <div class="input-group mb-3">
        <h4>Password:</h4>
        <input
            type="text"
            class="form-control"
            aria-label="Password"
            aria-describedby="basic-addon1"
            v-model="password"
            :maxlength="maxLength"

        />
      </div>
      <h4>{{passCheck}}</h4>
      <div class="input-group mb-3">
        <h4>Email:</h4>
        <input
            type="email"
            class="form-control"
            aria-label="Email"
            aria-describedby="basic-addon1"
            v-model.trim="email"
        />
      </div>
      <h4>{{emailCheck}}</h4>

    </form>

    <button @click="counterStore.create()">Create User</button>




  </main>
</template>
