<template>
<Navbar></Navbar>
    <div class="overflow-auto">
        <div v-if="loginform" class="w-full">
            <div class="flex w-full overflow-auto">
            <div class="m-20 mt-100 border ml-auto mr-auto p-10 bg-white rounded h-auto w-80">
                <div class="text-center my-2">Login Form</div>
                <div class="text-sm">Email</div>
                <input type="text" class=" rounded w-full border shadow mb-4" v-model="emailLogin">
                <div class="text-sm">Pasword</div>
                <input type="password" class=" rounded w-full border shadow mb-4" v-model="passLogin">
                <div v-if="showerror">
                <div class="bg-red-200 text-red-800 rounded my-2 text-xs p-1"> {{ errmsg }} </div>
                </div>
                <div v-if="loginSuccess">
                <div class="bg-green-200 text-green-800 rounded my-2 text-xs p-1"> Login Successful </div>
                </div>
                <input type="button" class="p-2 shadow bg-blue-800 text-white rounded" value="Login" @click="login">
                <div class="text-center my-4"><input @click="toggleLogin" type="button" value="Create a new account" class="text-sm bg-white hover:text-blue-800 py-30"></div>
            </div>
            </div>
        </div>
        <div v-if="!loginform" class="w-full overflow-auto">
            <div class="flex p-10 md:p-20 h-full overflow-auto">
            <div class="m-20 mt-100 border ml-auto mr-auto p-10 bg-white rounded h-full mb-40 w-full overflow-auto">
                <div class="text-center my-2">Registration Form</div>
                <div class="text-sm">Surname</div>
                <input type="text" class="border rounded w-full shadow mb-4" v-model="regsname">

                <div class="text-sm">First Name</div>
                <input type="text" class="border rounded w-full shadow mb-4" v-model="regfname">
                
                <div class="text-sm">Other Name</div>
                <input type="text" class="border rounded w-full shadow mb-4" v-model="regoname">

                <div class="text-sm">Email</div>
                <input type="text" class="border rounded w-full shadow mb-4" v-model="regemail">

                <div class="text-sm">Pasword</div>
                <input type="password" class=" rounded w-full border shadow mb-4" v-model="regpass">

                <div v-if="showregerror">
                <div class="bg-red-200 text-red-800 rounded my-2 text-xs p-1"> {{ regerrmsg }} </div>
                </div>
                <div v-if="regsuccess">
                <div class="bg-blue-200 text-blue-800 rounded my-2 text-center text-xs p-1"> Registration is Successful, you'll be redirected to login in 2seconds. </div>
                </div>
                <input type="button" class="p-2 shadow bg-blue-800 text-white rounded" value="Register" @click="register">
                <div class="text-center my-4 text-sm">Already have an account? <input @click="toggleLogin" type="button" value="Login" class="text-sm bg-white hover:text-blue-800 py-30"></div>
            </div>
            </div>
        </div>
        

    </div>
</template>

<script>

import Navbar from '../components/navbar.vue'

export default {
    data() {
        return{
            emailLogin: '',
            passLogin: '',
            regsname: '',
            regfname: '',
            regoname: '',
            regemail: '',
            regpass: '',
            errmsg: '',
            showregerror: false,
            regerrmsg: '',
            showerror: false,
            regsuccess: false,
            loginSuccess: false,
            loginform: true,
            baseUrl: 'https://intense-temple-44969.herokuapp.com'
        }
    },
    components: {
        Navbar
    },
    methods: {
        login() {
            fetch(`${this.baseUrl}/login`, {
                headers:{
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    email: this.emailLogin,
                    password: this.passLogin
                })
            })
            .then(res => res.json())
            .then(x => {
                if(x.message == 'ok') {
                    console.log(x)
                    this.loginSuccess = true
                    localStorage.setItem('token', x.token);
                    setTimeout(() => {
                        this.$router.push('/')
                    }, 1000);
                } else {
                    this.showerror = true;
                    this.errmsg = x.message;
                    console.log(x.message)
                    setTimeout(() => {
                        this.showerror = false;
                        this.errmsg = '';
                    }, 5000);
                }
                    
                })
            .catch(err => console.log(err))
        },
        register() {
            
            
            fetch(`${this.baseUrl}/register`, {
                headers:{
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    name: `${this.regsname}, ${this.regfname}, ${this.regoname}`,
                    email: this.regemail,
                    password: this.regpass
                }),
                
            }).then(res => res.json())
            .then(x => {
                    if(x.message == 'ok') {
                        this.regsuccess = true;
                        setTimeout(() => {
                            this.regsuccess = false;
                            // this.$router.replace('/login')
                            location.reload();
                        }, 2000);
                    } else {
                        this.showregerror = true;
                        this.regerrmsg = x.message;
                    setTimeout(() => {
                        this.showregerror = false;
                        this.regerrmsg = '';
                    }, 5000);
                    }
                    
                }).catch(err => {
                    console.log(err);
                });
        },
        toggleLogin() {
            this.loginform = !this.loginform
        }

    },
};
</script>

<style scoped>
    /* * {
	border: 1px solid black;
} */
</style>