<template>
    <div id="navbar">
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                        aria-expanded="false">
                          <span class="sr-only">Toggle navigation</span>
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                        </button>
                    <a class="navbar-brand" href="#">Tyler Rhinehart- Vue Music Checkpoint</a>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <form v-show="!loggedIn" class="navbar-form navbar-right" @submit.prevent="login">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="email" v-model="email" required>
                            <input type="password" class="form-control" placeholder="password" v-model="password" required>
                        </div>
                        <button type="submit" class="btn btn-default">Login</button>
                        <button type="button" class="btn btn-default" @click="openDialog('dialog1')">Signup</button>
                    </form>
                    <div v-show="loggedIn" class="nav navbar navbar-right">
                        <h4 style="display: inline-block">Hello, {{user.name}}</h4>
                        <button type="button" class="btn btn-default" @click="logout">Logout</button>
                    </div>
                </div>
                <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog1">
                    <md-dialog-title>Create New Account</md-dialog-title>

                    <md-dialog-content>
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
                    </md-dialog-content>

                    <md-dialog-actions>
                        <md-button class="md-primary" @click="cancelDialog('dialog1')">Cancel</md-button>
                        <md-button class="md-primary" @click="closeDialog('dialog1')">Signup</md-button>
                    </md-dialog-actions>
                </md-dialog>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'navbar',
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
            },
            openDialog(ref) {
                this.$refs[ref].open();
            },
            cancelDialog(ref) {
                this.$refs[ref].close();
            },
            closeDialog(ref) {
                if (this.password == this.confirmPassword) {
                    this.$refs[ref].close();
                    this.signup()
                }
                else {
                    console.log('it broke')
                }
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            }
        }
    }

</script>