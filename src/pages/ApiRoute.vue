<template>
  <div class="container">

    <div class="row">
      <h1 v-if="api">Api routes for <strong>{{ api.name }}</strong></h1>
    </div>
    <div class="api row">
      <div class="col-5">
        <span><strong>Base url: {{ api.base_path }}</strong></span>
      </div>
      <div class="col-7">
        <h2>All routes</h2>
        <table variant="light" hover >
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Path</th>
              <th scope="col">Option</th>
              <th scope="col">Roles</th>
            </tr>
          </thead>
          <tbody v-for="route in api.routes" :key="route.id">
            <tr>
              <th scope="row">{{route.name}}</th>
              <td>{{route.path}}</td>
              <td>{{ route.route_type }}</td>
              <td>
<!--                <MDBBtn class="roleButton" color="primary" rounded v-for="role in route.roles">-->
<!--                  {{role.name}} <MDBIcon icon="times" />-->
<!--                </MDBBtn>-->
              </td>
            </tr>
          </tbody>
        </table>
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
      // TODO hand selected Api object to include selected api beforehand
      apiId: this.$route.params.id,

    }
  },
  name: 'ApiRoute',
  methods: {
    getApiRoutes() {
      axios.get('http://127.0.0.1:8000/api/apis/' + this.apiId + '/routes')
          .then((response) => {
            this.api = response.data
          })
          .catch((error) => {
            // TODO error handling
            this.api = error
          })
    }
  },
  mounted() {
    this.getApiRoutes();
  }
}
</script>
<style scoped lang="scss">
.roleButton {
  display:flex;
}
.roleButton > i.fas {
  padding-left:5px;
  margin-top:3px;
}
</style>
