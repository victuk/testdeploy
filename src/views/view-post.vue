<template>
<Navbar></Navbar>
    <div class="mt-40 shadow border md:mt-10 text-center bg-white m-4 md:m-20 p-2">
        <div v-once>{{ showSingleData() }}</div>

        <div class="py-10 font-bold">{{bloghead}}</div>
        <div class="text-sm text-gray-500 justify-center">{{blogbody}}</div>
    </div>
</template>

<script>

import Navbar from '../components/navbar.vue'

export default {
    data() {
        return {
            bloghead: '',
            blogbody:'',
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
        }
    },
}
</script>