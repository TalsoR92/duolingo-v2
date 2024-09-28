import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Importation du router
import "./assets/styles.css"; // Importation des styles globaux

console.log("Démarrage de l'application...");
createApp(App)
	.use(router) // Ajoutez cette ligne pour utiliser le routeur
	.mount("#app");
console.log("Application montée avec succès.");
