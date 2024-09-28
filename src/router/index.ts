import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue"; // Assurez-vous que ce chemin est correct
import Play from "../pages/play/Play.vue"; // Assurez-vous que ce chemin est correct
import VocabLists from "../pages/add-vocab/VocabPage.vue"; // Assurez-vous que ce chemin est correct

const routes = [
	{ path: "/", name: "Home", component: Home },
	{ path: "/play", name: "Play", component: Play },
	{ path: "/vocab-lists", name: "VocabLists", component: VocabLists },
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL), // Remplacez process.env.BASE_URL par import.meta.env.BASE_URL
	routes,
});

export default router;
