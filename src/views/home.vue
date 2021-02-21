<template>
<Navbar></Navbar>
    <div v-once>{{ fetchPosts() }}</div>
    <div class="mt-8 flex fixed overflow-hidden w-full overflow-hidden bg-gray-200" style="height:32.5em!important">
        <div class=" md:w-64 md:block text-center h-auto bg-gray-800 text-white hidden">
            <div v-show="sidebar == 'links'" class="h-full flex flex-col mx-12 justify-center gap-y-4">
                <button @click="showProfile()" class="text-left font-bold">Profile</button>
            <!-- <button @click="showUsers()" class="text-left font-bold">Users</button> -->
            <button @click="logOut()" class="text-left font-bold">Log Out</button>
            </div>
            <div v-show="sidebar == 'profile'" class=" flex flex-col">
                <div class=" text-right">
                    <button @click="resetSidebar()" class="p-1 rounded-full m-4">X</button>
                </div>
                
                <div class="justify-center text-left px-4 overflow-auto flex flex-col :mdgap-y-8 w-full" style="height:27em!important">
                    
                    <div class="font-bold">Name: <br> <div class="font-thin">{{profileFullName}}</div></div>
                    <div class="font-bold">Email: <br> <div class="font-thin">{{ userProfile.email }}</div></div>
                        <div v-if="!editStatus">
                            <div class="font-bold">Status: <br> <div class="font-thin">{{ userProfile.status }}</div></div><br>
                            <button class="bg-blue-800 p-2 shadow text-white rounded" @click="editStatus2()">Edit Status</button>
                        </div>
                        <div v-if="editStatus">
                            <textarea class="text-black p-1 border shadow resize-none" v-model="userProfile.status"></textarea>
                            <button class="my-4 bg-blue-800 p-2 shadow rounded text-white" @click="updateStatus2()">Update Status</button>
                        </div>
                    </div>
            </div>
            <div v-show="sidebar == 'users'" class=" flex flex-col">
                  <div class=" text-right">
                    <button @click="resetSidebar()" class="p-1 rounded-full m-4">X</button>
                </div>
                
                <div class="justify-center overflow-auto flex flex-col w-full" style="height:27em!important">
                    
                    <div class="">Profile</div>
                    <div class="">Profile</div>
                    <div class="">Profile</div>
                    <div class="">Profile</div>
                   
                    </div>
            </div>
            
        </div>
        <div class="flex-auto overflow-auto">
            <div class="mx-4 md:mx-20 p-2 md:p-5 my-5 bg-white rounded shadow">
                <div class="text-lg text-left sticky p-1">Post an article</div>
                <div class="text-xs mt-2">Post Title</div>
                <input type="text" class="w-full my-1 border shadow" v-model="postTitle">
                <div class="text-xs mt-2">Post Body</div>
                <textarea class="border shadow w-full rounded resize-none"  v-model="postBody"></textarea>
                <button class="bg-blue-800 text-white rounded shadow p-1 m-1 px-4" @click="postArticle()">Post</button>
                <div v-if="postSuccess" class="text-xs bg-green-200 text-green-800">Post successful</div>
            </div>
           <div v-once> {{ checkLogin() }}</div> 
            <div v-for="item in posts.slice().reverse()" :key="item.blogdetails._id">
                
                <div  class="text-left mb-2 mx-4 md:mx-20 hover:bg-blue-200 p-2 md:p-5 cursor-pointer rounded shadow bg-white">
                    <div class="text-sm">
                        <div class="text-blue-800" @click="showPostUserProfile(item.blogdetails.userID)">{{ item.ownerName }}</div>
                        <div class="text-xs">{{ item.ownerEmail }}</div>
                    <div class="text-sm font-bold mb-1" @click="showSinglePost(item.blogdetails._id)">{{ item.blogdetails.blogHead }}</div>
                <div class="text-xs" @click="showSinglePost(item.blogdetails._id)">{{ item.nbbody }}</div> </div>
                <div @click="showSinglePost(item.blogdetails._id)" class=" hover:bg-blue-800 hover:text-white shadow inline-block rounded p-1 px-2 mt-2 text-blue-800">View</div>
                
                <div v-if="item.blogdetails.userID == userID2" class="inline-block mx-2">
                    <div @click="editSinglePost(item.blogdetails._id)" class="inline-block p-1 px-2 mt-2 text-blue-800 shadow hover:bg-blue-800 hover:text-white rounded">Edit</div>
                    <div @click="deleteSinglePost(item.blogdetails._id)" class="inline-block p-1 px-2 mt-2 mx-2 text-red-800 hover:bg-red-800 hover:text-white shadow rounded">Delete</div>
                </div>
                </div>
                </div>
        </div>
       
        
    </div>
    
</template>

<script>
import Navbar from '../components/navbar.vue'

export default {
    data() {
        return {
            posts: [],
            postSuccess: false,
            postTitle: '',
            postBody: '',
            userLists: '',
            userProfile: '',
            profileFullName: '',
            editStatus: false,
            sidebar: 'links',
            userID2: '',
            baseUrl: 'https://intense-temple-44969.herokuapp.com'
        }
    },
    components: {
        Navbar
    },
    methods: {
        fetchPosts () {
            fetch(`${this.baseUrl}/`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(res => res.json())
            .then(x => {
                this.userID2 = x.userId;

                x.blogs.forEach(blog => {
                    // console.log(blog.userID)
                    fetch(`${this.baseUrl}/view-blogger-profile/${blog.userID}`, {
                headers: {
                    token: localStorage.getItem('token')
                }
                })
                .then(res => res.json())
                .then(x => {
                    
                        
                        
                        const userDetails = {blogdetails: blog, nbbody: blog.blogBody.slice(0, 130) + "...more", ownerName: x.user.name, ownerEmail:x.user.email};
                    this.posts.push(userDetails)
                  
                    
                    
                }).catch(err => console.log(err))
                
                });
                
                console.log(this.posts)

            }).catch(err => {
                console.log(err);
                
            });

            
            
        },
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
        postArticle() {
            fetch(`${this.baseUrl}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('token')
                },
                method: 'POST',
                body: JSON.stringify({
                    bloghead: this.postTitle,
                    blogbody: this.postBody
                })
            }).then(res => res.json())
            .then(x => {
                if (x.message == 'ok') {
                    this.postSuccess = true;
                    setTimeout(() => {
                        this.postSuccess = false;
                        this.postTitle = '';
                        this.postBody = '';
                        this.fetchPosts();
                    }, 2000);
                } else {
                    alert(x.message);
                }
            }).catch(err => console.log(err))
        },
        showUsers(){
            this.sidebar = 'users';
        },
        resetSidebar() {
            this.sidebar = 'links';
        },
        checkLogin() {
            if (localStorage.getItem('token') == null) {
                alert('You need to login.');
                this.$router.push('/login');
            }
        },
        showPostUserProfile(key) {
            this.$router.push('/view-profile/' + key);
        },
        editStatus2() {
            this.editStatus = true;
        },
        logOut() {
            localStorage.removeItem('token');
            this.$router.replace('/login');
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
        },
        showSinglePost(key) {
            this.$router.push('/view-post/' + key);
        },
        editSinglePost(key) {
            this.$router.push('/edit-post/' + key);
        },
        deleteSinglePost(key) {
            const theval = confirm("Do you want to delete this post?");
            if(theval) {
                fetch(`${this.baseUrl}/${key}`, {
                    method: 'DELETE',
                    headers: {
                    token: localStorage.getItem('token')
                }
                }).then(res => res.json()).then(x => {
                    
                    if(x.message == "ok") {
                        alert("deleted");
                        this.$router.push('/')
                    }
                }).catch(err =>{console.log(err)})
                
            }
        }
    },
    
}
</script>

<style scoped>
    /* * {
        border: 2px solid red;
    } */
</style>