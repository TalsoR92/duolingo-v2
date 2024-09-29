<template>
	<div class="flex flex-col items-center justify-center h-screen p-6 bg-gray-100">
		<!-- Nouveau bouton pour revenir au menu -->
		<button class="absolute top-4 left-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 shadow-lg transition" @click="goToMenu">Home</button>

		<div class="flex flex-col items-center space-y-2 mb-10">
			<h2 class="text-2xl font-bold text-center">Total Words: {{ words.length }}</h2>
			<button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 shadow-lg transition" @click="saveWords">Save Words</button>
		</div>

		<AddWordBox :newWord="newWord" :addWord="addWord" class="mb-6" />

		<div class="flex justify-center h-full w-[35%]">
			<div class="overflow-y-auto max-h-96 w-3/4">
				<WordList :words="words" :removeWord="removeWord" />
			</div>
		</div>

		<button class="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 shadow-lg transition" @click="removeAllWords">Remove All Words</button>

		<button class="fixed bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 shadow-lg transition" @click="scrollToTop">↑</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router"; // Importer useRouter
import AddWordBox from "./AddWordBox.vue";
import WordList from "./WordList.vue"; // Import the new WordList component
import { addWordsToDatabase } from "../../services/apiService"; // Ensure the path is correct

export default defineComponent({
	name: "VocabLists",
	components: {
		AddWordBox,
		WordList, // Register the WordList component
	},
	setup() {
		const newWord = reactive({
			word: "",
			translation: "",
		});

		const words = reactive([] as { word: string; translation: string }[]);

		const router = useRouter(); // Utiliser useRouter pour obtenir une instance du routeur

		const addWord = (word: string, translation: string) => {
			words.push({ word, translation });
		};

		const removeWord = (index: number) => {
			words.splice(index, 1);
		};

		const removeAllWords = () => {
			words.splice(0, words.length);
		};

		const saveWords = async () => {
			try {
				await addWordsToDatabase(words); // Call the function to add all words at once
				alert("Words saved!");
			} catch (error) {
				console.error("Error saving words:", error);
				alert("An error occurred while saving words. Please try again.");
			}
		};

		// Method to scroll to the top of the page
		const scrollToTop = () => {
			window.scrollTo({ top: 0, behavior: "smooth" });
		};

		// Method to navigate back to the menu page
		const goToMenu = () => {
			router.push("/");
		};

		return {
			newWord,
			words,
			addWord,
			removeWord,
			removeAllWords,
			saveWords,
			scrollToTop,
			goToMenu,
		};
	},
});
</script>
