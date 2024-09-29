<template>
	<div class="flex flex-col items-center justify-center h-screen p-6 bg-gray-100">
		<!-- Bouton pour revenir au menu -->
		<button class="absolute top-4 left-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 shadow-lg transition" @click="goToMenu">Home</button>

		<div class="flex flex-col items-center space-y-2 mb-10">
			<h2 class="text-2xl font-bold text-center">Total Words: {{ words.length }}</h2>

			<!-- Sélecteur de collection -->
			<label class="text-lg">Select a Collection</label>
			<select v-model="selectedCollection.name" @change="onCollectionChange" class="px-4 py-2 border rounded">
				<option disabled value="">Choose a collection</option>
				<option v-for="collection in collections" :key="collection" :value="collection">
					{{ collection }}
				</option>
			</select>

			<button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 shadow-lg transition" @click="openPasswordModal">Save Words</button>
		</div>

		<AddWordBox :newWord="newWord" :addWord="addWord" class="mb-6" />

		<div class="flex justify-center h-full w-[35%]">
			<div class="overflow-y-auto max-h-96 w-3/4">
				<WordList :words="words" :removeWord="removeWord" />
			</div>
		</div>

		<button class="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 shadow-lg transition" @click="removeAllWords">Remove All Words</button>

		<button class="fixed bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-lg transition" @click="scrollToTop">↑</button>

		<!-- Modale de mot de passe -->
		<PasswordModal v-if="showPasswordModal" @close="showPasswordModal = false" @submit="handlePasswordSubmit" :noPassword="noPassword" />
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AddWordBox from "./AddWordBox.vue";
import WordList from "./WordList.vue";
import PasswordModal from "./PasswordModal.vue";
import { addWordsToDatabase, getCollections } from "../../services/apiService";

export default defineComponent({
	name: "VocabLists",
	components: {
		AddWordBox,
		WordList,
		PasswordModal,
	},
	setup() {
		const newWord = reactive({
			word: "",
			translation: "",
		});

		const words = reactive([] as { word: string; translation: string }[]);
		const collections = reactive([] as string[]);
		const selectedCollection = reactive({ name: "" });
		const showPasswordModal = ref(false); // Contrôle de l'affichage de la modale
		const noPassword = ref(false); // Indique si un mot de passe est requis ou non
		const router = useRouter();

		// Ajout de la méthode onCollectionChange pour corriger l'erreur
		const onCollectionChange = () => {
			console.log("Collection changed:", selectedCollection.name);
			// Logique à ajouter si nécessaire lors du changement de collection
		};

		const addWord = (word: string, translation: string) => {
			words.push({ word, translation });
		};

		const removeWord = (index: number) => {
			words.splice(index, 1);
		};

		const removeAllWords = () => {
			words.splice(0, words.length);
		};

		const openPasswordModal = () => {
			// Conditions pour les collections qui nécessitent un mot de passe
			if (selectedCollection.name === "Damien" || selectedCollection.name === "Antoine") {
				noPassword.value = false; // Mot de passe requis
			} else if (selectedCollection.name === "bordel") {
				noPassword.value = true; // Pas de mot de passe requis
			}

			// Affiche la modale
			showPasswordModal.value = true;
		};

		const handlePasswordSubmit = async (password: string) => {
			try {
				// Envoie le mot de passe si requis, ou une chaîne vide s'il n'est pas nécessaire
				await addWordsToDatabase(words, selectedCollection.name, noPassword.value ? "" : password);
				alert("Words saved!");
				showPasswordModal.value = false; // Fermer la modale après la soumission
			} catch (error) {
				console.error("Error saving words:", error);
				alert("An error occurred while saving words. Please try again.");
			}
		};

		onMounted(async () => {
			collections.push(...(await getCollections()));
		});

		const scrollToTop = () => {
			window.scrollTo({ top: 0, behavior: "smooth" });
		};

		const goToMenu = () => {
			router.push("/");
		};

		return {
			newWord,
			words,
			collections,
			selectedCollection,
			showPasswordModal,
			noPassword, // Ajout du flag pour mot de passe requis ou non
			addWord,
			removeWord,
			removeAllWords,
			openPasswordModal,
			handlePasswordSubmit,
			onCollectionChange, // Ajout ici pour lier la méthode au template
			scrollToTop,
			goToMenu,
		};
	},
});
</script>
