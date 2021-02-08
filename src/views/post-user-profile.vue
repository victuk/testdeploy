<template>
    <div>
        
    <div class="p-20 m-20 bg-white text-center">
        <div v-once>{{ showSingleData() }}</div>
        <div class="py-2 font-bold text-lg">{{usersName}}</div>
        <div class="py-2 font-bold text-xs">{{usersEmail}}</div>
        <div class="text-sm text-gray-500 justify-center text-xl">{{usersStatus}}</div>

    </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            statustoggle: false,
            usersName: '',
            usersEmail: '',
            usersStatus: '',
            baseUrl: 'https://intense-temple-44969.herokuapp.com'
        }
    },
    methods: {
        showSingleData() {
            // return console.log(this.$route.params.id);
            fetch(`${this.baseUrl}/view-blogger-profile/${this.$route.params.id}`, {
                method: "GET",
                headers: {
                    token: localStorage.getItem('token')
                }
            }).then((res) => res.json())
            .then((x) => {
                this.usersName = x.user.name;
                this.usersEmail = x.user.email;
                this.usersStatus = x.user.status;
            }).catch(err => {
                console.log(err)
            })
        },
        updStatus() {
            fetch(`${this.baseUrl}/users/edit-status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('token')
                },
                body: JSON.stringify({
                    updateStatus: this.usersStatus
                })  
            }).then(res => res.json()).then(x => {
                this.usersStatus = x.blogs.status;
                this.statustoggle = false;
                console.log(x);
            }).catch(err =>{
                console.log(err)
            })
        }
    }
}
</script>