<template>
  <div>
    <div class="flex justify-between">
      <h4 v-if="api">Api routes for <strong>{{ api.name }}</strong></h4>
      <div class="button-container-top-right">
        <q-btn v-if="toggleEdit" @click="toggleEditing()" icon="edit" color="blue"> edit</q-btn>
        <q-btn v-if="!toggleEdit" @click="updateApi()" icon="edit" color="green"> Save edit</q-btn>
        <q-btn @click="deleteApi()" icon="delete" color="red">Delete Api</q-btn>
        <q-btn @click="this.$router.push({name: 'apis'})" icon-left="arrow" color="grey">return</q-btn>
      </div>
    </div>

  </div>
  <div class="flex justify-evenly">
    <div class="col-3">
      <div v-if="!toggleEdit" class="col-3">
        <q-input v-model="api.base_path" label="Api Base Path"/>
        <q-input v-model="api.name" label="Api Name"/>
      </div>
      <div v-if="toggleEdit" class="col-3">
        <span><strong>Base url: {{ api.base_path }}</strong></span><br/>
        <span><strong>Name: {{ api.name }}</strong></span>
      </div>
    </div>
    <div class="col-9">
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
              <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand"
                     :icon="props.expand ? 'remove' : 'add'"></q-btn>
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
</template>
<script>
import axios from 'axios';
import {useQuasar} from 'quasar';

const columns = [
  {
    name: 'Name',
    required: true,
    label: 'Name',
    align: 'left',
    field: row => row.id,
    sortable: true
  },
  {name: 'Path', label: 'Path', align: 'left', field: row => row.path, sortable: true},
  {name: 'Route_type', align: 'center', label: 'HttpType', field: row => row.route_type, sortable: true},
  {name: 'Roles', label: 'Roles', field: row => row.roles},
]
export default {
  data() {
    return {
      toggleEdit: true,
      api: {},
      columns,
      // TODO hand selected Api object to include selected api beforehand
      apiId: this.$route.params.id,
    }
  },
  name: 'ApiRoute',
  methods: {
    getApiRoutes() {
      axios.get(`${process.env.API_URL}/apis/` + this.apiId + '/routes')
        .then((response) => {
          this.api = response.data
        })
        .catch((error) => {
          // TODO error handling
          this.api = error
        })
    },
    updateApi() {
      axios.put(`${process.env.API_URL}/apis/` + this.apiId, this.api)
        .then((response) => {
          this.api = response.data
          this.$q.notify({type:'positive',message:'Api has succesfully been updated'})
          this.toggleEditing()
        })
        .catch((error) => {
          this.$q.notify({type:'warning',message:error.toString()})
          this.toggleEditing()
        })
    },
    deleteApi() {
      axios.delete(`${process.env.API_URL}/apis/` + this.apiId)
        .then((response) => {
          this.api = response.data
          this.$q.notify({type:'positive',message:'Api has succesfully been removed'})
          this.$router.push({name: 'apis'})
        })
        .catch((error) => {
          this.$q.notify({type:'warning',message:error.toString()})
        })
    },
    toggleEditing() {
      this.toggleEdit = !this.toggleEdit
    },
  },
  mounted() {
    this.getApiRoutes();
  }
}
</script>
<style type="text/scss">
.button-container-top-right .q-btn {
  margin-right: 5px
}
</style>
