<template>
    <div>
        <Navbar></Navbar>
    <div class=" mt-20 shadow m-2 p-2 md:p-20 md:m-20 bg-white text-center">
        <div v-once>{{ showProfile() }}</div>
        <div class="py-2 font-bold text-lg">{{profileFullName}}</div>
        <div class="py-2 font-bold text-xs">{{userProfile.email}}</div>
        <div v-if="!editStatus">
                            <div class="font-bold">Status: <br> <div class="font-thin">{{ userProfile.status }}</div></div><br>
                            <button class="bg-blue-800 p-2 shadow text-white rounded" @click="editStatus2()">Edit Status</button>
                        </div>
                        <div v-if="editStatus">
                            <textarea class="text-black p-1 border shadow resize-none" v-model="userProfile.status"></textarea>
                            <br>
                            <button class="my-4 bg-blue-800 p-2 shadow rounded text-white" @click="updateStatus2()">Update Status</button>
                        </div>

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
            editStatus: false,
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

        },
        editStatus2() {
            this.editStatus = true;
        },
        updateStatus2() {

            fetch(`${this.baseUrl}/users/edit-status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('token')
                },
                body: JSON.stringify({
                    updateStatus: this.userProfile.status
                })  
            }).then(res => res.json())
                .then(x => {
                    this.editStatus = false;
                }).catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>