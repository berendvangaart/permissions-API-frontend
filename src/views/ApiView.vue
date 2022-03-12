<template>
  <div>
    <MDBTable >
      <thead>
      <tr>
        <th>api name</th>
        <th>afd</th>
      </tr>
      </thead>
      <tbdody v-for="api in apiData">
        <tr>
          <td>{{api.name}} </td>
          <td>{{api.base_path}} </td>
        </tr>
      </tbdody>
    </MDBTable>
  </div>
</template>

<script setup lang="ts">
import {MDBTable} from "mdb-vue-ui-kit";

export default {
  data() {
    return {
      apiData: null
    }
  },
  async mounted() {
    const response = await fetch("http://127.0.0.1:8000/api/apis/")
    const data = await response.json();
    this.apiData = data;
  }
}
</script>


