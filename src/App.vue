<template>

	<!--Container-->
	<div class="bg-gray-100 w-full h-screen overflow-auto fixed my-10">

		 <nav class="flex items-center justify-between flex-wrap bg-gray-800 p-2 fixed mb-20 w-full z-10 top-0">
		<div class="flex items-center flex-shrink-0 text-white mr-6">
			<a class="text-white no-underline hover:text-white hover:no-underline" href="#">
				<span class="text-2xl pl-2"><i class="em em-grinning"></i>
				<router-link to="/" class="inline-block py-2 px-4 text-white no-underline">
				Textblog
				</router-link>
				</span>
			</a>
		</div>

		<div class="block lg:hidden">
			<button id="nav-toggle" class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white disnav">
				<svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
			</button>
		</div>

		<div class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden pt-6 lg:pt-0 disnav" id="nav-content">
			<ul class="list-reset lg:flex justify-end flex-1 items-center">
				<li class="mr-3">
					<router-link to="/login" class="inline-block py-2 px-4 hidden text-white no-underline">Login</router-link>
				</li>
				<li class="mr-3">
					<router-link to="" class="inline-block text-white no-underline  hidden hover:text-underline py-2 px-4">Create New Account</router-link>
				</li>
			</ul>
			
		</div>
	</nav>
<router-view />
		<!-- <div class="mt-24 grid grid-cols-4 h-full overflow-hidden">
		<div class="">1</div>
		<div class="col-span-2">2</div>
		<div class="">3</div>
		</div> -->
	</div>


</template>

<script setup>


</script>

<style scoped>
/* * {
	border: 1px solid black;
} */
</style>