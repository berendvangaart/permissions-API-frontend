<script setup>
import { MDBBtn, MDBTable} from "mdb-vue-ui-kit";
</script>
<template>
  <div class="container">


    <div class="row">
      <h1 v-if="api">Api view for {{ api.name }}</h1>
    </div>
    <div class="api row">
      <div class="col-6">
        <span><strong>Base url: {{ api.base_path }}</strong></span>
      </div>
      <div class="col-6">
        <h2>All routes</h2>
        <MDBTable variant="light" hover >
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Path</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody v-for="route in api.routes" >
            <tr>
              <th scope="row">{{route.name}}</th>
              <td>{{route.path}}</td>
              <td>DELETE</td>
            </tr>
          </tbody>
        </MDBTable>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      api: {},
      // TODO rewrite to include selected api beforehand
      apiId: 1,
    }
  },
  name: "ApiRoute",
  methods: {
    getApiRoutes() {
      axios.get("http://127.0.0.1:8000/api/apis/" + this.apiId + "/routes")
          .then((response) => {
            this.api = response.data
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error)
          })
    }
  },
  mounted() {
    this.getApiRoutes();
  }
}
</script>
<style scoped lang="scss">

</style>