<template>
  <div class="container">

    <div class="row">
      <h1 v-if="api">Api routes for <strong>{{ api.name }}</strong></h1>
    </div>
    <div class="api row">
      <div class="col-3">
        <span><strong>Base url: {{ api.base_path }}</strong></span>
      </div>
      <div class="col-9">
<!--        <table variant="light" hover >-->
<!--          <thead>-->
<!--            <tr>-->
<!--              <th scope="col">Name</th>-->
<!--              <th scope="col">Path</th>-->
<!--              <th scope="col">Option</th>-->
<!--              <th scope="col">Roles</th>-->
<!--            </tr>-->
<!--          </thead>-->
<!--          <tbody v-for="route in api.routes" :key="route.id">-->
<!--            <tr>-->
<!--              <th scope="row">{{route.name}}</th>-->
<!--              <td>{{route.path}}</td>-->
<!--              <td>{{ route.route_type }}</td>-->
<!--              <td>-->
<!--&lt;!&ndash;                <MDBBtn class="roleButton" color="primary" rounded v-for="role in route.roles">&ndash;&gt;-->
<!--&lt;!&ndash;                  {{role.name}} <MDBIcon icon="times" />&ndash;&gt;-->
<!--&lt;!&ndash;                </MDBBtn>&ndash;&gt;-->
<!--              </td>-->
<!--            </tr>-->
<!--          </tbody>-->
<!--        </table>-->
<!--        <q-table-->
<!--          title="All routes"-->
<!--          :rows="api.routes"-->
<!--          :columns="columns"-->
<!--          row-key="name"-->
<!--        />-->


        <q-table
          title="All routes"
          :rows="api.routes"
          :columns="columns"
          row-key="name"
          flat
          :pagination="{page:1,rowsPerPage: 0}"
          hide-bottom
        >

          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width></q-th>
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'"></q-btn>
              </q-td>
              <q-td
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                <span v-if="col.name !== 'Roles'">{{ col.value }}</span>
                <div v-if="col.name === 'Roles'">
                  <q-chip v-for="role in col.value" :key="role.id" color="primary" text-color="white" icon="person">
                    {{ role.name }}
                  </q-chip>
                </div>
              </q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <q-td colspan="100%">
                <div class="text-left">This is expand slot for row above: {{ props.row.name }}.</div>
              </q-td>
            </q-tr>
          </template>

        </q-table>

      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
const columns = [
  {
    name: 'Name',
    required: true,
    label: 'Name',
    align: 'left',
    field: row => row.id,
    sortable: true
  },
  { name: 'Path', label: 'Path', align: 'left', field: row => row.path, sortable: true },
  { name: 'Route_type', align: 'center', label: 'HttpType', field: row => row.route_type, sortable: true },
  { name: 'Roles', label: 'Roles', field: row => row.roles },
]
export default {
  data() {
    return {
      api: {},
      columns,
      // TODO hand selected Api object to include selected api beforehand
      apiId: this.$route.params.id,
    }
  },
  name: 'ApiRoute',
  methods: {
    getApiRoutes() {
      axios.get('http://127.0.0.1:8000/api/apis/' + this.apiId + '/routes')
          .then((response) => {
            console.log(response.data)
            this.api = response.data
          })
          .catch((error) => {
            // TODO error handling
            this.api = error
          })
    },
    log (desert) {
      // console.log(`${desert} has been removed`)
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
