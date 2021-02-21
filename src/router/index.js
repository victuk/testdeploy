import { createWebHashHistory, createRouter } from "vue-router";
import Home from "../views/home.vue";
import LoginRegister from "../views/login-register.vue";
import ViewPost from "../views/view-post.vue";
import ViewUserProfile from "../views/post-user-profile.vue";
import EditUserPost from "../views/edit-post.vue";
import ViewOwnProfile from "../views/view-own-profile.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: LoginRegister,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/view-post/:id",
    name: "ViewPost",
    component: ViewPost,
  },
  {
    path: "/view-profile/:id",
    name: "ViewUserProfile",
    component: ViewUserProfile,
  },
  {
    path: "/edit-post/:id",
    name: "EditUserPost",
    component: EditUserPost,
  },
  {
    path: "/view-own-profile",
    name: "ViewOwnProfile",
    component: ViewOwnProfile,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;