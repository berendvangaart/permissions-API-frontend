<template>
  <div class="container">

    <h4 style="margin: 10px"> Create a new api </h4>
    <div style="margin: 10px">
      <form>
        <input v-model="api.name" label="Api name" placeholder="Api Name"/>
        <input v-model="api.base_path" label="Api path" placeholder="Api Path"/>
      </form>
      <div class="button-container-bottom-right" style="margin-top: 10px">
      <q-btn @click="addApi()" icon="edit" color="green">Save api</q-btn>
      <q-btn @click="returnToApiView()" icon-left="arrow" color="blue">return</q-btn>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import {useQuasar} from 'quasar';
import {useAuthenticationStore} from "../stores/auth";

export default {
  data() {
    const store = useAuthenticationStore()
    const $q = useQuasar()

    return {
      user: store.userData,
      api: {},
      triggerSuccess(message) {
        $q.notify({
          type: 'info',
          message: message
        })
      },
      triggerWarning(message) {
        $q.notify({
          type: 'warning',
          message: message
        })
      },
    }
  },
  name: 'CreateApi',
  methods: {
    addApi() {
      this.api.user_id = this.user.id;
      axios.post('http://127.0.0.1:8000/api/apis', this.api)
        .then((response) => {
          this.api = response.data
          this.triggerSuccess('Api has succesfully been added')
          this.returnToApiView()
        })
        .catch((error) => {
          this.triggerWarning(error.toString())
        })
    },
    returnToApiView() {
      this.$router.push({name: 'apis'})
    }
  }

}

</script>

<style scoped lang="scss">
.roleButton {
  display: flex;
}

.roleButton > i.fas {
  padding-left: 5px;
  margin-top: 3px;
}
</style>
