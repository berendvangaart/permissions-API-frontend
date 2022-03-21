<script setup lang="ts">
import {createNewApi} from '../components/api';
import {storeToRefs} from 'pinia';

const counterStore = createNewApi();
const {name, nameCheck, basePath, basePathCheck, maxLength, errorMessage, succesMessage} = storeToRefs(counterStore)
</script>

<template>
  <main>
    <h2>Create new api</h2>

    <form>
      <div class="input-group mb-3">
        <h4>Api name:</h4>
        <input
          type="text"
          class="form-control"
          aria-label="Api name"
          aria-describedby="basic-addon1"
          v-model.trim="name"
          :maxlength="maxLength"
        />
      </div>
      <h8>{{ nameCheck }}</h8>

      <div class="input-group mb-3">
        <h4>Url:</h4>
        <input
          type="text"
          class="form-control"
          aria-label="Path"
          aria-describedby="basic-addon1"
          v-model.trim="basePath"
        />
      </div>
      <h8>{{ basePathCheck }}</h8>

    </form>
    <button @click="counterStore.create()">Create Api</button>
    <h4>{{ errorMessage }}</h4>
    <h4>{{ succesMessage }}</h4>
  </main>
</template>
