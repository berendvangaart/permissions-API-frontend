<script setup lang="ts">
import {useCounterStore} from "@/stores/counter";
import {storeToRefs} from "pinia";

const counterStore = useCounterStore();
const {counter, name} = storeToRefs(counterStore)
</script>

<template>
  <main>
    <h4>{{counter}}</h4>
    <h4>{{name}}</h4>

    <button @click="counterStore.increment()">click</button>

  </main>
</template>
