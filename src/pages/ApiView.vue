<template>
  <div class="d-flex justify-content-center">
    <table>
      <thead>
        <tr>
          <th scope="col" class="font-weight-bold">api name</th>
          <th scope="col" class="font-weight-bold">base path</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="api in apiData" :key="api.id">
          <th scope="row"><a v-bind:href="'/api/'+ api.id +'/routes'">{{api.name}}</a></th>
          <td>{{api.base_path}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apiData: null
    }
  },
  async mounted() {
    await fetch("http://127.0.0.1:8000/api/apis/")
        .then(response => response.json())
        .then(data => (this.apiData = data));
  }
}
</script>


