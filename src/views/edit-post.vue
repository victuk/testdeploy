<template>
<Navbar></Navbar>
    <div class="mt-10 text-center bg-white m-4 md:m-20 p-4 shadow">
        <div v-once>{{ showSingleData() }}</div>

        <input type="text" v-model="bloghead" class="w-full my-4 p-2 md:w-1/2 border shadow"><br>
        <textarea v-model="blogbody" class="w-full md:w-1/2 p-2 border shadow"></textarea><br>
        <div @click="updateData()" class="border border-blue-800 text-blue-800 hover:bg-blue-800 inline-block hover:text-white p-2">Update</div>
    </div>
</template>

<script>

import Navbar from '../components/navbar.vue'

export default {
    data() {
        return {
            bloghead: 'Loading...',
            blogbody:'Loading...',
            baseUrl: 'https://intense-temple-44969.herokuapp.com'
        }
    },
    components: {
        Navbar
    },
    methods: {
        showSingleData() {
            // return console.log(this.$route.params.id);
            fetch(`${this.baseUrl}/single-blog/${this.$route.params.id}`, {
                method: "GET",
                headers: {
                    token: localStorage.getItem('token')
                }
            }).then((res) => res.json())
            .then((x) => {
                this.bloghead = x.blog.blogHead;
                this.blogbody = x.blog.blogBody;
                console.log(x.blog.blogHead)
            })
        },
        updateData() {
        fetch(`${this.baseUrl}/edit-blog/${this.$route.params.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('token')
                },
                body: JSON.stringify({
                    bloghead: this.bloghead,
                    blogbody: this.blogbody
                })
            }).then((res) => res.json())
            .then((x) => {
                if(x.message == 'ok') {
                    this.$router.replace('/')
                }
                console.log(x)
            }).catch(err => {console.log(err)})
    }
    },
    
}
</script>