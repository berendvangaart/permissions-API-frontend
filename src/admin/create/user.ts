import {defineStore} from 'pinia'

export const createNewUser = defineStore({
    id: 'createUser',
    state: () => ({
        name: '',
        nameCheck: '',
        password: '',
        passCheck: '',
        email: '',
        emailCheck: '',
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
                this.nameCheck = "Check name input field"
                foundIssue = true
            } else {
                this.nameCheck = ""
            }

            //Check password
            if (this.password.length < 5) {
                this.passCheck = "Password must be at least 6 characters long"
                foundIssue = true
            } else {
                this.passCheck = ""
            }

            //Check email
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email) && this.email.length > 0) {
                this.emailCheck = ""
            } else {
                this.emailCheck = "Check email input field"
                foundIssue = true
            }

            //If all items passed checks make api call
            if (!foundIssue) {
                let response = await makeCall(this.name, this.password, this.email);

                //Check if the response is correct
                if (response == this.name) {
                    //Clear all fields for next user
                    this.name = '';
                    this.password = '';
                    this.email = '';
                    this.succesMessage = 'New user is created'
                } else {
                    //IF new user could not be created give warning
                    this.errorMessage = "User could not be created"
                }
            } else {
                this.succesMessage = ''
            }
        }
    }
})


async function makeCall(name: string, pass: string, email: string) {
    //Make api call
    const response = await fetch('http://127.0.0.1:8000/api/users?name=' + name + '& email=' + email + '&password=' + pass, {method: 'POST'});
    //Check if there is no error
    if(response.ok) {
        //Return username to check the response
        const data = await response.json();
        return data["name"];
    }
    //If there is an error return with an impossible name
    return "F"
}

