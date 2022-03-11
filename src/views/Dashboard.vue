<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'

</script>

<template >
  <div class="sideCon">
    <div class="sidebarContainer">
      <nav class="pageList">
        <RouterLink class="link" to="/home">Home</RouterLink>
        <RouterLink class="link" to="/about">About</RouterLink>
      </nav>
    </div>

    <RouterView />
  </div>
</template>

<style lang="scss">
@import '@/assets/global.scss';

.sideCon {
  @include flex-row;
}

.pageList {
  @include flex-col;
  padding: 20px;
}

.link {
  color: white;
  text-decoration: none;
}

.sidebarContainer {
  background: $base-color;
  height: 100vh;
  width: 300px;
}

</style>
