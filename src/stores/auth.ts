import { defineStore } from 'pinia';
import * as Process from 'process';

export const useAuthenticationStore = defineStore({
  id: 'auth',
  state: () => ({
    userData: '',
    token: '',
    loginSucces: false
  }),
  getters: {
    getToken: state => state.token,
    isLogeddIn: state => state.loginSucces
  },
  actions: {
    async loginUser(login: string, password: string) {

        const res = await fetch(`${process.env.API_URL}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: login, password: password })
        });
        const data = await res.json();
        if (res.status === 200) {
          this.token = data.token;
          this.loginSucces = true;
          this.userData = data.user;
        }
    },

    logout() {
      this.token = ''
      this.loginSucces = false
      this.userData = ''
    }
  }
});

