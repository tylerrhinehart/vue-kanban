<template>
    <div>
        <form>
            <md-input-container>
                <label>Name</label>
                <md-input v-model="name"></md-input>
            </md-input-container>
            <md-input-container>
                <label>email</label>
                <md-input v-model="email"></md-input>
            </md-input-container>
            <md-input-container>
                <label>Password</label>
                <md-input type="password" v-model="password"></md-input>
            </md-input-container>
            <md-input-container>
                <label>Confirm Password</label>
                <md-input type="password" v-model="confirmPassword"></md-input>
            </md-input-container>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                loggedIn: false
            }
        },
        methods: {
            signup() {
                var user = {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }
                this.$store.dispatch('signup', user)
                this.loggedIn = true
                this.name = ''
                this.email = ''
                this.password = ''
            },
            login() {
                var user = {
                    email: this.email,
                    password: this.password
                }
                this.$store.dispatch('login', user)
                this.loggedIn = true
                this.email = ''
                this.password = ''
            },
            logout() {
                this.$store.dispatch('logout')
                this.loggedIn = false
            }
        }
    }

</script>