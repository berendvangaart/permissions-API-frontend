import {defineStore} from 'pinia'

export const createNewApi = defineStore({
  id: 'createApi',
  state: () => ({
    name: '',
    nameCheck: '',
    basePath: '',
    basePathCheck: '',
    maxLength: 50,
    errorMessage: '',
    succesMessage: ''
  }),
  getters: {
    getName: (state) => state.name
  },
  actions: {
    async create() {
      let foundIssue = false;
      //Check name
      if (this.name.length < 2) {
        this.nameCheck = 'Check name input field'
        foundIssue = true
      } else {
        this.nameCheck = ''
      }

      //If all items passed checks make api call
      if (!foundIssue) {
        const response = await makeCall(this.name, this.path);

        //Check if the response is correct
        if (response == this.name) {
          //Clear all fields for next user
          this.name = '';
          this.path = '';
          this.succesMessage = 'New api is created'
        } else {
          //IF new user could not be created give warning
          this.errorMessage = 'Api could not be created'
        }
      } else {
        this.succesMessage = ''
      }
    }
  }
})

async function makeCall(name: string, path: string) {
  //Make api call
  const response = await fetch('http://127.0.0.1:8000/api/apis?name=' + name + '&path=' + path, {method: 'POST'});
  //Check if there is no error
  if (response.ok) {
    //Return username to check the response
    const data = await response.json();
    return data['name'];
  }
  //If there is an error return with an impossible name
  return 'F'
}

