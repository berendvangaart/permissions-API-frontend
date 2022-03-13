import { defineStore } from "pinia";

export const useAuthenticationStore = defineStore({
  id: "auth",
  state: () => ({
    userData: "",
    token: "",
    loginSucces: false
  }),
  getters: {

  },
  actions: {
    async loginUser(login: string, password: string) {

      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: login, password: password })
      });

      const data = await res.json();

      if (res.status === 200) {
        console.log(data);
        this.token = data.token;
        this.loginSucces = true;
        this.userData = data.user;
      }
    }
  }
});

