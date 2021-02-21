<template>
    <div>
        <nav class="flex items-center justify-between flex-wrap bg-gray-800 p-2 fixed mb-20 w-full z-10 top-0">
		<div class="flex items-center flex-shrink-0 text-white mr-6">
			<a class="text-white no-underline hover:text-white hover:no-underline" href="#">
				<span class="text-2xl pl-2"><i class="em em-grinning"></i>
				<router-link to="/" class="inline-block py-2 px-4 text-white no-underline">
				SayItByVic
				</router-link>
				</span>
			</a>
		</div>

		<div class="block md:hidden" v-on:click="toggleNavbar()">
			<button id="nav-toggle"
			
			 class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white disnav">
				<svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
			</button>
		</div>

		<div v-if="navValue" class="w-full flex-grow md:flex md:items-center md:w-auto pt-6 md:pt-0 disnav" id="nav-content">
			<ul class="list-reset md:flex justify-end flex-1 items-center">
				
				<li class="mr-3" v-show="$route.path =='/login'">
					<router-link to="/login" class="inline-block py-2 px-4 text-white no-underline">Login</router-link>
				</li>
				<li class="mr-3" v-show="$route.path =='/login'">
					<router-link to="" class="inline-block text-white no-underline hover:text-underline py-2 px-4">Create New Account</router-link>
				</li>
				<li class="mr-3" v-show="$route.path !='/login'">
					<router-link to="/view-own-profile" class="inline-block text-white no-underline hover:text-underline py-2 px-4">Profile</router-link>
				</li>
				<li class="mr-3" v-show="$route.path !='/login'">
					<div v-on:click="logOut()" class="inline-block text-white no-underline hover:text-underline py-2 px-4">Log Out</div>
				</li>
			</ul>
			
		</div>
	</nav>
    </div>
</template>
 

<script>


export default {
	data() {
		return {
			navValue: false
		}
	},
	methods: {
		toggleNavbar() {
			if (this.navValue) {
				this.navValue = false;
			} else {
				this.navValue = true;
			}
        },
        logOut() {
            localStorage.removeItem('token');
            this.$router.push('/login');
        }
	},
};


</script>