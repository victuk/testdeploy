<template>
    <div class="mt-8 text-center bg-white m-20 p-2">
        <div v-once>{{ showSingleData() }}</div>

        <div class="py-10 font-bold">{{bloghead}}</div>
        <div class="text-sm text-gray-500 justify-center">{{blogbody}}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bloghead: '',
            blogbody:'',
            baseUrl: 'https://intense-temple-44969.herokuapp.com'
        }
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