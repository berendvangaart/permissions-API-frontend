import {defineStore} from "pinia";

export const useAuthenticationStore = defineStore({
  id: 'auth',
  state: () => ({
  userData: '',
  loginSucces: false
}),
  getters: {

},
  actions: {
    async loginUser(login: string, password: string) {
      console.log(login, password);
      this.userData = 'test'
      try {

        //const res = await fetch()
        //todo set userdata from res

      } catch (error) {
        console.log(error);
      }
    },


  }
})