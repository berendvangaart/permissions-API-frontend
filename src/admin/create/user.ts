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
        maxLength: 50
    }),
    getters: {
        getName: (state) => state.name
    },
    actions: {
        create() {
            let foundIssue = false;
            //Check name
            if (this.name.length < 1){
                this.nameCheck = "Check name input field"
                foundIssue = true
            }else {
                this.nameCheck = ""
            }

            //Check password
            if (this.password.length < 1){
                this.passCheck = "Check password input field"
                foundIssue = true
            }else {
                this.passCheck = ""
            }

            //Check email
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email) && this.email.length > 0){
                this.emailCheck = ""
            }else {
                this.emailCheck = "Check email input field"
                foundIssue = true
            }

            if(!foundIssue){
                //todo submit new user
            }else{
                //todo remove after testing

            }

        }
    }
})


