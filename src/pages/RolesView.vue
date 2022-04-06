<template>
  <div class="flex justify-between" v-if="rolesData">
    <h4 >All roles </h4>
    <div class="button-container-top-right">
      <q-btn icon="add" color="blue"> Create new </q-btn>
    </div>
  </div>
  <div class="d-flex justify-content-center">
    <q-table
      v-if="rolesData"
      :rows="rolesData"
    :columns="columns"
      flat
      :pagination="{page:1,rowsPerPage: 0}"
      hide-bottom
      class="flex justify-between"
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
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">

          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            <q-btn color="blue"  icon-right="arrow_forward" v-if="col.name === 'Name'" @click="redirect(props.row)">  {{col.value}}</q-btn>
            <span v-if="col.name !== 'Name'">{{ col.value }}</span>
            <!--            <div v-if="col.name === 'Roles'">-->
            <!--              <q-chip v-for="role in col.value" :key="role.id" color="primary" text-color="white" icon="person">-->
            <!--                {{ role.name }}-->
            <!--              </q-chip>-->
            <!--            </div>-->
          </q-td>
        </q-tr>
      </template>

    </q-table>
  </div>
</template>

<script>

const columns = [
  {
    name: 'Name',
    required: false,
    label: 'Name',
    align: 'left',
    field: row => row.name,
    sortable: true
  },

  // { name: 'Base path', label: 'Path', align: 'left', field: row => row.base_path, sortable: true },
  // { name: 'Routes', align: 'center', label: 'Routes', field: row => console.log(row), sortable: true },
  // { name: 'Roles', label: 'Roles', field: row => row.roles },
]
export default {
  name: 'rolesView',
  data() {
    return {
      columns,
      rolesData: null
    }
  },
  methods: {
    redirect(row){
      this.$router.push({name:'role', params: {id: row.id}})
    }
  },
  async mounted() {
    await fetch(`${process.env.API_URL}/roles`)
      .then(response => response.json())
      .then(data => (this.rolesData = data));
  },
}
</script>
