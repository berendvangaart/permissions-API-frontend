<template>
  <div class="container">

    <div class="flex justify-between">
      <h4 v-if="role">All users that have role:  <strong>{{ role.name }}</strong></h4>
      <div class="button-container-top-right">
          <q-btn v-if="toggleEdit" @click="toggleEditing()" icon="edit" color="blue"> edit </q-btn>
          <q-btn v-if="!toggleEdit" @click="updateRole()" icon="edit" color="green"> Save edit </q-btn>
      </div>
    </div>
    <div class="role row">
      <div v-if="toggleEdit" class="col-3">
        <span><strong>Name: {{ role.name }}</strong></span>
      </div>
      <div  v-if="!toggleEdit" class="col-3">
        <q-input v-model="role.name" label="Role name" />
      </div>
      <div class="col-9">
        <q-table
          title="All Users"
          :rows="role.users"
          :columns="columns"
          row-key="name"
          flat
          :pagination="{page:1,rowsPerPage: 0}"
          hide-bottom
        >

          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.label }}
              </q-th>
              <q-th auto-width></q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                <span>{{ col.value }}</span>
              </q-td>
              <q-td auto-width>
                <q-btn color="red"  dense @click="deleteUserFromRole(props.row.id)">Remove</q-btn>
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
import { useQuasar } from 'quasar'

const columns = [
  {
    name: 'Name',
    required: true,
    label: 'Name',
    align: 'left',
    field: row => row.name,
    sortable: true
  },
  { name: 'Email', label: 'Email', align: 'left', field: row => row.email, sortable: true },
]
export default {
  data() {
    return {
      toggleEdit: true,
      role: {},
      columns,
      roleId: this.$route.params.id,
    }
  },
  name: 'roleView',
  methods: {
    getRoleRoutes() {
      axios.get(`${process.env.API_URL}/roles/` + this.roleId + '/showWithUsers')
        .then((response) => {
          this.role = response.data
        })
        .catch((error) => {
          this.role = error
        })
    },
    updateRole() {
      axios.put(`${process.env.API_URL}/roles/` + this.roleId, this.role)
        .then((response) => {
          this.role = response.data
          this.$q.notify({type:'positive',message:'Role has succesfully been updated'})
          this.toggleEditing()
        })
        .catch((error) => {
          this.$q.notify({type:'warning',message:error.toString()})
          this.toggleEditing()
        })
    },
    deleteUserFromRole(id) {
      axios.delete(`${process.env.API_URL}/users/`+ id +'/removerole/' + this.roleId)
        .then((response) => {
          this.role = response.data
          this.$q.notify({type:'positive',message:'User has succesfully been removed'})
        })
        .catch((error) => {
          this.triggerWarning(error.toString())
        })
    },
    toggleEditing() {
      this.toggleEdit = !this.toggleEdit
    }
  },
  mounted() {
    this.getRoleRoutes();
  }
}
</script>
<style type="text/scss">

</style>
