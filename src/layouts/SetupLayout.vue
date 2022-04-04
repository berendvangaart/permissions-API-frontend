<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Permissions Api
        </q-toolbar-title>

      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthenticationStore } from '../stores/auth';

export default defineComponent({
  name: 'SetupLayout',
  setup () {
    const store = useAuthenticationStore()
    return {
      user: store.userData,
    }
  },
  methods: {

  }
});
</script>
