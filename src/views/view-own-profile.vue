<template>
    <div>
        <Navbar></Navbar>
    <div class=" mt-20 shadow m-2 p-2 md:p-20 md:m-20 bg-white text-center">
        <div v-once>{{ showProfile() }}</div>
        <div class="py-2 font-bold text-lg">{{profileFullName}}</div>
        <div class="py-2 font-bold text-xs">{{userProfile.email}}</div>
        <div class="text-sm text-gray-500 justify-center text-xl">{{userProfile.status}}</div>

    </div>
        
    </div>
</template>

<script>

import Navbar from '../components/navbar.vue'

export default {
    data() {
        return {
            userProfile: '',
            profileFullName: '',
            baseUrl: 'https://intense-temple-44969.herokuapp.com'
        }
    },
    components: {
        Navbar
    },
    methods: {
        showProfile(){
            this.sidebar = 'profile';
            fetch(`${this.baseUrl}/users/profile`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(res => res.json())
            .then(x => {
                this.userProfile = x.user;
                const fullName = x.user.name.split(', ');
                this.profileFullName = `${fullName[0]}, ${fullName[1]} ${fullName[2]}`;
                console.log(`${fullName[0]}, ${fullName[1]} ${fullName[2]}`);
            })
            .catch(err => console.log(err));

        }
    }
}
</script>