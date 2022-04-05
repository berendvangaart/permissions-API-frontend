<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Permissions Api
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="250"
      :breakpoint="450"
    >
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item clickable v-ripple :to="{name:'home'}">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>

            <q-item-section>
              Home
            </q-item-section>
          </q-item>

          <q-item active clickable v-ripple :to="{name:'apis'}">
            <q-item-section avatar>
              <q-icon name="api" />
            </q-item-section>

            <q-item-section>
              Api's
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{name:'roles'}">
            <q-item-section avatar>
              <q-icon name="manage_accounts" />
            </q-item-section>

            <q-item-section>
              Roles
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple :to="{name:'users'}">
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>

            <q-item-section>
              Users
            </q-item-section>
          </q-item>



          <q-item clickable v-ripple @click="logoutUser()">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section>
              Logout
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <div v-if="user" class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <div class="text-weight-bold">{{ user.name }}</div>
          <div>{{ user.email }}</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthenticationStore } from '../stores/auth';

export default defineComponent({
  name: 'MainLayout',
  setup () {
    const store = useAuthenticationStore()
    const drawer = ref(false)

    return {
      store,
      user: store.userData,
      drawer,
      toggleLeftDrawer () {
        drawer.value = !drawer.value
      }
    }
  },
  methods: {
    logoutUser(){
      this.store.logout();
      this.$router.push({name:'login'});
    }
  }
});
</script>
